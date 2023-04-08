import {Place} from "../models/Place.js";


export const getAllFreePlace = async (req,res) => {
    const {typePlace: type_place , factory_id} = req.query

    const allFreePlace = await Place.findAll({where: {
            type: type_place,
            factory_id: factory_id,
            user_id: null
        }})

    res.json(allFreePlace)
}


export const finalWorkInPlace = async (req,res) =>{ //todo тип запроса
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');
    const {place_id}  = req.body

    const place = await Place.findByPk(place_id)
    place.user_id = null
    await place.save()
}

export const startWorkInPlace = async (req,res) =>{ //todo тип запроса
    const {place_id,user_id}  = req.body

    const place = await Place.findByPk(place_id)
    if(place.user_id !== null)
        return res.json("Объект занят")
    place.user_id = user_id
    await place.save()
}
