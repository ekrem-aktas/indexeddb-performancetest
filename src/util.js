
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
            console.log(`${engine.toUpperCase()}: ${testCase.table}: insert ${testCase.data.length} rows. Time ${time}`);
            break;
        case "query":
            console.log(`${engine.toUpperCase()}: ${testCase.table}: query returning ${result} rows with filter ${JSON.stringify(testCase.filter)} Time ${time}`);
            break;
    }
}

export function describeTestCase(testCase) {
    switch (testCase.type) {
        case "insert":
            return `${testCase.table}: Insert ${testCase.data.length} rows`;
        case "query":
            return `${testCase.table}: Query with filters ${JSON.stringify(testCase.filter)}`;
        default:
            return undefined;
    }
}
