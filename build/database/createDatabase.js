"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("./db"));
// async function CreateDb() {
//     try {
//         const [rows,fields] = await pool.query('Create DATABASE BATSMANINFO ');
//         console.log('Users:', rows);
//         console.log("Fields",fields);
//     } catch (error) {
//       console.error('Error executing query:', error);
//     }
//   }
//      const useDb=async()=>{
//         const [rows]=await pool.query('USE  BATSMANINFO ')
//         return rows;
//      }
// async function createTableBatsmanData() {
//     try{
//         const[rows,fields]=await pool.query('Create TABLE batsmanData ( id INT AUTO_INCREMENT PRIMARY KEY,firstName varchar(255),lastName varchar(255), age INT NOT NULL ,created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP)')
//         console.log("Table batsmanData created");
//         console.log(rows);
//     }catch(error){
//         console.log("Error executingnthe query",error);
//     }
// }
function createTableBatsmanStats() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const [rows] = yield db_1.default.query('Create Table batsmanStats (batsman_id INT PRIMARY KEY,runs INT ,highestScore INT,average FLOAT,strikeRate FLOAT,hundreds INT,fiftys INT,created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP , FOREIGN KEY (batsman_id) references batsmanData (id) on DELETE CASCADE) ');
            // return rows;
            console.log(rows);
        }
        catch (error) {
            console.log("Error executingnthe query", error);
        }
    });
}
//   useDb()
// createTableBatsmanData()
createTableBatsmanStats();
