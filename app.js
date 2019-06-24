const prompt = require('./prompt.js');

console.log(prompt.text.greetings.welcome);

//invoke our ask functions to gather user input
prompt.ask(null, 'bill', (totalBillValue) => {
    prompt.ask(null, 'tip', (totalTipPercentage) => {
        prompt.ask(null, 'split', (totalSplitValue) => {

            //after we've gathered inputs do the bill maths
            let totalOwed = totalSplitValue > 0 ? parseFloat((totalBillValue + ((totalTipPercentage / 100) * totalBillValue)) / totalSplitValue).toFixed(2)
                : parseFloat(totalBillValue + ((totalTipPercentage / 100) * totalBillValue)).toFixed(2);
            
            //display amount the person(s) owe
            totalSplitValue > 0 && totalSplitValue > 1 ? 
                console.log(`You each owe $${totalOwed}.`)
                : console.log(`You owe $${totalOwed}.`)

            //wave goodbye!    
            console.log(prompt.text.greetings.goodbye)

            prompt.close();
        })
    })
});