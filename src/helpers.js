"use strict";
exports.__esModule = true;
exports.validateFxn = exports.consoleBuffer = exports.consoleEnd = exports.consoleStart = void 0;
var consoleStart = function () {
    console.log('\x1b[33m', 'Running test cases...');
    console.log('');
};
exports.consoleStart = consoleStart;
var consoleEnd = function () {
    console.log('\x1b[33m', 'End of test cases...');
    console.log('\x1b[37m', '');
    console.log('');
};
exports.consoleEnd = consoleEnd;
var consoleBuffer = function () {
    console.log('--------------------------');
    console.log('--------------------------');
    console.log('\n');
};
exports.consoleBuffer = consoleBuffer;
var validateFxn = function (output, answer) {
    console.log('\x1b[36m%s\x1b[0m', '🛠 Testing function...');
    if (Array.isArray(output) &&
        Array.isArray(answer) &&
        JSON.stringify(output) === JSON.stringify(answer)) {
        console.log('\x1b[32m', '✅ CORRECT ARRAYS :: ' + output + ' === ' + answer);
    }
    else if (output === answer) {
        console.log('\x1b[32m', '✅ CORRECT :: ' + output + ' === ' + answer);
    }
    else {
        console.log('\x1b[31m', '⭕ WRONG :: Output was ' + output + ' - expected ' + answer);
    }
    console.log();
};
exports.validateFxn = validateFxn;
