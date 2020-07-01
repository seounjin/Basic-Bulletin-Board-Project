
const pool = require('../config/pool');

async function Page(fromId,currentPage,maxComment, countSql, dataSql){
    
    let count = null;  
    let data =  null;

    const conn = await pool.getConnection();

    try {
        
        await conn.beginTransaction();

        if (fromId){
            [count] = await conn.query(countSql, fromId);

            //"SELECT rNum, pNum, content, fromId ,toId, date_format(date, '%y.%m.%d. %H:%i:%s') as date FROM BulletinBoard.ReportPost WHERE fromId=? order by date, date limit ?, ?";
            [data] = await conn.query( dataSql, [fromId, (currentPage - 1) * maxComment, maxComment]);
        
        } else {
            [count] = await conn.query(countSql);
            [data] = await conn.query(dataSql, [(currentPage - 1) * maxComment, maxComment]);
        }
      
        const Count = {
                count : count[0].cnt
        }       

        await conn.commit();

        conn.release();

        return {success: true , data, Count };
    
    } catch (err) {

        console.log("에러",err);

        conn.rollback();

        conn.release();

        return {success: false, err };
    }

};


module.exports = { Page };
