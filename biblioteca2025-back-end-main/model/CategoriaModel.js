import { DataTypes } from "sequelize";
import banco from "../banco.js";

//mapeamento da model Autor
export default banco.define(
    'categoria',
    {
        // Model attributes are defined here
        idcategoria: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        nomecategoria: {
            type: DataTypes.STRING(60),
            allowNull: false
        }
    }
);