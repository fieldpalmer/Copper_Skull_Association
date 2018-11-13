module.exports = function(sequelize, DataTypes) {
  const Review = sequelize.define('Review', {
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isNumeric: true,
        min: 1,
        max: 5
      }
    },
    reviewText: {
      type: DataTypes.TEXT
    }
  });

  Review.associate = function(models) {
    Review.belongsTo(models.User, {
      as: 'technicianReviewed',
      foreignKey: 'technician_id'
    });
    Review.belongsTo(models.User, {
      as: 'customerAuthor',
      foreignKey: 'customer_id'
    });
  };

  return Review;
};