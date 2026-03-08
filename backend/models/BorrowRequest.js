const mongoose = require('mongoose');

const borrowRequestSchema = new mongoose.Schema({
  resource: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Resource',
    required: [true, 'Resource is required']
  },
  borrower: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Borrower is required']
  },
  requestedDate: {
    type: Date,
    default: Date.now
  },
  borrowDate: {
    type: Date,
    required: [true, 'Borrow date is required']
  },
  returnDate: {
    type: Date,
    required: [true, 'Return date is required']
  },
  actualReturnDate: {
    type: Date
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected', 'borrowed', 'returned', 'overdue'],
    default: 'pending'
  },
  purpose: {
    type: String,
    required: [true, 'Purpose is required'],
    trim: true
  },
  approvedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  approvedDate: {
    type: Date
  },
  rejectionReason: {
    type: String
  },
  notes: {
    type: String
  }
}, {
  timestamps: true
});

borrowRequestSchema.pre('save', function(next) {
  if (this.returnDate <= this.borrowDate) {
    return next(new Error('Return date must be after borrow date'));
  }
  next();
});

module.exports = mongoose.model('BorrowRequest', borrowRequestSchema);
