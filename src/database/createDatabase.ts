import pool from "./db";
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

async function createTableBatsmanStats(){
  try {
    const [rows]=await pool.query('Create Table batsmanStats (batsman_id INT PRIMARY KEY,runs INT ,highestScore INT,average FLOAT,strikeRate FLOAT,hundreds INT,fiftys INT,created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP , FOREIGN KEY (batsman_id) references batsmanData (id) on DELETE CASCADE) ');
    // return rows;
    console.log(rows);
  } catch (error) {
    console.log("Error executingnthe query",error);
    
  }
    
  
}
//   useDb()
// createTableBatsmanData()
createTableBatsmanStats();