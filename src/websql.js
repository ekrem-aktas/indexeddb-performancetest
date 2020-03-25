import { measure, report } from "./util.js";

export function isWebSQLSupported() {
    return "openDatabase" in window;
}

let db = undefined;

export async function runTestWithWebSQL(testCase) {
    if (db === undefined) {
        db = window.openDatabase("Test", "1.0", "Test Database", 1024 * 1024);
    }

    const executeSqlMultipleAndMeasure = measure(executeSqlMultiple);
    const executeSqlWithMeasure = measure(executeSql);

    switch (testCase.type) {
        case "table": {
            await executeSql(db, `create table if not exists ${testCase.name} (${testCase.columns.map(col => `${col} text`).join(",")})`, []);
            break;
        }
        case "insert": {
            return await executeSqlMultipleAndMeasure(db, generateInsertStatements(testCase.table, testCase.data));
        }
        case "query": {
            return await executeSqlWithMeasure(db, ...generateSelectStatement(testCase.table, testCase.filter));
        }
        case "clean": {
            await executeSql(db, `delete from ${testCase.table}`, []);
        }
    }
}
//
// export async function testWebSQL() {
//     const executeSqlMultipleAndMeasure = measure(executeSqlMultiple);
//     const executeSqlWithMeasure = measure(executeSql);
//     for (const testCase of getTestCases()) {
//         switch (testCase.type) {
//             case "table": {
//                 await executeSql(db, `create table if not exists ${testCase.name} (${testCase.columns.map(col => `${col} text`).join(",")})`, []);
//                 break;
//             }
//             case "insert": {
//                 const { time, result } = await executeSqlMultipleAndMeasure(db, generateInsertStatements(testCase.table, testCase.data));
//                 report("WebSql", testCase, time, result);
//                 break;
//             }
//             case "query": {
//                 const { time, result } = await executeSqlWithMeasure(db, ...generateSelectStatement(testCase.table, testCase.filter));
//                 report("WebSql", testCase, time, result.rows.length);
//                 break;
//             }
//             case "clean": {
//                 await executeSql(db, `delete from ${testCase.table}`, []);
//             }
//         }
//     }
// }

function generateInsertStatements(table, objs) {
    return objs.map(obj => {
        const [cols, values] = Object.entries(obj).reduce(([cols, values], [key, value]) => {
            return [cols.concat(key), values.concat(value)];
        }, [[], []]);
        return [`insert into ${table} (${cols.join(", ")}) values (${new Array(values.length).fill("?").join(",")})`, values];
    });
}

function generateSelectStatement(table, filter) {
    return [`select * from ${table} where ${filter.map(f => `${f[0]}=? `).join(" and ")}`, filter.map(f => f[1])];
}

function executeSql(db, statement, args) {
    let result = undefined;
    return new Promise((resolve, reject) => db.transaction(tx => {
        tx.executeSql(statement, args, (tx, res) => {
            result = res;
        });
    }, reject, () => resolve(result)));
}

function executeSqlMultiple(db, statements) {
    return new Promise((resolve, reject) => db.transaction(tx => {
        statements.forEach(([statement, args]) => {
            tx.executeSql(statement, args);
        })
    }, reject, resolve));
}
