//initiate our cli
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
})
//get users machine username
const username = require("os").userInfo().username

prompt = {
    //simple text used for the cli and user input functions
    text: {
        greetings: {
            welcome: `Hello ${username} welcome to Bill Calculator! \n`,
            goodbye: '\nThank you for using Bill Calculator!'
        },
        queries: {
            bill: 'What is your bill amount? \n',
            tip: 'What tip percentage would you like to tip? \n',
            split: 'How many will be splitting this bill? Please enter 0 if none.\n'
        },
        errors: {
            0: 'Sorry, number must be higher than 0. Please try again. \n',
            1: 'Sorry, that is not a valid number. Please try again. \n',
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
                return prompt.query(`Sorry, your ${type} amount must be higher than 0. Try again.`, type, cb)
            } else if (isNaN(value)) {
                return prompt.ask('Sorry, I did not understand that. Try again.', type, cb)
            } else {
                return cb(value);
            }
        })
    },
    close: () => {
        //end tty stream otherwise it will continuously run
        readline.close()
        process.stdin.destroy();
    }
};

module.exports = prompt;