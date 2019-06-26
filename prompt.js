//initiate our cli
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
})

prompt = {
    text: {
        queries: {
            bill: 'What is your bill amount? \n',
            tip: 'What tip percentage would you like to tip? \n',
            split: 'How many will be splitting this bill? Please enter 0 if none.\n'
        }
    },
    getInput: (err, type, callback) => {
        readline.question(!err ? prompt.text.queries[type] : err, (value) => {

            //convert user input to a float and strip away special characters
            value = parseFloat(
                value.replace(/[`~!@#$%^&*()_|+\=?;:'", <>\{\}\[\]\\\/]/gi, '')
            );

            //show incorrect input text to user otherwise return input value;
            if (value < 0) {
                prompt.getInput(`Sorry, your ${type} must be higher than 0. Try again. \n`, type, callback)
            } else if (isNaN(value)) {
                return prompt.getInput('Sorry, I did not understand that. Try again. \n', type, callback);
            } else if (value === 0 && (type === 'bill' || type === 'tip')) {
                return type !== 'tip' ?
                    prompt.getInput(`Sorry, your ${type} must be higher than 0. Try again. \n`, type, callback) :
                    prompt.getInput(`Don't be cheap! Your ${type} must be higher than 0. Try again. \n`, type, callback);
            } else {
                return callback(value);
            }
        })
    },
    closeApplication: (runApplication) => {
        //ask user if he would like calculate another bill and terminate tty stream if not
        readline.question('Would you like to calculate another bill? \nType [Y]es or [N]o \n', (value) => {
            if (value.toLocaleLowerCase() === 'yes' || value.toLocaleLowerCase() === 'y') {
                runApplication();
            } else if (value.toLocaleLowerCase() === 'No' || value.toLocaleLowerCase() === 'n') {
                console.log('\nThank you for using bill calculator. Goodbye!')
                readline.close()
                process.stdin.destroy();
            } else {
                //ask user again if input is otherwise
                console.log('\nSorry, I did not understand that.')
                prompt.closeApplication(runApplication);
            }
        })
    }
};

module.exports = prompt;