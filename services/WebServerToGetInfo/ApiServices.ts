import PublicUrlServer from '@/model/PublicUrlServer';
import TokenLogin from '@/model/TokenLogin';
import ReturnInfoFromWebServer from '@/model/ReturnInfoFromWebServer';
import StorkItme from '@/model/StorkItme';
import StorkItmeInterface from "@/Interface/StorkItmeInterface";
import StorageService from "@/services/StorageService";

export default class ApiServices {
    private loginError: boolean = false;
    private StorageService:StorageService = new StorageService()

    constructor() {}

    private async handleLoginError(publicUrlServer: PublicUrlServer): Promise<boolean> {
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

    public async getAllStorkItems(publicUrlServer: PublicUrlServer, getAllStorkItems: boolean = false): Promise<ReturnInfoFromWebServer | undefined> {
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
                            publicUrlServer.idSaveOnStorage
                        )
                    );

                    return new ReturnInfoFromWebServer("Fetched stork items successfully", false, storkItems);
                } else {
                    if (!this.loginError) {
                        const isTokenRefreshed = await this.handleLoginError(publicUrlServer);
                        if (isTokenRefreshed) {
                            return this.getAllStorkItems(publicUrlServer, getAllStorkItems);
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
                        const isTokenRefreshed = await this.handleLoginError(publicUrlServer);
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
}
