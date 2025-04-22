import { DataTypes } from "sequelize";
import banco from "../banco.js";

//mapeamento da model Editora
export default banco.define(
    'editora',
    {
        // Model attributes are defined here
        ideditora: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        nomeeditora: {
            type: DataTypes.STRING(60),
            allowNull: false
        },
        cnpj: {
            type: DataTypes.STRING(20),
            allowNull: false
        },
        endereco: {
            type: DataTypes.TEXT,
            allowNull: true
        }
    }
);