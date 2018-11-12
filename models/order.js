module.exports = function(sequelize, DataTypes) {
  const Order = sequelize.define('Order', {
    jobComplete: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'Pending'
    },
    jobDescription: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    laborCost: {
      type: DataTypes.DECIMAL,
      allowNull: false
    }
  });

  Order.associate = function(models) {
    // Order.belongsTo(models.User, {
    //   foreignKey: {
    //     allowNull: false
    //   }
    // });

    Order.belongsTo(models.User, { as: 'technicianId', foreignKey: 'UserId'});
    Order.belongsTo(models.User, { as: 'userId', foreignKey: 'UserId'});

    //belongs to product
  };

  return Order;
};