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

    Order.belongsTo(models.User, {
      as: 'technician',
      foreignKey: 'technician_id'
    });
    Order.belongsTo(models.User, {
      as: 'customer',
      foreignKey: 'customer_id'
    });

    //belongs to product
  };

  return Order;
};