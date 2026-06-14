// Slug generation
const generateSlug = (text) => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-\u00e0-\u00fc]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 50);
};

// Format date for API responses
const formatDate = (date) => {
  return new Date(date).toISOString();
};

// Paginate results
const paginate = (page = 1, limit = 10, maxLimit = 100) => {
  const pageNum = Math.max(1, parseInt(page) || 1);
  const limitNum = Math.min(Math.max(1, parseInt(limit) || 10), maxLimit);
  const offset = (pageNum - 1) * limitNum;
  return { offset, limit: limitNum, page: pageNum };
};

// Success response
const successResponse = (data, message = 'Succès') => {
  return { success: true, message, data };
};

// Error response
const errorResponse = (message, code = 500) => {
  return { success: false, message, code };
};

// Calculate pagination metadata
const paginationMeta = (count, page, limit) => {
  const totalPages = Math.ceil(count / limit);
  return {
    total: count,
    page: page,
    limit: limit,
    totalPages: totalPages,
    hasNextPage: page < totalPages,
    hasPreviousPage: page > 1,
  };
};

module.exports = {
  generateSlug,
  formatDate,
  paginate,
  successResponse,
  errorResponse,
  paginationMeta,
};
