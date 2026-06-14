module.exports = (sequelize, DataTypes) => {
  const NewsArticle = sequelize.define('NewsArticle', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false },
    slug: { type: DataTypes.STRING, allowNull: false, unique: true },
    excerpt: { type: DataTypes.TEXT },
    content: { type: DataTypes.TEXT, allowNull: false },
    image: { type: DataTypes.STRING },
    isPublished: { type: DataTypes.BOOLEAN, defaultValue: false },
    publishedAt: { type: DataTypes.DATE },
  }, {
    tableName: 'news_articles',
  });
  return NewsArticle;
};
