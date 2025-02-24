import HttpClient from './HttpClient';
const {ccclass, property} = cc._decorator;
const apiClient = new HttpClient('https://testapi.luckyin.com');
// const apiClient = new HttpClient('http://10.6.16.27:8100');
// const token ="tt0476n0x2icejru16p10ufy5695zd5b"
const time_zone ="Asia/Shanghai"
@ccclass
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

    public async bet(betAmount:number,currency:number,gameId:number) :Promise<any>{
        const apiUrl = `/pc/api/v1/blackjack/bet?betAmount=${betAmount}&currency=${currency}&gameId=${gameId}`; // 新增变量
        try {
            const response = await apiClient.post(apiUrl, 
                {},this.token,time_zone
            );
            return response;
        } catch (error) {
            throw error;
        }
    }
    public async deal(recordId:number) :Promise<any>{
        const apiUrl = `/pc/api/v1/blackjack/deal?recordId=${recordId}`; // 新增变量
        try {
            const response = await apiClient.post(apiUrl, 
                {},this.token,time_zone
            );
            return response;
        } catch (error) {
            throw error;
        }
    }
    public async stop(recordId:number) :Promise<any>{
        const apiUrl = `/pc/api/v1/blackjack/stop?recordId=${recordId}`; // 新增变量
        try {
            const response = await apiClient.post(apiUrl, 
                {},this.token,time_zone
            );
            return response;
        } catch (error) {
            throw error;
        }
    }
    public async redouble(recordId:number) :Promise<any>{
        const apiUrl = `/pc/api/v1/blackjack/redouble?recordId=${recordId}`; // 新增变量
        try {
            const response = await apiClient.post(apiUrl, 
                {},this.token,time_zone
            );
            return response;
        } catch (error) {
            throw error;
        }
    }
    public async buyInsurance(recordId:number) :Promise<any>{
        const apiUrl = `/pc/api/v1/blackjack/buyInsurance?recordId=${recordId}`; // 新增变量
        try {
            const response = await apiClient.post(apiUrl, 
                {},this.token,time_zone
            );
            return response;
        } catch (error) {
            throw error;
        }
    }   
    public async notBuyInsurance(recordId:number) :Promise<any>{
        const apiUrl = `/pc/api/v1/blackjack/notBuyInsurance?recordId=${recordId}`; // 新增变量
        try {
            const response = await apiClient.post(apiUrl, 
                {},this.token,time_zone
            );
            return response;
        } catch (error) {
            throw error;
        }
    }  
    public async divide(recordId:number) :Promise<any>{
        const apiUrl = `/pc/api/v1/blackjack/divide?recordId=${recordId}`; // 新增变量
        try {
            const response = await apiClient.post(apiUrl, 
                {},this.token,time_zone
            );
            return response;
        } catch (error) {
            throw error;
        }
    }  
    public async info(recordId:number) :Promise<any>{
        const apiUrl = `/pc/api/v1/blackjack/info?recordId=${recordId}`; // 新增变量
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
