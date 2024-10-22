/**
 * obj hold info on itme in stork
 */
export default class StorkItme{

    id:number
    name: string
    stork: number
    date:Date
    imgurl:string

    constructor(id:number,name: string, stork: number,date:Date,imgurl:string)
    {
        this.id = id;
        this.name = name;
        this.stork = stork;
        this.date = date;
        this.imgurl = imgurl;
    }


    public GetDateStr():string
    {
        const day = String(this.date.getDate()).padStart(2, '0');    // Add leading zero if needed
        const month = String(this.date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
        const year = this.date.getFullYear().toString().slice(-2);
        return `${day}/${month} ${year}`;
    }


}