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
                id: user.id
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
    console.log(decoded)
    const user = await User.findByPk(decoded.id)

    res.json(user).status(200)
}

export const allUser = async (req,res) => {
    const {factory_id} = req.query

    const user = await User.findAll({where:{factory_id:factory_id}})
    res.json(user).status(200)
}


export const logout = async (req,res) =>{

    const {token} = (req.headers.authorization || '').replace(/Bearer\s?/, '');
    const {user_id}  = req.body


    const decoded = jwt.verify(token, 'secret')
    const place = await Place.findAll({where: {user_id: decoded.id}})
    for (let i = 0 ; i<place.length;i++)
        place[i].user_id = null

    res.status(200)
}