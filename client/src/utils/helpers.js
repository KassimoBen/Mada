// Slug generation
export const generateSlug = (text) => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 50);
};

// Format currency
export const formatCurrency = (value, currency = 'Ar') => {
  return `${parseFloat(value).toLocaleString('fr-MG')} ${currency}`;
};

// Format date
export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('fr-MG', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

// Truncate text
export const truncateText = (text, length = 100) => {
  if (text.length > length) {
    return text.substring(0, length) + '...';
  }
  return text;
};

// Validate email
export const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

// Validate phone
export const isValidPhone = (phone) => {
  return /^[\d\s\-\+\(\)]{6,}$/.test(phone);
};

// Get initials
export const getInitials = (firstName, lastName) => {
  return `${firstName?.charAt(0) || ''}${lastName?.charAt(0) || ''}`.toUpperCase();
};

// Calculate discount percentage
export const getDiscountPercentage = (originalPrice, currentPrice) => {
  if (!originalPrice) return 0;
  return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
};
