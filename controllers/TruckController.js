import {Truck} from "../models/Truck.js";
import {MetalTruck} from "../models/MetalTruck.js";
import {Metal} from "../models/Metal.js";


export const arrivedTruck =async (req,res) => {
    const {truck_id} = req.body

    const truck = await Truck.findByPk(truck_id)
    truck.isArrived = true
    await truck.save()
    return res.json("good").status(200)
}


export const blockedTruck =async (req,res) => { // todo посмотреть как принимаю


    console.log(req.body.blocked_car)

    for (let i = 0; i < req.body.blocked_car.length; i++){
        const truck = await Truck.findByPk(req.body.blocked_car[i].id)
        truck.isBlock = true
        await truck.save()
    }
    return res.json("good").status(200)
}

export const unblockedTruck =async (req,res) => { // todo посмотреть как принимаю
    const {truck_id} = req.body


        const truck = await Truck.findByPk(truck_id)
        truck.isBlock = false
        await truck.save()
    return res.json("good").status(200)
    }

export const deleteTruck =async (req,res) => {
    const {truck_id} = req.body

   /* const statusTruck = await Truck.findOne({where:{truck_id: truck_id}})
    await statusTruck.delete()*/

    const metalTruck = await MetalTruck.findAll({where: {truck_id: truck_id }})
    for (let truck in metalTruck){
        await truck.delete()
    }

    const truck = await Truck.findByPk(truck_id)
    await truck.delete()
    return res.json("good").status(200)
}

export const getAllArrivedTruck = async (req,res) => {
    const {factory_id} = req.query

    /*   const pass_trucks = await Truck.findAll({group: 'pass_number'})
       for (let i =0;i< pass_trucks.length; i++){
           console.log(pass_trucks[i].dataValues.pass_number)
       }*/


    const trucks = await Truck.findAll({
        where: {
            factory_id: 1,
            isArrived: true,
            isBlock: false
        }, include: [{
            model: MetalTruck,
            required: true,
        }],

    })
    return res.json(trucks).status(200)
}

export const test = async (req,res) => {
    const pass_trucks = await Truck.findAll({where:{                isArrived: true,
            isBlock: false}
    ,group: 'pass_number'})
  /*  for (let i =0;i< pass_trucks.length; i++){
        console.log(pass_trucks[i].dataValues.pass_number)
    }*/
   /* console.log(pass_trucks)
    let metallist = {}*/
    for(let i =0;i<pass_trucks.length;i++){
        console.log(11111111111)
        console.log(pass_trucks[i].dataValues.pass_truck)
        const metals = await Truck.findAll({where: {
                pass_truck: pass_trucks[i].dataValues.pass_truck,
                isArrived: true,
                isBlock: false
        }, include: [{
            model: MetalTruck,
            required: true,
        }],})
        console.log(metals)
       let namelistmetal = {}
        for(let j =0; j< metals.length;j++){
            let temp = metals[j].MetalTruck.dataValues.MetalId
            const me = Metal.findByPk(temp)
            console.log(3)
            namelistmetal[j] = me.name
        }

        console.log(2)
        metallist[pass_trucks[i].dataValues.pass_number] = namelistmetal

    }
    console.log(metallist)
}

export const getAllNoArrivedTruck = async (req,res) => {
    const {factory_id} = req.query

    const trucks = await Truck.findAll({
        where:{
            factory_id: factory_id,
            isArrived: false,
            isBlock: false
        }
    })

    return res.json(trucks).status(200)
}