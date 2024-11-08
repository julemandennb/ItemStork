
import PublicUrlServer from '@/model/PublicUrlServer'
import ApiServices from '@/services/WebServerToGetInfo/ApiServices'
import ReturnInfoFromWebServer from '@/model/ReturnInfoFromWebServer';
import LoginList from '@/model/LoginList'
import StorkItme from '@/model/StorkItme'
import StorageService from "@/services/StorageService";


export default class GetRightServices{

    private LoginListName:string = "loginInfo"
    private updateCallback: (loginInfos:LoginList[]) => void = () => {};


    apiUrls:PublicUrlServer[] = JSON.parse(process.env.EXPO_PUBLIC_URL_SERVER || '[]');
    private StorageService:StorageService = new StorageService()

    constructor(){}

    public onUpdate(callback: (loginInfos: LoginList[]) => void) {
        this.updateCallback = callback;
    }


    //#region User Setting

      /**
     * Authenticates a user with username and password.
     * @param username - The username of the user.
     * @param password - The password of the user.
     * @returns A promise that resolves to a login token or an error message.
     */
    public async Login(username:string,password:string,apiUrl:PublicUrlServer): Promise<ReturnInfoFromWebServer>
    {

        let returnInfoFromWebServer;

        switch(apiUrl.serverToUser)
        {
            case "api":

                //let body = JSON.stringify({ "email":username, "password":password })
                let body = JSON.stringify({ "email":"admin@test.com", "password":"Admin!1" })

                returnInfoFromWebServer = await new ApiServices().login(body,apiUrl)

                if(!returnInfoFromWebServer.error)
                    this.AddLoginList(apiUrl)

                break;
            case "local":
                return new ReturnInfoFromWebServer("local",true);
            default:
                return new ReturnInfoFromWebServer("cannot find Services",true);
        }

        this.updateCallback( await this.GetLoginList());
 
        return returnInfoFromWebServer;
    }

    /**
     * delete info to login 
     * @param apiUrl itme to find right login server
     * @returns return info
     */
    public async Logud(apiUrl:PublicUrlServer)
    {

        let error = false

        switch(apiUrl.serverToUser)
        {
            case "api":
                    error = await new ApiServices().logout(apiUrl)
                break;
            case "local":
                return new ReturnInfoFromWebServer("local",true);
            default:
                return new ReturnInfoFromWebServer("cannot find Services",true);
        }

        if(error)
            return "cannot Logud " +apiUrl.displayName;
        else
            this.RemoveLoginList(apiUrl)

        return "Logud " + apiUrl.displayName;
    }

    //#endregion


    //#region Get

    /**
     * get all login server is login on
     * @returns login server
     */
    public async GetLoginList()
    {
        let loginInfosJsonStr = await this.StorageService.GetItemFromStorage(this.LoginListName)
        let loginInfos:LoginList[] = [];

        if(loginInfosJsonStr != null)
            loginInfos = JSON.parse(loginInfosJsonStr);
        
        return loginInfos;
    }

    /**
 * get all StorkItme from all login server
 * @returns list of StorkItme
 */
    public async GetAllStorkItme(): Promise<StorkItme[]>
    {

        let storkItmes:StorkItme[] = [];

        let Logins = await this.GetLoginList()

        for (const login of Logins) {

            let apiUrl = this.apiUrls.find(x => x.idSaveOnStorage == login.id)

            switch(apiUrl?.serverToUser)
            {
                case "api":

                    let getallStorkItme = await new ApiServices().getAllStorkItems(apiUrl,false);

                    if(getallStorkItme != undefined && getallStorkItme.data != null)
                    {                
                        storkItmes.push(...getallStorkItme.data)
                    }

                    break;
                default:
                    break;

            }

        }

        return storkItmes;
    }

    //#endregion

    //#region updata

    public async UpdataStorkItme(storkItme:StorkItme): Promise<ReturnInfoFromWebServer>
    {
        let apiUrl = this.apiUrls.find(x => x.idSaveOnStorage == storkItme.from)

        if(apiUrl != null)
        {

            switch(apiUrl?.serverToUser)
            {
                case "api":
                      return await new ApiServices().UpdataStorkItme(apiUrl,storkItme)
                default:
                    break;

            }




        }

        return new ReturnInfoFromWebServer("cannot find right server",true);

    }

    //#endregion

    //#region private
    /**
 * add to list hold all server login to
 * @param apiUrl server to add to list
 */
    private async AddLoginList(apiUrl:PublicUrlServer)
    {
        let loginIfo = new LoginList(apiUrl.displayName,apiUrl.idSaveOnStorage)
        let loginInfos:LoginList[] = [];

        let loginInfosJsonStr = await this.StorageService.GetItemFromStorage(this.LoginListName)

        if(loginInfosJsonStr != null)
            loginInfos =  JSON.parse(loginInfosJsonStr);

        loginInfos.push(loginIfo)

        await this.StorageService.SetItemFromStorage(this.LoginListName, JSON.stringify(loginInfos))
    }

    /**
     * remove to from list hold all server login
     * @param apiUrl server to remove
     */
    private async RemoveLoginList(apiUrl:PublicUrlServer)
    {
        let loginInfos:LoginList[] = [];

        let loginInfosJsonStr = await this.StorageService.GetItemFromStorage(this.LoginListName)
        if(loginInfosJsonStr != null)
        {
            loginInfos =  JSON.parse(loginInfosJsonStr);

            loginInfos = loginInfos.filter(x => x.id != apiUrl.idSaveOnStorage)
        }

        await this.StorageService.SetItemFromStorage(this.LoginListName, JSON.stringify(loginInfos))

    }
    
    //#endregion





    
}