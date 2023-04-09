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
    console.log(req.body)
    console.log(truck_id)
     await MetalTruck.destroy({where: {TruckId: truck_id }})



    await Truck.destroy({where:{
            id:truck_id
        }})
   /* let truck = await Truck.findByPk(truck_id)
    console.log(truck)
    await truck.delete()*/
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
    try{


    const pass_trucks = await Truck.findAll({where:{ isArrived: true,
            isBlock: false}
    ,group: 'pass_number'})
  /*  for (let i =0;i< pass_trucks.length; i++){
        console.log(pass_trucks[i].dataValues.pass_number)
    }*/
   /* console.log(pass_trucks) */
    let metallist = {}
    for(let i =0;i<pass_trucks.length;i++){

        const metals = await Truck.findAll({where: {
                pass_number: pass_trucks[i].dataValues.pass_number,
                isArrived: true,
                isBlock: false
        }, include: [{
            model: MetalTruck,
            required: true,
        }],})

       let namelistmetal = {}
        console.log(metals)
        console.log(metals.length)
        console.log(metals[0].dataValues.MetalTrucks.MetalId)
        for(let j =0; j< metals.length;j++){
            let temp = metals[j].MetalTruck.MetalId
            const me = Metal.findByPk(temp)
            console.log(3)
            namelistmetal[j] = me.name
        }

        console.log(2)
        metallist[pass_trucks[i].dataValues.pass_number] = namelistmetal

    }
    console.log(metallist)
        return res.json("good")
    }
    catch (e){
        console.log(e)
        return res.json("nogood")
    }
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