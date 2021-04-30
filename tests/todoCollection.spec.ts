import "mocha";
import {expect} from 'chai';
import { TodoItem } from "../src/todoItem";
import { TodoCollection } from "../src/todoCollection";
import chalk from "chalk";

let todos: TodoItem[] = [
    new TodoItem(1, "Buy pancakes", "At 5.00 open the bakery", "red")];
let collection: TodoCollection = new TodoCollection("Adam", todos);


describe('Initialization tests todoCollection', () => {
    it('Username', () => {
        expect(collection.setUsername("Lucas"));
        expect(collection.getUsername()).to.be.equal("Lucas");
    });
    it('getTodoById of task', () => {
        expect(collection.getTodoById(1)).to.be.deep.equal(({id:1, title:"Buy pancakes", task:"At 5.00 open the bakery", color:"red"}));
    });

    it('getTodoItems', () => {
        expect(collection.getTodoItems("Get Shoes")).to.be.deep.equal([{id: 1, title: "Buy pancakes", task: "At 5.00 open the bakery", color: "red"}]);
    });

    it('getTodoColor', () => {
        expect(collection.getTodoColor("red")).to.be.equal(chalk.red);
        expect(collection.getTodoColor("blue")).to.be.equal(chalk.blue);
        expect(collection.getTodoColor("green")).to.be.equal(chalk.green);
        expect(collection.getTodoColor("yellow")).to.be.equal(chalk.yellow);
    });

    it('removeTodo', () => {
        expect(collection.addTodo("Do homework", "start at 4.00", "yellow"));
        expect(collection.removeComplete()).to.be.equal(undefined);
    });

    it('loadTodo', () => {
        expect(collection.loadTodo(1)).to.be.deep.equal([]);
    });

    it('saveTodo', () => {
        expect(collection.saveTodo(todos, "")).to.be.deep.equal(undefined);
    });
});