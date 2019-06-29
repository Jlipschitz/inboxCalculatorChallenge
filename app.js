const prompt = require('./prompt.js');

console.log(`Hello! Welcome to bill calculator. \n`);

const startApplication = () => {

    //invoke our ask functions to gather user input
    prompt.getInput(null, 'bill', (totalBillValue) => {
        prompt.getInput(null, 'tip', (totalTipPercentage) => {
            prompt.getInput(null, 'split', (totalSplitValue) => {

                //do maths on the amount inputs gathered from user
                let amount = {
                    bill: totalBillValue,
                    tip: totalBillValue * (totalTipPercentage / 100).toFixed(2),
                    split: totalSplitValue >= 2 ? totalSplitValue : 0,
                    total: totalSplitValue >= 2 ? parseFloat((totalBillValue + ((totalTipPercentage / 100) * totalBillValue)) / totalSplitValue).toFixed(2) :
                        parseFloat(totalBillValue + ((totalTipPercentage / 100) * totalBillValue)).toFixed(2)
                }

                //show the amounts that the person(s) owe
                console.log(`\nYou ${totalSplitValue >= 2 ? 'each owe' : 'owe'}: $${amount.total}.`)

                //store the bill caculated and ask user if he would like to calculate another bill
                prompt.recentBills.push({ amount })
                prompt.closeApplication(startApplication);
            })
        })
    })
};

startApplication();