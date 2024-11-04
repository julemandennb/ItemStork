import PublicUrlServer from '@/model/PublicUrlServer'
import TokenLogin from '@/model/TokenLogin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ReturnInfoFromWebServer from '@/model/ReturnInfoFromWebServer';

export default class ApiServices{

    constructor(){};

    public async Login(body:string,publicUrlServer:PublicUrlServer) : Promise<ReturnInfoFromWebServer>
    {
        try {
            

            const response = await fetch("http://10.0.2.2:5078/login", {
                method: 'POST',
                headers: {
                    'accept' : "application/json",
                    'Content-Type': 'application/json',
                },
                body: body,
            });


            if (response.ok) {
                const data = await response.json();
        
                let tokenLogin = new TokenLogin()
                    tokenLogin.TokenType = data.tokenLogin;
                    tokenLogin.accessToken = data.accessToken;
                    tokenLogin.expiresIn = data.expiresIn;
                    tokenLogin.refreshToken = data.refreshToken;
        
        
                await AsyncStorage.setItem(publicUrlServer.idSaveOnStorage + "Login", JSON.stringify(tokenLogin));
                return  new ReturnInfoFromWebServer('Login Successful',false);
                // Navigate to your home screen
            } else {
                return new ReturnInfoFromWebServer('Login Failed Invalid username or password',true);
            }

        } catch (error) {
            console.error('Error:', error);
            return new ReturnInfoFromWebServer('An error occurred',true);
        }
    }

    public async Logud(publicUrlServer:PublicUrlServer)
    {
        try
        {
            await AsyncStorage.removeItem(publicUrlServer.idSaveOnStorage + "Login")
            return false;
        }
        catch (error) {
            console.error('Error:', error);
            return true;
        }
    }





}