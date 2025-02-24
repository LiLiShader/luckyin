import HttpClient from './HttpClient';
const apiClient = new HttpClient('https://testapi.luckyin.com');
// const token ="tt0476n0x2icejru16p10ufy5695zd5b"
const time_zone ="Asia/Shanghai"

export default class HttpRequest{

    private static instance: HttpRequest | null = null;
    token:string="";
    private constructor() {
        // 私有构造函数
    }

    public static getInstance(): HttpRequest {
        if (this.instance === null) {
            this.instance = new HttpRequest();
        }
        return this.instance;
    }

    public async post(Requestbody,apiUrl) :Promise<any>{
        try {
            const response = await apiClient.post(apiUrl, 
                Requestbody,this.token,time_zone
            );
            return response;
        } catch (error) {
            throw error;
        }
    }
    //get请求/pc/api/v1/baccarat/info
    public async getInfo(Requestbody) :Promise<any>{
        const apiUrl = `/pc/api/v1/baccarat/info`; // 新增变量
        try {
            const response = await apiClient.get(apiUrl,Requestbody,this.token,time_zone);
            return response;
        } catch (error) {
            throw error;
        }
    }
    //get请求/pc/api/v1/baccarat/info
    public async getuserfunds(Requestbody) :Promise<any>{
        const apiUrl = `/pc/api/v1/user-funds/user-funds/`+Requestbody.currency; // 新增变量
        try {
            const response = await apiClient.get(apiUrl,Requestbody,this.token,time_zone);
            return response;
        } catch (error) {
            throw error;
        }
    }

    public async bet(Requestbody) :Promise<any>{
        const apiUrl = `/pc/api/v1/baccarat/betNew`; // 新增变量
        try {
            const response = await apiClient.post(apiUrl, 
                Requestbody,this.token,time_zone
            );
            return response;
        } catch (error) {
            throw error;
        }
    }

    public async calBetAmount(amount:number) :Promise<any>{
        const apiUrl = `/pc/api/v1/game/calBetAmount?amount=${amount}`; // 新增变量
        try {
            const response = await apiClient.post(apiUrl, 
                {},this.token,time_zone
            );
            return response;
        } catch (error) {
            throw error;
        }
    }
    public async getgameDetail(gameId:number) :Promise<any>{
        const apiUrl = `/pc/api/v1/game/gameDetail?gameId=${gameId}`; // 新增变量
        try {
            const response = await apiClient.post(apiUrl, 
                {},this.token,time_zone
            );
            return response;
        } catch (error) {
            throw error;
        }
    }
}
