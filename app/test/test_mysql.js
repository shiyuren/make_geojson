const mysqlConfig=require("../../config").config.mysql;
const Connection=require("../lib/Connection").Connection;
const wkt = require('terraformer-wkt-parser');
var conn = new Connection(mysqlConfig);
/**
 * 测试数据库查询
 */
async function test_mysql(){
   let res=await conn.query("SELECT * FROM zlzysj_py where objectid=1");
   console.log(res);
}

function test(){
    var p="";
    var json = wkt.parse(p);
    console.log(json);
}
test();