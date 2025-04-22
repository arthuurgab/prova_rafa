import { DataTypes } from "sequelize";
import banco from "../banco.js";

// Mapeamento da model Devolucao
export default banco.define(
    'devolucao',
    {
        iddevolucao: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        idemprestimo: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        data_devolucao: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        observacao: {
            type: DataTypes.STRING,
            allowNull: true
        }
    }
);
