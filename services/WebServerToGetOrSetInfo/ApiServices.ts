import PublicUrlServer from '@/model/PublicUrlServer';
import TokenLogin from '@/model/TokenLogin';
import ReturnInfoFromWebServer from '@/model/ReturnInfoFromWebServer';
import StorkItme from '@/model/StorkItme';
import StorkItmeInterface from "@/Interface/StorkItmeInterface";
import StorageService from "@/services/StorageService";
import UsergroupInterface from '@/Interface/UsergroupInterface';
import Usergroup from '@/model/Usergroup';

export default class ApiServices {
    private loginError: boolean = false;
    private StorageService:StorageService = new StorageService()

    constructor() {}
    
    /**
     * if login get a error run refresh api call and return if get a new 
     * @param publicUrlServer url to call to
     * @returns bool
     */
    private async HandleLoginError(publicUrlServer: PublicUrlServer): Promise<boolean> {
        if (!this.loginError) {
            this.loginError = true;
            const tokenLoginStr = await this.StorageService.GetItemFromStorage(publicUrlServer.idSaveOnStorage + "Login");
            if (tokenLoginStr) {
                const tokenLogin: TokenLogin = JSON.parse(tokenLoginStr);
                const body = JSON.stringify({ refreshToken: tokenLogin.refreshToken });

                try {
                    const response = await fetch(publicUrlServer.url + "/refresh", {
                        method: 'POST',
                        headers: {
                            'Accept': "application/json",
                            'Content-Type': 'application/json',
                        },
                        body: body,
                    });

                    if (response.ok) {
                        const data = await response.json();
                        const newTokenLogin = new TokenLogin();
                        newTokenLogin.TokenType = data.tokenLogin;
                        newTokenLogin.accessToken = data.accessToken;
                        newTokenLogin.expiresIn = data.expiresIn;
                        newTokenLogin.refreshToken = data.refreshToken;

                        this.loginError = false;
                        await this.StorageService.SetItemFromStorage(publicUrlServer.idSaveOnStorage + "Login", JSON.stringify(newTokenLogin));
                        return true;
                    }
                } catch (error) {
                    console.error("Refresh token failed", error);
                }
            }
        }
        return false;
    }

    //#region User Setting
        public async login(body: string, publicUrlServer: PublicUrlServer): Promise<ReturnInfoFromWebServer> {
            try {
                const response = await fetch(publicUrlServer.url + "/login", {
                    method: 'POST',
                    headers: {
                        'Accept': "application/json",
                        'Content-Type': 'application/json',
                    },
                    body: body,
                });

                if (response.ok) {
                    const data = await response.json();
                    const tokenLogin = new TokenLogin();
                    tokenLogin.TokenType = data.tokenLogin;
                    tokenLogin.accessToken = data.accessToken;
                    tokenLogin.expiresIn = data.expiresIn;
                    tokenLogin.refreshToken = data.refreshToken;

                    await this.StorageService.SetItemFromStorage(publicUrlServer.idSaveOnStorage + "Login", JSON.stringify(tokenLogin));
                    return new ReturnInfoFromWebServer('Login Successful', false);
                } else {
                    return new ReturnInfoFromWebServer('Login Failed: Invalid username or password', true);
                }
            } catch (error) {
                console.error('Login error:', error);
                return new ReturnInfoFromWebServer('An error occurred during login', true);
            }
        }

        public async logout(publicUrlServer: PublicUrlServer): Promise<boolean> {
            try {
                await this.StorageService.RemoveItemFromStorage(publicUrlServer.idSaveOnStorage + "Login");
                return true;
            } catch (error) {
                console.error('Logout error:', error);
                return false;
            }
        }

    //#endregion

