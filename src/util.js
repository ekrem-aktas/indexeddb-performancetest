
export function measure(asyncFunc) {
    return async (...args) => {
        const start = performance.now();
        const result = await asyncFunc(...args);
        return { result, time: performance.now() - start };
    };
}

export function report(engine, testCase, time, result) {
    switch (testCase.type) {
        case "insert":
            console.log(`${engine.toUpperCase()}: Inserting ${testCase.data.length} objects to ${testCase.table} took ${time}ms`);
            break;
        case "query":
            console.log(`${engine.toUpperCase()}: Querying table ${testCase.table} took ${time}ms to return ${result} rows`);
            break;
    }
}

export function describeTestCase(testCase) {
    switch (testCase.type) {
        case "insert":
            return `Insert ${testCase.data.length} rows to ${testCase.table} table`;
        case "query":
            return `Query ${testCase.table} with filters ${JSON.stringify(testCase.filter)}`;
        default:
            return undefined;
    }
}
