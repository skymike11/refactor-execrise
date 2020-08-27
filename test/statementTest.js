const test = require('ava');
const {statement} = require('../src/statement');

test('Sample test', t => {
    t.true(true);
    t.is(1, 1);
    t.deepEqual({a: 1}, {a: 1});
});

test('statement case 1. Customer BigCo has one performances hamlet and the audience is 30. ', t => {
    //given
    const invoice = {};
    const plays = [];

    const result = statement(invoice, plays);
    // const result = '';


    t.is(result, '');
});


const invoice = {
    'customer': 'BigCo',
    'performances': [
        {
            'playID': 'hamlet',
            'audience': 55,
        },
        {
            'playID': 'as-like',
            'audience': 35,
        },
        {
            'playID': 'othello',
            'audience': 40,
        },
    ],
};


const plays = {
    'hamlet': {
        'name': 'Hamlet',
        'type': 'tragedy',
    },
    'as-like': {
        'name': 'As You Like It',
        'type': 'comedy',
    },
    'othello': {
        'name': 'Othello',
        'type': 'tragedy',
    },
};