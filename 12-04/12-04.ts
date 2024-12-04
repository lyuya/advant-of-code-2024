import { fetchData } from "../fetchTextFile";

const regexXmas = /XMAS/g;
const regexSamx = /SAMX/g;


async function partOne() {
    const array = await createArray();
    // row
    let count = array.reduce((a, b) => a + calculateWordMatch(b), 0);
    const arrays = array.map(t => t.split(''));
    // col
    const verticalArray = convertToColumns(arrays);
    count += verticalArray.reduce((a, b) => a + calculateWordMatch(b), 0);

    // diagonal

    let m = arrays.length;
    let n = arrays[0].length;
    let sum = 3;
    let diags = [];

    while (sum < n+m-2) {
        for (let i = 0; i < arrays.length; i++) {
            if(!diags[sum - 3]) diags[sum - 3] = [];
            if(sum-i >= 0 && sum - i < arrays[0].length) {
                diags[sum - 3].push(arrays[i][sum - i]);
            }
        }
        sum++;
    }

    const strs = diags.filter(d => d.length > 3).map(diag => diag.join(''));
    count += strs.reduce((a, b) => a + calculateWordMatch(b), 0);

    // antiDiagonal

    let dif = 4 - n;
    let antiDiags = [];

    while (dif < m - 3) {
        for (let i = 0; i < n; i++) {
            if(!antiDiags[dif+n-4]) antiDiags[dif+n-4] = [];
            if(i+dif < 0 || i+dif >= n) continue;
            antiDiags[dif+n-4].push(arrays[i][i + dif]);
        }
        dif++;
    }

    count += antiDiags.map(diag => diag.join('')).reduce((a, b) => a + calculateWordMatch(b), 0);
    return count;
}

const calculateWordMatch = (str: string) => {
    return (str.match(regexXmas)?.length ?? 0) + (str.match(regexSamx)?.length ?? 0);
}

const convertToColumns = (arrays) => {
    let res = [];
    for(let key in arrays[0]) {
        res.push(arrays.map((array) => array[key]).join(''));
    }
    return res;
}

async function partTwo() {
    const array = await createArray();
    let count = 0;
    // const arrays = array.map(t => t.split(''));
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array[0].length; j++) {
            if (array[i][j] === 'A') {
                const set = new Set([array?.[i-1]?.[j-1], array?.[i+1]?.[j+1]]);
                if (set.has('M') && set.has('S')) {
                    const set2 = new Set([array[i-1][j+1], array[i+1][j-1]]);
                    if (set2.has('M') && set2.has('S')) count++;
                }
            }
        }
    }
    return count;
}

const createArray = async () => {
    const data = await fetchData('12-04/input.txt');
    return data.split('\n');
}

export async function main() {
    console.log('-------------------------------------------');
    console.log('part one result: ', await partOne());
    console.log('-------------------------------------------');
    console.log('part two result: ', await partTwo());
} 