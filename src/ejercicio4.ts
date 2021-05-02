import {spawn} from 'child_process';
import * as yargs from 'yargs';
import * as fs from 'fs';
import {access, constants} from 'fs';

/**
 * Función comprueba si una ruta es un fichero o un directorio
 * esto mediante la constante predefinida para el fallo de la apertura de un directorio 
 * https://nodejs.org/api/fs.html#fs_file_open_constants
 * @param path ruta que se quiere comprobar
 */
function isDirectory(path: string) {
    access(path, constants.F_OK, (err) => {
        if (err) {
            console.log(`Path ${path}, does not exist`);
        } else {
            // O_DIRECTORY, indica que la apertura debe fallar si la ruta no es un directorio,
            // entonces es fichero
            fs.open(path, fs.constants.O_DIRECTORY, (err) => {
                if (err) {
                    console.log(`${path} is a file`);
                } else {
                    console.log(`${path} is a directory`);
                }
            });
        }
    });
}

/**
 * Función que crea un directorio en la ruta especificada (mkdir)
 * @param path ruta donde se quiere crear el directorio
 */
function mkdirDirectory(path: string) {
    access(path, constants.F_OK, (err) => {
        if (err) {
            console.log('The directory could not be created because it already exists');
        } else {
            fs.mkdir(path, (err) => {
                if (err) {
                    console.log('The directory could not be created');
                } else {
                    console.log('Directory created');
                }
            });
        }
    });
}

/**
 * Función que lista el contenido de un directorio
 * https://nodejs.org/dist/latest/docs/api/child_process.html#child_process_child_process_spawn_command_args_options
 * @param path directorio que se quiere listar
 */
function lsDirectory(path: string) {
    access(path, constants.F_OK, (err) => {
        if (err) {
            console.log(`Path ${path}, does not exist`);
        } else {
            // Para listar con ls hace falta la función spawn y los childprocess
            const ls = spawn('ls', [path]);
            let result = '';
            ls.stdout.on('data', (chunk) => (result += chunk));
            ls.on('close', () => {
                console.log(result);
            });
        }
    });
}

/**
 * Función que se encarga de mostrar el contenido de un fichero
 * @param path fichero que se quiere mostrar
 */
function catFile(path: string) {
    access(path, constants.F_OK, (err) => {
        if (err) {
            console.log(`Path ${path}, does not exist`);
        } else {
            fs.open(path, fs.constants.O_DIRECTORY, (err) => {
                if (!err) {
                    console.log(`${path} is a directory but it is not a file`);
                } else {
                    const cat = spawn('cat', [path]);
                    let result = '';
                    cat.stdout.on('data', (chunk) => (result += chunk));
                    cat.on('close', () => {
                        console.log(result);
                    });
                }
            });
        }
    });
}

/**
 * Función que elimina un fichero o un directorio
 * @param path ruta que se quiere eliminar
 */
function removeFD(path: string) {
    access(path, constants.F_OK, (err) => {
        if (err) {
            console.log(`Path ${path}, does not exist`);
        } else {
            // Opción para borra recursivo
            const rm = spawn('rm', ['-r', path]);
            rm.on('close', (err) => {
                if (err) {
                    console.log('The file could not be deleted');
                } else {
                    console.log('File deleted');
                }
            });
        }
    });
}

/**
 * Función que copia un fichero o directorio a otra ruta
 * @param src ruta de origen
 * @param dst ruta de destino
 */
function move(src: string, dst: string) {
    access(src, constants.F_OK, (err) => {
        if (err) {
            console.log(`Path ${src} or ${dst} does not exist, check both path`);
        } else {
            const cp = spawn('cp', ['-r', src, dst]);
            cp.on('close', (err) => {
                if (err) {
                    console.log('The directory could not be moved');
                } else {
                    console.log('Directory has been moved');
                }
            });
        }
    });
}


/**
 * Yargs.command = cd
 * Comprueba si es un directorio o fichero
 */
yargs.command( {
    command: 'cdd',
    describe: 'Check that if it is a directory or a file',
    builder: {
        path: {
            describe: 'Path that you want to check',
            demandOption: true,
            type: 'string',
        },
    },
    handler(argv) {
        if (typeof argv.path === "string") {
            isDirectory(argv.path);
        }
    },
});

/**
 * Yargs.command = mkD
 * Crea un directorio
 */
yargs.command( {
    command: 'mkd',
    describe: 'Create a directory',
    builder: {
        path: {
            describe: 'Path that you want to create the directory',
            demandOption: true,
            type: 'string',
        },
    },
    handler(argv) {
        if (typeof argv.path === "string") {
            mkdirDirectory(argv.path);
        }
    },
});

/**
 * Yargs.command = lsf
 * Lista ficheros de un directorio
 */
yargs.command( {
    command: 'lsf',
    describe: 'List files of directory',
    builder: {
        path: {
            describe: 'Path of the directory you want to list',
            demandOption: true,
            type: 'string',
        },
    },
    handler(argv) {
        if (typeof argv.path === "string") {
            lsDirectory(argv.path);
        }
    },
});

/**
 * Yargs.command = catf
 * Muestra el contenido de un ficheto
 */
yargs.command( {
    command: 'catf',
    describe: 'Show content of a file',
    builder: {
        path: {
            describe: 'File with the content to be displayed',
            demandOption: true,
            type: 'string',
        },
    },
    handler(argv) {
        if (typeof argv.path === "string") {
            catFile(argv.path);
        }
    },
});

/**
 * Yargs.command = rmfd
 * Elimina un fichero o directorio
 */
yargs.command( {
    command: 'rmfd',
    describe: 'Delete a file or directory',
    builder: {
        path: {
            describe: 'File/Directory you want to delete',
            demandOption: true,
            type: 'string',
        },
    },
    handler(argv) {
        if (typeof argv.path === "string") {
            removeFD(argv.path);
        }
    },
});

/**
 * Yargs.command = mvfd
 * Mueve un directorio o fichero a una ruta especificada
 */
yargs.command( {
    command: 'mvfd',
    describe: 'Move a directory or file to a specified path ',
    builder: {
        src: {
            describe: 'Source path where the file/directory is',
            demandOption: true,
            type: 'string',
        },
        dst: {
            describe: 'Destination path where the file/directory will be moved',
            demandOption: true,
            type: 'string',
        },
    },
    handler(argv) {
        if (typeof argv.src === "string" && typeof argv.dst === "string") {
            move(argv.src, argv.dst);
        }
    },
});


yargs.parse();