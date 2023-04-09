import express from "express"
import { sequelize} from "./models/exports.js";
import * as AuthController from "./controllers/AuthController.js";
import * as DataController from "./controllers/DataController.js"
import {Factory} from "./models/Factory.js";
import {Role} from "./models/Role.js";
import {Place} from "./models/Place.js";
import {User} from "./models/User.js";
import {Metal} from "./models/Metal.js";
import * as PlaceController from "./controllers/PlaceController.js";
import cors from 'cors'
import checkAuth from "./utils/checkAuth.js";
import {StatusTruck} from "./models/StatusTruck.js";
import {getAllArrivedTruck} from "./controllers/TruckController.js";
import * as TruckController from "./controllers/TruckController.js";
import {Truck} from "./models/Truck.js";
import {allUser} from "./controllers/AuthController.js";
import {MetalTruck} from "./models/MetalTruck.js";

const PORT =  process.env.PORT || 3001;
const app = express();

app.use(express.json());



app.use(cors())



try {
    await sequelize.authenticate();
    console.log('Соединение с БД было успешно установлено');
} catch (e) {
    console.log('Невозможно выполнить подключение к БД: ', e);
}


/*Init()*/
/*
console.log(Test)
console.log(User)*/
/*sequelize.sync({ force: true }).then(async () => {
    await Factory.create({ id: 1,  name: "ЧЦЗ"})
    await Metal.create({id: 1, name: "product",factory_id:1})
    await Metal.create({id: 2, name: "ЦИНК ЦВ0 ПАКЕТ",factory_id:1})
    await Metal.create({id: 3, name: "КЛИНКЕР",factory_id:1})
    await Metal.create({id: 4, name: "СПЛАВ ЦА04 БЛОК 1Т",factory_id:1})
    await Metal.create({id: 5, name: "СПЛАВ ЦА06 БЛОК 1Т",factory_id:1})
    await Metal.create({id: 6, name: "СПЛАВ ЦА08 БЛОК 1Т",factory_id:1})
    await Metal.create({id: 7, name: "КАДМИЙ КД0",factory_id:1})
    await Role.create({ id: 1,  name: "admin"})
    await Role.create({ id: 2,  name: "guard"})
    await Role.create({ id: 3,  name: "storekeeper"})
    await Place.create({ id: 1,  name: "КПП 6", type: "checkpoint",factory_id: 1})
    await Place.create({ id: 2,  name: "КПП 7", type: "checkpoint",factory_id: 1})
 await Place.create({ id: 5,  name: "Южные ворота", type: "gate",factory_id: 1})
    await Place.create({ id: 6,  name: "ЗАпаднык ворота", type: "gate",factory_id: 1})
    await Place.create({ id: 3,  name: "Северные ворота", type: "gate",factory_id: 1})
    await Place.create({ id: 4,  name: "КПП № 6", type: "checkpoint",factory_id: 1})
    await User.create({id: 1, full_name: "Timur", login: "Timur", password: "12345", mail: "Timur@mail.ru",role_id: 1,
        factory_id: 1})
        await User.create({id: 2, full_name: "Danil", login: "Danil", password: "12345", mail: "Timur@mail.ru",role_id: 2,
        factory_id: 1})
        await User.create({id: 3, full_name: "Slava", login: "Slava", password: "12345", mail: "Timur@mail.ru",role_id: 3,
        factory_id: 1})
})*/
/*await Role.create({ id: 2,  name: "guard"})
await Role.create({ id: 3,  name: "storekeeper"})*/

await MetalTruck.belongsTo(Truck)
await Truck.hasMany(MetalTruck);
await MetalTruck.belongsTo(Metal)
await Metal.hasMany(MetalTruck);
await sequelize.sync();
/*await TruckController.test()*/

app.post("/place/start", checkAuth, PlaceController.startWorkInPlace);
app.post("/place/final", checkAuth, PlaceController.finalWorkInPlace);
app.get("/place/", checkAuth, PlaceController.getAllFreePlace);
app.get("/truck/all/arrived", checkAuth, TruckController.getAllArrivedTruck)
app.get("/truck/all/noarrived", checkAuth, TruckController.getAllNoArrivedTruck)
app.post("/truck/arrived", checkAuth, TruckController.arrivedTruck)
app.post("/truck/blocked", checkAuth, TruckController.blockedTruck)
app.post("/truck/delete", checkAuth, TruckController.deleteTruck)
app.post("/truck/unblocked", checkAuth, TruckController.unblockedTruck)
app.post("/auth/login",  AuthController.authorization);
app.get("/auth/user/me", checkAuth,  AuthController.userMe);
app.get("/auth/user/all", checkAuth,  AuthController.allUser);
app.post("/auth/logout",  checkAuth, AuthController.logout);
app.post("/data/post",  checkAuth, DataController.postData);
app.listen(PORT, () => console.log(`good`));
