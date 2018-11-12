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
      foreignKey: {
        allowNull: false,
      }
    });
    Review.belongsTo(models.Technician, {
      foreignKey: {
        allowNull: false,
      }
    });
  };

  return Review;
};