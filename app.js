const prompt = require('./prompt.js');

console.log(`Hello! Welcome to bill calculator. \n`);

const startApplication = () => {

    //invoke our ask functions to gather user input
    prompt.getInput(null, 'bill', (totalBillValue) => {
        prompt.getInput(null, 'tip', (totalTipPercentage) => {
            prompt.getInput(null, 'split', (totalSplitValue) => {

                //do maths on the amount inputs gathered from user
                let checkSplit = () => { return totalSplitValue >= 2 ? true : false }

                let amount = {
                    bill: totalBillValue,
                    tip: (totalBillValue * (totalTipPercentage / 100)).toFixed(2),
                    split: checkSplit() ? totalSplitValue : 0,
                    total: checkSplit() ? ((totalBillValue + ((totalTipPercentage / 100) * totalBillValue)) / totalSplitValue).toFixed(2)
                        : (totalBillValue + ((totalTipPercentage / 100) * totalBillValue)).toFixed(2)
                }

                //show the amounts that the person(s) owe
                console.log(
                    `\nBill: $${(checkSplit() ? (amount.bill / totalSplitValue) : amount.bill).toFixed(2)} + `
                    + `%${totalTipPercentage} `
                    + `Tip: $${(checkSplit() ? (amount.tip / totalSplitValue).toFixed(2) : amount.tip)}`
                );
                console.log(`You ${checkSplit() ? 'each owe' : 'owe'}: $${amount.total}.`);

                //store the bill caculated and ask user if he would like to calculate another bill
                prompt.recentBills.push({ amount })
                prompt.closeApplication(startApplication);
            })
        })
    })
};

startApplication();