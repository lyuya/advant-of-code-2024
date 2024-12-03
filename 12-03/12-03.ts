import { fetchData } from "../fetchTextFile";

const regexMul = /mul\((\d+\,\d+)\)/g;
const createArray = async () => {
    const data = await fetchData('12-03/input.txt');
    return data;
}
const partOne = async () => {
    const text = await createArray()
    const result: string[] = text.match(regexMul);
    const numberDuos = result.map(r => mulToTwoNumbers(r));
    return numberDuos.reduce((a, b) => a + b[0]*b[1], 0);
}

const regexNumber = /\d+/g;

const mulToTwoNumbers = (str: string): number[] => {
    const digits = str.match(regexNumber);
    return digits.map(d => parseInt(d));
}

const regexGeneral = /mul\((\d+\,\d+)\)|don't\(\)|do\(\)/g;

const donnotRegex = /don't\(\)/g
const doRegex = /do\(\)/g

const partTwo = async () => {
    const text = await createArray();
    const result: string[] = text.match(regexGeneral);
    // sliding window to remove numbers between don't() and do()

    let l = 0;
    let r = 0;
    for (let i = 0; i < result.length; i++) {
        if (result[i].match(donnotRegex)) {
            l = i;
            result.splice(i, 1, '')
        }
        if (r <= l && l !== 0) {
            if (result[i].match(doRegex)) {
                r = i;
            }
            result.splice(i, 1, '')
        }
    }

    const numberDuos = result.filter(r => r.match(regexMul)).map(r => mulToTwoNumbers(r));
    return numberDuos.reduce((a, b) => a + b[0]*b[1], 0);
}

export async function main() {
    console.log('-------------------------------------------');
    console.log('part one result: ', await partOne());
    console.log('-------------------------------------------');
    console.log('part two result: ', await partTwo());
} 