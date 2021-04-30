import "mocha";
import {expect} from 'chai';
import { TodoItem } from "../src/todoItem";


let newTodo1 =  new TodoItem(1, "Buy pancakes", "At 5.00 open the bakery", "red");
let newTodo2 = new TodoItem(2, "Get Shoes", "at 6.00 in the new shop", "blue");


describe('Initialization tests todoItem', () => {
    it('Set and get id of user', () => {
        expect(newTodo1.setId(1));
        expect(newTodo2.setId(2));
        expect(newTodo1.getId()).to.be.equal(1);
        expect(newTodo2.getId()).to.be.equal(2);
    });
    it('Set and get title of task', () => {
        expect(newTodo1.setTitle("Buy pancakes"));
        expect(newTodo2.setTitle("Get Shoes"));
        expect(newTodo1.getTitle()).to.be.equal("Buy pancakes");
        expect(newTodo2.getTitle()).to.be.equal("Get Shoes");
    });
    it('Set and get description of task', () => {
        expect(newTodo1.setTask("At 5.00 open the bakery"));
        expect(newTodo2.setTask("at 6.00 in the new shop"));
        expect(newTodo1.getTask()).to.be.equal("At 5.00 open the bakery");
        expect(newTodo2.getTask()).to.be.equal("at 6.00 in the new shop");
    });
    it('Set and get color of task', () => {
        expect(newTodo1.setColor("red"));
        expect(newTodo2.setColor("blue"));
        expect(newTodo1.getColor()).to.be.equal("red");
        expect(newTodo2.getColor()).to.be.equal("blue");
    });

    it('print', () => {
        expect(newTodo1.printDetails()).to.be.deep.equal(undefined);
    });
});
