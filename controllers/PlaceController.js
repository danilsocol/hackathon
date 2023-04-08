import {Place} from "../models/Place.js";

export const getAllFreePlace = async (req,res) => {
    const {typePlace , factory_id} = req.query

    const allFreePlace = await Place.findAll({where: {
            type: typePlace,
            factory_id: factory_id,
            occupied: true
        }})

    res.json(allFreePlace)
}

export const finalWorkInPlace = async (req,res) =>{ //todo тип запроса
    const {place_id}  = req.body

    const place = await Place.findByPk(place_id)
    place.user_id = null
    await place.save()
}

export const startWorkInPlace = async (req,res) =>{ //todo тип запроса
    const {place_id,user_id}  = req.body

    const place = await Place.findByPk(place_id)
    place.user_id = user_id
    await place.save()
}
