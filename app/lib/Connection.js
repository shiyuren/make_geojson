
const mysql = require('mysql');
var $originConn = Symbol('originConn');
var $isAlive = Symbol('isAlive');
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
 * 创建单个数据库链接类
 * @class Connection
 */
class Connection {
    /**
     * Creates an instance of Connection.
     * @param {any} config 
     * 
     * @memberOf Connection
     */
    constructor(config) {
        this[$originConn] = mysql.createConnection(config);
        this[$isAlive] = true;
    }
    get isAlive() { return this[$isAlive]; }
    get threadId() { return this[$originConn].threadId; }
    get on() { return this[$originConn].on; };
    /**
     * 销毁链接
     * @returns 
     * @memberOf Connection
     */
    destroy() {
        return new Promise((resolve, reject) => {
            this[$originConn].destroy();
            this[$isAlive] = false;
            resolve();
        });
    }
    /**
     * 终止连接。 任何查询完成后，此函数将终止连接。
     * @returns 
     * @memberOf Connection
     */
    end() {
        return new Promise((resolve, reject) => {
            this[$originConn].end(promiseFn(resolve, reject))
        }).then(() => {
            this[$isAlive] = false;
        })
    }
    /**
     * Execute sql command with parameters.
     * @param {String} cmd The sql command would be executed.
     * @param {Array} params Parameters.
     * @return {Promise<any>} The sql result.
     */
    query(cmd, params) {
        return new Promise((resolve, reject) => {
            let conn = this[$originConn];
            let args = [cmd];
            let callback = promiseFn(resolve, reject);
            if (params)
                args.push(params);
            args.push(callback);
            conn.query(...args);
        });
    }
     /**
     * Begin transaction of the connection. Following queries would not be useful until the function commit or rollback called.
     * @return {Promise<undefined>}
     */
    beginTran() {
        return new Promise((resolve, reject) => {
            let conn = this[$originConn];
            conn.beginTransaction(promiseFn(resolve, reject));
        });
    }
    /**
     * Commit a transaction.
     * @return {Promise<undefined>}
     */
    commit() {
        return new Promise((resolve, reject) => {
            let conn = this[$originConn];
            conn.commit((err) => {
                if (err) this.rollback().then(() => reject(err));
                else resolve();
            })
        });
    }
    /**
     * Rollback a transaction
     * @return {Promise<undefined>}
     */
    rollback() {
        return new Promise((resolve, reject) => {
            let conn = this[$originConn];
            conn.rollback(() => resolve());
        });
    }


}
module.exports.Connection = Connection;