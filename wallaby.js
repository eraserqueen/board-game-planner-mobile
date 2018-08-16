/*
  WallabyJS React Native Config
  Works well with Jest + Enzyme
*/
/* eslint-disable */
module.exports = function (wallaby) {
    return {
        files: [
            'src/**/*.js',
            { pattern: 'src/**/__tests__/*.js', ignore: true },
            { pattern: 'src/**/*.test.js', ignore: true },
        ],

        tests: [
            'src/**/__tests__/*.js',
            'src/**/*.test.js',
        ],

        env: {
            type: 'node',
            runner: 'node',
        },

        testFramework: 'jest',

        compilers: {
            '**/*.js': wallaby.compilers.babel(),
        },

        setup: (wallaby) => {

            global.expect = require('chai').expect;

            wallaby.testFramework.configure(require('./package.json').jest);
        },
    };
};