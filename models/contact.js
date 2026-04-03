import { DataTypes } from 'sequelize';
import sequelize from '../config/dbconfig.js';

const ContactModel = sequelize.define('contacts', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false },
    subject: { type: DataTypes.STRING, allowNull: false },
    message: { type: DataTypes.TEXT, allowNull: false },
    userType: { type: DataTypes.STRING, defaultValue: 'User' } // 'User' or 'Developer'
}, { timestamps: true });

export default ContactModel;