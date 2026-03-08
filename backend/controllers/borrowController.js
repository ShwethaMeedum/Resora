const BorrowRequest = require('../models/BorrowRequest');
const Resource = require('../models/Resource');
const { validationResult } = require('express-validator');

const createBorrowRequest = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { resource, borrowDate, returnDate, purpose } = req.body;

    const resourceExists = await Resource.findById(resource);
    if (!resourceExists) {
      return res.status(404).json({ message: 'Resource not found' });
    }

    if (resourceExists.status !== 'available') {
      return res.status(400).json({ message: 'Resource is not available for borrowing' });
    }

    const existingRequest = await BorrowRequest.findOne({
      resource,
      borrower: req.user.id,
      status: { $in: ['pending', 'approved', 'borrowed'] }
    });

    if (existingRequest) {
      return res.status(400).json({ message: 'You already have an active request for this resource' });
    }

    const borrowRequest = await BorrowRequest.create({
      resource,
      borrower: req.user.id,
      borrowDate,
      returnDate,
      purpose,
    });

    const populatedRequest = await BorrowRequest.findById(borrowRequest._id)
      .populate('resource', 'name serialNumber')
      .populate('borrower', 'name email studentId')
      .populate('approvedBy', 'name');

    res.status(201).json(populatedRequest);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMyRequests = async (req, res) => {
  try {
    const requests = await BorrowRequest.find({ borrower: req.user.id })
      .populate('resource', 'name serialNumber category')
      .populate('approvedBy', 'name')
      .sort({ createdAt: -1 });

    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllRequests = async (req, res) => {
  try {
    const { status } = req.query;
    let query = {};

    if (status) {
      query.status = status;
    }

    const requests = await BorrowRequest.find(query)
      .populate('resource', 'name serialNumber category')
      .populate('borrower', 'name email studentId department')
      .populate('approvedBy', 'name')
      .sort({ createdAt: -1 });

    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const approveRequest = async (req, res) => {
  try {
    const { id } = req.params;

    const borrowRequest = await BorrowRequest.findById(id)
      .populate('resource');

    if (!borrowRequest) {
      return res.status(404).json({ message: 'Borrow request not found' });
    }

    if (borrowRequest.status !== 'pending') {
      return res.status(400).json({ message: 'Request can only be approved if pending' });
    }

    const resource = await Resource.findById(borrowRequest.resource._id);
    if (resource.status !== 'available') {
      return res.status(400).json({ message: 'Resource is no longer available' });
    }

    borrowRequest.status = 'approved';
    borrowRequest.approvedBy = req.user.id;
    borrowRequest.approvedDate = new Date();

    await borrowRequest.save();

    resource.status = 'borrowed';
    resource.lastBorrowed = new Date();
    resource.totalBorrows += 1;
    await resource.save();

    const updatedRequest = await BorrowRequest.findById(borrowRequest._id)
      .populate('resource', 'name serialNumber')
      .populate('borrower', 'name email studentId')
      .populate('approvedBy', 'name');

    res.json(updatedRequest);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const rejectRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const { rejectionReason } = req.body;

    const borrowRequest = await BorrowRequest.findById(id);

    if (!borrowRequest) {
      return res.status(404).json({ message: 'Borrow request not found' });
    }

    if (borrowRequest.status !== 'pending') {
      return res.status(400).json({ message: 'Request can only be rejected if pending' });
    }

    borrowRequest.status = 'rejected';
    borrowRequest.rejectionReason = rejectionReason;
    borrowRequest.approvedBy = req.user.id;
    borrowRequest.approvedDate = new Date();

    await borrowRequest.save();

    const updatedRequest = await BorrowRequest.findById(borrowRequest._id)
      .populate('resource', 'name serialNumber')
      .populate('borrower', 'name email studentId')
      .populate('approvedBy', 'name');

    res.json(updatedRequest);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const markAsBorrowed = async (req, res) => {
  try {
    const { id } = req.params;

    const borrowRequest = await BorrowRequest.findById(id);

    if (!borrowRequest) {
      return res.status(404).json({ message: 'Borrow request not found' });
    }

    if (borrowRequest.status !== 'approved') {
      return res.status(400).json({ message: 'Request must be approved first' });
    }

    borrowRequest.status = 'borrowed';
    borrowRequest.borrowDate = new Date();
    await borrowRequest.save();

    const updatedRequest = await BorrowRequest.findById(borrowRequest._id)
      .populate('resource', 'name serialNumber')
      .populate('borrower', 'name email studentId')
      .populate('approvedBy', 'name');

    res.json(updatedRequest);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const markAsReturned = async (req, res) => {
  try {
    const { id } = req.params;
    const { notes } = req.body;

    const borrowRequest = await BorrowRequest.findById(id)
      .populate('resource');

    if (!borrowRequest) {
      return res.status(404).json({ message: 'Borrow request not found' });
    }

    if (borrowRequest.status !== 'borrowed') {
      return res.status(400).json({ message: 'Request must be in borrowed status' });
    }

    borrowRequest.status = 'returned';
    borrowRequest.actualReturnDate = new Date();
    borrowRequest.notes = notes;
    await borrowRequest.save();

    const resource = await Resource.findById(borrowRequest.resource._id);
    resource.status = 'available';
    await resource.save();

    const updatedRequest = await BorrowRequest.findById(borrowRequest._id)
      .populate('resource', 'name serialNumber')
      .populate('borrower', 'name email studentId')
      .populate('approvedBy', 'name');

    res.json(updatedRequest);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createBorrowRequest,
  getMyRequests,
  getAllRequests,
  approveRequest,
  rejectRequest,
  markAsBorrowed,
  markAsReturned,
};
