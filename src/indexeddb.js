import {measure} from "./util.js";

export function isIndexedDBSupported() {
    return "indexedDB" in window;
}

let db = undefined;

export async function runTestWithIndexedDB(testCase) {
    if (db === undefined) {
        db = new Dexie(getRandomDBName());
    }

    const insertWithMeasure = measure(insertObjects);
    const queryWithMeasure = measure(builder => builder.toArray());

    switch (testCase.type) {
        case "table": {
            db = new Dexie(getRandomDBName());
            db.version(1).stores({
                [testCase.name]: "++id, " + testCase.columns.join(", ")
            });
            break;
        }
        case "insert": {
            return await insertWithMeasure(db, testCase.table, testCase.data);
        }
        case "query": {
            let builder = undefined;
            testCase.filter.forEach(([col, value]) => {
                if (builder === undefined) {
                    builder = db[testCase.table].where(col).equalsIgnoreCase(value);
                } else {
                    builder = builder.or(col).equalsIgnoreCase(value);
                }
            });
            return await queryWithMeasure(builder);
        }
        case "clean": {
            await db[testCase.table].where("id").above(0).delete();
            break;
        }
    }
}

function getRandomDBName() {
    return "TestDatabase" + Math.round(Math.random() * 1000000);
}

function insertObjects(db, table, objs) {
    return db[table].bulkAdd(objs);
}
