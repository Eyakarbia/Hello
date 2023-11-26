import { Sequelize } from "sequelize";
const { DataTypes } = Sequelize;
import db from "../config/Database.js";
import { v4 as uuidv4 } from 'uuid';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import createcrud from "../models/crud.js"
import crud from "../models/crud.js";

const Crud = createcrud(db, DataTypes); // Use a capitalized name for the model
//add
export const add = async (req, res) => {
    const { firstName, lastName, email, password, catg, etablissment, dateOfBirth, phoneNumber } = req.body;

    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);

    try {
        const createdCrud = await Crud.create({ // Use a different variable name
            firstName,
            lastName,
            email,
            password: hashPassword,
            catg,
            etablissment,
            dateOfBirth,
            phoneNumber,
            encrypted_id: uuidv4()
        });

        res.json({ msg: "Added", crud: createdCrud }); // Respond with the created entry
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Internal server error" });
    } 

    
};
//getone
export const getOne = async (req, res) => {
    let encrypted_id = req.params.encrypted_id;
    try {
        let result = await Crud.findOne({ where: { encrypted_id: encrypted_id } });
        res.status(200).send(result);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Internal server error' });
    }
}; 
//update
export const update = async (req, res) => {
    try {
        const encrypted_id = req.params.encrypted_id;
        const password = req.body.password;
        const salt = await bcrypt.genSalt();
        const hashPassword = await bcrypt.hash(password, salt);

        const updatedCrud = await Crud.update({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hashPassword,
            catg: req.body.catg,
            etablissment: req.body.etablissment,
            dateOfBirth: req.body.dateOfBirth,
            phoneNumber: req.body.phoneNumber,
        }, { where: { encrypted_id: encrypted_id } });

        res.status(200).send(updatedCrud);
    } catch (error) {
        console.error(error);
        return res.status(404).json({ msg: "Problem" });
    }
};
export const deleteCrud = async (req, res) => {
    try {
        const encrypted_id = req.params.encrypted_id;

        const deletedCrud = await Crud.destroy({ where: { encrypted_id: encrypted_id } });

        if (deletedCrud === 1) {
            res.status(200).send('Entry is deleted!');
        } else {
            res.status(404).send('Entry not found or could not be deleted.');
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: 'Internal server error' });
    }
};
