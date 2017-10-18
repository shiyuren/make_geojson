const create_geojson=require('./app/process/create_geojson').create_geojson;
const compress_thinning=require("./app/process/compress_thinning").compress_thinning;
//create_geojson().then(()=>{compress_thinning()},(e)=>{console.error("执行错误！！")})
compress_thinning()