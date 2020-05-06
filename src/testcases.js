
export const VALUES = ["Green", "Red", "Blue", "Yellow", "Black"];


function * generateTestsFor(columnNumber) {
    const tableName = `Table${columnNumber}Columns`;
    yield createTable(tableName, getColumns(columnNumber));
    // 1K
    yield insert(tableName, generateObjects(1000, createObj(columnNumber)));
    if (columnNumber === 5) {
        yield query(tableName, [["col0", VALUES[0]]]);
        yield query(tableName, [["col2", VALUES[1]], ["col4", VALUES[2]]]);
        yield query(tableName, [["guid", "500"]]);
    }
    yield cleanTable(tableName);
    // 10K
    yield insert(tableName, generateObjects(10000, createObj(columnNumber)));
    yield cleanTable(tableName);
    // 50K
    yield insert(tableName, generateObjects(50000, createObj(columnNumber)));
    if (columnNumber === 20) {
        yield query(tableName, [["col0", VALUES[0]]]);
        yield query(tableName, [["col2", VALUES[1]], ["col6", VALUES[2]]]);
        yield query(tableName, [["guid", "25000"]]);
    }
    yield cleanTable(tableName);
}

export function * getTestCases() {
    for (const testCase of generateTestsFor(5))
        yield testCase;
    for (const testCase of generateTestsFor(10))
        yield testCase;
    for (const testCase of generateTestsFor(15))
        yield testCase;
    for (const testCase of generateTestsFor(20))
        yield testCase;
}

function createObj(cols) {
    return r => {
        const obj = {};
        obj.guid = r.toString();
        for (let i = 0; i < cols; i++) {
            obj[`col${i}`] = VALUES[(i + r) % VALUES.length]
        }
        return obj;
    }
}

function getColumns(number) {
    const cols = ["guid"];
    for (let i = 0; i < number; i++) {
        cols.push("col" + i);
    }
    return cols;
}

function createTable(name, columns) {
    return { type: "table", name, columns };
}

function cleanTable(table) {
    return { type: "clean", table };
}

function insert(table, data) {
    return { type: "insert", table, data };
}

function query(table, filter) {
    return { type: "query", table, filter };
}

function generateObjects(number, genFnc) {
    const objs = [];
    for(let i = 0; i < number; i++) {
        objs.push(genFnc(i));
    }
    return objs;
}
