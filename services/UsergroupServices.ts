import GetRightServices from '@/services/GetRightServices'
import Usergroup from '@/model/Usergroup'

export default class UsergroupServices{

    private usergroup : Usergroup[];
    private updateCallback: (items: Usergroup[]) => void = () => {};

    public constructor()
    {
        this.usergroup = [];
    }

    /**
    * to set updateCallback
    * @param callback fun to call
    */
    public onUpdate(callback: (items: Usergroup[]) => void) {
        this.updateCallback = callback;
    }

    /**
     * to get list of usergroup
     * @returns list of usergroup
     */
    public GetUsergroups(): Usergroup[]
    {
        return this.usergroup;
    }

    /**
     * call to updata list of usergroup
     */
    public UpdataListAfterLogin()
    {
        this.getListFromApi();
    }

    /**
     * get all usergroup from all server
     */
    private getListFromApi()
    {
        this.usergroup = []

        new GetRightServices().GetAllUsergroup().then(x =>{

            this.usergroup = x

            this.updateCallback(this.usergroup);
        })
    }

    

}