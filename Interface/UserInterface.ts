import UsergroupInterface from "@/Interface/UsergroupInterface"

/**
 * data get from response is User
 */
export default interface UserInterface {

        id: number;
        userName: string;
        email: string;
        phoneNumber:string;
        userGroups : UsergroupInterface[]


}