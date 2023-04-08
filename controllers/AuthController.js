import {ValidationError} from "sequelize";
import jwt  from "jsonwebtoken"
import {Factory} from "../models/Factory.js";
import {Role} from "../models/Role.js";
import {Place} from "../models/Place.js";
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

export const logout = async (req,res) =>{
    const {user_id}  = req.body

    const place = await Place.findAll(user_id)
    for (let i = 0 ; i<place.length;i++)
        place[i].user_id = null

    //todo убить токе и что то вернуть
}