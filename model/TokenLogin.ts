export default class TokenLogin{

    public TokenType:string
    public accessToken:string
    public expiresIn:number
    public refreshToken:string
    public MaskDate : Date

    constructor()
    {
        this.TokenType = "";
        this.accessToken = "";
        this.expiresIn = 0;
        this.refreshToken = "";

        this.MaskDate = new Date()
    }

}