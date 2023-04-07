import {ValidationError} from "sequelize";
import jwt  from "jsonwebtoken"
import {Factory} from "../models/Factory.js";
import {Role} from "../models/Role.js";
import {User} from "../models/User.js";

export const authorization = async (req,res) => {

    const {login,password} = req.body

    let user
    try{
        user = await User.findOne({ where: {
                login: login,
            } })
    }
    catch (e){
        console.log('Error:', e);
    }

    if(!user){
        throw new ValidationError("Пользователь не найден");
    }
    else if(user.password !== password) {
        throw new ValidationError("Неверный Пароль");
    }
    else{
        console.log(2)
        const JWTToken = jwt.sign(
            {
                email: user.email,
                _id: user._id
            },
            "secret",
            {
                expiresIn: "30d"
            }
        );
        return res.status(200).json({
            success: "Welcome to the JWT Auth",
            token: JWTToken
        });

    }

}
/*
export const getUsers = async (req,res) => {

    const user = await Test.findOne({where: {id: 1}});
    if(!user) {
        console.log("Nine!")
    }
    console.log(user)
}*/
