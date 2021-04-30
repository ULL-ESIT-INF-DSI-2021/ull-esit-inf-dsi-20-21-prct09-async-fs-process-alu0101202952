/**
 * Class TodoItem
 * @class TodoItem almacena los atributos de las notas, el usuario, título, cuerpo y color
 */
export class TodoItem {
  constructor(public id: number, public title: string, public task: string, public color:string) {}

  /**
   * GetId del usuario de la nota
   * @returns devuelve el id del usuario de la nota
   */
  getId() {
    return this.id;
  }

  /**
   * GetTitle de la nota
   * @returns devuelve el titulo de la nota
   */
  getTitle(){
    return this.title;
  }

  /**
   * GetTask de la nota
   * @returns devuelve el cuerpo o texto que contiene la nota
   */
  getTask() {
    return this.task;
  }

  /**
   * GetColor de la nota
   * @returns devuelve el color de la nota
   */
  getColor(){
    return this.color;
  }

  /**
   * setId del usuario de la nota
   * @returns cambia el id del usuario de la nota
   */
  setId(newId: number) {
    this.id = newId;
  }

  /**
   * setTitle de la nota
   * @returns cambia el titulo de la nota
   */
  setTitle(newTitle: string){
    this.title=newTitle;
  }

  /**
   * setTask de la nota
   * @returns cambia el contenido de la nota
   */
  setTask(newTask: string) {
    this.task=newTask;
  }

  /**
   * setColor de la nota
   * @returns cambia el color de la nota
   */
  setColor(newColor:string){
    this.color=newColor;
  }

  /** 
   * printDetails de la nota
   * @returns imprime como se vería la visualización de la nota
   */
  printDetails() : void {
    console.log(`${this.id} ${this.title}:\n Description: ${this.task} \n`);
  }

   
}