/**
 * 工具处理数据配置文件
 * outData  是处理文件的输出目录
 *      start  ---- 从数据库生成的geojson文件
 *      middle ---- 抽稀后的geojson文件
 *      end    ---- 压缩后的输出文件目录（也是最终文件目录）
 * 
 * 强调:   生成数据的表结构确定
 *         CREATE TABLE `xzqh` (
 *               `shape` longtext NOT NULL COMMENT '图形字段wkt',
 *               `name` varchar(100) DEFAULT NULL COMMENT '政区名称',
 *               `code` varchar(45) DEFAULT NULL COMMENT '政区code',
 *               `level` varchar(45) DEFAULT NULL COMMENT '政区级别',
 *               `l_id` varchar(45) DEFAULT NULL COMMENT '当前数据的id可以是uuid',
 *               `l_parid` varchar(45) DEFAULT NULL COMMENT '具有父子关系的标识字段'
 *         ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
 * 
 */
let config={
    //数据库配置  mysql
    mysql:{
        "host": "127.0.0.1",
        "port": 3306,
        "user": "root",
        "password":"root",
        "database": "wl",
        "charset": "UTF8_GENERAL_CI",
        "connectTimeout": 10000
    },
    //生成geojson的表
    tableName:"xzqh",
    //设置政区级别 用于生成 geojson-(1:国家；2:省；3:市；4:县-----)
    level:[1,2],
    //抽稀程度1-100
    percent:50,
    root: __dirname
}
module.exports.config=config;