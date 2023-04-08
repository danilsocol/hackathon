import {Factory} from "../models/Factory.js";
import {Place} from "../models/Place.js";
import {Truck} from "../models/Truck.js";
import {Metal} from "../models/Metal.js";
import {MetalTruck} from "../models/MetalTruck.js";
import {sequelize} from "../models/exports.js";

export const acceptData = async (req,res) =>{

    const arr = req.body

        for(let i = 0; i < arr.length; i++) { //TODO  выводить ошибку сделать роллбек
            const metal =  await Metal.findOne( {where: {name: arr[i].metal }}) // Продукция поменять
            const place = await Place.findOne({where: {
                    name: arr[i].checkpoint_number,
                    factory_id: arr[i].factory_id}})

            const truck = await Truck.create({
                pass_number: arr[i].pass_number,
                car_number: arr[i].car_number,
                full_name_driver: arr[i].full_name_driver,
                recipient_organization: arr[i].recipient_organization,
                checkpoint_id: place.dataValues.id,
                type_production_volume: arr[i].type_production_volume,
                production_volume: arr[i].production_volume,
                factory_id: arr[i].factory_id})

            const metal_truck = await MetalTruck.create({
                factory_id: arr[i].factory_id,
                metal_id: metal.dataValues.id,
                truck_id: truck.dataValues.id
            })

       }
          return res.json()
}