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

    public async bet(Requestbody) :Promise<any>{
        const apiUrl = `/pc/api/v1/sicBo/bet`; // 新增变量
        try {
            const response = await apiClient.post(apiUrl, 
                Requestbody,this.token,time_zone
            );
            return response;
        } catch (error) {
            throw error;
        }
    }
}