    //#region StorkItems
        public async GetAllStorkItems(publicUrlServer: PublicUrlServer, getAllStorkItems: boolean = false): Promise<ReturnInfoFromWebServer> {
            try {
                const tokenLoginStr = await this.StorageService.GetItemFromStorage(publicUrlServer.idSaveOnStorage + "Login");
                if (tokenLoginStr) {
                    const tokenLogin: TokenLogin = JSON.parse(tokenLoginStr);

                    const response = await fetch(publicUrlServer.url + "/storkitme/Getall?GetAllStorkItme=" + getAllStorkItems, {
                        method: 'GET',
                        headers: {
                            'Accept': "*/*",
                            'Authorization': 'Bearer ' + tokenLogin.accessToken,
                        },
                    });

                    if (response.ok) {
                        const jsonObj = await response.json();

                        const values:StorkItmeInterface[] = jsonObj.$values

                        const storkItems: StorkItme[] = values.map(item =>
                            new StorkItme(
                                item.id,
                                item.name,
                                item.description,
                                item.type,
                                item.stork,
                                new Date(item.bestBy),
                                item.imgUrl,
                                item.userGroup.id,
                                publicUrlServer.idSaveOnStorage,
                                item.userGroup.color
                            )
                        );

                        return new ReturnInfoFromWebServer("Fetched stork items successfully", false, storkItems);
                    } else {
                        if (!this.loginError) {
                            const isTokenRefreshed = await this.HandleLoginError(publicUrlServer);
                            if (isTokenRefreshed) {
                                return this.GetAllStorkItems(publicUrlServer, getAllStorkItems);
                            }
                        }
                        return new ReturnInfoFromWebServer('Failed to fetch stork items', true);
                    }
                } else {
                    return new ReturnInfoFromWebServer('User is not logged in', true);
                }
            } catch (error) {
                console.error('Get stork items error:', error);
                return new ReturnInfoFromWebServer('An error occurred while fetching stork items', true);
            }
        }

        public async CreateStorkItems(publicUrlServer: PublicUrlServer,StorkItme:StorkItme): Promise<ReturnInfoFromWebServer>
        {
            try {
                const tokenLoginStr = await this.StorageService.GetItemFromStorage(publicUrlServer.idSaveOnStorage + "Login");
                if (tokenLoginStr) {
                    const tokenLogin: TokenLogin = JSON.parse(tokenLoginStr);

                    let body = JSON.stringify({
                        "name": StorkItme.name,
                        "description": StorkItme.description,
                        "type": StorkItme.type,
                        "bestBy": StorkItme.date,
                        "stork": StorkItme.stork,
                        "imgUrl": StorkItme.imgurl,
                        "userGroupId": StorkItme.userGroupId
                    })

                    const response = await fetch(publicUrlServer.url + "/storkitme/Create", {
                        method: 'POST',
                        headers: {
                            'Accept': "*/*",
                            'Content-Type':"application/json",
                            'Authorization': 'Bearer ' + tokenLogin.accessToken,
                        },
                        body:body
                    });

                    if (response.ok) {

                        return new ReturnInfoFromWebServer('updata stork items', false);

                    }
                    else
                    {
                        if (!this.loginError && response.status == 401) {
                            const isTokenRefreshed = await this.HandleLoginError(publicUrlServer);
                            if (isTokenRefreshed) {
                                return this.UpdataStorkItme(publicUrlServer, StorkItme);
                            }
                        }
                        return new ReturnInfoFromWebServer('Failed to updata stork items', true);

                    }

                }else {
                    return new ReturnInfoFromWebServer('User is not logged in', true);
                }
            }
            catch (error) {
                console.error('Get stork items error:', error);
                return new ReturnInfoFromWebServer('An error occurred while try to updata stork items', true);
            }

        }

        public async UpdataStorkItme(publicUrlServer: PublicUrlServer,StorkItme:StorkItme): Promise<ReturnInfoFromWebServer>
        {
            try {
                const tokenLoginStr = await this.StorageService.GetItemFromStorage(publicUrlServer.idSaveOnStorage + "Login");
                if (tokenLoginStr) {
                    const tokenLogin: TokenLogin = JSON.parse(tokenLoginStr);

                    let body = JSON.stringify({
                        "name": StorkItme.name,
                        "description": StorkItme.description,
                        "type": StorkItme.type,
                        "bestBy": StorkItme.date,
                        "stork": StorkItme.stork,
                        "imgUrl": StorkItme.imgurl,
                        "userGroupId": StorkItme.userGroupId
                    })

                    const response = await fetch(publicUrlServer.url + "/storkitme/Updata?id=" + StorkItme.id, {
                        method: 'PUT',
                        headers: {
                            'Accept': "*/*",
                            'Content-Type':"application/json",
                            'Authorization': 'Bearer ' + tokenLogin.accessToken,
                        },
                        body:body
                    });

                    if (response.ok) {

                        return new ReturnInfoFromWebServer('updata stork items', false);

                    }
                    else
                    {
                        if (!this.loginError && response.status == 401) {
                            const isTokenRefreshed = await this.HandleLoginError(publicUrlServer);
                            if (isTokenRefreshed) {
                                return this.UpdataStorkItme(publicUrlServer, StorkItme);
                            }
                        }
                        return new ReturnInfoFromWebServer('Failed to updata stork items', true);

                    }

                }else {
                    return new ReturnInfoFromWebServer('User is not logged in', true);
                }
            }
            catch (error) {
                console.error('Get stork items error:', error);
                return new ReturnInfoFromWebServer('An error occurred while try to updata stork items', true);
            }

        }

