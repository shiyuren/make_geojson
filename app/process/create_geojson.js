const config=require("../../config").config;
const file=require("../util/file");
const wkt = require('terraformer-wkt-parser');
const Connection=require("../lib/Connection").Connection;

var conn = new Connection(config.mysql);
const start = config.root + "/outData/start";
const tableName=config.tableName;
const level=config.level;
async function create_geojson() {
    var query_total=`select name,code,l_id,l_parid from ${tableName} where level in (${level.join(",")})`;
    let res=await conn.query(query_total);
    for(let i=0;i<res;i++){
        var item=res[i];
        var query_item=`select * from ${tableName} where l_parid=${item.l_id}`;
        let item_res=await conn.query(query_total);
        handler(item,item_res);
    }
}
/**
 * 处理集合数据生成geojson
 * @param {any} item_res 
 */
function handler(item,item_res){
    var features=[]
    var geojson={
        name: item.name,
        type: "FeatureCollection",
        features:features,
    };
    for(let i=0;i<item_res.length;i++){
        var f=item_res[i];
        //
        var properties={
            NAME:f.code,
            CODE:f.name,
            L_ID:f.l_id,
            LEVEL:f.level,
            L_PARID:f.l_parid
        }
        //处理
        var shape;
        if(f.shape==""){
           continue;
        }else{
            shape=wkt.parse(f.shape);
        }
        //
        var geometry=shape;
        //
        var feature={
            type:"Feature",
            geometry:geometry,
            properties:properties
        };
        features.push(feature);
    }
    start+="/"+item.code+".json"
    file.writeFile(start,JSON.stringify(json));
}
module.exports.create_geojson=create_geojson;