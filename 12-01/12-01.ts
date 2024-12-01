import { promises } from 'fs'

const tab1: number[] = []
const tab2: number[] = []
async function displayResultOfTheDay () {
    const data = await promises.readFile('12-01/input.txt', 'utf8')

    const tab = data.split('\n')
    for (let i = 0 ; i < tab.length ; i++) {
    const line = tab[i].split('   ')
    tab1.push(parseInt(line[0]));
    tab2.push(parseInt(line[1]));
    tab1.sort();
    tab2.sort();
    }
}


const sumUpDiffsOfTwoArray = (array1: number[], array2: number[]) => {
    return array1.reduce((a, b, i) => a + Math.abs(b - array2[i]), 0)
}

const calculateSimilarityScore = (array1: number[], array2: number[]) => {
    let i = 0;
    let j = 0;
    const size = array1.length;
    let count = 0;
    let res = 0;
    while (i < size && j < size) {
        if (array1[i] === array2[j]) {
            count++;
            j++;
        } else {
            if(count > 0) {
                res += count * array1[i];
                count = 0;
                i++;
            } else {
                if (array1[i] > array2[j]) {
                    j++
                } else {
                    i++;
                }
            }            
        }
    }
    return res;
}

export async function main() {
    await displayResultOfTheDay();
    console.log('tab1: ', tab1, 'tab2: ', tab2)
    console.log('-------------------------------------------');
    console.log('part one result: ', sumUpDiffsOfTwoArray(tab1, tab2));
    console.log('-------------------------------------------');
    console.log('part two result: ', calculateSimilarityScore(tab1, tab2));
}