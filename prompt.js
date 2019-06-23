//initiate our cli
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
})

prompt = {
    //simple text used for the cli and user input functions
    text: {
        greetings: {
            welcome: 'Hello, welcome to Bill Calculator! \n',
            goodbye: 'Thank you for using Bill Calculator! \n'
        },
        queries: {
            bill: 'What is your bill amount? \n',
            tip: 'What tip percentage would you like to put? \n',
            split: 'How many will be splitting this bill? Please enter 0 if none.\n'
        },
        errors: {
            0: 'Sorry, number must be higher than 0. Please try again. \n',
            1: 'Sorry, that is not a valid number. Please try again. \n'
        }
    },
    ask: (err, type, cb) => {
        //gather user input from command line
        readline.question(!err ? prompt.text.queries[type] : err, (value) => {

            //convert user input to a float and strip away special characters
            value = parseFloat(
                value.replace(/[`~!@#$%^&*()_|+\-=?;:'", <>\{\}\[\]\\\/]/gi, '')
            );

            //error handling to make sure the bill amount is usable
            if (value < 0) {
                return prompt.query(prompt.text.errors[0], cb)
            } else if (isNaN(value)) {
                return prompt.ask(prompt.text.errors[1], cb)
            }

            return cb(value);

        })
    },
    close: () => {
        //end tty stream otherwise it will continuously run
        readline.close()
        process.stdin.destroy();
    }
};

module.exports = prompt;