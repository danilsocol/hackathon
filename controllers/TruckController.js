import {Truck} from "../models/Truck.js";
import {StatusTruck} from "../models/StatusTruck.js";
import {MetalTruck} from "../models/MetalTruck.js";

export const arrivedTruck =async (req,res) => {
    const {truck_id} = req.body

    const truck = await StatusTruck.findByPk(truck_id)
    truck.dataValues.isArrived = true
    await truck.save()
}

export const blockedTruck =async (req,res) => { //todo их тут может несколько
    const {truck_id} = req.body

    const truck = await StatusTruck.findByPk(truck_id)
    truck.dataValues.isBlock = true
    await truck.save()
}

export const deleteTruck =async (req,res) => {
    const {truck_id} = req.body

    const statusTruck = await StatusTruck.findOne({where:{truck_id: truck_id}})
    await statusTruck.delete()

    const metalTruck = await MetalTruck.findAll({where: {truck_id: truck_id }})
    for (let truck in metalTruck){
        await truck.delete()
    }

    const truck = await Truck.findByPk(truck_id)
    await truck.delete()
}