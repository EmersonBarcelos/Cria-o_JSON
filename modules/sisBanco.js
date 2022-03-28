module.exports = class SisBanco {

    constructor() {
        this.inquirer = require('inquirer');
        this.chalk = require('chalk');
        this.fs = require('fs');
    }
    menu () {
        this.inquirer
        .prompt([
            {
                type: 'list',
                name: 'options',
                message: 'Escolha uma opção:',
                choices: [
                    'Criar conta',
                    'Sair',
                ],
            },
        ])
        .then((answers) => {
            const options = answers['options'];
            
            switch (options) {
                case 'Criar conta':
                    this.criarConta();
                    break;
                case 'Sair':
                    console.log(this.chalk.bgBlack.red('Até mais, obrigado por utilizar a aplicação XPTO'));
                    process.exit();
                    break;
            }
        })
    }
    criarConta(){
        this.inquirer
        .prompt([
            { name: 'nroConta', message: 'Digite um numero para conta:'},
            { name: 'saldo', message: 'Digite o saldo inicial:'},
        ])
        .then((answers) => {

            const valor = parseFloat(answers.saldo)

            console.log(this.chalk.yellow('Executando abertura de conta...'))

            if (!this.fs.existsSync('contas_bancarias')){
                this.fs.mkdirSync('contas_bancarias')
            }
            this.salvarArquivo(answers)
            console.log(this.chalk.green('conta criada com sucesso!'))
            this.menu()
    })
    
    }
    salvarArquivo(answers) {
        let dataJSON;
        let data;

        if (!this.fs.existsSync("contas_bancarias/registros.json")) {
            data = `[{"numero_conta":${answers.nroConta}, "saldo_inicial":${answers.saldo}}]`
        }else {
            dataJSON = this.fs.readFileSync("contas_bancarias/registros.json",'utf8');
            data = JSON.parse(dataJSON);
            data.push({"numero_conta":(answers.nroConta), "saldo_inicial":(answers.saldo)});
            data = JSON.stringify(data)
        }

        this.fs.writeFileSync(
            "contas_bancarias/registros.json",
            data,
            function (err) {
                console.log(err)
            },
        )

    }

}


