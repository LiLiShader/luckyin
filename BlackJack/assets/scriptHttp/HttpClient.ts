export default class HttpClient {
    // 基础 URL
    private baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    // GET 请求
    public async get(endpoint: string, params?: Record<string, any>): Promise<any> {
        const url = this.buildUrl(endpoint, params);
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return this.handleResponse(response);
    }

    // POST 请求
    public async post(endpoint: string, body: Record<string, any>, token?: string, timeZone?: string): Promise<any> {
        const url = `${this.baseUrl}${endpoint}`;
        const headers: HeadersInit = {
            'Content-Type': 'application/json',
        };

        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        if (timeZone) {
            headers['time-zone'] = timeZone;
        }

        const response = await fetch(url, {
            method: 'POST',
            headers: headers,
            // body: JSON.stringify(body),
        });

        return this.handleResponse(response);
    }

    // 构建请求 URL
    private buildUrl(endpoint: string, params?: Record<string, any>): string {
        let url = `${this.baseUrl}${endpoint}`;
        if (params) {
            const queryString = new URLSearchParams(params).toString();
            url += `?${queryString}`;
        }
        return url;
    }

    // 处理响应
    private async handleResponse(response: Response): Promise<any> {
        // if (!response.ok) {
        //     throw new Error(`HTTP error! status: ${response.status}`);
        // }
        return response.json();
    }
} 