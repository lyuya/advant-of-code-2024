import { fetchData } from "../fetchTextFile";

async function partOne() {
    const [rules, tests] = await createRulesAndTests();
    let rulesArray = rules.split('\n').map(row => row.split('|'));
    let testsArray = tests.split('\n').map(row => row.split(','));

    let res = []
    for (let i = 0; i < testsArray.length; i++) {
        if (rulesArray.every(rule => {
            return checkRules(rule, testsArray[i])
        })) {
            res.push(testsArray[i])
        }
    }

    const middleSum = res.reduce((a, b) => a + parseInt(b[Math.floor(b.length/2)]), 0)

    return middleSum;
}

function checkRules(rule: string[], test: string[]) {
    let lastIndex0 = test.indexOf(rule[0]);
    if (lastIndex0 === -1) return true;

    let firstIndex1 = test.indexOf(rule[1]);
    if (firstIndex1 === -1) return true;
    return lastIndex0 < firstIndex1;
}

function checkRulesAndCorrect(rule: string[], test: string[]) {
    let lastIndex0 = test.indexOf(rule[0]);
    if (lastIndex0 === -1) return undefined;

    let firstIndex1 = test.indexOf(rule[1]);
    if (firstIndex1 === -1) return undefined;

    if (lastIndex0 < firstIndex1) return undefined;
    test[lastIndex0] = rule[1];
    test[firstIndex1] = rule[0];
    return test;
}

const createRulesAndTests = async () => {
    const data = await fetchData('12-05/input.txt');
    return data.split('\n\n');
}

async function partTwo() {
    const [rules, tests] = await createRulesAndTests();
    let rulesArray = rules.split('\n').map(row => row.split('|'));
    let testsArray = tests.split('\n').map(row => row.split(','));
    let testsIncorrect = [];
    for (let i = 0; i < testsArray.length; i++) {
        if (!rulesArray.every(rule => checkRules(rule, testsArray[i]))) {
            testsIncorrect.push(testsArray[i]);
        }
    }


    testsIncorrect.forEach(test => {
        let finished = false;
        while (!finished) {
            if (rulesArray.every(rule => {
                const res = checkRulesAndCorrect(rule, test);
                let toBeContinued = true;
                if (res) {
                    test = res;
                    toBeContinued = true;
                } else {
                    toBeContinued = false;
                }
                return !toBeContinued
            })) {
                finished = true;
            }
        }
    });


    const middleSum = testsIncorrect.reduce((a, b) => a + parseInt(b[Math.floor(b.length/2)]), 0)

    return middleSum;

}

export async function main() {
    console.log('-------------------------------------------');
    console.log('part one result: ', await partOne());
    console.log('-------------------------------------------');
    console.log('part two result: ', await partTwo());
} 