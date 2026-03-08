const Resource = require('../models/Resource');
const BorrowRequest = require('../models/BorrowRequest');
const User = require('../models/User');
const Category = require('../models/Category');

const getDashboardStats = async (req, res) => {
  try {
    const totalResources = await Resource.countDocuments();
    const availableResources = await Resource.countDocuments({ status: 'available' });
    const borrowedResources = await Resource.countDocuments({ status: 'borrowed' });
    const maintenanceResources = await Resource.countDocuments({ status: 'maintenance' });

    const totalUsers = await User.countDocuments();
    const students = await User.countDocuments({ role: 'student' });
    const staff = await User.countDocuments({ role: 'staff' });
    const admins = await User.countDocuments({ role: 'admin' });

    const pendingRequests = await BorrowRequest.countDocuments({ status: 'pending' });
    const approvedRequests = await BorrowRequest.countDocuments({ status: 'approved' });
    const borrowedActive = await BorrowRequest.countDocuments({ status: 'borrowed' });
    const returnedRequests = await BorrowRequest.countDocuments({ status: 'returned' });

    const overdueRequests = await BorrowRequest.countDocuments({
      status: 'borrowed',
      returnDate: { $lt: new Date() }
    });

    const categoryStats = await Resource.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
          available: {
            $sum: { $cond: [{ $eq: ['$status', 'available'] }, 1, 0] }
          },
          borrowed: {
            $sum: { $cond: [{ $eq: ['$status', 'borrowed'] }, 1, 0] }
          }
        }
      },
      {
        $lookup: {
          from: 'categories',
          localField: '_id',
          foreignField: '_id',
          as: 'categoryInfo'
        }
      },
      {
        $unwind: '$categoryInfo'
      },
      {
        $project: {
          categoryName: '$categoryInfo.name',
          count: 1,
          available: 1,
          borrowed: 1
        }
      }
    ]);

    const mostBorrowedResources = await Resource.find({ totalBorrows: { $gt: 0 } })
      .sort({ totalBorrows: -1 })
      .limit(10)
      .populate('category', 'name')
      .select('name totalBorrows category');

    const recentActivity = await BorrowRequest.find()
      .populate('resource', 'name serialNumber')
      .populate('borrower', 'name studentId')
      .sort({ createdAt: -1 })
      .limit(10);

    res.json({
      resources: {
        total: totalResources,
        available: availableResources,
        borrowed: borrowedResources,
        maintenance: maintenanceResources,
      },
      users: {
        total: totalUsers,
        students,
        staff,
        admins,
      },
      requests: {
        pending: pendingRequests,
        approved: approvedRequests,
        borrowed: borrowedActive,
        returned: returnedRequests,
        overdue: overdueRequests,
      },
      categoryStats,
      mostBorrowedResources,
      recentActivity,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getBorrowHistory = async (req, res) => {
  try {
    const { startDate, endDate, status, category } = req.query;
    let query = {};

    if (startDate || endDate) {
      query.createdAt = {};
      if (startDate) query.createdAt.$gte = new Date(startDate);
      if (endDate) query.createdAt.$lte = new Date(endDate);
    }

    if (status) {
      query.status = status;
    }

    if (category) {
      const resources = await Resource.find({ category }).select('_id');
      query.resource = { $in: resources.map(r => r._id) };
    }

    const history = await BorrowRequest.find(query)
      .populate('resource', 'name serialNumber')
      .populate('borrower', 'name studentId department')
      .populate('approvedBy', 'name')
      .sort({ createdAt: -1 });

    res.json(history);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getResourceUtilization = async (req, res) => {
  try {
    const utilization = await Resource.aggregate([
      {
        $group: {
          _id: '$category',
          totalResources: { $sum: 1 },
          borrowedResources: {
            $sum: { $cond: [{ $eq: ['$status', 'borrowed'] }, 1, 0] }
          },
          totalBorrows: { $sum: '$totalBorrows' },
          avgBorrows: { $avg: '$totalBorrows' }
        }
      },
      {
        $lookup: {
          from: 'categories',
          localField: '_id',
          foreignField: '_id',
          as: 'categoryInfo'
        }
      },
      {
        $unwind: '$categoryInfo'
      },
      {
        $project: {
          categoryName: '$categoryInfo.name',
          totalResources: 1,
          borrowedResources: 1,
          availableResources: { $subtract: ['$totalResources', '$borrowedResources'] },
          totalBorrows: 1,
          avgBorrows: 1,
          utilizationRate: {
            $multiply: [
              { $divide: ['$borrowedResources', '$totalResources'] },
              100
            ]
          }
        }
      },
      {
        $sort: { utilizationRate: -1 }
      }
    ]);

    res.json(utilization);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUserActivity = async (req, res) => {
  try {
    const { startDate, endDate, department } = req.query;
    let matchQuery = { role: 'student' };

    if (department) {
      matchQuery.department = department;
    }

    const activity = await User.aggregate([
      { $match: matchQuery },
      {
        $lookup: {
          from: 'borrowrequests',
          let: { userId: '$_id' },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ['$borrower', '$$userId'] },
                ...(startDate || endDate ? {
                  createdAt: {
                    ...(startDate ? { $gte: new Date(startDate) } : {}),
                    ...(endDate ? { $lte: new Date(endDate) } : {})
                  }
                } : {})
              }
            },
            {
              $group: {
                _id: null,
                totalRequests: { $sum: 1 },
                approvedRequests: {
                  $sum: { $cond: [{ $eq: ['$status', 'approved'] }, 1, 0] }
                },
                borrowedRequests: {
                  $sum: { $cond: [{ $eq: ['$status', 'borrowed'] }, 1, 0] }
                },
                returnedRequests: {
                  $sum: { $cond: [{ $eq: ['$status', 'returned'] }, 1, 0] }
                }
              }
            }
          ],
          as: 'borrowStats'
        }
      },
      {
        $unwind: {
          path: '$borrowStats',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $project: {
          name: 1,
          email: 1,
          studentId: 1,
          department: 1,
          totalRequests: { $ifNull: ['$borrowStats.totalRequests', 0] },
          approvedRequests: { $ifNull: ['$borrowStats.approvedRequests', 0] },
          borrowedRequests: { $ifNull: ['$borrowStats.borrowedRequests', 0] },
          returnedRequests: { $ifNull: ['$borrowStats.returnedRequests', 0] }
        }
      },
      {
        $sort: { totalRequests: -1 }
      }
    ]);

    res.json(activity);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getDashboardStats,
  getBorrowHistory,
  getResourceUtilization,
  getUserActivity,
};
