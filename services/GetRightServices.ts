import TokenLogin from '@/model/TokenLogin';
import PublicUrlServer from '@/model/PublicUrlServer'
import AsyncStorage from '@react-native-async-storage/async-storage';
import ApiServices from '@/services/WebServerToGetInfo/ApiServices'
import ReturnInfoFromWebServer from '@/model/ReturnInfoFromWebServer';
import LoginList from '@/model/LoginList'

export default class GetRightServices{

    private LoginListName:string = "loginInfo"
    private updateCallback: (loginInfos:LoginList[]) => void = () => {};


    apiUrls:PublicUrlServer[] = JSON.parse(process.env.EXPO_PUBLIC_URL_SERVER || '[]');

    constructor(){}

    public onUpdate(callback: (loginInfos: LoginList[]) => void) {
        this.updateCallback = callback;
    }

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

                let body = JSON.stringify({ "email":username, "password":password })

                returnInfoFromWebServer = await new ApiServices().Login(body,apiUrl)

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

    public async Logud(apiUrl:PublicUrlServer)
    {

        let error = false

        switch(apiUrl.serverToUser)
        {
            case "api":
                    error = await new ApiServices().Logud(apiUrl)
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


    public async GetLoginList()
    {
        let loginInfosJsonStr = await AsyncStorage.getItem(this.LoginListName)
        let loginInfos:LoginList[] = [];

        if(loginInfosJsonStr != null)
            loginInfos = JSON.parse(loginInfosJsonStr);
        
        return loginInfos;
    }


    private async AddLoginList(apiUrl:PublicUrlServer)
    {
        let loginIfo = new LoginList(apiUrl.displayName,apiUrl.idSaveOnStorage)
        let loginInfos:LoginList[] = [];

        let loginInfosJsonStr = await AsyncStorage.getItem(this.LoginListName)

        if(loginInfosJsonStr != null)
            loginInfos =  JSON.parse(loginInfosJsonStr);

        loginInfos.push(loginIfo)

        await AsyncStorage.setItem(this.LoginListName, JSON.stringify(loginInfos))
    }

    private async RemoveLoginList(apiUrl:PublicUrlServer)
    {
        let loginInfos:LoginList[] = [];

        let loginInfosJsonStr = await AsyncStorage.getItem(this.LoginListName)
        if(loginInfosJsonStr != null)
        {
            loginInfos =  JSON.parse(loginInfosJsonStr);

            loginInfos = loginInfos.filter(x => x.id != apiUrl.idSaveOnStorage)
        }

        await AsyncStorage.setItem(this.LoginListName, JSON.stringify(loginInfos))

    }
    





    
}