import { DataTypes } from "sequelize";
import banco from "../banco.js";

//mapeamento da model Livro
export default banco.define(
    'livro',
    {
        // Model attributes are defined here
        idlivro: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        titulo: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        edicao: {
            type: DataTypes.STRING(40),
            allowNull: true
        },
        paginas: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        publicacao: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        foto: {
            type: DataTypes.STRING,
            allowNull: true
        },
        localizacao: {
            type: DataTypes.STRING,
            allowNull: true
        },
        resumo: {
            type: DataTypes.STRING,
            allowNull: true
        },
        ativo: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },
        condicaofisica: {
            type: DataTypes.STRING,
            allowNull: true
        },
        emprestado: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },
        ideditora: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        idcategoria: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }
);