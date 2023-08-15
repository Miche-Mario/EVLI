import Students from "../models/UsersModels.js"
import argon2 from "argon2"
import Users from "../models/UsersModels.js"

export const getUsers = async(req,res) => {
    try {
        const response = await Users.findAll({
            attributes: ['uuid', 'name', 'username', 'password', 'role']
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const getUserById = async(req,res) => {
    try {
        const response = await Users.findOne({
            attributes: ['uuid', 'name', 'username', 'role', 'password'],
            where: {
                uuid: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}
export const createUser = async(req,res) => {
    const {name, username, password, role} = req.body;
    const hashPassword = await argon2.hash(password)
    try {
        await Users.create({
            name: name,
            username: username,
            password: hashPassword,
            role: role
        });
        res.status(201).json({msg: "User Successfully created"});
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
}
export const updateUser = async(req,res) => {
    const user = await Users.findOne({
        where: {
            uuid: req.params.id
        }
    });
    if(!user) return res.status(404).json({msg: "User doesn't not exist" });
    const {name, username, password, role} = req.body;
    let hashPassword;
    if(password === "" || password === null) {
        hashPassword = user.password
    } else{
        hashPassword = await argon2.hash(password);
    }
    
    try {
        await Users.update({
            name: name,
            username: username,
            password: hashPassword,
            role: role
        }, {
            where: {
                id: user.id
            }
        });
        res.status(200).json({msg: "User  updated"});
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
}
export const deleteUser = async(req,res) => {
    const user = await Users.findOne({
        where: {
            uuid: req.params.id
        }
    });
    if(!user) return res.status(404).json({msg: "User doesn't not exist" });
    try {
        await Users.destroy({
            where: {
                id: user.id
            }
        });
        res.status(201).json({msg: "User  Deleted"});
    } catch (error) {
        res.status(400).json({msg: error.message})
    }

}