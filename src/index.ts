#! /usr/bin/env node

import chalk from "chalk";
import inquirer from "inquirer";

console.log(`
█████╗ ████████╗███╗   ███╗    ███╗   ███╗ █████╗  ██████╗██╗  ██╗██╗███╗   ██╗███████╗
██╔══██╗╚══██╔══╝████╗ ████║    ████╗ ████║██╔══██╗██╔════╝██║  ██║██║████╗  ██║██╔════╝
███████║   ██║   ██╔████╔██║    ██╔████╔██║███████║██║     ███████║██║██╔██╗ ██║█████╗  
██╔══██║   ██║   ██║╚██╔╝██║    ██║╚██╔╝██║██╔══██║██║     ██╔══██║██║██║╚██╗██║██╔══╝  
██║  ██║   ██║   ██║ ╚═╝ ██║    ██║ ╚═╝ ██║██║  ██║╚██████╗██║  ██║██║██║ ╚████║███████╗
╚═╝  ╚═╝   ╚═╝   ╚═╝     ╚═╝    ╚═╝     ╚═╝╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝╚═╝╚═╝  ╚═══╝╚══════╝
`);

let totalBalance = 1_20_000;

let machine = async () => {
    return await inquirer.prompt({
        type: "list",
        name: "options",
        choices: ["Check Balance", "WithDraw Cash", "Deposit Cash", "Account Details", "Cancel"],
        message: "Enter your choice?",
    });
}

let withDraw = async () => {
    return await inquirer.prompt({
        type: "list",
        name: "draw",
        choices: ["1000", "2000", "5000", "10000", "20000"],
        message: "With Draw Your Money"
    });
}

let accountDetails = (nic: string | number) => {
    return [{
            "name": "Muhammad Raza Bangi",
            "contact": "03242190023",
            "nic": "4230127643284",
            "bank": "Meezan Bank",
            "branch": "saddar",
            "city": "Karachi"
        }, 
        {
            "name": "Hassan Raza Hasrat",
            "contact": "03115426548",
            "nic": "4240128643289",
            "bank": "Habib Bank",
            "branch": "malir",
            "city": "Karachi"
    }];
}

let checkBalance = () => {
    return totalBalance;
}

let enterPin = async () => {
    return await inquirer.prompt({
        type: "number",
        name: "pin",
        message: "Enter a pin code (hint: 1234)",
        default: 1234
    })
    .then((value) => {
        if(value.pin === 1234) {
            machine().then((value) => {
                switch (value.options) {
                    case "Check Balance":
                        console.log(chalk.blue.bold(checkBalance()));                                                 
                        break;
                    case "WithDraw Cash":
                        withDraw().then((value) => {
                            console.log(chalk.green.bold(`You are choosen ${value.draw} and your remaining amount is ${checkBalance() - value.draw}`));
                        });                       
                        break;
                    case "Account Details":
                        inquirer.prompt({
                            type: "number",
                            name: "detail",
                            message: "Enter your NIC number?",
                            default: "4230127643284"
                        }).then(value => console.log(accountDetails(value.detail).find(e => e.nic == value.detail)));
                        break;
                    case "Deposit Cash":
                        inquirer.prompt([{
                            type: "number",
                            name: "another_account",
                            message: "Enter the depositer account number"
                        }, {
                            type: "number",
                            name: "payment",
                            message: "Payment you want to transfer?"
                        }]).then((value) => {
                            console.log(chalk.blue.bold(`${value.payment} has been transfer against ${value.another_account}`));                            
                        })
                        break;
                    case "Cancel":
                        enterPin();
                        break;
                    default:
                        break;
                }
            })
        } else {
            console.log(chalk.red.bold(`Pin code is not valid`));
        }
    })
}

enterPin();
