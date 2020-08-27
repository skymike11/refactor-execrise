getPlayFor = (plays, perf) => {
    return plays[perf.playID];
};

buildFormatObj = () => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
    }).format;
};

buildTextResult = (plays, invoice, format) => {
    let volumeCredits = 0;
    let totalAmount = 0;
    let result = `Statement for ${invoice.customer}\n`;
    for (let perf of invoice.performances) {
        const play = getPlayFor(plays, perf);
        let thisAmount = countThisAmount(play.type, perf);
        // add volume credits
        volumeCredits += Math.max(perf.audience - 30, 0);
        // add extra credit for every ten comedy attendees
        if ('comedy' === play.type) {
            volumeCredits += Math.floor(perf.audience / 5);
        }
        //print line for this order
        result += ` ${play.name}: ${format(thisAmount / 100)} (${perf.audience} seats)\n`;
        totalAmount += thisAmount;
    }
    result += `Amount owed is ${format(totalAmount / 100)}\n`;
    result += `You earned ${volumeCredits} credits \n`;
    return result;
};

function statement(invoice, plays) {
    const format = buildFormatObj();
    return buildTextResult(plays, invoice, format);
}

countThisAmount = (playType, perf) => {
    let thisAmount = 0;
    switch (playType) {
        case 'tragedy':
            thisAmount = 40000;
            if (perf.audience > 30) {
                thisAmount += 1000 * (perf.audience - 30);
            }
            break;
        case 'comedy':
            thisAmount = 30000;
            if (perf.audience > 20) {
                thisAmount += 10000 + 500 * (perf.audience - 20);
            }
            thisAmount += 300 * perf.audience;
            break;
        default:
            throw new Error(`unknown type: ${play.type}`);
    }
    return thisAmount;
};

module.exports = {
    statement,
};
