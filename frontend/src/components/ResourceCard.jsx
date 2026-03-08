import React from 'react';
import { EyeIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

const ResourceCard = ({ resource, onEdit, onDelete, onView, showActions = false }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'available':
        return 'bg-green-100 text-green-800';
      case 'borrowed':
        return 'bg-red-100 text-red-800';
      case 'maintenance':
        return 'bg-yellow-100 text-yellow-800';
      case 'retired':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getConditionColor = (condition) => {
    switch (condition) {
      case 'excellent':
        return 'text-green-600';
      case 'good':
        return 'text-blue-600';
      case 'fair':
        return 'text-yellow-600';
      case 'poor':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{resource.name}</h3>
            <p className="text-sm text-gray-500">Serial: {resource.serialNumber}</p>
          </div>
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(resource.status)}`}>
            {resource.status}
          </span>
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Category:</span>
            <span className="font-medium">{resource.category?.name || 'N/A'}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Condition:</span>
            <span className={`font-medium ${getConditionColor(resource.condition)}`}>
              {resource.condition}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Location:</span>
            <span className="font-medium">{resource.location}</span>
          </div>
          {resource.totalBorrows > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Times Borrowed:</span>
              <span className="font-medium">{resource.totalBorrows}</span>
            </div>
          )}
        </div>

        {resource.description && (
          <div className="mb-4">
            <p className="text-sm text-gray-600 line-clamp-2">{resource.description}</p>
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="text-xs text-gray-400">
            Added by {resource.addedBy?.name || 'Unknown'}
          </div>
          {showActions && (
            <div className="flex space-x-2">
              {onView && (
                <button
                  onClick={() => onView(resource)}
                  className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-md transition-colors"
                  title="View Details"
                >
                  <EyeIcon className="h-4 w-4" />
                </button>
              )}
              {onEdit && (
                <button
                  onClick={() => onEdit(resource)}
                  className="p-2 text-green-600 hover:text-green-800 hover:bg-green-50 rounded-md transition-colors"
                  title="Edit"
                >
                  <PencilIcon className="h-4 w-4" />
                </button>
              )}
              {onDelete && (
                <button
                  onClick={() => onDelete(resource)}
                  className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-md transition-colors"
                  title="Delete"
                >
                  <TrashIcon className="h-4 w-4" />
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResourceCard;
