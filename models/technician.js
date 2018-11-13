module.exports = function(sequelize, DataTypes) {
  const Technician = sequelize.define('Technician', {
    skills: {
      type: DataTypes.TEXT
    },
    workHistory: {
      type: DataTypes.TEXT
    }
  });

  Technician.associate = function(models) {
    Technician.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });

    Technician.hasMany(models.Certification, {
      onDelete: 'cascade'
    });
  };

  return Technician;
};