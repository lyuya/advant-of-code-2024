import { fetchData } from "../fetchTextFile";

async function partOne() {
    let map = await createRulesAndTests();

    // find start position
    let currentPosition;
    let count = 0;
    for (let i = 0; i < map.length; i++) {
        if (map[i].includes('^')) {
            currentPosition = [map[i].indexOf('^'), i];
            map[i][currentPosition[0]] = '.';
            break;
        }
    }

    const replaceXAndCount = () => {
        count++
        map[currentPosition[1]][currentPosition[0]] = 'X';
    } 
    // move
    const move = (direction: string) => {
        switch(direction) {
            case '^':
                while (map[currentPosition[1]][currentPosition[0]] === '.' || map[currentPosition[1]][currentPosition[0]] === 'X') {
                    if (map[currentPosition[1]][currentPosition[0]] === '.') {
                        replaceXAndCount()
                    }

                    currentPosition = [currentPosition[0], currentPosition[1]-1];

                    // touch border
                    if (!map[currentPosition[1]-1]?.[currentPosition[0]]) {
                        replaceXAndCount()
                        break;
                    }
                    // obstacle
                    if (map[currentPosition[1]-1][currentPosition[0]] === '#') {
                        move('>');
                        break;
                    }
                }

            break;

            case '>':
                while (map[currentPosition[1]][currentPosition[0]] === '.' || map[currentPosition[1]][currentPosition[0]] === 'X') {
                    if (map[currentPosition[1]][currentPosition[0]] === '.') {
                        replaceXAndCount()
                    }


                    currentPosition = [currentPosition[0]+1, currentPosition[1]];

                    // obstacle
                    if (map[currentPosition[1]][currentPosition[0]+1] === '#') {
                        move('v');
                        break;
                    }
                    // touch border
                    if (!map[currentPosition[1]][currentPosition[0]+1]) {
                        replaceXAndCount()
                        break;
                    }
                }

            break;

            case 'v':
                while (map[currentPosition[1]][currentPosition[0]] === '.' || map[currentPosition[1]][currentPosition[0]] === 'X') {
                    if (map[currentPosition[1]][currentPosition[0]] === '.') {
                        replaceXAndCount()
                    }
                    currentPosition = [currentPosition[0], currentPosition[1]+1];

                    // touch border
                    if (!map[currentPosition[1]+1]?.[currentPosition[0]]) {
                        replaceXAndCount()
                        break;
                    }
                    // obstacle
                    if (map[currentPosition[1]+1][currentPosition[0]] === '#') {
                        move('<');
                        break;
                    }
                }

            break;

            case '<':
                while (map[currentPosition[1]][currentPosition[0]] === '.' || map[currentPosition[1]][currentPosition[0]] === 'X') {
                    if (map[currentPosition[1]][currentPosition[0]] === '.') {
                        replaceXAndCount()
                    }
                    
                    currentPosition = [currentPosition[0]-1, currentPosition[1]];

                    // obstacle
                    if (map[currentPosition[1]][currentPosition[0]-1] === '#') {
                        move('^');
                        break;
                    }

                    // touch border
                    if (!map[currentPosition[1]][currentPosition[0]-1]) {
                        replaceXAndCount()
                        break;
                    }
                }
            break;
        }
    }

    move('^');

    return count;
}

const next = {
    '^': '>',
    '>': 'v',
    'v': '<',
    '<': '^'
}

async function partTwo() {
    let map = await createRulesAndTests();

    // find start position
    let currentPosition;
    let count = 0;
    for (let i = 0; i < map.length; i++) {
        if (map[i].includes('^')) {
            currentPosition = [map[i].indexOf('^'), i];
            map[i][currentPosition[0]] = '.';
            break;
        }
    }

    
}

const createRulesAndTests = async () => {
    const data = await fetchData('12-06/input.txt');
    return data.split('\n').map(row => row.split(''));
}


export async function main() {
    // console.log('-------------------------------------------');
    // console.log('part one result: ', await partOne());
    console.log('-------------------------------------------');
    console.log('part two result: ', await partTwo());
}