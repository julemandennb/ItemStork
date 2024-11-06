
import StorkItmeInterface from "@/Interface/StorkItmeInterface"
import UserInterface from "@/Interface/UserInterface"

export default interface UsergroupInterface {
    values: {
        id: number;
        name: string;
        description: string;
        type:string;
        bestBy:Date;
        stork:number;
        imgUrl:string;
        storkItmes:StorkItmeInterface[];
        users:UserInterface[];
    }[];
}