//more_patterns


/**
 * Type que tiene el array que entra con el que operaremos y la función reduce()
 */
/*
type Operation = {
    arrayIn: number [];
    reduce: () => void;
}

/**
 * CLASS REDUCE
 * @class Reduce es la padre que realizará la reducciones
 *//*
export abstract class Reduce {
    protected arrayAux: Operation[]
    /**
     * Contructor de la Reduce
     *//*
    constructor(protected num1: number,
        protected num2: number) {
            this.arrayAux = [];
    }*/

    /**
     * Getter que devuelve el valor acumulador
     * @returns num1 que es acumulador
     */ /*
    getNum1(){
        return this.num1
    }*/

    /**
     * Getter que devuelve el valor actual
     * @returns num2 que es valor actual
     */ /*
    getNum2(){
        return this.num2
    }*/


    /**
     * Método de plantilla
     *//*
    public run(){
        this.evalValuesBefore();
        this.addReduce();
        this.evalValuesAfter();
    }

    protected evalValuesBefore(){
        console.log('Template eval function');
        let aux: Operation[] = [];
        this.arrayAux.forEach(element => {
            aux.reduce(element, element, this.arrayAux.indexOf(element), this.arrayAux[]); /* valor actual, valor anterior, indice actual array que reduzco*/
        /*});
    }

  


}*/
//export class AddReduce extends Reduce {
    /**
     * Contructor de la AddReduce class
     */
    /*
    constructor(protected accum: number, protected current: number) {
        super(accum, current);
    }
    // Operación addReduce
    protected addReduce(): void{
        let result: Operation[] = [];
        this.arrayAux.forEach(element => {
            result.push(element);
        });
    }

}*/
    
/*
export class SubReduce extends Reduce {
    

    /**
     * Método protegido que realiza la resta del reduce
     * 
     *//*
    protected subReduce(){

    }
}*/

/*export class ProdReduce extends Reduce {
    /**
     /**
     * Método protegido que realiza el producto del reduce
     * 
     *//*
    protected prodReduce(){
        
    }
}*/

/*
export class DivReduce extends Reduce {
     /**
     * Método protegido que realiza la división del reduce
     * 
     *//*
    protected divReduce(){
        
    }

}*/