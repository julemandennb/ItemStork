import UsergroupInterface from "@/Interface/UsergroupInterface"

export default interface StorkItmeInterface {
    $values: {
        id: number;
        name: string;
        description: string;
        type:string;
        bestBy:Date;
        stork:number;
        imgUrl:string;
        userGroup:UsergroupInterface
    }[];
}