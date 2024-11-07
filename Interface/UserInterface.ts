import UsergroupInterface from "@/Interface/UsergroupInterface"


export default interface UserInterface {

        id: number;
        userName: string;
        email: string;
        phoneNumber:string;
        userGroups : UsergroupInterface[]


}