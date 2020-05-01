const validator = require('validator');
const chalk = require('chalk');
const yargs = require('yargs');
const notes = require('./notes');

yargs.command({
    command: 'remove',
    describe: "remove a note",
    builder: {
        title: {
            describe: "Note title",
            demandOption: true,
            type: "string"
        }
    },
    handler: (argv)=>{
        notes.removeNote(argv.title);
    }
})

yargs.command({
    command: 'add',
    describe: 'add a notes',
    builder: {
        title: {
            describe: "note title",
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Notes body',
            demandOption: false,
            type: 'string'
        }
    },
    handler: (argv)=>{
        console.log(chalk.green(`Adding a note: ${argv.body}`));
        notes.addNote(argv.title, argv.body);
    }

});

yargs.command({
    command: 'read',
    describes: 'reads all notes',
    handler: ()=>{
        notes.readNote();
    }
});


 //console.log(process.argv);
yargs.argv;