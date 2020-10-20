exports.data = function(req, res) {
        var authorization = req.headers.authorization;
        var token_array = authorization.split(' ');
        var token = token_array[1];
        const jwt = require('jsonwebtoken');
        const secret = 'yooyoung';
        
        console.log('GET Profile API Start~');
        try {
            var id = jwt.verify(token, secret);

            if(id === 'admin'){
                return res.json({
                    emp_cd: 'admin', emp_nm: '시스템관리자', dept_cd: '10050000', dept_nm: '전산팀'	
                })
            }

            var query     = 'SELECT A.ID AS emp_cd, B.EMP_NM AS emp_nm, C.DEPT_CD AS dept_cd, C.DEPT_NM AS dept_nm ' ;
            query = query + 'FROM DASH_TOKEN A ';
            query = query + 'LEFT JOIN CM004M01 B ON A.ID = B.EMP_CD ';
            query = query + 'LEFT JOIN CM003M01 C ON B.DEPT_CD = C.DEPT_CD ';
            query = query + 'WHERE A.ID = @ID ';

            
            return global.pool.request()
            .input('ID',id)
            .query(query)
            .then(result => {
                if(result.recordset.length == 0){
                    res.status(401).json({ message: 'Not user' })    
                }
                else{
                    res.json(result.recordset[0])
                }
            })
            .catch(err => {
                res.status(401).json({ message: 'DASH_TOKEN SQL ERROR' })
            })
        }catch(err){
            res.sendStatus(403);
        }
};