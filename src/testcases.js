
export const VALUES = ["Green", "Red", "Blue", "Yellow", "Black"];

export function * getTestCases() {
    // 1 column
    const tableWithOneColumn = "Table1Col";
    const generateObjWith1Column = i => ({ col: VALUES[i % VALUES.length] });
    yield createTable(tableWithOneColumn, "col");
    // 100x1col
    yield insert(tableWithOneColumn, generateObjects(100, generateObjWith1Column));
    yield query(tableWithOneColumn, [["col", VALUES[0]]]);
    yield cleanTable(tableWithOneColumn);
    // 1000x1col
    yield insert(tableWithOneColumn, generateObjects(1000, generateObjWith1Column));
    yield query(tableWithOneColumn, [["col", VALUES[0]]]);
    yield cleanTable(tableWithOneColumn);
    // 10Kx1col
    yield insert(tableWithOneColumn, generateObjects(10000, generateObjWith1Column));
    yield query(tableWithOneColumn, [["col", VALUES[0]]]);
    yield cleanTable(tableWithOneColumn);
    // 20Kx1col
    yield insert(tableWithOneColumn, generateObjects(20000, generateObjWith1Column));
    yield query(tableWithOneColumn, [["col", VALUES[0]]]);
    yield cleanTable(tableWithOneColumn);

    // 2 columns
    const tableWith2Columns = "Table2Cols";
    const generateObjWith2Columns = i => ({ col1: VALUES[i % VALUES.length], col2: i.toString()});
    yield createTable(tableWith2Columns, "col1", "col2");
    // 100x2cols
    yield insert(tableWith2Columns, generateObjects(100, generateObjWith2Columns));
    yield query(tableWith2Columns, [["col1", VALUES[0]]]);
    yield cleanTable(tableWith2Columns);
    // 1Kx2cols
    yield insert(tableWith2Columns, generateObjects(1000, generateObjWith2Columns));
    yield query(tableWith2Columns, [["col1", VALUES[0]]]);
    yield cleanTable(tableWith2Columns);
    // 10Kx2cols
    yield insert(tableWith2Columns, generateObjects(10000, generateObjWith2Columns));
    yield query(tableWith2Columns, [["col1", VALUES[0]]]);
    yield cleanTable(tableWith2Columns);
    // 20Kx2cols
    yield insert(tableWith2Columns, generateObjects(20000, generateObjWith2Columns));
    yield query(tableWith2Columns, [["col1", VALUES[0]]]);
    yield cleanTable(tableWith2Columns);

    // 5 columns
    const tableWith5Columns = "Table5Cols";
    const generateObjWith5Columns = i => ({
        col1: VALUES[i % VALUES.length],
        col2: i.toString(),
        col3: "Test Test " + i.toString(),
        col4: i % 2 === true,
        col5: new Date().getTime() + i
    });
    yield createTable(tableWith5Columns, "col1", "col2", "col3", "col4", "col5")
    // 100x5cols
    yield insert(tableWith5Columns, generateObjects(100, generateObjWith5Columns));
    yield query(tableWith5Columns, [["col1", VALUES[0]]]);
    yield cleanTable(tableWith5Columns);
    // 1Kx5cols
    yield insert(tableWith5Columns, generateObjects(1000, generateObjWith5Columns));
    yield query(tableWith5Columns, [["col1", VALUES[0]]]);
    yield cleanTable(tableWith5Columns);
    // 10Kx5cols
    yield insert(tableWith5Columns, generateObjects(10000, generateObjWith5Columns));
    yield query(tableWith5Columns, [["col1", VALUES[0]]]);
    yield cleanTable(tableWith5Columns);
    // 20Kx5cols
    yield insert(tableWith5Columns, generateObjects(20000, generateObjWith5Columns));
    yield query(tableWith5Columns, [["col1", VALUES[0]]]);
    yield cleanTable(tableWith5Columns);
}

function createTable(name, ...columns) {
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
