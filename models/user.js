
module.exports = (sequelize, DataTypes) => {
return sequelize.define('user', {
        
        firstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            }
        },
        passwordhash: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    });
}
