export default class ReturnInfoFromWebServer{

    text:string
    error:boolean

    constructor(text:string,error:boolean){
        this.text = text;
        this.error = error;
    }


}