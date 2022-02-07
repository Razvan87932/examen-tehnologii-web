const { Model, DataTypes } = require("sequelize");

// Definirea primei entitati
// entitatea articol
module.exports = (sequelize, DataTypes) => {
    class Article extends Model {
        // definirea relatiei dintre cele doua entitati - one to many
        static associate(models) {
            // un articol are mai multe referinte
            models.Article.hasMany(models.Reference);
        }
    }
    Article.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true

            },
            title: DataTypes.STRING,
            summary: DataTypes.STRING,
            creationDate: DataTypes.DATE,
        },
        {
            sequelize,
            modelName: "Article",
        }
    );
    return Article;
};
