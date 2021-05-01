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
            console.log(`Ruta ${path}, no existe`);
        } else {
            // O_DIRECTORY, indica que la apertura debe fallar si la ruta no es un directorio,
            // entonces es fichero
            fs.open(path, fs.constants.O_DIRECTORY, (err) => {
                if (err) {
                    console.log(`${path} es un fichero`);
                } else {
                    console.log(`${path} es un directorio`);
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
            console.log('No se ha podido crear el directorio porque ya existe');
        } else {
            fs.mkdir(path, (err) => {
                if (err) {
                    console.log('No se pudo crear el directorio');
                } else {
                    console.log('Directorio creado');
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
            console.log(`Ruta ${path}, no existe`);
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
            console.log(`Ruta ${path}, no existe`);
        } else {
            fs.open(path, fs.constants.O_DIRECTORY, (err) => {
                if (!err) {
                    console.log(`${path} es un directorio, no un fichero`);
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
            console.log(`Ruta ${path}, no existe`);
        } else {
            // Opción para borra recursivo
            const rm = spawn('rm', ['-r', path]);
            rm.on('close', (err) => {
                if (err) {
                    console.log('No se ha podido eliminar el fichero');
                } else {
                    console.log('Eliminado correctamente');
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
            console.log(`Ruta ${src} o ${dst}, no existe, compruebe la ruta`);
        } else {
            const cp = spawn('cp', ['-r', src, dst]);
            cp.on('close', (err) => {
                if (err) {
                    console.log('No se ha podido mover el directorio');
                } else {
                    console.log('Se ha copiado correctamente');
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
    describe: 'Comprobar si es un directorio o un fichero',
    builder: {
        path: {
            describe: 'Ruta que se quiere comprobar',
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
    describe: 'Crear un directorio',
    builder: {
        path: {
            describe: 'Ruta donde se quiere crear el directorio',
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
    describe: 'Listar ficheros de un directorio',
    builder: {
        path: {
            describe: 'Ruta que se quiere listar',
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
    describe: 'Mostrar contenido de un fichero',
    builder: {
        path: {
            describe: 'Fichero que se quiere mostrar',
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
    describe: 'Eliminar un fichero o un directorio',
    builder: {
        path: {
            describe: 'Directorio que se quiere eliminar',
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
    describe: 'Mover un directorio o fichero a una ruta especificada ',
    builder: {
        src: {
            describe: 'Directorio que se quiere eliminar',
            demandOption: true,
            type: 'string',
        },
        dst: {
            describe: 'Directorio que se quiere eliminar',
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