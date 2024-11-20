/**
 * make Usergroup model to hold info 
 */
export default class Usergroup{

    id:number
    name: string
    color: string
    from:string

    constructor(id:number,name: string, color: string,from:string){

        this.id = id;
        this.name = name;
        this.color = color;
        this.from = from;
    }



}