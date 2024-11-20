import StorkItme from '@/model/StorkItme'
import Usergroup from '@/model/Usergroup';
import GetRightServices from '@/services/GetRightServices'

export default class StorkItmeServices{


    private storkItmes : StorkItme[];
    private updateCallback: (items: StorkItme[]) => void = () => {};
    
    public constructor()
    {
        this.storkItmes = [];
    }

    /**
     * to set updateCallback
     * @param callback fun to call
     */
    public onUpdate(callback: (items: StorkItme[]) => void) {
        this.updateCallback = callback;
    }
    
    /**
     * get list of storkItme
     * @returns list of StorkItme
     */
    public GetStorkItmes(): StorkItme[]
    {
        return this.storkItmes;
    }

    /**
     * to make a new StorkItme
     * @param name name on this
     * @param description description on this 
     * @param type type on this
     * @param date best before 
     * @param stork how many in stork
     * @param userGroup will the userGroup it belongs to
     * @param imgurl url to img (this fun is not make)
     */
    public create (name: string,description:string,type:string, date:Date,stork: number,userGroup:Usergroup,imgurl:string = "")
    {
        let storkItme = new StorkItme(0,name,description,type,stork,date,imgurl,userGroup.id,userGroup.from);
        new GetRightServices().CreateStorkitme(storkItme).then(x => {
           
            if(!x.error)
                this.getListFromApi()
           
        })
    }

    /**
     * to remove StorkItme 
     * @param item StorkItme to remove
     */
    public remove(item: StorkItme)
    {
        new GetRightServices().DeleteStorkItme(item).then(x =>{

            let itmes = this.storkItmes.filter(x => x != item)
            this.storkItmes = itmes
    
            this.updateCallback(this.storkItmes);
        });
    }

    /**
     * get right StorkItme
     * @param id id on this
     * @param from server this is from
     * @returns StorkItme
     */
    public get(id:number, from:string): StorkItme | undefined
    {
        return this.storkItmes.find(x => x.id === id && x.from == from)
    }

    /**
     * to updata StorkItme
     * @param storkItme StorkItme to updata
     */
    public updata(storkItme: StorkItme)
    {
        new GetRightServices().UpdataStorkItme(storkItme).then(x =>{

            let itme =this.storkItmes.find(x => x.id === storkItme.id && x.from == storkItme.from)
            itme = storkItme;

            this.updateCallback(this.storkItmes);
        })
    }

    /**
     * this fun updata list of StorkItme
     */
    public UpdataListAfterLogin()
    {
        this.getListFromApi();
    }

    /**
     * get all storkItmes from server
     */
    private getListFromApi()
    {
        this.storkItmes = []

        new GetRightServices().GetAllStorkItme().then(x =>{

            this.storkItmes = x

            this.updateCallback(this.storkItmes);
        })
    }
}