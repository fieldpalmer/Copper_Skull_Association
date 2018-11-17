module.exports = function(sequelize, DataTypes) {
  const Quote = sequelize.define('Review', {
    carMake: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    carModel: {
      type: DataTypes.STRING,
      allowNull: false
    },
    carYear: {
      type: DataTypes.STRING,
      allowNull: false
    },
    quoteAmt: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isNumeric: true
      } 
    },
    oilType: {
      type: DataTypes.STRING
    },
    oilAmount: {
      type: DataTypes.STRING
    }
  });
  return Quote;
};