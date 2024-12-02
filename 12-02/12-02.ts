import { fetchData } from "../fetchTextFile";

const checkSafe = (array: string[]) => {
    let firstDif = parseInt(array[1]) - parseInt(array[0]);
    for (let i = 0; i < array.length - 1; i++) {
        const dif = parseInt(array[i+1]) - parseInt(array[i]);
        if ((dif > 0 && firstDif > 0) || (dif < 0 && firstDif < 0)) {
            if ( Math.abs(dif) > 3) {
                return false;
            }
        } else {
            return false;
        }
    }
    return true;
}

const checkSafe2 = (array: string[]) => {
    const increasing = parseInt(array[array.length - 1]) - parseInt(array[0]) > 0;
    const dummyEle = increasing ? parseInt(array[0]) - 1 : parseInt(array[0]) + 1;
    let newArray = [dummyEle, ...array.map(n => parseInt(n))];
}

const checkAll  = (increasing: boolean, array: number[] ) => {
    let res = [];
    if (increasing) {
        res = array.filter((num, i) => {
            if (array[i+1] - num <= 0 || array[i+1] - num > 3) return i;
        });
    } else {
        res = array.filter((num, i) => {
            if (array[i+1] - num >= 0 || array[i+1] - num < -3) return i;
        });
    }
    return res;
}

const createArray = async () => {
    const data = await fetchData('12-02/input.txt');
    const tab = data.split('\n');
    return tab.map(t => t.split(' '));
}

const partOne = async () => {
    const arrays = await createArray()
    return arrays.reduce((a, b) => {
        return a + (checkSafe(b)? 1 : 0)
    }, 0);
}

const partTwo = async () => {
    const arrays = await createArray()
    return arrays.reduce((a, b) => {
        if(checkSafe2(b)) console.log('safe: ', checkSafe2(b), b);
        return a + (checkSafe2(b)? 1 : 0)
    }, 0);
}

export async function main() {
    console.log('-------------------------------------------');
    console.log('part one result: ', await partOne());
    console.log('-------------------------------------------');
    console.log('part two result: ', await partTwo());
} 