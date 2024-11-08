/**
 * obj hold info on itme in stork
 */
export default class StorkItme{

    id:number
    name: string
    description: string
    type: string
    stork: number
    date:Date
    imgurl:string
    userGroupId:number
    from:string
    color:string
    
    constructor(id:number,name: string,description: string,type: string, stork: number,date:Date,imgurl:string,userGroupId:number,from:string,color:string ="")
    {
        this.id = id;
        this.name = name;
        this.description = description;
        this.type = type;
        this.stork = stork;
        this.date = date;
        this.imgurl = imgurl;
        this.userGroupId = userGroupId;
        this.from = from;
        this.color = color;
    }


    public GetDateStr():string
    {
        const day = String(this.date.getDate()).padStart(2, '0');    // Add leading zero if needed
        const month = String(this.date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
        const year = this.date.getFullYear().toString().slice(-2);
        return `${day}/${month} ${year}`;
    }


}