/**
 * retune model holde text info, if this fun get error and data from fun
 */
export default class ReturnInfoFromWebServer{

    text:string
    error:boolean
    data:any

    constructor(text:string,error:boolean,data:any = null){
        this.text = text;
        this.error = error;
        this.data = data;
    }


}