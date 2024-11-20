
import StorkItmeInterface from "@/Interface/StorkItmeInterface"
import UserInterface from "@/Interface/UserInterface"
/**
 * data get from response is Usergroup
 */
export default interface UsergroupInterface {

        id: number;
        name: string;
        color: string;
        storkItmes:StorkItmeInterface[];
        users:UserInterface[];
    
}