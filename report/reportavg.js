
const runs = [
    {"agent":"Mozilla/5.0 (X11; Linux x86_64; rv:72.0) Gecko/20100101 Firefox/72.0","results":[["Test Case","WebSQL (ms)","IndexedDB (ms)","Diff (ms)","Percentage"],["Table5Columns: Insert 1000 rows",-1,197],["Table5Columns: Query with filters [[\"col0\",\"Green\"]]",-1,14],["Table5Columns: Query with filters [[\"col2\",\"Red\"],[\"col4\",\"Blue\"]]",-1,27],["Table5Columns: Query with filters [[\"guid\",\"500\"]]",-1,2],["Table5Columns: Insert 10000 rows",-1,922],["Table5Columns: Insert 50000 rows",-1,6204],["Table10Columns: Insert 1000 rows",-1,290],["Table10Columns: Insert 10000 rows",-1,2079],["Table10Columns: Insert 50000 rows",-1,9603],["Table15Columns: Insert 1000 rows",-1,213],["Table15Columns: Insert 10000 rows",-1,2220],["Table15Columns: Insert 50000 rows",-1,9395],["Table20Columns: Insert 1000 rows",-1,257],["Table20Columns: Insert 10000 rows",-1,2260],["Table20Columns: Insert 50000 rows",-1,12632],["Table20Columns: Query with filters [[\"col0\",\"Green\"]]",-1,572],["Table20Columns: Query with filters [[\"col2\",\"Red\"],[\"col6\",\"Blue\"]]",-1,1093],["Table20Columns: Query with filters [[\"guid\",\"25000\"]]",-1,1]]},
    {"agent":"Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.87 Safari/537.36","results":[["Test Case","WebSQL (ms)","IndexedDB (ms)","Diff (ms)","Percentage"],["Table5Columns: Insert 1000 rows",43.61,159.39,115.78,365.49],["Table5Columns: Query with filters [[\"col0\",\"Green\"]]",3.07,29.59,26.52,963.84],["Table5Columns: Query with filters [[\"col2\",\"Red\"],[\"col4\",\"Blue\"]]",4.92,51.87,46.95,1054.27],["Table5Columns: Query with filters [[\"guid\",\"500\"]]",1.91,1.32,-0.59,69.11],["Table5Columns: Insert 10000 rows",284.1,1433.35,1149.25,504.52],["Table5Columns: Insert 50000 rows",888.98,7971.42,7082.44,896.69],["Table10Columns: Insert 1000 rows",45.91,2058.49,2012.58,4483.75],["Table10Columns: Insert 10000 rows",260.91,1872.58,1611.67,717.71],["Table10Columns: Insert 50000 rows",1442.24,13297.96,11855.72,922.04],["Table15Columns: Insert 1000 rows",53.62,5195.44,5141.82,9689.37],["Table15Columns: Insert 10000 rows",411.75,2898.44,2486.69,703.93],["Table15Columns: Insert 50000 rows",2033.82,18943.63,16909.81,931.43],["Table20Columns: Insert 1000 rows",73.49,4991.85,4918.36,6792.56],["Table20Columns: Insert 10000 rows",595.88,3397.53,2801.65,570.17],["Table20Columns: Insert 50000 rows",2391.03,22132.86,19741.83,925.66],["Table20Columns: Query with filters [[\"col0\",\"Green\"]]",219.53,2910.56,2691.03,1325.81],["Table20Columns: Query with filters [[\"col2\",\"Red\"],[\"col6\",\"Blue\"]]",334.98,2083.89,1748.91,622.09],["Table20Columns: Query with filters [[\"guid\",\"25000\"]]",11.23,6.48,-4.75,57.7]]},
    {"agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36","results":[["Test Case","WebSQL (ms)","IndexedDB (ms)","Diff (ms)","Percentage"],["Table5Columns: Insert 1000 rows",30.93,164.46,133.53,531.72],["Table5Columns: Query with filters [[\"col0\",\"Green\"]]",4.22,26.29,22.07,622.99],["Table5Columns: Query with filters [[\"col2\",\"Red\"],[\"col4\",\"Blue\"]]",5.11,36.91,31.8,722.31],["Table5Columns: Query with filters [[\"guid\",\"500\"]]",2.82,0.99,-1.83,35.11],["Table5Columns: Insert 10000 rows",191.59,1410.54,1218.95,736.23],["Table5Columns: Insert 50000 rows",1155.03,8680.71,7525.68,751.56],["Table10Columns: Insert 1000 rows",35.14,2474.44,2439.3,7041.66],["Table10Columns: Insert 10000 rows",267.84,2065.14,1797.3,771.03],["Table10Columns: Insert 50000 rows",1344.57,14166.23,12821.66,1053.59],["Table15Columns: Insert 1000 rows",46.71,4234.36,4187.65,9065.21],["Table15Columns: Insert 10000 rows",432.72,2703.68,2270.96,624.81],["Table15Columns: Insert 50000 rows",1637.25,19121.34,17484.09,1167.89],["Table20Columns: Insert 1000 rows",53.18,4597.17,4543.99,8644.55],["Table20Columns: Insert 10000 rows",505.67,3459.1,2953.43,684.06],["Table20Columns: Insert 50000 rows",2005.16,22551.68,20546.52,1124.68],["Table20Columns: Query with filters [[\"col0\",\"Green\"]]",161.93,2991.57,2829.64,1847.45],["Table20Columns: Query with filters [[\"col2\",\"Red\"],[\"col6\",\"Blue\"]]",286.19,1894.02,1607.8, 0]]},
    {"agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:71.0) Gecko/20100101 Firefox/71.0","results":[["Test Case","WebSQL (ms)","IndexedDB (ms)","Diff (ms)","Percentage"],["Table5Columns: Insert 1000 rows",-1,671],["Table5Columns: Query with filters [[\"col0\",\"Green\"]]",-1,33],["Table5Columns: Query with filters [[\"col2\",\"Red\"],[\"col4\",\"Blue\"]]",-1,27],["Table5Columns: Query with filters [[\"guid\",\"500\"]]",-1,1],["Table5Columns: Insert 10000 rows",-1,931],["Table5Columns: Insert 50000 rows",-1,4439],["Table10Columns: Insert 1000 rows",-1,227],["Table10Columns: Insert 10000 rows",-1,1164],["Table10Columns: Insert 50000 rows",-1,6464],["Table15Columns: Insert 1000 rows",-1,268],["Table15Columns: Insert 10000 rows",-1,1651],["Table15Columns: Insert 50000 rows",-1,8823],["Table20Columns: Insert 1000 rows",-1,239],["Table20Columns: Insert 10000 rows",-1,1898],["Table20Columns: Insert 50000 rows",-1,10523],["Table20Columns: Query with filters [[\"col0\",\"Green\"]]",-1,8152],["Table20Columns: Query with filters [[\"col2\",\"Red\"],[\"col6\",\"Blue\"]]",-1,12491],["Table20Columns: Query with filters [[\"guid\",\"25000\"]]",-1,1]]},
    {"agent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36","results":[["Test Case","WebSQL (ms)","IndexedDB (ms)","Diff (ms)","Percentage"],["Table5Columns: Insert 1000 rows",41.27,128.33,87.06,310.95],["Table5Columns: Query with filters [[\"col0\",\"Green\"]]",3.38,16.63,13.25,492.01],["Table5Columns: Query with filters [[\"col2\",\"Red\"],[\"col4\",\"Blue\"]]",3.05,25.42,22.37,833.44],["Table5Columns: Query with filters [[\"guid\",\"500\"]]",1.33,0.67,-0.66,50.38],["Table5Columns: Insert 10000 rows",171.32,969.35,798.03,565.81],["Table5Columns: Insert 50000 rows",763.5,5834.08,5070.58,764.12],["Table10Columns: Insert 1000 rows",43.82,1739.11,1695.29,3968.76],["Table10Columns: Insert 10000 rows",270.96,1323.95,1052.99,488.61],["Table10Columns: Insert 50000 rows",1042.91,8327.13,7284.22,798.45],["Table15Columns: Insert 1000 rows",52.11,3143.45,3091.34,6032.34],["Table15Columns: Insert 10000 rows",327.12,1759.97,1432.85,538.02],["Table15Columns: Insert 50000 rows",1320.28,11137.15,9816.87,843.54],["Table20Columns: Insert 1000 rows",58.51,3356.96,3298.45,5737.41],["Table20Columns: Insert 10000 rows",350.62,2231.32,1880.7,636.39],["Table20Columns: Insert 50000 rows",1708.83,16668.83,14960,975.45],["Table20Columns: Query with filters [[\"col0\",\"Green\"]]",109.32,1614.99,1505.67,1477.31],["Table20Columns: Query with filters [[\"col2\",\"Red\"],[\"col6\",\"Blue\"]]",195.86,1431.19,1235.33,730.72],["Table20Columns: Query with filters [[\"guid\",\"25000\"]]",6.47,3.47,-3,53.63]]},
];

