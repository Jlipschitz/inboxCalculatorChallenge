const prompt = require('./prompt.js');
const username = require("os").userInfo().username;

console.log(`Hello! Welcome ${username} to bill calculator. \n`);

const startApplication = () => {

    //invoke our ask functions to gather user input
    prompt.getInput(null, 'bill', (totalBillValue) => {
        prompt.getInput(null, 'tip', (totalTipPercentage) => {
            prompt.getInput(null, 'split', (totalSplitValue) => {

                //after user inputs are gather calculate owed amount and split if need be
                let totalOwed = totalSplitValue > 0 ? parseFloat((totalBillValue + ((totalTipPercentage / 100) * totalBillValue)) / totalSplitValue).toFixed(2)
                    : parseFloat(totalBillValue + ((totalTipPercentage / 100) * totalBillValue)).toFixed(2);

                //display amount the person(s) owe
                totalSplitValue > 0 && totalSplitValue > 1 ?
                    console.log(`You each owe $${totalOwed}. \n `)
                    : console.log(`You owe $${totalOwed}. \n`)

                prompt.recentBills.push(totalOwed)
                prompt.closeApplication(startApplication);
            })
        })
    })
};

startApplication();