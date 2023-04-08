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
import {finalWorkInPlace} from "./controllers/PlaceController.js";



const PORT =  process.env.PORT || 3001;
const app = express();

app.use(express.json());


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
sequelize.sync({ force: true }).then(async () => {
    await Factory.create({ id: 1,  name: "ЧЦЗ"})
    await Metal.create({id: 1, name: "product",factory_id:1})
    await Role.create({ id: 1,  name: "admin"})
    await Place.create({ id: 1,  name: "КПП 6", type: "checkpoint",factory_id: 1})
    await Place.create({ id: 2,  name: "КПП 7", type: "checkpoint",factory_id: 1})
    await Place.create({ id: 3,  name: "Северные ворота", type: "gate",factory_id: 1})
    await Place.create({ id: 4,  name: "КПП 6", type: "gate",factory_id: 1})
    await User.create({id: 2, full_name: "Timur", login: "Timur", password: "123456789", mail: "Timur@mail.ru",role_id: 1,
        factory_id: 1})
})


await sequelize.sync();

app.post("/place/start",  PlaceController.startWorkInPlace);
app.post("/place/final",  PlaceController.finalWorkInPlace);
app.get("/place/",  PlaceController.getAllFreePlace);
app.post("/auth/login",  AuthController.authorization);
app.post("/auth/logout",  AuthController.logout);
app.post("/data/post",  DataController.postData);
app.post("/data/save", DataController.saveData)
app.listen(PORT, () => console.log(`good`));
