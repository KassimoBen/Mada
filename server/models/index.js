const { Sequelize, DataTypes } = require('sequelize');
const config = require('../config/database');

const sequelize = new Sequelize(config);

const User = require('./User')(sequelize, DataTypes);
const Category = require('./Category')(sequelize, DataTypes);
const Offer = require('./Offer')(sequelize, DataTypes);
const OfferImage = require('./OfferImage')(sequelize, DataTypes);
const Booking = require('./Booking')(sequelize, DataTypes);
const Review = require('./Review')(sequelize, DataTypes);
const ContactMessage = require('./ContactMessage')(sequelize, DataTypes);
const NewsArticle = require('./NewsArticle')(sequelize, DataTypes);

Category.hasMany(Offer, { foreignKey: 'category_id', as: 'offers' });
Offer.belongsTo(Category, { foreignKey: 'category_id', as: 'category' });

Offer.hasMany(OfferImage, { foreignKey: 'offer_id', as: 'images', onDelete: 'CASCADE' });
OfferImage.belongsTo(Offer, { foreignKey: 'offer_id' });

Offer.hasMany(Booking, { foreignKey: 'offer_id', as: 'bookings' });
Booking.belongsTo(Offer, { foreignKey: 'offer_id', as: 'offer' });

User.hasMany(Booking, { foreignKey: 'user_id', as: 'bookings' });
Booking.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

Offer.hasMany(Review, { foreignKey: 'offer_id', as: 'reviews' });
Review.belongsTo(Offer, { foreignKey: 'offer_id', as: 'offer' });

User.hasMany(Review, { foreignKey: 'user_id', as: 'reviews' });
Review.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

const db = {
  sequelize,
  Sequelize,
  User,
  Category,
  Offer,
  OfferImage,
  Booking,
  Review,
  ContactMessage,
  NewsArticle,
};

module.exports = db;
