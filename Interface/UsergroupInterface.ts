
import StorkItmeInterface from "@/Interface/StorkItmeInterface"
import UserInterface from "@/Interface/UserInterface"

export default interface UsergroupInterface {

        id: number;
        name: string;
        color: string;
        storkItmes:StorkItmeInterface[];
        users:UserInterface[];
    
}