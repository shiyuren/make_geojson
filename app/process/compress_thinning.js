const config=require("../../config").config;
const batch_compress=require("../util/batch_compress").batch_compress;
const thinning=require("../util/thinning").thinning;

const start = config.root + "/outData/start";
const middle=config.root+"/outData/middle";
const end=config.root+"/outData/end";
//1、读取数据库数据生成geojson

//2、对生成的geojson进行抽稀和压缩
function compress_thinning(){
    //压缩
    var done=function(){
        batch_compress(middle,end);
    }
    //抽稀
    thinning(start,middle,done);
}
module.exports.compress_thinning=compress_thinning;