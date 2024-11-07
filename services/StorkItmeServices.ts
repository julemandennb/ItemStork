import StorkItme from '@/model/StorkItme'
import GetRightServices from '@/services/GetRightServices'

export default class StorkItmeServices{


    private storkItmes : StorkItme[];
    private updateCallback: (items: StorkItme[]) => void = () => {};
    
    //make a obj to this
    private AddSetting: any[]

    public constructor()
    {
        this.storkItmes = [];
        this.AddSetting = [];
        this.getListFromApi()
    }

    public onUpdate(callback: (items: StorkItme[]) => void) {
        this.updateCallback = callback;
    }
    

    public GetStorkItmes(): StorkItme[]
    {
        return this.storkItmes;
    }

    public create (name: string, stork: number,date:Date,imgurl:string = "")
    {
        let storkItme = new StorkItme(0,name,stork,date,imgurl,"local");
        this.addOneToList(storkItme);
    }

    public remove(id:number)
    {
        this.AddSetting.forEach(Setting => {
            switch(Setting)
            {
                case "local":
                    this.storkItmes = this.storkItmes.filter(x => x.id != id)
                    break;
                default:
                    break;
            }
        })

        this.updateCallback(this.storkItmes);
    }

    public get(id:number): StorkItme | undefined
    {
        return this.storkItmes.find(x => x.id === id)
    }

    public updata(storkItme: StorkItme)
    {
        // this.AddSetting.forEach(Setting => {
        //     switch(Setting)
        //     {
        //         case "local":

        //             let itme =this.storkItmes.find(x => x.id === storkItme.id)
        //             itme = storkItme;

        //             break
        //         default:
        //             break
        //     }
        // });


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
        this.AddSetting.forEach(Setting => {
            switch(Setting)
            {
                case "local":

                    let id = 1

                    if(this.storkItmes.length > 0)
                        id = this.storkItmes[this.storkItmes.length -1].id + 1

                    storkItme.id = id

                    this.storkItmes.push(storkItme)


                    break
                default:
                    break
            }
        });

        this.updateCallback(this.storkItmes);
    }

    private addManyToList(storkItems:StorkItme[])
    {
        this.AddSetting.forEach(Setting => {
            switch(Setting)
            {
                case "local":
                    this.setIDAndAddToList(storkItems)
                    break
                default:
                    break
            }
        });

        this.updateCallback(this.storkItmes);
    }

    private setIDAndAddToList(storkItems:StorkItme[])
    {
        let id = 1

        if(this.storkItmes.length > 0)
            id = this.storkItmes[this.storkItmes.length -1].id + 1

        storkItems.forEach(itme => {

            itme.id = id
            this.storkItmes.push(itme)
            id++;
        });

    }
    




}