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


━━━━━━━━━━━━━━━━━━━━━━━━━━✧❂✧━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

### EJERCICIO 4


━━━━━━━━━━━━━━━━━━━━━━━━━━✧❂✧━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━


 
▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂


## GITHUB ACTIONS: WORKFLOWS, COVERALLS

En esta parte tenemos que hacer momentáneamente el repositorio público en github para poder engancharlo con GitHub Actions y Coveralls y así hacer el seguimiento continuo de github Actions y luego el de coveralls quedando:

Un cubrimiento de:

![cubrimiento](https://i.imgur.com/67H6XU1.jpg)

Copiando el token de coveralls por una parte en un fichero **.coveralls.yml**:

![token](https://i.imgur.com/JAAj8av.jpg)

Luego realizaríamos el seguimiento continuo por GitHub Actions creando un propio workflows para coveralls:

![coveralls workflow](https://i.imgur.com/SCmuLXh.jpg)


Y se vería el cubrimiento de coveralls dicho workflow en github action:

![actions coveralls](https://i.imgur.com/hfIJ15z.jpg)

Y se documenta en el fichero **README.md** los badges de GithubActions, Coveralls y SonarCloud respectivamente:

![seguimeitno](https://i.imgur.com/x5h0Day.jpg)


━━━━━━━━━━━━━━━━━━━━━━━━━━✧❂✧━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━


 
▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂


## SONARCLOUD: BADGES

Se accede a la web de SonarCloud, buscamos el repositorio respectivo y se accede a él y copiaríamos el badge de **markdown** que isnertamos en el README.md como antes vimos.

![sonar](https://i.imgur.com/w3aZqch.jpg)

━━━━━━━━━━━━━━━━━━━━━━━━━━✧❂✧━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━


 
▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂


## DESARROLLO DEL INFORME CON GITHUB PAGES


Tras finalizar la práctica se nos requiere un informe en con el formato de estilos de Markdown en **GitHub Pages**, para ello usamos la guía de estilos de Markdown en [Markdown guide](https://guides.github.com/features/mastering-markdown/).

Y así finalizamos esta práctica e informe redactado en el archivo **index.md**.





▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂

## CONCLUSIONES


Conclusión sobre la práctica e informe, aquí plantearé la dinámica de la práctica y posibles dudas que me hayan surgido y solucionado. La práctica en sí hubieron partes del código, métodos en concreto que me dificultaron a la hora de mostrar el resultado como quise, resulta una práctica intuitiva y útil en caso de querer tener una gestión simple de notas y yo he enfocado esta práctica a una idea de una aplicación de organización de tareas, como una agenda, y un problema que resultó al hacer público el repo para engancharlo al sonar cloud fue porque no se mostraba el workflow de sonar cloud para proceder a hacerlo y básicamente esa parte sé como hacerlo pero no se muestra. Por el resto no he tenido dudas y con lo de sonarcloud pediré tutoría o usaré Github Issues.

▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂

## BIBLIOGRAFÍA Y/O WEBGRAFÍA


- [Enunciado práctica](https://ull-esit-inf-dsi-2021.github.io/prct08-filesystem-notes-app/)
- [Informe documentación con Typedoc](http://127.0.0.1:5500/docs/index.html)
