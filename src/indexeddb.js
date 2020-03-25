import {measure, report} from "./util.js";

export function isIndexedDBSupported() {
    return "indexedDB" in window;
}

let db = undefined;

export async function runTestWithIndexedDB(testCase) {
    if (db === undefined) {
        db = new Dexie('TestDatabase');
    }

    const insertWithMeasure = measure(insertObjects);
    const queryWithMeasure = measure((table, filter) => db[table].where(filter).toArray());

    switch (testCase.type) {
        case "table": {
            await db.delete();
            db = new Dexie("TestDatabase");
            db.version(1).stores({
                [testCase.name]: "++id, " + testCase.columns.join(", ")
            });
            break;
        }
        case "insert": {
            return await insertWithMeasure(db, testCase.table, testCase.data);
        }
        case "query": {
            const filter = Object.assign({}, ...testCase.filter.map(([col, value]) => ({ [col]: value })));
            return await queryWithMeasure(testCase.table, filter);
        }
        case "clean": {
            await db[testCase.table].where("id").above(0).delete();
            break;
        }
    }
}

function insertObjects(db, table, objs) {
    return db[table].bulkAdd(objs);
}
