import Sequelize from 'sequelize';
import { db } from '../lib/db';

// Model definition for all required table
// const ModelName = db.define('tableName', {
//     columnName: {type: Sequelize.Type(length), options}
// }, { freezeTableName: boolean, timestamps: boolean});
const UserModel = db.define('users', {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    role_id: { type: Sequelize.INTEGER, foreignKey: true, NULL: false },
    employee_id: { type: Sequelize.INTEGER, foreignKey: true, NULL: false },
    company_id: { type: Sequelize.INTEGER, foreignKey: true, NULL: false },
    username: { type: Sequelize.STRING },
    password: { type: Sequelize.STRING },
    last_login: { type: Sequelize.DATE },
    is_logged: { type: Sequelize.BOOLEAN },
    is_active: { type: Sequelize.BOOLEAN },
    is_deleted: { type: Sequelize.BOOLEAN },
    created_by: { type: Sequelize.INTEGER },
    updated_by: { type: Sequelize.INTEGER }
}, { freezeTableName: true, timestamps: true, underscored: true });

const RoleModel = db.define('role', {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: Sequelize.STRING },
    is_active: { type: Sequelize.BOOLEAN },
    is_deleted: { type: Sequelize.BOOLEAN },
    created_by: { type: Sequelize.INTEGER },
    updated_by: { type: Sequelize.INTEGER }
}, { freezeTableName: true, timestamps: true });

const EndpointModel = db.define('endpoint', {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    role_id: { type: Sequelize.INTEGER, foreignKey: true },
    path: { type: Sequelize.STRING },
    method: { type: Sequelize.STRING },
    can_access: { type: Sequelize.BOOLEAN }
}, { freezeTableName: true, timestamps: false, underscored: true });

const CompanyModel = db.define('company', {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: Sequelize.STRING },
    address: { type: Sequelize.STRING },
    phone_number: { type: Sequelize.STRING },
    fax_number: { type: Sequelize.STRING },
    note: { type: Sequelize.STRING },
    is_deleted: { type: Sequelize.BOOLEAN },
    created_by: { type: Sequelize.INTEGER },
    updated_by: { type: Sequelize.INTEGER }
}, { freezeTableName: true, timestamps: true, underscored: true});

const EmployeeModel = db.define('employee', {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    company_id: { type: Sequelize.INTEGER, foreignKey: true },
    id_number: { type: Sequelize.STRING },
    name: { type: Sequelize.STRING },
    birth_place: { type: Sequelize.STRING },
    birth_date: { type: Sequelize.DATEONLY },
    gender: { type: Sequelize.STRING },
    address: { type: Sequelize.STRING },
    phone_number: { type: Sequelize.STRING },
    email: { type: Sequelize.STRING },
    note: { type: Sequelize.STRING },
    is_active: { type: Sequelize.BOOLEAN },
    is_deleted: { type: Sequelize.BOOLEAN },
    created_by: { type: Sequelize.INTEGER },
    updated_by: { type: Sequelize.INTEGER }
}, { freezeTableName: true, timestamps: true, underscored: true });

db.sync();

// Model Relation
// Model1.belongsTo(Model2, {foreignKey: 'columnName'});
UserModel.belongsTo(RoleModel);
UserModel.belongsTo(EmployeeModel);
UserModel.belongsTo(CompanyModel);
EmployeeModel.belongsTo(CompanyModel);
CompanyModel.hasMany(EmployeeModel);
CompanyModel.hasMany(UserModel);


// Export defined models
const Users = db.models.users;
const Role = db.models.role;
const Endpoint = db.models.endpoint;
const Company = db.models.company;
const Employee = db.models.employee;
export {
    Users,
    Role,
    Endpoint,
    Company,
    Employee
};

// /**
//  * Function to get last id from intended table
//  * @param modelName Model name where id needed
//  * @param sortingRow Intended row in selected model
//  */
// import { functionLogger } from '../lib';

// export async function getLastID(modelName: any, sortingRow: any) {
//     functionLogger.debug(`Model: ${modelName}, Row: ${sortingRow}`);

//     // search all data in selected table and sort it by selected row
//     let result = await modelName.findOne({ order: [[sortingRow, 'DESC']], limit: 1, raw: true });

//     // if no result/table is empty, return 0 as current id
//     if ( result == null ) {
//         result = {
//             [sortingRow]: '0'
//         };
//     }

//     // return current id
//     functionLogger.debug('Current Id: ' + result[sortingRow]);
//     return result[sortingRow];
// }