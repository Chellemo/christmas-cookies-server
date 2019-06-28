module.exports = (sequelize, DataTypes) => {
    return sequelize.define('cookie', {

        cookiename: {
            type: DataTypes.STRING,
            allowNull: false
        },
        owner_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        ingredients: {
            type: DataTypes.STRING,
            allowNull: false
        },
        instructions: {
            type: DataTypes.STRING,
            allowNull: false
        },
        submittedby: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })
}