        public async DeleteStorkItme(publicUrlServer: PublicUrlServer,StorkItme:StorkItme): Promise<ReturnInfoFromWebServer>
        {
            try {
                const tokenLoginStr = await this.StorageService.GetItemFromStorage(publicUrlServer.idSaveOnStorage + "Login");
                if (tokenLoginStr) {
                    const tokenLogin: TokenLogin = JSON.parse(tokenLoginStr);

                    const response = await fetch(publicUrlServer.url + "/storkitme/Delete?id=" + StorkItme.id, {
                        method: 'DELETE',
                        headers: {
                            'Accept': "*/*",
                            'Content-Type':"application/json",
                            'Authorization': 'Bearer ' + tokenLogin.accessToken,
                        },
                    });

                    if (response.ok) {

                        return new ReturnInfoFromWebServer('delete stork items', false);

                    }
                    else
                    {
                        if (!this.loginError && response.status == 401) {
                            const isTokenRefreshed = await this.HandleLoginError(publicUrlServer);
                            if (isTokenRefreshed) {
                                return this.UpdataStorkItme(publicUrlServer, StorkItme);
                            }
                        }
                        return new ReturnInfoFromWebServer('Failed to delete stork items', true);

                    }

                }else {
                    return new ReturnInfoFromWebServer('User is not logged in', true);
                }
            }
            catch (error) {
                console.error('Get stork items error:', error);
                return new ReturnInfoFromWebServer('An error occurred while try to updata stork items', true);
            }
        }

    //#endregion

    //#region Usergroup

        public async GetAllUsergroup(publicUrlServer: PublicUrlServer, getAllStorkItems: boolean = false): Promise<ReturnInfoFromWebServer | undefined>
        {
            try
            {
                const tokenLoginStr = await this.StorageService.GetItemFromStorage(publicUrlServer.idSaveOnStorage + "Login");
                if (tokenLoginStr) {
                    const tokenLogin: TokenLogin = JSON.parse(tokenLoginStr);

                    const response = await fetch(publicUrlServer.url + "/usergroup/Getall?ShowAllGroup=" + getAllStorkItems, {
                        method: 'GET',
                        headers: {
                            'Accept': "*/*",
                            'Authorization': 'Bearer ' + tokenLogin.accessToken,
                        },
                    });

                    if (response.ok) {
                        const jsonObj = await response.json();

                        const values:UsergroupInterface[] = jsonObj.$values

                        const usergroup:Usergroup[] = values.map(x =>
                            new Usergroup(
                                x.id,
                                x.name,
                                x.color,
                                publicUrlServer.idSaveOnStorage
                            )
                        )

                        return new ReturnInfoFromWebServer("Fetched stork items successfully", false,usergroup);
                    } else {
                        if (!this.loginError) {
                            const isTokenRefreshed = await this.HandleLoginError(publicUrlServer);
                            if (isTokenRefreshed) {
                                return this.GetAllUsergroup(publicUrlServer, getAllStorkItems);
                            }
                        }
                        return new ReturnInfoFromWebServer('Failed to fetch stork items', true);
                    }

                }
                else {
                    return new ReturnInfoFromWebServer('User is not logged in', true);
                }

            } catch (error) {
                console.error('Get Usergroup error:', error);
                return new ReturnInfoFromWebServer('An error occurred while fetching Usergroup', true);
            }


        }

    //#endregion






}
