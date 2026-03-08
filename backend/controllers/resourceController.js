const Resource = require('../models/Resource');
const Category = require('../models/Category');
const { validationResult } = require('express-validator');

const getAllResources = async (req, res) => {
  try {
    const { category, status, search } = req.query;
    let query = {};

    if (category) {
      query.category = category;
    }
    if (status) {
      query.status = status;
    }
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { serialNumber: { $regex: search, $options: 'i' } }
      ];
    }

    const resources = await Resource.find(query)
      .populate('category', 'name')
      .populate('addedBy', 'name')
      .sort({ createdAt: -1 });

    res.json(resources);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addResource = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, category, description, serialNumber, condition, location } = req.body;

    const existingResource = await Resource.findOne({ serialNumber });
    if (existingResource) {
      return res.status(400).json({ message: 'Resource with this serial number already exists' });
    }

    const resource = await Resource.create({
      name,
      category,
      description,
      serialNumber,
      condition,
      location,
      addedBy: req.user.id,
    });

    const populatedResource = await Resource.findById(resource._id)
      .populate('category', 'name')
      .populate('addedBy', 'name');

    res.status(201).json(populatedResource);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateResource = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const updates = req.body;

    if (updates.serialNumber) {
      const existingResource = await Resource.findOne({ 
        serialNumber: updates.serialNumber,
        _id: { $ne: id }
      });
      if (existingResource) {
        return res.status(400).json({ message: 'Resource with this serial number already exists' });
      }
    }

    const resource = await Resource.findByIdAndUpdate(
      id,
      updates,
      { new: true, runValidators: true }
    ).populate('category', 'name').populate('addedBy', 'name');

    if (!resource) {
      return res.status(404).json({ message: 'Resource not found' });
    }

    res.json(resource);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteResource = async (req, res) => {
  try {
    const { id } = req.params;

    const resource = await Resource.findById(id);
    if (!resource) {
      return res.status(404).json({ message: 'Resource not found' });
    }

    if (resource.status === 'borrowed') {
      return res.status(400).json({ message: 'Cannot delete resource that is currently borrowed' });
    }

    await Resource.findByIdAndDelete(id);
    res.json({ message: 'Resource deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const changeStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['available', 'maintenance', 'retired'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const resource = await Resource.findById(id);
    if (!resource) {
      return res.status(404).json({ message: 'Resource not found' });
    }

    if (resource.status === 'borrowed' && status !== 'available') {
      return res.status(400).json({ message: 'Cannot change status of borrowed resource' });
    }

    resource.status = status;
    await resource.save();

    const updatedResource = await Resource.findById(resource._id)
      .populate('category', 'name')
      .populate('addedBy', 'name');

    res.json(updatedResource);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ name: 1 });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addCategory = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, description, maxBorrowDays } = req.body;

    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return res.status(400).json({ message: 'Category already exists' });
    }

    const category = await Category.create({
      name,
      description,
      maxBorrowDays,
    });

    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllResources,
  addResource,
  updateResource,
  deleteResource,
  changeStatus,
  getCategories,
  addCategory,
};
