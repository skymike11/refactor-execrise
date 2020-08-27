const COMEDY = 'comedy';
const TRAGEDY = 'tragedy';
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

getVolumeCredits = (plays, invoice) => {
    let volumeCredits = 0;
    for (let perf of invoice.performances) {
        const play = getPlayFor(plays, perf);
        volumeCredits += Math.max(perf.audience - 30, 0);
        if (COMEDY === play.type) {
            volumeCredits += Math.floor(perf.audience / 5);
        }
    }
    return volumeCredits;
};

getTotalAmount = (performances, plays) => {
    let totalAmount = 0;
    for (let perf of performances) {
        const play = getPlayFor(plays, perf);
        let thisAmount = countThisAmount(play.type, perf);
        totalAmount += thisAmount;
    }
    return totalAmount;
};

getResultBodyDetail = (invoice, plays, format) => {
    let result;
    for (let perf of invoice.performances) {
        const play = getPlayFor(plays, perf);
        let thisAmount = countThisAmount(play.type, perf);
        result += ` ${play.name}: ${format(thisAmount / 100)} (${perf.audience} seats)\n`;
    }
    return result;
};

buildTextResult = (plays, invoice, format) => {
    let volumeCredits = 0;
    let result = `Statement for ${invoice.customer}\n`;
    result += getResultBodyDetail(invoice, plays, format);
    return result + `Amount owed is ${format(getTotalAmount(invoice.performances, plays) / 100)}\n` + `You earned ${getVolumeCredits(plays, invoice)} credits \n`;
};

statement = (invoice, plays) => {
    const format = buildFormatObj();
    return buildTextResult(plays, invoice, format);
};

countThisAmount = (playType, perf) => {
    let thisAmount = 0;
    switch (playType) {
        case TRAGEDY:
            thisAmount = 40000;
            if (perf.audience > 30) {
                thisAmount += 1000 * (perf.audience - 30);
            }
            break;
        case COMEDY:
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
