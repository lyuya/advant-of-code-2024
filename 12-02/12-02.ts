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
    const numbers = array.map(str => parseInt(str));
    const increasing = checkIncreasingOrDecreasing(numbers);
    let intrus;
    if (increasing) {
        intrus = allElementsAreIncreasingAndSafe(numbers)
    } else {
        intrus = allElementsAreDecreasingAndSafe(numbers)
    }

    if (intrus.length === 0) return true;

    const copy = [...numbers]
    copy.splice(intrus[0], 1);

    let intrus2;
    if (increasing) {
        intrus2 = allElementsAreIncreasingAndSafe(copy)
    } else {
        intrus2 = allElementsAreDecreasingAndSafe(copy)
    }

    const copy2 = [...numbers]
    copy2.splice(intrus[0]-1, 1);

    let intrus3;
    if (increasing) {
        intrus3 = allElementsAreIncreasingAndSafe(copy2)
    } else {
        intrus3 = allElementsAreDecreasingAndSafe(copy2)
    }

    return intrus2.length === 0 || intrus3.length === 0;

}

const checkIncreasingOrDecreasing = (array: number[]) => {
    const soustractions = []
    for (let i = 1; i < array.length; i++) {
        soustractions.push(array[i] - array[i-1]);
    }
    const positives = soustractions.filter(s => s > 0);
    return positives.length > array.length / 2;
}

const allElementsAreIncreasingAndSafe = (array: number[]) => {
    const intrus = [];
    for (let i = 1;i < array.length; i++) {
        const dif = array[i] - array[i-1]
        if (dif <= 0 || dif > 3) {
            intrus.push(i);
        }
    }
    return intrus;
}

const allElementsAreDecreasingAndSafe = (array: number[]) => {
    const intrus = [];
    for (let i = 1;i < array.length; i++) {
        const dif = array[i] - array[i-1];
        if (dif >= 0 || dif < -3) {
            intrus.push(i);
        }
    }
    return intrus;
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