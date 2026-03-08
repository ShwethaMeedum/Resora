import React, { useState, useMemo } from 'react';

const ModernTable = ({
  data = [],
  columns = [],
  loading = false,
  searchable = false,
  sortable = true,
  paginated = false,
  pageSize = 10,
  actions = [],
  emptyState = null,
  className = '',
  onRowClick = null,
  selectable = false,
  onSelectionChange = null,
  stickyHeader = true,
  striped = true,
  hoverable = true,
  compact = false
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState(new Set());

  // Filter data based on search query
  const filteredData = useMemo(() => {
    if (!searchQuery || !searchable) return data;
    
    return data.filter(row => {
      return columns.some(column => {
        const value = row[column.key];
        if (value === null || value === undefined) return false;
        return value.toString().toLowerCase().includes(searchQuery.toLowerCase());
      });
    });
  }, [data, columns, searchQuery, searchable]);

  // Sort data
  const sortedData = useMemo(() => {
    if (!sortConfig.key || !sortable) return filteredData;
    
    return [...filteredData].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      
      if (aValue === null || aValue === undefined) return 1;
      if (bValue === null || bValue === undefined) return -1;
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortConfig.direction === 'asc' 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortConfig.direction === 'asc' 
          ? aValue - bValue
          : bValue - aValue;
      }
      
      return sortConfig.direction === 'asc' 
        ? String(aValue).localeCompare(String(bValue))
        : String(bValue).localeCompare(String(aValue));
    });
  }, [filteredData, sortConfig, sortable]);

  // Paginate data
  const paginatedData = useMemo(() => {
    if (!paginated) return sortedData;
    
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return sortedData.slice(startIndex, endIndex);
  }, [sortedData, currentPage, pageSize, paginated]);

  const totalPages = Math.ceil(sortedData.length / pageSize);

  const handleSort = (key) => {
    if (!sortable) return;
    
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleRowSelection = (rowId, selected) => {
    const newSelection = new Set(selectedRows);
    if (selected) {
      newSelection.add(rowId);
    } else {
      newSelection.delete(rowId);
    }
    setSelectedRows(newSelection);
    onSelectionChange?.(newSelection);
  };

  const handleSelectAll = (selected) => {
    const newSelection = selected ? new Set(paginatedData.map(row => row.id)) : new Set();
    setSelectedRows(newSelection);
    onSelectionChange?.(newSelection);
  };

  const isAllSelected = paginatedData.length > 0 && paginatedData.every(row => selectedRows.has(row.id));
  const isIndeterminate = selectedRows.size > 0 && selectedRows.size < paginatedData.length;

  const getSortIcon = (column) => {
    if (sortConfig.key !== column.key) return '↕️';
    return sortConfig.direction === 'asc' ? '↑' : '↓';
  };

  const renderCell = (row, column) => {
    const value = row[column.key];
    
    if (column.render) {
      return column.render(value, row);
    }
    
    if (column.type === 'badge') {
      return (
        <span 
          className="badge"
          style={column.badgeColors?.[value] || { background: 'var(--gray-100)', color: 'var(--gray-700)' }}
        >
          {column.badgeIcons?.[value] && <span>{column.badgeIcons[value]}</span>}
          {value}
        </span>
      );
    }
    
    if (column.type === 'date') {
      return value ? new Date(value).toLocaleDateString() : '-';
    }
    
    if (column.type === 'datetime') {
      return value ? new Date(value).toLocaleString() : '-';
    }
    
    if (column.type === 'currency') {
      return value ? `$${value.toFixed(2)}` : '-';
    }
    
    if (column.type === 'boolean') {
      return value ? '✅' : '❌';
    }
    
    return value || '-';
  };

  if (loading) {
    return (
      <div className="table-loading">
        <div className="loading-spinner"></div>
        <p>Loading data...</p>
      </div>
    );
  }

  return (
    <div className={`modern-table-container ${className}`}>
      {/* Search Bar */}
      {searchable && (
        <div className="table-search">
          <div className="search-bar">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="search-input"
            />
          </div>
        </div>
      )}

      {/* Table */}
      <div className="table-wrapper">
        <table className={`table ${striped ? 'table-striped' : ''} ${hoverable ? 'table-hover' : ''} ${compact ? 'table-compact' : ''}`}>
          <thead className={stickyHeader ? 'table-sticky-header' : ''}>
            <tr>
              {selectable && (
                <th className="table-select-column">
                  <input
                    type="checkbox"
                    checked={isAllSelected}
                    ref={input => {
                      if (input) {
                        input.indeterminate = isIndeterminate;
                      }
                    }}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    className="table-checkbox"
                  />
                </th>
              )}
              {columns.map((column) => (
                <th 
                  key={column.key}
                  className={`table-header-cell ${sortable && column.sortable !== false ? 'table-sortable' : ''}`}
                  onClick={() => sortable && column.sortable !== false && handleSort(column.key)}
                >
                  <div className="table-header-content">
                    <span>{column.label}</span>
                    {sortable && column.sortable !== false && (
                      <span className="table-sort-icon">{getSortIcon(column)}</span>
                    )}
                  </div>
                </th>
              ))}
              {actions.length > 0 && (
                <th className="table-actions-column">Actions</th>
              )}
            </tr>
          </thead>
          <tbody>
            {paginatedData.length === 0 ? (
              <tr>
                <td colSpan={columns.length + (selectable ? 1 : 0) + (actions.length > 0 ? 1 : 0)} className="table-empty">
                  {emptyState || (
                    <div className="empty-state">
                      <div className="empty-state-icon">📭</div>
                      <h3 className="empty-state-title">No Data Found</h3>
                      <p className="empty-state-message">
                        {searchQuery ? 'Try adjusting your search terms' : 'No data available'}
                      </p>
                    </div>
                  )}
                </td>
              </tr>
            ) : (
              paginatedData.map((row, index) => (
                <tr 
                  key={row.id || index}
                  className={`table-row ${onRowClick ? 'table-clickable' : ''} ${selectedRows.has(row.id) ? 'table-row-selected' : ''}`}
                  onClick={() => onRowClick?.(row)}
                >
                  {selectable && (
                    <td className="table-select-column">
                      <input
                        type="checkbox"
                        checked={selectedRows.has(row.id)}
                        onChange={(e) => {
                          e.stopPropagation();
                          handleRowSelection(row.id, e.target.checked);
                        }}
                        className="table-checkbox"
                      />
                    </td>
                  )}
                  {columns.map((column) => (
                    <td key={column.key} className="table-cell">
                      {renderCell(row, column)}
                    </td>
                  ))}
                  {actions.length > 0 && (
                    <td className="table-actions-column">
                      <div className="table-actions">
                        {actions.map((action, actionIndex) => (
                          <button
                            key={actionIndex}
                            onClick={(e) => {
                              e.stopPropagation();
                              action.onClick?.(row);
                            }}
                            disabled={action.disabled?.(row)}
                            className={`btn ${action.className || 'btn-ghost'} btn-sm table-action-btn`}
                            title={action.tooltip}
                          >
                            {action.icon}
                          </button>
                        ))}
                      </div>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {paginated && totalPages > 1 && (
        <div className="table-pagination">
          <div className="pagination-info">
            <span>
              Showing {((currentPage - 1) * pageSize) + 1} to {Math.min(currentPage * pageSize, sortedData.length)} of {sortedData.length} entries
            </span>
          </div>
          
          <div className="pagination-controls">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="btn btn-ghost btn-sm"
            >
              ← Previous
            </button>
            
            <div className="pagination-pages">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }
                
                return (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`btn ${pageNum === currentPage ? 'btn-primary' : 'btn-ghost'} btn-sm`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>
            
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="btn btn-ghost btn-sm"
            >
              Next →
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        .modern-table-container {
          background: var(--bg-secondary);
          border: 1px solid var(--gray-200);
          border-radius: var(--radius-xl);
          overflow: hidden;
          box-shadow: var(--shadow-sm);
        }

        .table-search {
          padding: var(--spacing-4);
          border-bottom: 1px solid var(--gray-200);
          background: var(--bg-tertiary);
        }

        .table-wrapper {
          overflow-x: auto;
        }

        .table {
          width: 100%;
          border-collapse: collapse;
          font-size: var(--font-size-sm);
        }

        .table-sticky-header th {
          position: sticky;
          top: 0;
          z-index: 10;
        }

        .table-header-cell {
          padding: var(--spacing-4) var(--spacing-6);
          text-align: left;
          font-weight: var(--font-weight-semibold);
          color: var(--text-primary);
          background: var(--bg-tertiary);
          border-bottom: 1px solid var(--gray-200);
          white-space: nowrap;
        }

        .table-sortable {
          cursor: pointer;
          user-select: none;
          transition: background-color var(--transition-fast);
        }

        .table-sortable:hover {
          background: var(--gray-100);
        }

        .table-header-content {
          display: flex;
          align-items: center;
          gap: var(--spacing-2);
        }

        .table-sort-icon {
          font-size: var(--font-size-xs);
          opacity: 0.5;
        }

        .table-sortable:hover .table-sort-icon {
          opacity: 1;
        }

        .table-row {
          border-bottom: 1px solid var(--gray-200);
          transition: background-color var(--transition-fast);
        }

        .table-striped .table-row:nth-child(even) {
          background: var(--bg-tertiary);
        }

        .table-hover .table-row:hover {
          background: var(--gray-50);
        }

        .table-clickable {
          cursor: pointer;
        }

        .table-row-selected {
          background: var(--primary-lightest) !important;
        }

        .table-cell {
          padding: var(--spacing-4) var(--spacing-6);
          color: var(--text-primary);
          vertical-align: middle;
        }

        .table-select-column,
        .table-actions-column {
          width: 1px;
          white-space: nowrap;
        }

        .table-checkbox {
          margin: 0;
        }

        .table-actions {
          display: flex;
          gap: var(--spacing-1);
        }

        .table-action-btn {
          padding: var(--spacing-2);
          min-width: auto;
        }

        .table-empty {
          padding: var(--spacing-12);
          text-align: center;
        }

        .table-loading {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: var(--spacing-12);
          gap: var(--spacing-4);
        }

        .table-pagination {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: var(--spacing-4) var(--spacing-6);
          border-top: 1px solid var(--gray-200);
          background: var(--bg-tertiary);
        }

        .pagination-info {
          font-size: var(--font-size-sm);
          color: var(--text-tertiary);
        }

        .pagination-controls {
          display: flex;
          align-items: center;
          gap: var(--spacing-2);
        }

        .pagination-pages {
          display: flex;
          gap: var(--spacing-1);
        }

        .table-compact .table-header-cell,
        .table-compact .table-cell {
          padding: var(--spacing-2) var(--spacing-3);
        }

        @media (max-width: 768px) {
          .table-pagination {
            flex-direction: column;
            gap: var(--spacing-4);
          }
          
          .pagination-controls {
            flex-wrap: wrap;
            justify-content: center;
          }
          
          .table-search {
            padding: var(--spacing-3);
          }
          
          .table-header-cell,
          .table-cell {
            padding: var(--spacing-3) var(--spacing-4);
          }
        }
      `}</style>
    </div>
  );
};

export default ModernTable;
