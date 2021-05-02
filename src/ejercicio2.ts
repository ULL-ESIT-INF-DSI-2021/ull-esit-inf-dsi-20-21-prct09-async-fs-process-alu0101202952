import {spawn} from 'child_process';
import * as yargs from 'yargs';
import {access, constants} from 'fs';


/**
 * Función que muestra la información de un fichero utilizando los comandos wc y echo empleando
 * el método pipe para ello
 * @param path Ruta del fichero
 * @param charact Opción para mostar caracteres del fichero
 * @param word Opción para mostar palabras del fichero
 * @param line Opción para mostar lineas del fichero
 */
function withPipe(path: string, charact: boolean, word: boolean, line: boolean): void {
    access(path, constants.F_OK, (err) => {
        if (err) {
            console.log(`Path ${path}, does not exist`);
        } else {
            const wc = spawn('wc', [path]);
            let result = '';
            wc.stdout.on('data', (chunk) => (result += chunk));
            wc.on('close', () => {
                // Divide el string con los saltos de líneas, tabulaciones,etc.
                const parts = result.split(/\s+/);
                if (line) {
                    const echo = spawn('echo', [`The file has: ${parseInt(parts[1])} lines`]);
                    echo.stdout.pipe(process.stdout);
                }
                if (word) {
                    const echo = spawn('echo', [`, ${parseInt(parts[2])} words`]);
                    echo.stdout.pipe(process.stdout);
                }
                if (charact) {
                    const echo = spawn('echo', [`and ${parseInt(parts[3])} characters`]);
                    echo.stdout.pipe(process.stdout);
                }
            });
        }
    });
}

/**
 * Función que muestra la información de un fichero mediante el uso del comando wc, sin pipe
 * @param path Ruta del fichero
 * @param charact Opción para mostar caracteres del fichero
 * @param word Opción para mostar palabras del fichero
 * @param line Opción para mostar lineas del fichero
 */
function withOutPipe(path: string, charact: boolean, word: boolean, line: boolean): void {
    access(path, constants.F_OK, (err) => {
        if (err) {
            console.log(`Path ${path}, does not exist`);
        } else {
            const wc = spawn('wc', [path]);
            let result = '';
            wc.stdout.on('data', (chunk) => (result += chunk));
            wc.on('close', () => {
                const parts = result.split(/\s+/);
                let finalResult = '';
                if (line) {
                    finalResult+= `The file has: ${parseInt(parts[1])} lines\n`;
                }
                if (word) {
                    finalResult+= `, ${parseInt(parts[2])} words\n`;
                }
                if (charact) {
                    finalResult+= `and ${parseInt(parts[3])} characters\n`;
                }
                console.log(finalResult);
            });
        }
    });
}

/**
 * Comando info muestra la información de un fichero, este comando que puede recibe 5 parámetros, el nombre del fichero, si se utiliza el método pipe, si se desea mostar los caracteres,
 * palabras o líneas del fichero
 */
yargs.command({
    command: 'showinfo',
    describe: 'Show the information of a file',
    builder: {
        filePath: {
            describe: 'Path of the file',
            demandOption: true,
            type: 'string',
        },
        pipe: {
            // Si es o no con pipe
            describe: 'Use the function with/without pipe',
            demandOption: true,
            type: 'boolean',
        },
        characters: {
            describe: 'Count characters',
            demandOption: true,
            type: 'boolean',
        },
        words: {
            describe: 'Count words',
            demandOption: true,
            type: 'boolean',
        },
        lines: {
            describe: 'Count lines',
            demandOption: true,
            type: 'boolean',
        },
    },
    handler(argv) {
        if (typeof argv.filePath === 'string' && typeof argv.pipe === 'boolean' && typeof argv.characters === 'boolean' && typeof argv.words === 'boolean' && typeof argv.lines === 'boolean') {
            if (argv.pipe) {
                withPipe(argv.filePath, argv.characters, argv.words, argv.lines);
            } else {
                withOutPipe(argv.filePath, argv.characters, argv.words, argv.lines);
            }
        }
    },
});

yargs.parse();