const test = require('ava');
const {statement} = require('../src/statement');
test('should_return_true_info_when_statement_given_hamlet_performances_with_30_audience', t => {
    //given
    const invoice = {
        'customer': 'BigCo',
        'performances': [
            {
                'playID': 'hamlet',
                'audience': 30,
            }
        ],
    };
    const plays = {
        'hamlet': {
            'name': 'Hamlet',
            'type': 'tragedy',
        }
    };
    //when
    const result = statement(invoice, plays);
    const except = "Statement for BigCo\n" +
        " Hamlet: $400.00 (30 seats)\n" +
        "Amount owed is $400.00\n" +
        "You earned 0 credits \n";
    //then
    t.is(result, except);
});

test('should_return_true_info_when_statement_given_hamlet_performances_with_31_audience', t => {
    //given
    const invoice = {
        'customer': 'BigCo',
        'performances': [
            {
                'playID': 'hamlet',
                'audience': 31,
            }
        ],
    };
    const plays = {
        'hamlet': {
            'name': 'Hamlet',
            'type': 'tragedy',
        }
    };
    //when
    const result = statement(invoice, plays);
    const except = "Statement for BigCo\n" +
        " Hamlet: $410.00 (31 seats)\n" +
        "Amount owed is $410.00\n" +
        "You earned 1 credits \n";
    //then
    t.is(result, except);
});

test('should_return_true_info_when_statement_given_as-like_performances_with_20_audience', t => {
    //given
    const invoice = {
        'customer': 'BigCo',
        'performances': [
            {
                'playID': 'as-like',
                'audience': 20,
            }],
    };
    const plays = {
        'as-like': {
            'name': 'As You Like It',
            'type': 'comedy',
        }
    };
    //when
    const result = statement(invoice, plays);
    const except = "Statement for BigCo\n" +
        " As You Like It: $360.00 (20 seats)\n" +
        "Amount owed is $360.00\n" +
        "You earned 4 credits \n";
    //then
    t.is(result, except);

});

test('should_return_true_info_when_statement_given_as-like_performances_with_21_audience', t => {
    //given
    const invoice = {
        'customer': 'BigCo',
        'performances': [
            {
                'playID': 'as-like',
                'audience': 21,
            }],
    };
    const plays = {
        'as-like': {
            'name': 'As You Like It',
            'type': 'comedy',
        }
    };
    //when
    const result = statement(invoice, plays);
    const except = "Statement for BigCo\n" +
        " As You Like It: $468.00 (21 seats)\n" +
        "Amount owed is $468.00\n" +
        "You earned 4 credits \n";
    //then
    t.is(result, except);
});


test('should_return_unknow_exception_when_statement_given_happiness_performances', t => {
    //given
    const invoice = {
        'customer': 'BigCo',
        'performances': [
            {
                'playID': 'happiness',
                'audience': 21,
            }],
    };
    const plays = {
        'as-like': {
            'name': 'As You Like It',
            'type': 'comedy',
        }
    };
    //when
    try {
        const result = statement(invoice, plays);
    } catch (e) {
        //then
        t.is(e.message, "Cannot read property \'type\' of undefined")
    }
});
//


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