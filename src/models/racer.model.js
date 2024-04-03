export const racerSchema = (sequelize, DataTypes) => {
  const Racer = sequelize.define("racer", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    birthdate: {
      type: DataTypes.DATEONLY,
      allowNull,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    biography: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });
  return Racer;
};
