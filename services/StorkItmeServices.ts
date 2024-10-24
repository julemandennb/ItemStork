import StorkItme from '@/model/StorkItme'
import { Settings } from 'react-native';
import { List } from 'react-native-paper';

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
        let storkItme = new StorkItme(0,name,stork,date,imgurl);
        this.addOneToList(storkItme);
    }

    public remove(id:number)
    {
        this.AddSetting.forEach(Setting => {
            switch(Setting)
            {
                case "list":
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
        this.AddSetting.forEach(Setting => {
            switch(Setting)
            {
                case "list":

                    let itme =this.storkItmes.find(x => x.id === storkItme.id)
                    itme = storkItme;

                    break
                default:
                    break
            }
        });

        this.updateCallback(this.storkItmes);
    }

    private getListFromApi()
    {
        this.AddSetting.push("list")
        this.storkItmes = [
            new StorkItme(1,"test1",5,new Date(2025,5,10),""),
            new StorkItme(2,"test2",5,new Date(2025,5,10),""),
            new StorkItme(3,"test3",5,new Date(2025,5,10),""),
            new StorkItme(4,"test4",5,new Date(2025,5,10),""),
            new StorkItme(5,"test5",5,new Date(2025,5,10),""),
            new StorkItme(6,"test6",5,new Date(2025,5,10),""),
            new StorkItme(7,"test7",5,new Date(2025,5,10),""),
            new StorkItme(8,"test8",5,new Date(2025,5,10),""),
            new StorkItme(9,"test9",5,new Date(2025,5,10),""),
            new StorkItme(10,"test10",5,new Date(2025,5,10),"")
        ];
    }

    private addOneToList(storkItme:StorkItme)
    {
        this.AddSetting.forEach(Setting => {
            switch(Setting)
            {
                case "list":

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
                case "list":
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