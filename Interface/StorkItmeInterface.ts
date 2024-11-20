import UsergroupInterface from "@/Interface/UsergroupInterface"
/**
 * data get from response is StorkItme
 */
export default interface StorkItmeInterface {

        id: number;
        name: string;
        description: string;
        type:string;
        bestBy:Date;
        stork:number;
        imgUrl:string;
        userGroup:UsergroupInterface

}