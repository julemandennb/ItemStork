import GetRightServices from '@/services/GetRightServices'
import Usergroup from '@/model/Usergroup'

export default class UsergroupServices{

    private usergroup : Usergroup[];
    private updateCallback: (items: Usergroup[]) => void = () => {};

    public constructor()
    {
        this.usergroup = [];
        //this.getListFromApi()
    }

    public onUpdate(callback: (items: Usergroup[]) => void) {
        this.updateCallback = callback;
    }

    public GetUsergroups(): Usergroup[]
    {
        return this.usergroup;
    }

    public UpdataListAfterLogin()
    {
        this.getListFromApi();
    }

    private getListFromApi()
    {
        this.usergroup = []

        new GetRightServices().GetAllUsergroup().then(x =>{

            this.usergroup = x

            this.updateCallback(this.usergroup);
        })
    }

    

}