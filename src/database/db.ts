import mysql, { createConnection } from 'mysql2/promise'
import dotenv from  'dotenv'

dotenv.config();

console.log(process.env.host);

  const pool = mysql.createPool({
    host:process.env.host,
    user: process.env.user, 
    password:process.env.password,  
    database:process.env.database     
  });


  export default pool
