var express     = require('express');
var bodyParser  = require('body-parser');               // POST 방식 전송을 위해 사용
var app         = express();
var port = process.env.PORT || 8000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// [Server Config]
global.sql = require('mssql');
global.config = require('./config.json');

// [CORS 허용 설정]
app.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Methods", "*");
    next();
});

// [ROUTER SET]
const apiRouter = express.Router();
app.use('/api', apiRouter);

sql.connect(config).then(pool => {
    global.pool = pool;
    var logout      = require('./api/logout');
    var a_authuser  = require('./api/a_authuser');
    var a_delauth   = require('./api/a_delauth');
    var a_delmenu   = require('./api/a_delmenu');
    var a_inmenu    = require('./api/a_inmenu');
    var a_selmenu   = require('./api/a_selmenu');
    var a_setauth   = require('./api/a_setauth');
    var a_upmenu    = require('./api/a_upmenu');
    var authtoken   = require('./api/authtoken');
    var dashmenu    = require('./api/dashmenu');
    var getmenu     = require('./api/getmenu');
    var getmenutree = require('./api/getmenutree');
    var getuserlist = require('./api/getuserlist');
    var profile     = require('./api/profile');

    // SELECT CODE 
    var select_code = require('./api/select_code');
    // 매출추이 API 로드
    var sales_c1 = require('./api/sales_c1');
    var sales_cc1 = require('./api/sales_cc1');
    var sales_d1 = require('./api/sales_d1');
    var sales_m1 = require('./api/sales_m1');
    var sales_m2 = require('./api/sales_m2');
    var sales_l1 = require('./api/sales_l1');
    var sales_l2 = require('./api/sales_l2');
    // 매출추이 팀 API 로드
    var tsales_l1 = require('./api/tsales_l1');
    var tsales_l2 = require('./api/tsales_l2');
    var tsales_b1 = require('./api/tsales_b1');
    var tsales_b2 = require('./api/tsales_b2');
    var tsales_b3 = require('./api/tsales_b3');
    // 입사자추이 API 로드
    var attrition_d1 = require('./api/attrition_d1');
    var attrition_s1 = require('./api/attrition_s1');
    var attrition_b1 = require('./api/attrition_b1');
    var attrition_b2 = require('./api/attrition_b2');
    var attrition_p1 = require('./api/attrition_p1');
    var attrition_p2 = require('./api/attrition_p2');
    var attrition_v1 = require('./api/attrition_v1');
    var attrition_m1 = require('./api/attrition_m1');
    // 생산지표 API 로드
    var indicators_l1 = require('./api/indicators_l1');
    var indicators_b1 = require('./api/indicators_b1');
    var indicators_b2 = require('./api/indicators_b2');
    var indicators_m1 = require('./api/indicators_m1');
    var indicators_b3 = require('./api/indicators_b3');
    var indicators_m2 = require('./api/indicators_m2');


    // Router 연결
    apiRouter.post('/api/auth/logout', logout.data);
    apiRouter.get('/a_authuser/:id', a_authuser.data);
    apiRouter.post('/a_delauth', a_delauth.data);
    apiRouter.post('/a_delmenu', a_delmenu.data);
    apiRouter.post('/a_inmenu', a_inmenu.data);
    apiRouter.get('/a_selmenu', a_selmenu.data);
    apiRouter.post('/a_setauth', a_setauth.data);
    apiRouter.post('/a_upmenu', a_upmenu.data);
    apiRouter.post('/members/auth-token', authtoken.data);
    apiRouter.get('/dashmenu/:type', dashmenu.data);
    apiRouter.get('/getmenu/:id', getmenu.data);
    apiRouter.get('/getMenutree', getmenutree.data);
    apiRouter.get('/getuserlist', getuserlist.data);
    apiRouter.get('/members/profile', profile.data);


    // SELECT CODE
    apiRouter.post('/select_code', select_code.data);
    // 매출추이 Router 연결
    apiRouter.post('/sales_c1', sales_c1.data);
    apiRouter.post('/sales_cc1', sales_cc1.data);
    apiRouter.post('/sales_d1', sales_d1.data);
    apiRouter.post('/sales_m1', sales_m1.data);
    apiRouter.post('/sales_m2', sales_m2.data);
    apiRouter.post('/sales_l1', sales_l1.data);
    apiRouter.post('/sales_l2', sales_l2.data);
    // 매출추이 팀 Router 연결
    apiRouter.post('/tsales_l1', tsales_l1.data);
    apiRouter.post('/tsales_l2', tsales_l2.data);
    apiRouter.post('/tsales_b1', tsales_b1.data);
    apiRouter.post('/tsales_b2', tsales_b2.data);
    apiRouter.post('/tsales_b3', tsales_b3.data);
    // 입사자추이 Router 연결
    apiRouter.get('/attrition_d1', attrition_d1.data);
    apiRouter.get('/attrition_s1', attrition_s1.data);
    apiRouter.get('/attrition_b1', attrition_b1.data);
    apiRouter.post('/attrition_b2', attrition_b2.data);
    apiRouter.get('/attrition_p1', attrition_p1.data);
    apiRouter.get('/attrition_p2', attrition_p2.data);
    apiRouter.get('/attrition_v1', attrition_v1.data);
    apiRouter.get('/attrition_m1', attrition_m1.data);
    // 생산지표 Router 연결
    apiRouter.post('/indicators_l1', indicators_l1.data);
    apiRouter.post('/indicators_b1', indicators_b1.data);
    apiRouter.post('/indicators_b2', indicators_b2.data);
    apiRouter.post('/indicators_m1', indicators_m1.data);
    apiRouter.post('/indicators_b3', indicators_b3.data);
    apiRouter.post('/indicators_m2', indicators_m2.data);

});
//var router = require('./routes')(app);

// [RUN SERVER]
var server = app.listen(port, function(){
 console.log("Express server has started on port " + port)
});
