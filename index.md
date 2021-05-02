# Informe Práctica 9: Sistema de ficheros y creación de procesos en Node.js


![nodejs](https://i.imgur.com/ZC4Uvhk.png)



╔═══════════════════════════════════════════════════════════════════╗

> - Autora: Andrea Calero Caro > [alu0101202952@ull.edu.es](alu0101202952@ull.edu.es)
> - Práctica 9: Sistema de ficheros y creación de procesos en Node.js
> - Asignatura: Desarrollo de Sistemas Informáticos
> - Universidad de La Laguna

╚═══════════════════════════════════════════════════════════════════╝



▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂


## Índice


  - Objetivos
  - Paso previo: Aceptación de tarea de GitHub Classroom
  - Estructura básica de proyectos
  - Instalación, configuración Typedoc
  - Instalación, configuración Mocha y Chai
  - Instalación, configuración Coverage, Instanbul, Coveralls
  - Estructura programa 
    -   Desarrollo del código
  - GitHubActions: workflows, Coveralls
  - Desarrollo del informe con GitHub Pages
  - Conclusiones
  - Bibliografía y/o Webgrafía
  
  



▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂


## OBJETIVOS


En esta práctica se plantean una serie de ejercicios o retos a resolver haciendo uso de las APIs proporcionadas por Node.js para interactuar con el sistema de ficheros, así como para crear procesos.

**ENLACE A LA DOCUMENTACIÓN EN TYPEDOC**
> - [Informe documentación con Typedoc](http://127.0.0.1:5500/docs/)



▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂


## PASO PREVIO: ACEPTACIÓN DE TAREA DE GITHUB CLASSROOM


Antes de comenzar se nos requiere que aceptemos la tarea asignada en el GitHub Classroom:

![Asignación GitHub Classroom](https://i.imgur.com/XqdrTl3.jpg)

Con ello ya podríamos trabajar en esta práctica.



▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂


## ESTRUCTURA BÁSICA DE PROYECTOS


Lo primero sería estructurar el workspace de nuestra práctica, primero clonaremos el repositorio y lo iremos estructurando:

Se comienza modificando el **package.json** y creando el fichero de configuración **tsconfig.json** como se ha visto en prácticas anteriores.

Se quedaría el **package.json** tal que:

![packagejson](https://i.imgur.com/EwYa3A3.jpg)

Se crean el directorio `./src` y sus ejecutables .js en el directorio `./dist`, como hemos hecho en otras prácticas.

Manualmente, se crearía ambos directorios donde trabajaremos. 

También se necesita una compilación con control automático de cambios que se instalará con el comando `npm install --save-dev tsc-watch`

Por último en la organización de la estructura básica será la instalación del paquete **EsLint**, esto por si quisiéramos comprobar la sintaxis de nuestro código, encontrar y solucionar problemas en el mismo. Primero lo instalamos con el comando:

> `npm install -g eslint` 

Y lo inicializamos con `eslint --init` añadiéndole esto valores:

![Configuración Eslint](https://i.imgur.com/Xp8pzj7.jpg)

Luego modificar el fichero .eslint.

Además crearemos el fichero .gitignore donde excluiremos los siguientes directorios: 

![gitignore](https://i.imgur.com/DzHhrEB.jpg)

Tras la estructura básica se trabajará en el directorio `./src` donde se alojan los .ts correspondientes a cada clase que se me he planteado para la correcta organización del código de nodas de node.js manteniendo así los principios SOLID, además de preparar la documentación con typedoc y las pruebas unitarias (TDD) con Mocha y Chai.



▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂


## INSTALACIÓN. CONFIGURACIÓN TYPEDOC

Para conocer más sobre esta herramienta consultar [Typedoc](https://typedoc.org/). Como ya desde la práctica 3 nos habíamos introducido a la herramienta **Typedoc**, solo queda seguir los mismos pasos mecánicos para esta práctica. Dicho informe creado en Typedoc hecho con los comentarios de los ejercicios de esta práctica se aloja en:

[Informe Typedoc Práctica 9](http://127.0.0.1:5500/docs/) 

O también mirando en los apartados **Objetivos** y **Bibliografía/ webgrafía** de este informe.

Comenzamos con la instalación de typedoc.

Con ello podemos ver que se ha creado un directorio, que es como organizará typedoc la documentación que es por módulos, creando así `./node_modules`. Continuaremos con la configuración para poder usar Typedoc, primero si no se ha creado por defecto crear el **typedoc.json**, lo creamos y le añadimos la ruta de los ficheros a los que haremos el seguimiento de documentación. Y en el apartado `"out: "` pondremos el directorio donde se alojará toda esa documentación. Tras guardar dicha configuración se genereará automáticamente el directorio `./doc`.


Ya tendríamos la documentación en el directorio `./doc` para ejecutarla serviría con el comando ´npm run doc´ como antes especificamos. 
Esto genera documentación pero a partir de comentarios de TypeScript del estilo `/** */` con esta forma especificando la función, los parámetros, lo que devuelve, los snippet...

Esto guardaría esos comentarios en forma de página HTML para la documentación, tendríamos que ir al fichero `index.html` en el directorio de `./modules`, y con el click derecho pinchar sobre la opción de: __Open with Live Server__ y así generaría una página HTML con los comentarios en forma de documentación.

Finalizando así la documentación con Typedoc.



━━━━━━━━━━━━━━━━━━━━━━━━━━✧❂✧━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━






▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂


## INSTALACIÓN. CONFIGURACIÓN MOCHA Y CHAI

En este apartado como ya hemos anteriormentem, tendremos que volver a ejecutar dichos pasos para poder trabajar con Pruebas Unitarias con las herramientas **Mocha** y **Chai**. Primero instalaremos las dependencias y paquetes de Mocha y chai. 

A continuación con el comando `touch .mocharc.json` crearemos el fichero de configuración de la herramienta Mocha, este irá en la raíz de el proyecto y nos indicará utilidades para hacer TDD, es decir las pruebas unitarias. Para ello le indicaremos que las pruebas unitaras se alojarán en el directorio **./tests** y tendrán una terminología de **.spec.ts**. 

Como ha pasado con la herramienta **Typedoc** indicaremos en el **package.json** con qué comando, ejecutaremos la herramienta de mocha. Esta herramienta se ejecuta tal que `npm run [nombre_de_invocación]`, el nombre de invocación en nuestro caso será **test**, quedando el comando completo para ejecutar las pruebas unitarias de la forma: 

> `npm run test`

Este nombre de invocación es el que configuraremos en el package.json
Finalizando con todo esto la configuración de las herramientas necesarias para ejecutar los ejercicios mediante TDD. Quedando la estructura final con los ficheros además del .nojekyll.



━━━━━━━━━━━━━━━━━━━━━━━━━━✧❂✧━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━



▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂


## INSTALACIÓN, CONFIGURACIÓN COVERAGE, INSTANBUL, COVERALLS

Comenzaremos instalando los paquetes y dependencias de las herramientas asociadas a Instanbul, como es **nyc** y la de **coveralls**, como se han visto en prácticas anteriores y se enlazará el repositorio, tras hacerlo **público** a coveralls. Se copia el token del repo en un fichero creado .coveralls.yml, tal que:

![token](https://i.imgur.com/hK1QAaT.jpg)

A la hora de conectarlo con Coveralls este me ha dado fallo y no me genera correctamente el badges.


━━━━━━━━━━━━━━━━━━━━━━━━━━✧❂✧━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━



▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂


## ESTRUCTURA DEL PROGRAMA

La idea es alojar en el directorio ./src todo el código .ts relativo a los 4 ejercicios planteado y que a continuación pasaré a explicar en detalle. La estructura final del repositorio se presenta como:

![estructura final](https://i.imgur.com/PAECrxC.jpg)

Lo ideal es hacer todo esto con metodología TDD, pero debido a que se trabaja con procesos de node.js se han omitido test salvo en el ejercicio 3, que no se ha realizado, sólo puesto el ejercicio de la práctica 8, y sus pruebas unitarias.

━━━━━━━━━━━━━━━━━━━━━━━━━━✧❂✧━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

### EJERCICIO 1

La idea de este ejercicio, se planteó de copiar el código proporcionado y a modo de traza mediante comentarios a continuación se planteó la muestra, paso a paso, el contenido de la pila de llamadas, el registro de eventos de la API y la cola de manejadores de Node.js, además de lo que se muestra por la consola.

Para ello la idea principal se basó en crear mediante la función console.table() que aporta Node.js una tabla con los pasos, pero debido a problemas se planteó por comentarios la traza.

![traza](https://i.imgur.com/3OZ2WOA.jpg)


━━━━━━━━━━━━━━━━━━━━━━━━━━✧❂✧━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

### EJERCICIO 2

En el siguiente ejercicio se debe escribir una aplicación que proporcione información sobre el número de líneas, palabras o caracteres que contiene un fichero de texto. Y crear dos funciones **withPipe** y **withoutPipe**, que emplean el método pipe de un Stream. Para ello se hace uso de la gestión del paso de parámetros con **yargs**, en este programa es mediante el comando **showinfo**.
La forma de invocar la información que se quiere recibir sobre número de caracteres, lineas y palabras es: 
> `node dist/ejercicio2.js showinfo --filePath=hola.txt --pipe=true --characters=true --words=true --lines=true`

Argumentos:
- _--filePath=hola.txt_ : fichero del que se quiere obtener información
- _--pipe=true_ : por defecto se obtiene a true que usemos la función withPipe, si este estuviera a false, entonces sería withoutPipe.
- _--characters=true_ : por defecto cuente caracteres
- _--words=true_ : por defecto cuente las palabras
- _--lines=true:_ : por defecto cuente las líneas 

Al ejercutar el comando por consola se mostraría como:

![funcionamiento](https://i.imgur.com/1AWNicf.jpg)

Siendo el fichero hola.txt: 

![hola](https://i.imgur.com/Ud2jGvz.jpg)

Y siendo el código de ambas funciones:

1) FUNCIÓN WITHPIPE()

![withpipe](https://i.imgur.com/O4Vfca7.jpg)

Esta función consistió de acudir a la función pipe aportada por stdout, esto para poder redirigir la salida de un comando hacia otro. Por ello en el código se invoca dicho método.

El problema que no consigo resolver es porqué los caracteres no me dan los que deben deberían de ser 9 caracteres pero da 11 caracteres, entonces entiendo que toma los saltos de líneas o algo así como un caracter más, pero no he sabido resolver esto.

2) FUNCIÓN WITHOUTPIPE()

![withoutpipe](https://i.imgur.com/ayS4T6N.jpg)

Esta función consistió en acumular en un string la cantidad de caracteres, palabras y líneas, esto está en **finalResult**


━━━━━━━━━━━━━━━━━━━━━━━━━━✧❂✧━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

### EJERCICIO 3

Este ejercicio se plateó como copiando el código y pruebas de la práctica 8, porque por tema de tiempo, se tenía implementado el watchFile para la modificación de las notas, pero no se pudo terminar, quedando la estructura como:

![estructura](https://i.imgur.com/SZ0LFQO.jpg)


━━━━━━━━━━━━━━━━━━━━━━━━━━✧❂✧━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

### EJERCICIO 4

En este ejercicio se plantea desarrollar una aplicación que permita hacer de wrapper de los distintos comandos empleados en Linux para el manejo de ficheros y directorios. En concreto, la aplicación deberá permitir:

1) Dada una ruta concreta, mostrar si es un directorio o un fichero.

![4-1](https://i.imgur.com/2pdY89d.jpg)

Para la implementación hice uso del método O_DIRECTORY de **constants**, este reconoce si un elemento es un directorio, y se puede emplear dicho principio para distinguir mediante dicho fallo si es un fichero y mostrar por pantalla que se trata de un fichero o si, por el contrario se trata de un directorio,

El comando sería, con el ejemplo de fichero por ejemplo anterior:
> `node dist/ejercicio4.js cdd --path=hola.txt`

Como se puede observar, el comando invocante es **cdd**.

Y por consola sacaría: 
> `hola.txt is a file`

A continuación se muestra un ejemplo de funcionamiento sería, tanto para directorio como para fichero:

![funcionamiento](https://i.imgur.com/pmPMO66.jpg)

2) Crear un nuevo directorio a partir de una nueva ruta que recibe como parámetro.

![4-2](https://i.imgur.com/cL3JNTG.jpg)

Para la implementación de este comando se basa en un simil del conocido comando **mkdir**, pero a la hora de plantearlo con el proceso de access resultó que sólo saca un error, como si no entrase y saltase al primer error de esta función, por ello la otra optativa que se planteó fue seguir el formato de la anterior práctica a la hora de crear el directorio, pero como no sé si es permitido no he procedido con ello. Pero que se conozca que se tiene en cuenta y no se sabe si estaría permitido.

El comando sería:
> `node dist/ejercicio4.js mkd --path=nuevodir`

Como se puede observar, el comando invocante es **mkd**.

Pero aunque el directorio no exista me sale el error primero que se muestra en la implementación de la función:

![error](https://i.imgur.com/kuNeEzL.jpg)


3 Listar los ficheros dentro de un directorio.

![4-3](https://i.imgur.com/wYrRmAf.jpg)

Para la implementación de este comando, me basé en el proceso access, spawn para su implementación como con otros comandos, este resultó más sencillo y su puesta en funcionamiento es correcta. Mostraré luego un ejemplo de ello.

El comando sería:
> `node dist/ejercicio4.js lsf --path=tests`

En este caso analizo los ficheros que tenga el directorio tests, y este tiene dos, los dos de pruebas unitarias del ejercicio3:

![funcionamiento](https://i.imgur.com/5KwMZjU.jpg)

4) Mostrar el contenido de un fichero (similar a ejecutar el comando cat).

La implementación de este comando es similar pero con la opción cat del método spawn.

El comando sería:
> `node dist/ejercicio4.js catf --path=hola.txt`

Mostrándose correctamente:

![funcionamiento](https://i.imgur.com/SUM2D00.jpg)


5) Borrar ficheros y directorios.

![4-5](https://i.imgur.com/laqvnpP.jpg)

Para la implementación con el método spawn de rm, podremos borrar el fichero que se indique.

El comando sería:
> `node dist/ejercicio4.js rmfd --path=hola.txt`

Y después de tiempo usándolo se borraría nuestro querido fichero hola.txt. El funcionamiento sería:

![funci](https://i.imgur.com/TpIdoh9.jpg)

6) Mover y copiar ficheros y/o directorios de una ruta a otra. Para este caso, la aplicación recibirá una ruta origen y una ruta destino. En caso de que la ruta origen represente un directorio, se debe copiar dicho directorio y todo su contenido a la ruta destino.

![4-6](https://i.imgur.com/Ox9rSa9.jpg)

El funcionamiento sería igual pero con mv.

El comando sería:
> `node dist/ejercicio4.js mvfd --src=prueba --dst=tests`

El funcionamiento, primero cree un directorio llamado prueba, en la raíz, y se comprueba que en el directorio tests no está:

![2](https://i.imgur.com/9BbmrnE.jpg)

Luego se ejecuta el comando:

![3](https://i.imgur.com/tpRs8NM.jpg)

Y se comprueba que con dicho comando falla: 

![4](https://i.imgur.com/qyPcjde.jpg)

Sin embargo si el código lo modificamos para que sea en vez de mover, copiar y ejecutamos desde este punto si funciona, entonces funcioa con cp y no con mv_

![cod](https://i.imgur.com/etNJRos.jpg)


━━━━━━━━━━━━━━━━━━━━━━━━━━✧❂✧━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

![fumn](https://i.imgur.com/724YHCc.jpg)

━━━━━━━━━━━━━━━━━━━━━━━━━━✧❂✧━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━


 
▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂


## GITHUB ACTIONS: WORKFLOWS, COVERALLS

En esta parte tenemos que hacer momentáneamente el repositorio público en github para poder engancharlo con GitHub Actions y Coveralls y así hacer el seguimiento continuo de github Actions y luego el de coveralls quedando:

Copiando el token de coveralls por una parte en un fichero **.coveralls.yml**:

![token](https://i.imgur.com/hK1QAaT.jpg)

Luego realizaríamos el seguimiento continuo por GitHub Actions creando un propio workflows para coveralls:

![coveralls workflow](https://i.imgur.com/bQiVn0h.jpg)



━━━━━━━━━━━━━━━━━━━━━━━━━━✧❂✧━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━


 
▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂


## DESARROLLO DEL INFORME CON GITHUB PAGES


Tras finalizar la práctica se nos requiere un informe en con el formato de estilos de Markdown en **GitHub Pages**, para ello usamos la guía de estilos de Markdown en [Markdown guide](https://guides.github.com/features/mastering-markdown/).

Y así finalizamos esta práctica e informe redactado en el archivo **index.md**.





▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂

## CONCLUSIONES


Conclusión sobre la práctica e informe: La dificultad la tuve a nivel de tiempo sobre todo de plantear el ejercicio 3, por ello no conseguí hacer nada solo copiar los ficheros de la práctica anterior, de resto todo decente. A la hora de engancharlo con coveralls no se hacía correctamente al igual que terminar de realizar el workflow de coveralls con giithub actions, causándome problemas que en otras prácticas no ha surgido.

▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂

## BIBLIOGRAFÍA Y/O WEBGRAFÍA


- [Enunciado práctica](https://ull-esit-inf-dsi-2021.github.io/prct09-async-fs-process/)