const combinedResults = runs.map(run => {
    const resultsTable = run.results;

    // remove header
    resultsTable.splice(0, 1);

    // remove unnecessary columns
    resultsTable.forEach(row => row.splice(3));

    // add browser as first column
    const browser = getBrowser(run.agent);
    resultsTable.forEach(row => row.splice(0, 0, browser));

    return resultsTable;
}).reduce((x, y) => x.concat(y), []); //flatMap

const browsers = [...new Set(combinedResults.map(c => c[0]))];

const aggregatedResults = [["Test name"].concat(...browsers.map(b => ([b + "WebSQL", b + "IndexedDB"])))]
    .concat(combinedResults.reduce((agg, resultRow) => {
        let testRow = agg.find(row => row[0] === resultRow[1]);
        if (testRow === undefined) {
            testRow = [resultRow[1]].concat(...Array.from({ length: browsers.length * 2 }).fill({cnt: 0, avg: 0}));
            agg.push(testRow);
        }

        addResult("WebSQL", resultRow[2]);
        addResult("IndexedDB", resultRow[3]);
      
        return agg;

        function addResult(db, value) {
            if (value === -1) {
                return;
            }
            const browserIndex = browsers.indexOf(resultRow[0]);
            const i = browserIndex * 2 + (db === "WebSQL" ? 1 : 2);

            testRow[i] = {
                avg: roundToTwo((testRow[i].avg * testRow[i].cnt + value) / (testRow[i].cnt + 1)),
                cnt: testRow[i].cnt + 1,
            };
        }
}, []));


console.table(aggregatedResults);


function getBrowser(agent) {
    if (agent.match(/Firefox/) != null) {
        return "Firefox";
    }

    if (agent.match(/Chrome/) != null) {
        return "Chrome";
    }

    return "Other"
}

function roundToTwo(num) {
    return +(Math.round(num + "e+2")  + "e-2");
}