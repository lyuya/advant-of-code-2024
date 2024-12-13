import { fetchData } from "../fetchTextFile";

let history = new Set();
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

    const replaceXAndCount = (position) => {
        count++
        history.add(position);
        map[currentPosition[1]][currentPosition[0]] = 'X';
    } 
    // move
    const move = (direction: string) => {
        switch(direction) {
            case '^':
                while (map[currentPosition[1]][currentPosition[0]] === '.' || map[currentPosition[1]][currentPosition[0]] === 'X') {
                    if (map[currentPosition[1]][currentPosition[0]] === '.') {
                        replaceXAndCount(currentPosition)
                    }

                    currentPosition = [currentPosition[0], currentPosition[1]-1];

                    // touch border
                    if (!map[currentPosition[1]-1]?.[currentPosition[0]]) {
                        replaceXAndCount(currentPosition)
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
                        replaceXAndCount(currentPosition)
                    }


                    currentPosition = [currentPosition[0]+1, currentPosition[1]];

                    // obstacle
                    if (map[currentPosition[1]][currentPosition[0]+1] === '#') {
                        move('v');
                        break;
                    }
                    // touch border
                    if (!map[currentPosition[1]][currentPosition[0]+1]) {
                        replaceXAndCount(currentPosition)
                        break;
                    }
                }

            break;

            case 'v':
                while (map[currentPosition[1]][currentPosition[0]] === '.' || map[currentPosition[1]][currentPosition[0]] === 'X') {
                    if (map[currentPosition[1]][currentPosition[0]] === '.') {
                        replaceXAndCount(currentPosition)
                    }
                    currentPosition = [currentPosition[0], currentPosition[1]+1];

                    // touch border
                    if (!map[currentPosition[1]+1]?.[currentPosition[0]]) {
                        replaceXAndCount(currentPosition)
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
                        replaceXAndCount(currentPosition)
                    }
                    
                    currentPosition = [currentPosition[0]-1, currentPosition[1]];

                    // obstacle
                    if (map[currentPosition[1]][currentPosition[0]-1] === '#') {
                        move('^');
                        break;
                    }

                    // touch border
                    if (!map[currentPosition[1]][currentPosition[0]-1]) {
                        replaceXAndCount(currentPosition)
                        break;
                    }
                }
            break;
        }
    }

    move('^');

    return count;
}

// ----------------------------------

function movePartTwo(map, stop, countLoop) {

    let currentPosition;
    let count = 0;
    for (let i = 0; i < map.length; i++) {
        if (map[i].includes('^')) {
            currentPosition = [map[i].indexOf('^'), i];
            map[i][currentPosition[0]] = '.';
            break;
        }
    }

    const moveInDirection = (dx, dy, nextMove) => {
        while (map[currentPosition[1]][currentPosition[0]] === '.') {
            count++;
            currentPosition = [currentPosition[0] + dx, currentPosition[1] + dy];
    
            // Touch border or obstacle
            const nextPosition = [currentPosition[0] + dx, currentPosition[1] + dy];
            if (!map[nextPosition[1]]?.[nextPosition[0]]) break;
            if (map[nextPosition[1]][nextPosition[0]] === '#') {
                move(nextMove);
                break;
            }
        }
    };
    
    const move = (direction) => {
        if (count >= stop) {
            countLoop++;
            return;
        }
        const directions = {
            '^': { dx: 0, dy: -1, next: '>' },
            '>': { dx: 1, dy: 0, next: 'v' },
            'v': { dx: 0, dy: 1, next: '<' },
            '<': { dx: -1, dy: 0, next: '^' },
        };
        const { dx, dy, next } = directions[direction];
        moveInDirection(dx, dy, next);
    };
    move('^')
    return countLoop;
}

async function partTwo() {
    let map = await createRulesAndTests();
    let countLoop = 0;

    const nbPlaces = map.length * map[0].length;
    let newMap;

    history.forEach((point) => {
        if (map[point[1]][point[0]] !== '#' && map[point[1]][point[0]] !== '^') {
            newMap = JSON.parse(JSON.stringify(map));
            newMap[point[1]][point[0]] = '#';
            countLoop = movePartTwo(newMap, nbPlaces, countLoop);
        }

    });

    return countLoop;
}

const createRulesAndTests = async () => {
    const data = await fetchData('12-06/input.txt');
    return data.split('\n').map(row => row.split(''));
}



export async function main() {
    console.log('-------------------------------------------');
    console.log('part one result: ', await partOne());
    console.log('-------------------------------------------');
    console.log('part two result: ', await partTwo());
}

// async function partTwo() {
//     let map = await createRulesAndTests();
//     let count = 0;

//     const nbPlaces = map.length * map[0].length;
//     let newMap;

//     history.forEach((point) => {
//         if (map[point[1]][point[0]] !== '#' && map[point[1]][point[0]] !== '^') {
//             newMap = JSON.parse(JSON.stringify(map));
//             map[point[1]][point[0]] = '#';
//             count = movePartTwo(newMap, nbPlaces, count);
//             console.log('count', count);
//         }

//     });

//     return count;
// }