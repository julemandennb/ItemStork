import StorkItme from '@/model/StorkItme'
import Usergroup from '@/model/Usergroup';
import GetRightServices from '@/services/GetRightServices'

export default class StorkItmeServices{


    private storkItmes : StorkItme[];
    private updateCallback: (items: StorkItme[]) => void = () => {};
    
    public constructor()
    {
        this.storkItmes = [];
        //this.getListFromApi()
    }

    public onUpdate(callback: (items: StorkItme[]) => void) {
        this.updateCallback = callback;
    }
    

    public GetStorkItmes(): StorkItme[]
    {
        return this.storkItmes;
    }

    public create (name: string,description:string,type:string, date:Date,stork: number,userGroup:Usergroup,imgurl:string = "")
    {
        let storkItme = new StorkItme(0,name,description,type,stork,date,imgurl,userGroup.id,userGroup.from);
        this.addOneToList(storkItme);
    }

    public remove(id:number)
    {
        /*this.AddSetting.forEach(Setting => {
            switch(Setting)
            {
                case "local":
                    this.storkItmes = this.storkItmes.filter(x => x.id != id)
                    break;
                default:
                    break;
            }
        })*/

        this.updateCallback(this.storkItmes);
    }

    public get(id:number): StorkItme | undefined
    {
        return this.storkItmes.find(x => x.id === id)
    }

    public updata(storkItme: StorkItme)
    {
        new GetRightServices().UpdataStorkItme(storkItme).then(x =>{

            let itme =this.storkItmes.find(x => x.id === storkItme.id && x.from == storkItme.from)
            itme = storkItme;

            this.updateCallback(this.storkItmes);
        })
    }

    public UpdataListAfterLogin()
    {
        this.getListFromApi();
    }

    private getListFromApi()
    {
        this.storkItmes = []

        new GetRightServices().GetAllStorkItme().then(x =>{

            this.storkItmes = x

            this.updateCallback(this.storkItmes);
        })
    }

    private addOneToList(storkItme:StorkItme)
    {
        new GetRightServices().CreateStorkitme(storkItme).then(x => {
           
            if(!x.error)
                this.getListFromApi()
           
        })
    }

    private addManyToList(storkItems:StorkItme[])
    {
       /* this.AddSetting.forEach(Setting => {
            switch(Setting)
            {
                case "local":
                    this.setIDAndAddToList(storkItems)
                    break
                default:
                    break
            }
        });
*/
        this.updateCallback(this.storkItmes);
    }

}