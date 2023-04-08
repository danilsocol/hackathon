import express from "express"
import { sequelize} from "./models/exports.js";
import * as AuthController from "./controllers/AuthController.js";
import {Factory} from "./models/Factory.js";
import {Role} from "./models/Role.js";
import {Place} from "./models/Place.js";
import {User} from "./models/User.js";



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
    await Role.create({ id: 1,  name: "admin"})
    await Place.create({ id: 1,  name: "КПП 1", type: "КПП",factory_id: 1})
    await User.create({id: 2, full_name: "Timur", login: "Timur", password: "123456789", mail: "Timur@mail.ru",role_id: 1,
        factory_id: 1})
})



await sequelize.sync({force:true});

app.post("/auth",  AuthController.authorization);
app.listen(PORT, () => console.log(`good`));
