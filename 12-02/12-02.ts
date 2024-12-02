import { fetchData } from "../fetchTextFile";

const checkSafe = (array: string[]) => {
    let firstDif = parseInt(array[1]) - parseInt(array[0]);
    for (let i = 1; i < array.length - 1; i++) {
        const dif = parseInt(array[i+1]) - parseInt(array[i]);
        if ((dif > 0 && firstDif > 0) || (dif < 0 && firstDif < 0)) {
            if ( Math.abs(dif) > 3 || Math.abs(dif) < 1) {
                return false;
            }
        } else {
            return false;
        }
    }
    return true;
}

const checkAllArray = async () => {
    const data = await fetchData('12-02/input.txt');
    const tab = data.split('\n');
    const arrays = tab.map(t => t.split(' '));
    return arrays.reduce((a, b) => {
        if(checkSafe(b)) console.log('safe: ', checkSafe(b), b);
        return a + (checkSafe(b)? 1 : 0)
    }, 0);
}

export async function main() {
    console.log('-------------------------------------------');
    console.log('part one result: ', await checkAllArray());
    console.log('-------------------------------------------');
    // console.log('part two result: ', calculateSimilarityScore(tab1, tab2));
} 