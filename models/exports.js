import {DataTypes, Model, Sequelize} from "sequelize";

export const sequelize = new Sequelize('test-db', '', '', {
    dialect: 'sqlite',
    storage: './database/database.sqlite',
});

export const jwtSecret = process.env.JWT_SECRET || "73dabcf6-cb99-4455-b864-26cf31f101f0"
/*

export class Role extends Model{}
export class Factory extends Model{}
export class User extends Model{}
export class Metal extends Model{}
export class Truck extends Model{}
export class Metal_Truck extends Model{}

export async function Init(){
    Factory = sequelize.define('Factory', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
    }, {
        timestamps: false,
        tableName: 'Factory',
        sequelize,
    })

    Truck = sequelize.define('Truck', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        pass_number: {
            type: DataTypes.STRING,
            allowNull: false
        },
        car_number: {
            type: DataTypes.STRING,
            allowNull: false
        },
        full_name_driver: {
            type: DataTypes.STRING,
            allowNull: false
        },
        recipient_organization: {
            type: DataTypes.STRING,
            allowNull: false
        },
        checkpoint_number: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        type_production_volume: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        production_volume: {
            type: DataTypes.DOUBLE,
            allowNull: false
        },
        factory_id: {
            type: DataTypes.INTEGER,
            references: {
                model: Factory,
                key: 'id'
            }
        }
    }, {
        timestamps: false,
        tableName: 'Truck',
        sequelize
    })

    Metal = sequelize.define('Metal', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        factory_id: {
            type: DataTypes.INTEGER,
            references: {
                model: Factory,
                key: 'id'
            }
        }
    }, {
        timestamps: false,
        tableName: 'Metal',
        sequelize
    })

    Metal_Truck = sequelize.define('Metal_Truck', {
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
        },
        factory_id: {
            type: DataTypes.INTEGER,
            references: {
                model: Factory,
                key: 'id'
            }
        }
    }, {
        timestamps: false,
        tableName: 'Metal-Truck',
        sequelize
    })

    Role = sequelize.define('Role', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
    }, {
        timestamps: false,
        tableName: 'Role',
        sequelize
    })

    User = sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        full_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        login: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        mail: {
            type: DataTypes.STRING,
            allowNull: false
        },
        role_id: {
            type: DataTypes.INTEGER,
            references: {
                model: Role,
                key: 'id'
            }
        },
        factory_id: {
            type: DataTypes.INTEGER,
            references: {
                model: Factory,
                key: 'id'
            }
        }
    }, {
        timestamps: false,
        tableName: 'User',
        sequelize
    })
}
*/
