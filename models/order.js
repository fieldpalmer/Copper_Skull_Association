module.exports = function(sequelize, DataTypes) {
  const Order = sequelize.define('Order', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },
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
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    time: {
      type: DataTypes.TIME,
      allowNull: false
    },
    vehicle: {
      type: DataTypes.STRING,
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

    Order.hasOne(models.Vehicle, {
      onDelete: 'cascade'
    });

    //belongs to product
  };

  return Order;
};