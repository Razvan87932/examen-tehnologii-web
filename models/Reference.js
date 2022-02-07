const { Model, DataTypes } = require("sequelize");

// Definirea celei de-a doua entitati
// entitatea Reference
module.exports = (sequelize, DataTypes) => {
    class Reference extends Model {
        static associate(models) {
            // definirea relatiei dintre cele doua entitati - one to many
            models.Reference.belongsTo(models.Article, {
                // o referinta apartine unui articol
                foreignKey: "articleId",
            });
        }
    }
    Reference.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            title: DataTypes.STRING,
            date: DataTypes.DATE,
            authors: DataTypes.STRING,
            articleId: DataTypes.INTEGER
        },
        {
            sequelize,
            modelName: "Reference",
        }
    );
    return Reference;
};
