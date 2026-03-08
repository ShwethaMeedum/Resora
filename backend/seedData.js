const mongoose = require('mongoose');
require('dotenv').config();
const User = require('./models/User');
const Category = require('./models/Category');
const Resource = require('./models/Resource');
const BorrowRequest = require('./models/BorrowRequest');

const seedData = async () => {
  try {
    // Clear existing data
    await User.deleteMany({});
    await Category.deleteMany({});
    await Resource.deleteMany({});
    await BorrowRequest.deleteMany({});

    // Create sample categories
    const categories = await Category.insertMany([
      { name: 'Books', description: 'Academic books and textbooks', maxBorrowDays: 14 },
      { name: 'Laptops', description: 'Laptops for academic use', maxBorrowDays: 7 },
      { name: 'Lab Equipment', description: 'Scientific lab equipment', maxBorrowDays: 3 },
      { name: 'Projectors', description: 'Presentation projectors', maxBorrowDays: 2 },
      { name: 'Cameras', description: 'Photography and video equipment', maxBorrowDays: 5 }
    ]);

    // Create sample users
    const users = await User.insertMany([
      {
        name: 'John Student',
        email: 'john@student.com',
        password: 'password123',
        role: 'student',
        studentId: 'STU001',
        department: 'Computer Science',
        phone: '1234567890'
      },
      {
        name: 'Jane Staff',
        email: 'jane@staff.com',
        password: 'password123',
        role: 'staff',
        department: 'Library',
        phone: '0987654321'
      },
      {
        name: 'Admin User',
        email: 'admin@admin.com',
        password: 'password123',
        role: 'admin',
        department: 'IT',
        phone: '1122334455'
      }
    ]);

    // Create sample resources
    const resources = await Resource.insertMany([
      {
        name: 'Introduction to Algorithms',
        category: categories[0]._id,
        description: 'Computer science textbook by Cormen',
        serialNumber: 'BOOK001',
        condition: 'good',
        status: 'available',
        location: 'Library - Section A',
        addedBy: users[1]._id
      },
      {
        name: 'Dell Laptop Model XPS',
        category: categories[1]._id,
        description: 'High-performance laptop for programming',
        serialNumber: 'LAP001',
        condition: 'excellent',
        status: 'available',
        location: 'IT Lab - Room 101',
        addedBy: users[1]._id
      },
      {
        name: 'Microscope Lab Set',
        category: categories[2]._id,
        description: 'Professional microscope for biology labs',
        serialNumber: 'LAB001',
        condition: 'good',
        status: 'available',
        location: 'Science Lab - Room 205',
        addedBy: users[1]._id
      },
      {
        name: 'Epson Projector',
        category: categories[3]._id,
        description: 'HD projector for presentations',
        serialNumber: 'PROJ001',
        condition: 'good',
        status: 'borrowed',
        location: 'Conference Room A',
        addedBy: users[1]._id
      },
      {
        name: 'Canon DSLR Camera',
        category: categories[4]._id,
        description: 'Professional camera for photography',
        serialNumber: 'CAM001',
        condition: 'excellent',
        status: 'available',
        location: 'Media Lab - Room 301',
        addedBy: users[1]._id
      },
      {
        name: 'Data Structures and Algorithms',
        category: categories[0]._id,
        description: 'Computer science fundamentals book',
        serialNumber: 'BOOK002',
        condition: 'fair',
        status: 'available',
        location: 'Library - Section B',
        addedBy: users[1]._id
      },
      {
        name: 'MacBook Pro 16"',
        category: categories[1]._id,
        description: 'Apple laptop for design work',
        serialNumber: 'LAP002',
        condition: 'excellent',
        status: 'available',
        location: 'Design Lab - Room 401',
        addedBy: users[1]._id
      },
      {
        name: 'Chemistry Lab Kit',
        category: categories[2]._id,
        description: 'Complete chemistry experiment set',
        serialNumber: 'LAB002',
        condition: 'good',
        status: 'available',
        location: 'Chemistry Lab - Room 102',
        addedBy: users[1]._id
      }
    ]);

    // Create sample borrow requests
    const borrowRequests = await BorrowRequest.insertMany([
      {
        resource: resources[0]._id,
        borrower: users[0]._id,
        requestedDate: new Date('2024-01-15'),
        borrowDate: new Date('2024-01-16'),
        returnDate: new Date('2024-01-30'),
        status: 'approved',
        purpose: 'Study for algorithms exam',
        approvedBy: users[1]._id,
        approvedDate: new Date('2024-01-15'),
        notes: 'Student needs book for exam preparation'
      },
      {
        resource: resources[3]._id,
        borrower: users[0]._id,
        requestedDate: new Date('2024-01-20'),
        borrowDate: new Date('2024-01-21'),
        returnDate: new Date('2024-01-23'),
        status: 'borrowed',
        purpose: 'Class presentation',
        approvedBy: users[1]._id,
        approvedDate: new Date('2024-01-20'),
        notes: 'For final project presentation'
      },
      {
        resource: resources[4]._id,
        borrower: users[0]._id,
        requestedDate: new Date('2024-01-22'),
        borrowDate: new Date('2024-01-25'),
        returnDate: new Date('2024-01-30'),
        status: 'pending',
        purpose: 'Photography assignment',
        notes: 'Need for photography course project'
      },
      {
        resource: resources[1]._id,
        borrower: users[0]._id,
        requestedDate: new Date('2024-01-10'),
        borrowDate: new Date('2024-01-11'),
        returnDate: new Date('2024-01-18'),
        status: 'returned',
        purpose: 'Programming assignment',
        approvedBy: users[1]._id,
        approvedDate: new Date('2024-01-10'),
        actualReturnDate: new Date('2024-01-17'),
        notes: 'Returned in good condition'
      }
    ]);

    console.log('✅ Sample data seeded successfully!');
    console.log(`📚 Categories: ${categories.length}`);
    console.log(`👥 Users: ${users.length}`);
    console.log(`📦 Resources: ${resources.length}`);
    console.log(`📋 Borrow Requests: ${borrowRequests.length}`);
    
    console.log('\n🔑 Login Credentials:');
    console.log('Student: john@student.com / password123');
    console.log('Staff: jane@staff.com / password123');
    console.log('Admin: admin@admin.com / password123');

  } catch (error) {
    console.error('❌ Error seeding data:', error);
  }
};

// Connect to MongoDB and seed data
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/university-resource-system')
  .then(() => {
    console.log('📦 Connected to MongoDB, seeding data...');
    seedData().then(() => {
      console.log('🎉 Seeding complete!');
      process.exit(0);
    });
  })
  .catch((error) => {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  });
