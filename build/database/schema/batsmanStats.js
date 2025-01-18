"use strict";
// import pool from '../db';
// async function createTableBatsmanStats() {
//     try {
//         const [rows] = await pool.query(
//             'Create Table batsmanStats (batsman_id INT PRIMARY KEY,runs INT ,highestScore INT,average FLOAT,strikeRate FLOAT,hundreds INT,fiftys INT,created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP , FOREIGN KEY (batsman_id) references batsmanData (id) on DELETE CASCADE) '
//         );
//         return rows;
//         // console.log(rows);
//     } catch (error) {
//         throw new Error(`Error creating table ${error}`);
//     }
// }
// createTableBatsmanStats();
