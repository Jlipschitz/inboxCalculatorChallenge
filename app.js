//initiate our cli
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
})

let prompt = {
    //simple text used for the cli and user input functions
    text: {
        greetings: {
            welcome: 'Hello, welcome to Bill Calculator! \n',
            goodbye: 'Thank you for using Bill Calculator! \n'
        },
        queries: {
            bill: 'What is your bill amount? \n',
            tip: 'How much would you like to tip? \n',
            split: 'Are you splitting the bill with anyone? \n',
            splitCount: 'How many will you be splitting with? \n'
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
            //TODO: Add handling for people question
            if (value < 0) {
                return prompt.query(prompt.text.errors[0], cb)
            } else if (isNaN(value)) {
                return prompt.ask(prompt.text.errors[1], cb)
            }

            return cb(value);

        })
    }
};

//invoke our ask functions to gather user input TODO: Nest functions?
prompt.ask(null, 'bill', (value) => {
    console.log(`Your bill amount is: ${value}`)
    readline.close()
    process.stdin.destroy();
})