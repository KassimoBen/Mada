module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    rating: { type: DataTypes.INTEGER, allowNull: false, validate: { min: 1, max: 5 } },
    comment: { type: DataTypes.TEXT },
    isApproved: { type: DataTypes.BOOLEAN, defaultValue: false },
  }, {
    tableName: 'reviews',
  });
  return Review;
};
