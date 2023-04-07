import { Sequelize, DataTypes } from 'sequelize';

const sequelize = new Sequelize('sqlite::memory:');
const Metal = sequelize.define('Metal', { id: DataTypes.INTEGER });
const Truck = sequelize.define('Truck', { id: DataTypes.INTEGER });


const Metal_Truck = sequelize.define('Metal_Truck', {
    metal_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Metal,
            key: 'id'
        }
    },
    truck_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Truck,
            key: 'id'
        }
    }
}, {
});
