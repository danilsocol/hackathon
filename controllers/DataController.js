import {Factory} from "../models/Factory.js";
import {Place} from "../models/Place.js";
import {Truck} from "../models/Truck.js";
import {Metal} from "../models/Metal.js";
import {MetalTruck} from "../models/MetalTruck.js";
import {sequelize} from "../models/exports.js";

let transaction ;
let count = 0

let currentlyAdminId = null
export const postData = async (req,res) =>{

    let {arr,adminId,final,ex} = req.body

    if(currentlyAdminId === null){
        transaction = await sequelize.transaction()
        currentlyAdminId = adminId
    }
    else if(currentlyAdminId !== adminId){
        return res.json("плохо").status(405)
    }

    let listError = {}

    for(let i = 0; i < arr.length; i++) { //TODO  выводить ошибку сделать роллбек
        let countError = 0
        let list = {}

        const metal =  await Metal.findOne( {where: {name: arr[i].metal }})
        const place = await Place.findOne({where: {
                name: arr[i].checkpoint_id,
                factory_id: arr[i].factory_id}})
        console.log(metal)
        console.log(!metal)
        if(!metal){
            list[countError] = "Такого вида продукции не существует"
            countError++
        }
        console.log(place)
        console.log(!place)
        if(!place){
            list[countError] = "Такого КПП не существует"
            countError++
        }

        try{
            const truck = await Truck.create({
                pass_number: arr[i].pass_number,
                car_number: arr[i].car_number,
                full_name_driver: arr[i].full_name_driver,
                recipient_organization: arr[i].recipient_organization,
                checkpoint_id: place.dataValues.id,
                type_production_volume: arr[i].type_production_volume,
                production_volume: arr[i].production_volume,
                factory_id: arr[i].factory_id},
                { transaction })

            const metal_truck = await MetalTruck.create({
                factory_id: arr[i].factory_id,
                metal_id: metal.dataValues.id,
                truck_id: truck.dataValues.id
            },{ transaction })
        }
        catch (e)
        {
            list[countError] = "Не получилось создать грузовик"
            countError++
        }

        if(countError !== 0){
            list[countError] = arr[i]
            listError[count] = list
            ex = true
            count++
        }
   }
    if(!final){
        return res.json(listError)
    }
    else if(ex){
        await transaction.rollback();

        currentlyAdminId = null
        return res.json(false)

    }
    else{
        await transaction.commit();
        currentlyAdminId = null
        return res.json(true)
    }

}

