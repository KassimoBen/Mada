module.exports = (sequelize, DataTypes) => {
  const OfferImage = sequelize.define('OfferImage', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    url: { type: DataTypes.STRING, allowNull: false },
    alt: { type: DataTypes.STRING },
    isPrimary: { type: DataTypes.BOOLEAN, defaultValue: false },
  }, {
    tableName: 'offer_images',
  });
  return OfferImage;
};
