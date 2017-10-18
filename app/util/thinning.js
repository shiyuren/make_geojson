/**
 * 抽稀工具 接口来自[mapshaper](github.com/mbloch/mapshaper)
 */
const percent=require("../../config").config.percent;
const mapshaper=require('mapshaper');
/**
 * This function is the factory of the standard promise callback.
 * @param {Function} resolve
 * @param {Function} reject
 * @return {Function} The standard promise callback.
 */
function promiseFn(resolve, reject) {
    return (err, rst) => {
        if (err) reject(err);
        else resolve(rst);
    }
}
/**
 *  抽稀
 * @param {any} in_dir 输入路径
 * @param {any} out_dir 输出路径
 */
function thinning(in_dir,out_dir,call){
    let comm = `-i ${in_dir}/*.json -simplify visvalingam ${percent}% -o ${out_dir} format=geojson`;
    var done = function (e) {
        if (e) {
            console.error("抽稀错误："+e)
        } else {
            console.log("---------"+new Date().toLocaleTimeString()+"-------------抽稀完成----------------------");
            call();
        }
    }
    mapshaper.runCommands(comm,done);
}
module.exports.thinning=thinning;