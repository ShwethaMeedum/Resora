// Shared Data Manager for Resource Management
// This handles data persistence and sharing between components

const STORAGE_KEYS = {
  RESOURCES: 'academic_resources',
  CATEGORIES: 'academic_categories',
  BORROW_REQUESTS: 'academic_borrow_requests'
};

// Default categories
const DEFAULT_CATEGORIES = [
  { _id: '1', name: 'Computer Science', description: 'Books and materials for computer science courses', resourceCount: 0, icon: '💻' },
  { _id: '2', name: 'Technology', description: 'Electronic devices and tech equipment', resourceCount: 0, icon: '📱' },
  { _id: '3', name: 'Photography', description: 'Cameras and photography equipment', resourceCount: 0, icon: '📷' },
  { _id: '4', name: 'Physics', description: 'Physics textbooks and equipment', resourceCount: 0, icon: '⚛️' },
  { _id: '5', name: 'Mathematics', description: 'Mathematics textbooks and materials', resourceCount: 0, icon: '📐' }
];

// Default resources
const DEFAULT_RESOURCES = [
  { 
    _id: '1', 
    name: 'Introduction to Algorithms', 
    type: 'Book', 
    category: 'Computer Science',
    description: 'Comprehensive algorithms textbook by Cormen et al.',
    serialNumber: 'CS-BOOK-001',
    condition: 'Excellent',
    location: 'Library - Section A',
    maxDuration: 14,
    totalQuantity: 5,
    availableQuantity: 3,
    borrowedQuantity: 2,
    status: 'available',
    createdAt: new Date('2024-01-01'),
    lastUpdated: new Date('2024-01-20'),
    icon: '📚',
    photos: [
      'https://picsum.photos/id/1/200/300',
      'https://picsum.photos/id/2/200/300'
    ]
  },
  { 
    _id: '2', 
    name: 'Dell Laptop XPS 15', 
    type: 'Laptop', 
    category: 'Technology',
    description: 'High-performance laptop with 16GB RAM, 512GB SSD',
    serialNumber: 'TECH-LAP-002',
    condition: 'Good',
    location: 'Tech Lab - Room 201',
    maxDuration: 7,
    totalQuantity: 3,
    availableQuantity: 1,
    borrowedQuantity: 2,
    status: 'available',
    createdAt: new Date('2024-01-02'),
    lastUpdated: new Date('2024-01-19'),
    icon: '💻',
    photos: [
      'https://picsum.photos/id/3/200/300',
      'https://picsum.photos/id/4/200/300',
      'https://picsum.photos/id/5/200/300'
    ]
  },
  { 
    _id: '3', 
    name: 'Canon EOS DSLR', 
    type: 'Camera', 
    category: 'Photography',
    description: 'Professional DSLR camera with 18-55mm lens',
    serialNumber: 'PHOTO-CAM-003',
    condition: 'Good',
    location: 'Media Lab - Room 105',
    maxDuration: 3,
    totalQuantity: 2,
    availableQuantity: 0,
    borrowedQuantity: 2,
    status: 'unavailable',
    createdAt: new Date('2024-01-03'),
    lastUpdated: new Date('2024-01-18'),
    icon: '📷',
    photos: [
      'https://picsum.photos/id/6/200/300',
      'https://picsum.photos/id/7/200/300'
    ]
  }
];

// Initialize data if not exists
const initializeData = () => {
  if (!localStorage.getItem(STORAGE_KEYS.RESOURCES)) {
    localStorage.setItem(STORAGE_KEYS.RESOURCES, JSON.stringify(DEFAULT_RESOURCES));
  }
  if (!localStorage.getItem(STORAGE_KEYS.CATEGORIES)) {
    localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(DEFAULT_CATEGORIES));
  }
  if (!localStorage.getItem(STORAGE_KEYS.BORROW_REQUESTS)) {
    localStorage.setItem(STORAGE_KEYS.BORROW_REQUESTS, JSON.stringify([]));
  }
};

// Get all resources
export const getResources = () => {
  initializeData();
  const resources = localStorage.getItem(STORAGE_KEYS.RESOURCES);
  return resources ? JSON.parse(resources) : [];
};

// Save all resources
export const saveResources = (resources) => {
  localStorage.setItem(STORAGE_KEYS.RESOURCES, JSON.stringify(resources));
  // Also update category counts
  updateCategoryCounts(resources);
};

// Get all categories
export const getCategories = () => {
  initializeData();
  const categories = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
  return categories ? JSON.parse(categories) : [];
};

// Save all categories
export const saveCategories = (categories) => {
  localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(categories));
};

// Update category counts based on resources
const updateCategoryCounts = (resources) => {
  const categories = getCategories();
  const updatedCategories = categories.map(category => ({
    ...category,
    resourceCount: resources.filter(resource => resource.category === category.name).length
  }));
  saveCategories(updatedCategories);
};

// Add new resource
export const addResource = (resourceData) => {
  const resources = getResources();
  const newResource = {
    _id: Date.now().toString(),
    ...resourceData,
    borrowedQuantity: 0,
    createdAt: new Date(),
    lastUpdated: new Date(),
    icon: getTypeIcon(resourceData.type)
  };
  resources.push(newResource);
  saveResources(resources);
  return newResource;
};

// Update existing resource
export const updateResource = (resourceId, resourceData) => {
  const resources = getResources();
  const updatedResources = resources.map(r => 
    r._id === resourceId 
      ? { ...r, ...resourceData, lastUpdated: new Date() }
      : r
  );
  saveResources(updatedResources);
  return updatedResources.find(r => r._id === resourceId);
};

// Delete resource
export const deleteResource = (resourceId) => {
  const resources = getResources();
  const filteredResources = resources.filter(r => r._id !== resourceId);
  saveResources(filteredResources);
  return true;
};

// Toggle resource status
export const toggleResourceStatus = (resourceId) => {
  const resources = getResources();
  const updatedResources = resources.map(r => {
    if (r._id === resourceId) {
      const newStatus = r.status === 'available' ? 'unavailable' : 'available';
      return {
        ...r,
        status: newStatus,
        availableQuantity: newStatus === 'available' ? r.totalQuantity : 0,
        lastUpdated: new Date()
      };
    }
    return r;
  });
  saveResources(updatedResources);
  return updatedResources.find(r => r._id === resourceId);
};

// Get resource by ID
export const getResourceById = (resourceId) => {
  const resources = getResources();
  return resources.find(r => r._id === resourceId);
};

// Helper function to get type icon
const getTypeIcon = (type) => {
  switch (type) {
    case 'Book': return '📚';
    case 'Laptop': return '💻';
    case 'Camera': return '📷';
    case 'Tablet': return '📱';
    case 'Projector': return '📽️';
    default: return '📦';
  }
};

// Clear all data (for testing)
export const clearAllData = () => {
  localStorage.removeItem(STORAGE_KEYS.RESOURCES);
  localStorage.removeItem(STORAGE_KEYS.CATEGORIES);
  localStorage.removeItem(STORAGE_KEYS.BORROW_REQUESTS);
};

// Export storage keys for external use
export { STORAGE_KEYS };
