import {ValidationError} from "sequelize";
import jwt  from "jsonwebtoken"
import {Factory} from "../models/Factory.js";
import {Role} from "../models/Role.js";
import {Place} from "../models/Place.js";
import {User} from "../models/User.js";
import {jwtSecret} from "../models/exports.js";

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
            jwtSecret,
            {
                expiresIn: "1d"
            }
        );
        return res.status(200).json({
            user,
            token: JWTToken
        });
    }
}

export const userMe = async (req,res) => {
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');

    const decoded = jwt.verify(token,jwtSecret )
    const user = User.findByPk(decoded.id)
    res.json(user)
}

export const allUser = async (req,res) => {

    const user = User.findAll()
    res.json(user)
}


export const logout = async (req,res) =>{
 /*   console.log(req.)*/

    const {token} = req.head
    const {user_id}  = req.body
    console.log(token)
    try {
        const decoded = jwt.verify(token, 'secret')
        console.log(decoded.name)
    } catch (err) {
        console.error(err)
    }

    const place = await Place.findAll(user_id)
    for (let i = 0 ; i<place.length;i++)
        place[i].user_id = null

    //todo убить токе и что то вернуть
}