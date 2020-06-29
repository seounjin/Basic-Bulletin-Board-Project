
const pool = require('../config/pool');

async function Page(pNum,currentPage,maxComment, countSql, dataSql){
    
    const conn = await pool.getConnection();

    try {
        
        await conn.beginTransaction();

        const [count] = await conn.query(countSql);

        const [data] = await conn.query(dataSql, [(currentPage - 1) * maxComment, maxComment]);

        const Count = {
                count : count[0].cnt
        }       

        await conn.commit();

        conn.release();

        return {success: true , data, Count };
    
    } catch (err) {

        conn.rollback();

        conn.release();

        return {success: false, err };
    }

};


module.exports = { Page };
