module.exports = function(sequelize, DataTypes) {
  const Certification = sequelize.define('Certification', {
    verified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    dateAchieved: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isDate: true
      }
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  Certification.associate = function(models) {
    Certification.belongsTo(models.Technician, {
      foreignKey: {
        allowNull: false
      }
    });

    // Certification.belongsTo(models.User);
  };

  return Certification;
};