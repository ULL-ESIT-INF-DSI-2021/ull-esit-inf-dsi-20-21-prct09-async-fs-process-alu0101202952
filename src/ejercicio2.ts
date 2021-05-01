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
            console.log(`Ruta ${path}, no existe, compruebe la ruta`);
        } else {
            const wc = spawn('wc', [path]);
            let result = '';
            wc.stdout.on('data', (chunk) => (result += chunk));
            wc.on('close', () => {
                // Divide el string con los saltos de líneas, tabulaciones,etc.
                const parts = result.split(/\s+/);
                if (line) {
                    const echo = spawn('echo', [`El fichero tiene: ${parseInt(parts[1])} lineas`]);
                    echo.stdout.pipe(process.stdout);
                }
                if (word) {
                    const echo = spawn('echo', [`, ${parseInt(parts[2])} palabras`]);
                    echo.stdout.pipe(process.stdout);
                }
                if (charact) {
                    const echo = spawn('echo', [`y ${parseInt(parts[3])} caracteres`]);
                    echo.stdout.pipe(process.stdout);
                }
            });
        }
    });
}

/**
 * Función que se encarga de mostrar la información de un fichero mediante el uso del comando wc, sin pipe
 * @param path Ruta del fichero
 * @param charact Opción para mostar caracteres del fichero
 * @param word Opción para mostar palabras del fichero
 * @param line Opción para mostar lineas del fichero
 */
function withOutPipe(path: string, charact: boolean, word: boolean, line: boolean): void {
    access(path, constants.F_OK, (err) => {
        if (err) {
            console.log(`Ruta ${path}, no existe, compruebe la ruta`);
        } else {
            const wc = spawn('wc', [path]);
            let result = '';
            wc.stdout.on('data', (chunk) => (result += chunk));
            wc.on('close', () => {
                const parts = result.split(/\s+/);
                let finalResult = '';
                if (line) {
                    finalResult+= `El fichero tiene: ${parseInt(parts[1])} lineas\n`;
                }
                if (word) {
                    finalResult+= `, ${parseInt(parts[2])} palabras\n`;
                }
                if (charact) {
                    finalResult+= `y ${parseInt(parts[3])} caracteres\n`;
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
    describe: 'Muestra la información de un fichero',
    builder: {
        filePath: {
            describe: 'Ruta del fichero',
            demandOption: true,
            type: 'string',
        },
        pipe: {
            // Si es o no con pipe
            describe: 'Uso del método pipe',
            demandOption: true,
            type: 'boolean',
        },
        characters: {
            describe: 'Recuento de caracteres',
            demandOption: true,
            type: 'boolean',
        },
        words: {
            describe: 'Recuento de palabras',
            demandOption: true,
            type: 'boolean',
        },
        lines: {
            describe: 'Recuento de líneas',
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

// Ejemplo de ejecución: node dist/ejercicio2.js showinfo --fichero=hola.txt --pipe=true --caracteres=true --palabras=true --lineas=true
yargs.parse();