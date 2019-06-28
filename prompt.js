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
    recentBills: [],
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
    closeApplication: (application) => {
        //ask user if he would like calculate another bill or show recent bills and terminate tty stream if not
        readline.question('Would you like to calculate another bill? \nType [Y]es to continue || [N]o to exit || [V]iew to show recent bills \n', (value) => {
            if (value.toLocaleLowerCase() === 'yes' || value.toLocaleLowerCase() === 'y') {
                application();
            } else if (value.toLocaleLowerCase() === 'no' || value.toLocaleLowerCase() === 'n') {
                console.log('\nThank you for using bill calculator. Goodbye!')
                readline.close()
                process.stdin.destroy();
            } else if (value.toLocaleLowerCase() === 'view' || value.toLocaleLowerCase() === 'v') {
                let i = 1;
                prompt.recentBills.map((value, index) => {
                    console.log(`${index == 0 ? 1 : index+1}. $${value}`)
                });
                prompt.closeApplication(application);
            } else {
                //ask user again if input is otherwise
                console.log('\nSorry, I did not understand that.')
                prompt.closeApplication(application);
            }
        })
    }
};

module.exports = prompt;