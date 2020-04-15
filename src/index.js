import { isWebSQLSupported, runTestWithWebSQL } from "./websql.js";
import { isIndexedDBSupported, runTestWithIndexedDB } from "./indexeddb.js";
import {getTestCases} from "./testcases.js";
import {describeTestCase, report} from "./util.js";

(async function () {
    document.querySelector(".support-label.websql").textContent = isWebSQLSupported() ? "Yes" : "No";
    document.querySelector(".support-label.indexeddb").textContent = isIndexedDBSupported() ? "Yes" : "No";

    console.log("Starting test");

    const resultTable = [["Test Case", "WebSQL (ms)", "IndexedDB (ms)", "Diff (ms)", "Percentage"]];

    for (const testCase of getTestCases()) {
        const results = [];
        if (isWebSQLSupported()) {
            const testRun = await runTestWithWebSQL(testCase);
            if (testRun && testRun.time) {
                results.push(roundToTwo(testRun.time));
                report("WebSQL   ", testCase, roundToTwo(testRun.time), testRun.result && testRun.result.rows ? testRun.result.rows.length : undefined);
            }
        } else {
            results.push(-1)
        }

        if (isIndexedDBSupported()) {
            const testRun = await runTestWithIndexedDB(testCase);
            if (testRun && testRun.time) {
                results.push(roundToTwo(testRun.time));
                report("IndexedDB", testCase, roundToTwo(testRun.time), testRun.result.length);
            }
        } else {
            results.push(-1)
        }

        const reportName = describeTestCase(testCase);
        if (reportName !== undefined) {
            results.splice(0, 0, reportName);
            if (results[1] > -1 && results[2] > -1) {
                results[3] = roundToTwo(results[2] - results[1]);
                results[4] = roundToTwo(results[2] * 100 / results[1]);
            }

            resultTable.push(results)
        }
    }

    console.table(resultTable);
    console.log("Test complete, send the next log back to Ekrem");
    console.log(JSON.stringify({ agent: navigator.userAgent, results: resultTable }));

    document.getElementById("result").innerText = JSON.stringify({ agent: navigator.userAgent, results: resultTable });

    function roundToTwo(num) {
        return +(Math.round(num + "e+2")  + "e-2");
    }
}());
