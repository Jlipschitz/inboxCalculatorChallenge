//initiate our cli
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
})

prompt = {
    text: {
        questions: {
            bill: '\nWhat is your bill amount? \n',
            tip: '\nWhat tip percentage would you like to tip? \n',
            split: '\nHow many will be splitting this bill? Please enter 0 if none.\n',
            additionalBill: '\nWould you like to calculate another bill? \n'
        },
        invalidInput: 'Sorry, I did not understand that. Try again. \n'
    },
    recentBills: [],
    getInput: (err, type, callback) => {
        readline.question(!err ? prompt.text.questions[type] : err, (userInput) => {

            let cleanUserInput = parseFloat(
                userInput.replace(/[`~!@#$%^&*()_|+\=?;:'", <>\{\}\[\]\\\/]/gi, '')
            );

            let lowNumberText = `Your ${type} must be higher than 0. Try again. \n`

            //show incorrect input text to user otherwise return input value
            if (cleanUserInput < 0) {
                prompt.getInput(lowNumberText, type, callback)
            } else if (isNaN(cleanUserInput)) {
                return prompt.getInput(prompt.text.invalidInput, type, callback);
            } else if (cleanUserInput === 0 && (type === 'bill' || type === 'tip')) {
                return type !== 'tip' ?
                    prompt.getInput(lowNumberText, type, callback) :
                    prompt.getInput(`Don't be cheap! ${lowNumberText}`, type, callback);
            } else {
                return callback(cleanUserInput);
            }
        })
    },
    closeApplication: (application) => {
        let option = 'Type [Y]es to continue || [N]o to exit|| [V]iew to show recent bills \n'

        //ask user if he would like calculate another bill or show recent bills and terminate tty stream if not
        readline.question(prompt.text.questions.additionalBill + option, (userInput) => {
            if (userInput.toLocaleLowerCase() === 'yes' || userInput.toLocaleLowerCase() === 'y') {
                application();
            } else if (userInput.toLocaleLowerCase() === 'no' || userInput.toLocaleLowerCase() === 'n') {
                console.log('\nThank you for using bill calculator. Goodbye!')
                readline.close()
                process.stdin.destroy();
            } else if (userInput.toLocaleLowerCase() === 'view' || userInput.toLocaleLowerCase() === 'v') {
                //show recent bills with bill, tip, split (if any) and total
                prompt.recentBills.map((value, index) => {
                    console.log(`\n${index == 0 ? 1 : index + 1}.`
                        + `Bill amount: $${value.amount.bill} | `
                        + `Tip amount: $${value.amount.tip} | `
                        + `Split with: ${value.amount.split} people | `
                        + `Total: $${value.amount.total}`)
                });
                prompt.closeApplication(application);
            } else {
                //ask user again if input is otherwise
                console.log(prompt.text.invalidInput)
                prompt.closeApplication(application);
            }
        })
    }
};

module.exports = prompt;