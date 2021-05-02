import { join } from "path"; 
import { TodoItem } from "./todoItem";
const chalk = require('chalk');

/**
 * Class TodoCollection
 * @class TodoCollection almacena todas las notas de cada usuario
 */
export class TodoCollection {
  private nextId: number = 1;
  private itemMap = new Map<number, TodoItem>();
  constructor(public userName: string, todoItems: TodoItem[] = []) {
    todoItems.forEach(item => this.itemMap.set(item.id, item));
  }

  /**
   * setUsername del usuario de la nota
   * @returns cambia el nombre del usuario de la nota
   */
  setUsername(user: string){
    this.userName = user;
  }

  /**
   * getUsername del usuario de la nota
   * @returns retorna el nombre del usuario de la nota
   */
  getUsername(){
    return this.userName;
  }

  /**
   * Method addTodo añade una nota y si ya existe marca un error en rojo con chalk
   * @param title de la nota
   * @param task cuerpo de la nota
   * @param color color de la nota
   * @returns la nota añadida
   */
  addTodo(title: string, task: string, color:string): number {
    if(this.itemMap.has(parseInt(title))){
      console.log(chalk.red(`Error, Tarea ya incluída`))
    } else{
      while (this.getTodoById(this.nextId)) {
        this.nextId++;
      }
      this.itemMap.set(this.nextId, new TodoItem(this.nextId, title, task, color));
    }
    return this.nextId;
  }

  /**
   * getTodoById retorna la nota al pasarle el id o usuario propiertario
   * @param id id del usuario de la nota
   * @returns devuelve la nota 
   */
  getTodoById(id: number) : TodoItem | undefined {
    return this.itemMap.get(id);
  }

  /**
   * getTodoItems retorna todas las notas
   * @param title titulo de la nota
   * @returns todas las notas pertenecientes a ese titulo
   */
  getTodoItems(title: string): TodoItem[] {
    return [...this.itemMap.values()]
      .filter(item => title || !item.getTask());
  }

  /**
   * getTodoColor identifica el color de la nota
   * @param color de la nota
   * @returns según qué color se le asigna con la herramienta chalk
   */
  getTodoColor(color: string){
    switch(color) {
      case 'red':
      return chalk.red;
      
      case 'blue':
      return chalk.blue;
  
      case 'green':
      return chalk.green;
  
      case 'yellow':
      return chalk.yellow;
  
      default:
      return false;
    }
  }

  /**
   * removeComplete eliminaría la nota al pasarle el titulo
   */
  removeComplete() {
    this.itemMap.forEach(item => {
      if (item.getTitle()) {
        this.itemMap.delete(item.id);
      }
    })
  }

  /**
   * loadTodo carga la nota según el directorio que se le asigna por usuario
   * @param user con el directorio
   * @returns solo carga lo que hay en el directorio
   */
  loadTodo(user: number) {
    const dirPath = `./${user}`; 
    const tasks: TodoItem[] = [];
    let fs = require("fs");
    if (fs.existsSync(dirPath)) {
      //Nombres de los ficheros bajo ese directorio
      const fileNames = fs.readdirSync(dirPath);
      for (const file of fileNames) {
        let fileContent: Buffer = fs.readFileSync(join(dirPath, file));
        //String en formato JSON y lo convierte en un objeto
        let contentObject = JSON.parse(fileContent.toString());
        //Actua como un diccionario, leemos cada atributo y la información que tiene y la extraemos
        tasks.push(new TodoItem(contentObject.id, contentObject.title, contentObject.text, contentObject.color));
      }
    }
    return tasks;
  }

  /**
   * saveTodo que guarda las notas con un formato específico .JSON y cuyo nombre del fichero
   * es igual al titulo que tiene la nota
   * @param tasks contexto y cuerpo de la nota
   * @param user usuario
   */
  saveTodo(tasks: TodoItem[], user: string) {
    let fs = require("fs");
    const dir = `./${user}`;
    //Se comprueba que existe el directorio si no se crea
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    for (const task of tasks) {
      //Nombre que se le atribuye al fichero y extensión
      let fileName = task.getTitle() + '.json';
      fileName = join(dir, fileName);
      //Coge un objeto y la convierte a formato JSON
      fs.writeFileSync(fileName, JSON.stringify(task));
    }
  }
}