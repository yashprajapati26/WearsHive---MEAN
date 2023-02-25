const add = (a, b) => {
    if (typeof a === 'number' && typeof b === 'number') {
        return a + b;
    }
    throw Error('Inputs should be numbers');
}

const subtract = (a, b) => {
    if (typeof a === 'number' && typeof b === 'number') {
        return a - b;
    }
    throw Error('Inputs should be numbers');
}

const multiply = (a, b) => {
    if (typeof a === 'number' && typeof b === 'number') {
        return a * b;
    }
    throw Error('Inputs should be numbers');
}

const arrayOperation = async (arr1, arr2) => {
    var sum = []
    if (typeof arr1 === 'object' && typeof arr2 === 'object') {
        for (var i = 0; i < arr1.length; i++) {
            sum[i] = arr1[i] * arr2[i];
        }
        return sum;
    }
    throw Error('Input shoud be in array')
}

module.exports = {
    add,
    subtract,
    multiply,
    arrayOperation
}