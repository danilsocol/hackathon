import express from "express"
import {sequelize} from "./exports.js";

const PORT =  process.env.PORT || 3001;
const app = express();

app.use(express.json());

try {
    await sequelize.authenticate();
    console.log('Соединение с БД было успешно установлено');
} catch (e) {
    console.log('Невозможно выполнить подключение к БД: ', e);
}

await sequelize.sync({force:true});

app.get("/",  );
app.listen(PORT, () => console.log(`good`));
