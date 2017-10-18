const file=require("./file");
const compress=require("./compress").compress;
/**
 * 批量进行压缩
 * @param {string} in_dir 
 * @param {string} out_dir 
 */
function batch_compress(in_dir,out_dir){
    let files=file.fs.readdirSync(in_dir);
    for(let i=0;i<files.length;i++){
        var f=files[i];
        if(f.indexOf(".json")>-1){
            var in_path=in_dir+"/"+f;
            var out_path=out_dir+"/"+f;
            let in_json=file.readFile(in_path)
            let out_json=compress(JSON.parse(in_json));
            file.writeFile(out_path,JSON.stringify(out_json));
        }
    }
    console.log("---------"+new Date().toLocaleTimeString()+"-------------压缩完成,共"+files.length+"个文件----------------------");
}
module.exports.batch_compress=batch_compress;
