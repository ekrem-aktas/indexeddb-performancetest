'use strict';

import { measureSync } from "./util.js";

let db;

export async function initSqliteWasm() {
    return new Promise((resolve, reject) => {
        sqlite3InitModule(self.sqlite3TestModule).then((sqlite3)=>{
            const oo = sqlite3.oo1;
            const capi = sqlite3.capi;
            if (capi.sqlite3_vfs_find(null) === 0) {
                reject("Ooops");
            }

            if(!capi.sqlite3_vfs_find('kvvfs')){
              reject("This build is not kvvfs-capable.");
            }

            console.warn(`Origin-Private FileSystem supported: ${!!sqlite3.oo1.OpfsDb}`)

            const dbStorage = 0 ? 'session' : 'local';
            db = new oo.JsStorageDb( dbStorage );
            
            console.log("db.storageSize():",db.storageSize());

            resolve();
        }).catch(reject);
    });
}

export function clearDB() {
    const sz = db.clearStorage();
    console.log("kvvfs",db.filename+"Storage cleared:",sz,"entries.");
}

export function exec(sql, params) {
    const result = db.exec({
      sql,
      bind: params,
      returnValue: "resultRows"
    });
    return result;
}

function execMultiple(sqls) {
    const results = new Array(sqls.length);
    for(let i = 0; i < sqls.length; i++) {
        results[i] = exec(sqls[i][0], sqls[i][1]);
    }
    return results;
}

export function runTestWithSQLite(testCase) {
    const execute = measureSync(exec);
    const executeMultiple = measureSync(execMultiple);

    switch (testCase.type) {
        case "table": {
            execute([`create table if not exists ${testCase.name} (${testCase.columns.map(col => `${col} text`).join(",")})`], []);
            break;
        }
        case "insert": {
            const stats = generateInsertStatements(testCase.table, testCase.data);
            return executeMultiple(stats);
        }
        case "query": {
            const [sql, p] = generateSelectStatement(testCase.table, testCase.filter);
            return execute(sql, p);
        }
        case "clean": {
            return execute([`delete from ${testCase.table}`], []);
        }
    }
}

function generateInsertStatements(table, objs) {
    return objs.map(obj => {
        const [cols, values] = Object.entries(obj).reduce(([cols, values], [key, value]) => {
            return [cols.concat(key), values.concat(value)];
        }, [[], []]);
        return [`insert into ${table} (${cols.join(", ")}) values (${new Array(values.length).fill("?").join(",")});`, values];
    });
}

function generateSelectStatement(table, filter) {
    return [[`select * from ${table} where ${filter.map(f => `${f[0]}=? `).join(" or ")}`], filter.map(f => f[1])];
}

