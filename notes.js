const fs = require('fs');
const chalk = require('chalk');

const log = console.log;

const addNote = (title, body) => {
    let notesData = loadNote();
    //debugger;
    if(notesData) {
        const index = notesData.findIndex((note)=>{
            return note.title === title;
        });
        if(index !== -1) {
            notesData[index].body = body;
            log(chalk.blue('Note Updated'));
        } else {
            notesData.push({title, body});
            log(chalk.green('Note Added'));
        }
        saveNote(notesData);
    } else {
        const obj = [{title,body}];
        saveNote(obj);
        log(chalk.green('Note Added'));
    }
}

const loadNote = () => {
    const bufferedData = fs.readFileSync('notes.json');
    if(bufferedData.length) {
        const notesData = bufferedData.toString();
        return JSON.parse(notesData);
    }
}

const saveNote = (data) => {
    fs.writeFileSync('notes.json', JSON.stringify(data));
}

const removeNote = (title) => {
    const notesData = loadNote();
    const index = notesData.findIndex((note)=> note.title === title);
    if(index !== -1) {
        notesData.splice(index, 1);
        saveNote(notesData);
        console.log(chalk.green(`Note with title - ${title} has been remove`));
    } else {
        console.log(chalk.red(`There is no such note with title ${title}`));
    }
}

const readNote = () => {
    const data = loadNote();
    if(data.length) {
        console.log(chalk.yellow(data));
    }
}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    readNote: readNote
}