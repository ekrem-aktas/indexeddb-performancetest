import {measure, log} from "./util.js";

export function isIndexedDBSupported() {
    return "indexedDB" in window;
}

let db = undefined;
let version = 1;

export async function runTestWithIndexedDB(testCase) {
    if (db === undefined) {
        db = new Dexie(getRandomDBName());
    }

    const insertWithMeasure = measure(insertObjects);
    const queryWithMeasure = measure(builder => builder.toArray());

    switch (testCase.type) {
        case "table": {
            version++;
            log("INDEXEDDB: Upgrading to version " + version);
            db.close();
            db.version(version).stores({
                [testCase.name]: "++id, " + testCase.columns.join(", ")
            });
            log("INDEXXEDDB: Opening database...");
            await db.open();
            log("INDEXXEDDB: Opening database...Done");
            break;
        }
        case "insert": {
            log("INDEXEDDB: Inserting...");
            const result = await insertWithMeasure(db, testCase.table, testCase.data);
            log("INDEXEDDB: Inserting...Done");
            return result;
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
            log("INDEXEDDB: Querying...");
            return await queryWithMeasure(builder);
        }
        case "clean": {
            log("INDEXEDDB: Clearing table...");
            await db[testCase.table].where("id").above(0).delete();
            log("INDEXEDDB: Clearing table...Done");
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
