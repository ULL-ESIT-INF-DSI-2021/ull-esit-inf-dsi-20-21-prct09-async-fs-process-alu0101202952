import { TodoItem } from "./todoItem";
import { TodoCollection } from "./todoCollection";
import {watchFile} from 'fs';
import {readFile} from 'fs';
import * as yargs from 'yargs';

const chalk = require('chalk');

let todos: TodoItem[] = [];
let collection: TodoCollection = new TodoCollection("Andrea", todos);

/**
 * Yargs.command = add
 * Se añade las notas con un formato similar a:
 * add --user="edusegre" --title="Red note" --body="This is a red note" --color="red"
 */
yargs.command({
  command: 'add',
  describe: 'Add a new note',
  builder: {
    user: {
      describe: 'Note user',
      demandOption: true,
      type: 'number',
    },
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string',
    },
    body: {
      describe: 'Note body',
      demandOption: true,
      type: 'string',
    },
    color: {
      describe: 'Note color',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.user === 'number' && typeof argv.title === 'string' && typeof argv.body === 'string' && typeof argv.color === 'string') {
      console.clear();
      console.log(chalk.green(`${argv.user}'s Todo List: added task`));
      //Se llamaría a dichos métodos para añadir la nota al gual que se crea el directorio del usuario si no existe
      let userNotes = collection.loadTodo(argv.user);
      let color = collection.getTodoColor(argv.color);
      if (color) {
        userNotes.push(new TodoItem(argv.user, argv.title, argv.body, argv.color));
        collection.saveTodo(userNotes, argv.user.toString());
      } else {
        console.log('Invalid color');
        console.log('Admited colors: Red, Blue, Green, Yellow, Black');
      } 
    }
  },
});

/**
 * Yargs.command = modify
 * Se modifican las notas con un formato similar a:
 * modify --user="edusegre" --title="Red note" --body="This is a red note" --color="red"
 */
yargs.command({
  command: 'modify',
  describe: 'Modify an exist note',
  builder: {
    user: {
      describe: 'Note user',
      demandOption: true,
      type: 'number',
    },
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string',
    },
    body: {
      describe: 'Note body',
      demandOption: true,
      type: 'string',
    },
    color: {
      describe: 'Note color',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.user === 'number' && typeof argv.title === 'string' && typeof argv.body === 'string' && typeof argv.color === 'string') {
      console.clear();
      console.log(chalk.green(`${argv.user}'s Todo List: modify task`));
      watchFile('BuyFlowers.txt', (curr, prev) => {
        //Mensajes informativos si se cambió la nota con el tamaño que tenia antes y el que tiene tras modificar
        console.log(chalk.green(`File size was ${prev.size} bytes before it was modified`));
        console.log(chalk.green(`Now file size is ${curr.size} bytes`));
      });
    }
  },
});

/**
 * Yargs.command = remove
 * Se eliminan las notas con un formato similar a:
 * remove --user="edusegre" --title="Red note"
 */
yargs.command({
  command: 'remove',
  describe: 'Remove a complete note',
  builder: {
    user: {
      describe: 'Note user',
      demandOption: true,
      type: 'number',
    },
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.user === 'number' && typeof argv.title === 'string') {
      console.clear();
      console.log(chalk.green(`${argv.user}'s Todo List: remove task`));
      collection.removeComplete();
    }
  },
});

/**
 * Yargs.command = list
 * Se mustran todas las notas con un formato similar a:
 * list --user="edusegre"
 */
yargs.command({
  command: 'list',
  describe: 'List notes',
  builder: {
    user: {
      describe: 'Note user',
      demandOption: true,
      type: 'number',
    },
  },
  handler(argv) {
    if (typeof argv.user === 'number') {
      console.clear();
      console.log(chalk.green(`${argv.user}'s Todo List`));
      let task = collection.loadTodo(argv.user);
      console.log(chalk.green('Listing tasks for user ' + argv.user + '...\n'));
      for (const note of task) {
        console.log(note.getTitle() + ' ');
      }
    } else {
    console.log('Error');
    }
  },
});

/**
 * Yargs.command = read
 * Se lee la nota específica con un formato similar a:
 * read --user="edusegre" --title="Red note"
 */
yargs.command({
  command: 'read',
  describe: 'Read an existing note',
  builder: {
    user: {
      describe: 'Notes owner',
      demandOption: true,
      type: 'number',
    },
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.user === 'number' && typeof argv.title === 'string') {
      readFile(`./${argv.user}/${argv.title}`, (error,datos) => {
        if (error)
          console.log(error);
        else
          console.log(datos.toString());
      }); 
    }
  },
});

yargs.parse();
