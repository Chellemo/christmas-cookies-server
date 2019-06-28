module.exports = (sequelize, DataTypes) => {
    return sequelize.define('cookie', {

        cookiename: {
            type: DataTypes.STRING(1234),
            allowNull: false
        },
        owner_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING(1234),
            allowNull: false
        },
        ingredients: {
            type: DataTypes.STRING(1234),
            allowNull: false
        },
        instructions: {
            type: DataTypes.STRING(1234),
            allowNull: false
        },
        submittedBy: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })
}