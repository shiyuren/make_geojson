/**
 * [工具类]
 * @param  {[type]} root    [description]
 * @param  {[type]} factory [description]
 * @return {[type]}         [description]
 */
var fs = require("fs");
/**
 * [getJson 获取配置文件]
 * @param  {[type]} url    [文件路径]
 * @param  {[type]} encode [编码]
 * @return {[type]}        [返回object]
 */
function readJson(url, encode) {
    var encode = encode ? encode : 'UTF-8'; //定义编码类型
    try {
        var content = fs.readFileSync(url, encode);
        return JSON.parse(content);
    } catch (e) {
        console.error("读取配置文件错误！");
        return false;
    }
}
/**
 * [writeFile 写入文件内容--每次覆盖--没有则创建文件写入]
 * @param  {[type]} url    [description]
 * @param  {[type]} data   [description]
 * @param  {[type]} encode [description]
 * @return {[type]}        [description]
 */
function writeFile(url, data, encode) {
    var encode = encode ? encode : 'UTF-8'; //定义编码类型
    try {
        fs.writeFileSync(url, data, encode);
        return true;
    } catch (e) {
        console.error("写入文件错误！");
        return false;
    }

}
/**
 * 读取文件内容
 * @param {*} url 
 * @param {*} data 
 * @param {*} encode 
 */
function readFile(url, encode) {
    var encode = encode ? encode : 'UTF-8'; //定义编码类型
    try {
        var content = fs.readFileSync(url, encode);
        return content;
    } catch (e) {
        console.error("读取文件错误！！");
        return false;
    }
}
var file = {
    writeFile: writeFile,
    readFile: readFile,
    fs:fs,
};
module.exports = file;