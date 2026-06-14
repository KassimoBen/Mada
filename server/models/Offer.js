module.exports = (sequelize, DataTypes) => {
  const Offer = sequelize.define('Offer', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false },
    slug: { type: DataTypes.STRING, allowNull: false, unique: true },
    description: { type: DataTypes.TEXT, allowNull: false },
    itinerary: { type: DataTypes.TEXT },
    duration: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.DECIMAL(12, 2), allowNull: false },
    originalPrice: { type: DataTypes.DECIMAL(12, 2) },
    destination: { type: DataTypes.STRING },
    maxParticipants: { type: DataTypes.INTEGER, defaultValue: 20 },
    isFeatured: { type: DataTypes.BOOLEAN, defaultValue: false },
    isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
    rating: { type: DataTypes.DECIMAL(3, 2), defaultValue: 0 },
    reviewCount: { type: DataTypes.INTEGER, defaultValue: 0 },
    included: { type: DataTypes.TEXT },
    excluded: { type: DataTypes.TEXT },
    mainImage: { type: DataTypes.STRING },
  }, {
    tableName: 'offers',
  });
  return Offer;
};
