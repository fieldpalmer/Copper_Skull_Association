module.exports = function(sequelize, DataTypes) {

  const Order = sequelize.define('Order', {
    jobComplete: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    carMake: {
      type: DataTypes.STRING,
      allowNull: false
    },
    carModel: {
      type: DataTypes.STRING,
      allowNull: false
    },
    carYear: {
      type: DataTypes.STRING,
      allowNull: false
    },
    laborCost: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    time: {
      type: DataTypes.STRING,
      allowNull: false
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    oilType: DataTypes.STRING,
    oilAmount: DataTypes.STRING,
    service: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Oil Change"
    },
    reviewed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
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