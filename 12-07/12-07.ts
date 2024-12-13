import { fetchData } from "../fetchTextFile";

async function partOne() {
    const data = await createRulesAndTests();
    const array = data.map(row => {
        const twoParts = row.split(': ');
        return {
            res: parseInt(twoParts[0]),
            numbers: twoParts[1].split(' ').map(number => parseInt(number))
        }
    });
    
    let res = 0;

    array.forEach((item) => {
        const target = item.res;
        const exemples = item.numbers;
        let symbol = new Array(exemples.length - 1).fill('*');
        const max = exemples.reduce((a, b) => a * b, 1)
        const min = exemples.reduce((a, b) => a + b, 0);
        if (target > min && target < max) {
            let init = exemples[0];
            let nAddition = 1;
            
        }

        if (target === min) res += min
        if (target === max) res += max
    });

    return res;
}

function partTwo() {

}

const createRulesAndTests = async () => {
    const data = await fetchData('12-07/input.txt');
    return data.split('\n');
}

export async function main() {
    console.log('-------------------------------------------');
    console.log('part one result: ', await partOne());
    console.log('-------------------------------------------');
    console.log('part two result: ', await partTwo());
}