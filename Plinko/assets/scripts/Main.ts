import HttpRequest from "./HttpRequest";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Main extends cc.Component {
    test={
        "0": [],
        "1": [],
        "2": [],
        "3": [],
        "4": [],
        "5": [],
        "6": [],
        "7": [],
        "8": [],
        "9": [],
        "10":[],
        "11":[],
        "12":[],
        "13":[],
        "14":[],
        "15":[],
        "16":[]
    }
    RewardArray:cc.Node[] = [];
    @property(cc.Prefab)
    RewardItem:cc.Prefab = null;
    @property(cc.Node)
    private betBall: cc.Node = null;
    @property(cc.Node)
    RewardParent:cc.Node = null;
    @property(cc.Label)
    showBetNumber:cc.Label = null;
    @property(cc.Label)
    showBetNumberUnder:cc.Label = null;
    nowPaishu:number = 8;
    nowRick:number = 0;

    isText:boolean = false;

    token:string="kwd11l8ignavim7rv89t2rezjyr4m1m4";
    //币种
    currency:number=1;

    nowBetNumber:number=0;
    currencyName:string="BTC";

    protected onLoad(): void {
        cc.director.getPhysicsManager().enabled = true;
        cc.director.getPhysicsManager().gravity = cc.v2(0, -1280);

        let currentUrl: string = window.location.href;
        // this.token = this.getTokenFromUrl(currentUrl);
        // this.currency = this.getCurrencyFromUrl(currentUrl);
        // this.currencyName=this.getCurrencyNameFromUrl(currentUrl);

        console.log("获取到的token:", this.token);
        console.log("获取到的currency:", this.currency);
        console.log("获取到的currencyName:", this.currencyName);
        HttpRequest.getInstance().token=this.token;

        cc.resources.load("icon/"+this.currencyName,cc.SpriteFrame, (err, spriteFrame) => {
            cc.find("Canvas/bg/leftUI/betnum/icon").getComponent(cc.Sprite).spriteFrame=spriteFrame;
        });

        if(this.token==""){
            cc.find("Canvas/NotLoggedIn").active=true;
        }


        this.initTextLabel();


        this.schedule(()=>{
            for(let i = 0; i < cc.find("Canvas/Parent").children.length; i++){
                cc.find("Canvas/Parent").children[i].active = false;
            }
            cc.find("Canvas/Parent").getChildByName(this.nowPaishu.toString()).active = true;
        },0.2,cc.macro.REPEAT_FOREVER,0.2)
    }
    private getTokenFromUrl(url: string): string {
        try {
            // 使用正则表达式匹配token=后面的值，直到遇到&或结束
            const tokenMatch = url.match(/token=([^&]*)/);
            if (tokenMatch && tokenMatch[1]) {
                return tokenMatch[1];
            }
            return '';
        } catch (error) {
            console.error('解析token失败:', error);
            return '';
        }
    }
    private getCurrencyFromUrl(url: string): number {
        try {
            // 使用正则表达式匹配currency=后面的数值
            const currencyMatch = url.match(/currency=(\d+)/);
            if (currencyMatch && currencyMatch[1]) {
                return parseInt(currencyMatch[1]);
            }
            return 1; // 如果没有找到，返回默认值1
        } catch (error) {
            console.error('解析currency失败:', error);
            return 1; // 发生错误时返回默认值1
        }
    }
    private getCurrencyNameFromUrl(url: string): string {
        try {
            const currencyNameMatch = url.match(/currencyName=([^&]*)/);
            if (currencyNameMatch && currencyNameMatch[1]) {
                const value = currencyNameMatch[1];
                // 验证货币名称是否合法（例如：只允许大写字母）
                if (/^[A-Z]+$/.test(value)) {
                    return value;
                }
            }
            return 'BTC';
        } catch (error) {
            console.error('解析 currencyName 失败:', error);
            return 'BTC';
        }
    }
    async start () {
        if(!this.isText){
        await HttpRequest.getInstance().info({},Number(this.nowPaishu),this.nowRick).then(response => {
            for(let i = 0; i < response.data.odds.length; i++){
                cc.find("Canvas/Parent").getChildByName(this.nowPaishu.toString())
                .getChildByName("Button").children[i].children[0].getComponent(cc.Label).string 
                = response.data.odds[i]+"X";
            }
                console.log('获取的响应:', response.data.odds);
            })
            .catch(error => {
                console.error('处理请求时出错:', error);
                return
            })}

        cc.find("Canvas/出球口").zIndex = 1;
        for(let i = 0; i < cc.find("Canvas/Parent").children.length; i++){
            cc.find("Canvas/Parent").children[i].zIndex = 1;
        }
    }
    async Bet() {
        let finalSlot;
        let isInsufficient = false;
        if(!this.isText){
        await HttpRequest.getInstance().bet({},this.betnum,this.currency,98,this.nowPaishu,this.nowRick).then(response => {
            if(response.msg=="insufficient funds"){
                console.log("余额不足")
                cc.find("Canvas/Insufficient Balance").active=true;
                isInsufficient = true;
                return;
            }
            finalSlot = response.data.finalSlot;
            console.log('获取的响应:', response);
            })
            .catch(error => {
                console.error('处理请求时出错:', error);
                return
            })}

        if(isInsufficient){
            return;
        }
        this.nowBetNumber +=1
        cc.find("Canvas/bg/leftUI/Mask").active = true;
        if(this.isText){
            //生成一个球
            let ball = cc.instantiate(this.betBall);   
            ball.setScale(cc.find("Canvas/Parent").getChildByName(this.nowPaishu.toString()).scale); 
            this.node.addChild(ball);
    
            let x = (-50+Math.random()*100).toFixed(0);
            ball.setPosition(cc.v2(x, 330));
            ball.name = x;
        }else{
            this.indexPoint(finalSlot);

        }

    }
    clickPaishu(){                                          
        if(cc.find("Canvas/bg/leftUI/paishu/Layout").active) {
            cc.find("Canvas/bg/leftUI/paishu/Layout").active = false;
        }else{
            cc.find("Canvas/bg/leftUI/paishu/Layout").active = true;
        }
    }

    async selectPaishu(event,point: string) {
        if(!this.isText){
        await HttpRequest.getInstance().info({},Number(point),this.nowRick).then(response => {
            for(let i = 0; i < response.data.odds.length; i++){
                cc.find("Canvas/Parent").getChildByName(point)
                .getChildByName("Button").children[i].children[0].getComponent(cc.Label).string 
                = response.data.odds[i]+"X";
            }
            console.log('获取的响应:', response);
            })
            .catch(error => {
                console.error('处理请求时出错:', error);
                return
            })}

        cc.find("Canvas/bg/leftUI/paishu/Layout").active = false;
        this.nowPaishu = parseInt(point);
        cc.find("Canvas/bg/leftUI/paishu/Num").getComponent(cc.Label).string = this.nowPaishu.toString();

        for(let i = 0; i < cc.find("Canvas/Parent").children.length; i++){
            cc.find("Canvas/Parent").children[i].active = false;
        }
        cc.find("Canvas/Parent").getChildByName(this.nowPaishu.toString()).active = true;
    }
    clickRick(){
        if(cc.find("Canvas/bg/leftUI/risk/Layout").active) {
            cc.find("Canvas/bg/leftUI/risk/Layout").active = false;
        }else{
            cc.find("Canvas/bg/leftUI/risk/Layout").active = true;
        }
    }
    selectRick(event,point: string) {
        cc.find("Canvas/bg/leftUI/risk/Layout").active = false;
        this.nowRick = parseInt(point);
        cc.find("Canvas/bg/leftUI/risk/Num").getComponent(cc.Label).string = 
        cc.find("Canvas/bg/leftUI/risk/Layout").children[parseInt(point)].getChildByName("Num").getComponent(cc.Label).string;

        this.selectPaishu(null,this.nowPaishu.toString())
    }
    indexPoint(point: string) {
        
        // 获取目标位置数组
        const targetPositions = this.getTargetPositions(this.nowPaishu, point);
        if (!targetPositions || targetPositions.length === 0) {
            console.warn(`未找到有效的目标位置: paishu=${this.nowPaishu}, point=${point}`);
            return;
        }
        
        // 创建小球
        const ball = cc.instantiate(this.betBall);  
        ball.setScale(cc.find("Canvas/Parent").getChildByName(this.nowPaishu.toString()).scale); 
        this.node.addChild(ball);

        // 随机选择一个目标位置
        const randomPos = targetPositions[Math.floor(Math.random() * targetPositions.length)];
        
        // ball.setPosition(cc.v2(randomPos, 330));
        ball.setPosition(cc.v2(randomPos, 500));
        
        //ball运动到指定点
        //ball.getComponent(cc.RopeJoint).connectedBody= cc.find("Canvas/原点").getComponent(cc.RigidBody);

        // ball.getComponent(cc.RopeJoint).maxLength=200;
        // cc.tween(ball.getComponent(cc.RopeJoint))
        // .to(1.5, { maxLength: 1 }, )
        // .start();
        
        console.log(cc.v2(cc.find("Canvas/Parent/8/Button").children[5].position));
    }


    betnum:number=0;//下注金额
    @property(cc.Label)
    TEXT_LABEL:cc.Label=null;
    private initTextLabel() {
        const editBox = this.TEXT_LABEL.node.parent.getComponent(cc.EditBox);
        if (editBox) {
            // 添加 TEXT_CHANGED 事件监听
            editBox.node.on('text-changed', (editbox: cc.EditBox) => {
                const text = editbox.string;
                // 允许数字和小数点，但要处理特殊情况
                let numericValue = text.replace(/[^0-9.]/g, '');
                
                // 处理多个小数点的情况，只保留第一个小数点
                const dotIndex = numericValue.indexOf('.');
                if (dotIndex !== -1) {
                    const beforeDot = numericValue.substring(0, dotIndex + 1);
                    const afterDot = numericValue.substring(dotIndex + 1).replace(/\./g, '');
                    numericValue = beforeDot + afterDot;
                }
                
                // 如果第一个字符是小数点，在前面添加0
                if (numericValue.startsWith('.')) {
                    numericValue = '0' + numericValue;
                }
                
                // 转换为数字进行范围检查
                let numberValue = Number(numericValue);
                
                // 限制最小值和最大值
                if (numberValue < 0.1) {
                    numberValue = 0.1;
                    numericValue = '0.1';
                } else if (numberValue > 100) {
                    numberValue = 100;
                    numericValue = '100';
                }
                
                if (text !== numericValue) {
                    editbox.string = numericValue;
                }
                this.betnum = numberValue;
                
                // 可以添加提示信息（可选）
                if (numberValue < 0.1 || numberValue > 100) {
                    // this.showLimitTip();
                }
            });
            
            // 设置初始值
            editBox.string = '0.1';
            this.betnum = 0.1;
        }
    }
    ChengOrChu(event: cc.Event.EventTouch, string: string) {
        let newValue: number;
        
        if (string == "1") {
            // 乘2
            this.betnum = Number(this.TEXT_LABEL.string);
            newValue = this.betnum * 2;
        } else {
            // 除2
            this.betnum = Number(this.TEXT_LABEL.string);
            newValue = Number((this.betnum / 2).toFixed(2)); // 保留两位小数
        }
    
        // 限制最大最小值
        if (newValue < 0.1) {
            newValue = 0.1;
        } else if (newValue > 100) {
            newValue = 100;
        }
    
        // 更新值
        this.betnum = newValue;
        this.TEXT_LABEL.string = newValue.toString();
    
        // 可选：当达到限制时显示提示
        if ((string == "1" && this.betnum >= 100) || (string == "2" && this.betnum <= 0.1)) {
            // this.showLimitTip();
        }
    }
    isAuto:boolean=false;
    selectAuto(event,string:string){
        // cc.find("Canvas/bg/ToggleContainer/toggle1/checkmark").getComponent(cc.Sprite).enabled = !cc.find("Canvas/bg/ToggleContainer/toggle1/checkmark").getComponent(cc.Sprite).enabled;
        // cc.find("Canvas/bg/ToggleContainer/toggle2/checkmark").getComponent(cc.Sprite).enabled = !cc.find("Canvas/bg/ToggleContainer/toggle2/checkmark").getComponent(cc.Sprite).enabled;
        if(string == "1"){
            this.isAuto=true;
        }else{
            this.isAuto=false;
        }

        // if(this.isAuto){
        //     this.bet();
        // }
    }
    newGame(){
        cc.director.loadScene("Main");
    }
    /**
     * 获取目标位置数组
     * @param paishu 排数
     * @param point 点位
     * @returns 可能的x坐标数组
     */

    private getTargetPositions(paishu: number, point: string): number[] {
        // 定义位置映射表
        const positionMap: { [key: number]: { [key: string]: number[] } } = {
            8: {
                "0": [34.9, 18.7, -4.9, -29.3, 9.5],
                "1": [-20.4, 42.7, -31.4, -45.8, -34.4, -47.2],
                "2": [3.2, -14, 26, -28.4, -25.3],
                "3": [-4.8, 44, -5.3, 20.6, 39.4, -25, 13.3, 7.5, 38.5],
                "4": [26.7, 43.7, -0.1, 13.2, -41.8, 13.2, -2.6, -40.9],
                "5": [-37.2, -12.3, -6.5, -3, 11.4],
                "6": [-5.2, -31.3, 22.3, -5.2, -30.6, -8.5, 26.3, -23, 46.5, 33.7, 0.5],
                "7": [-6.2, 47, -37.4, -27.4],
                "8": [-10, 3.4]
            },
            9: {
                "0": [
                    -26.6
                ],
                "1": [
                    -44.9,
                    11.8
                ],
                "2": [
                    10.5,
                    42.2,
                    -15.5,
                    -41.9,
                    -7.2,
                    -38,
                    -40.6,
                    16.2,
                    34.8,
                    -30.9,
                    6.6,
                    10.5,
                    48.1
                ],
                "3": [
                    44.8,
                    -14.3,
                    7,
                    -49.1,
                    -8,
                    8.8,
                    47.3
                ],
                "4": [
                    47.9,
                    -36.3,
                    1.2,
                    -5.6,
                    1.9,
                    -4.7,
                    -30.6,
                    -31.5,
                    -20.4
                ],
                "5": [
                    -49.4,
                    36.3,
                    5.9,
                    44,
                    10.6,
                    -11,
                    -39.3,
                    -5.1,
                    -14.6
                ],
                "6": [
                    -15.2,
                    -48.3,
                    13.3,
                    -33.6,
                    -44.8,
                    39.8,
                    -46.9,
                    -33.3,
                    -5.3,
                    -43.4,
                    -14.4,
                    41.7,
                    25.9,
                    -3.3
                ],
                "7": [
                    -27.6,
                    28.5,
                    -48.1,
                    13.8,
                    49.7,
                    28.5,
                    20,
                    19.6
                ],
                "8": [
                    31.7,
                    -46.4,
                    47.6,
                    47.6,
                    -20.2,
                    15.7,
                    17.6,
                    41,
                    -40.4,
                    -30.7
                ],
                "9": [
                    -8.3,
                    -22.3,
                    -33.1,
                    -21.6
                ]
            },
            10:{
                "0": [
                    2.8,
                    -34,
                    10.5,
                    7.1
                ],
                "1": [
                    -7.2,
                    4.1,
                    -44,
                    31.9
                ],
                "2": [
                    -15.4,
                    48.8,
                    7.7,
                    -15.4,
                    12.4,
                    15.1,
                    -1.8,
                    3.6,
                    -42.3,
                    -15.4
                ],
                "3": [
                    24.2,
                    18.5,
                    -24.4,
                    23.7,
                    37.1,
                    -43.9,
                    -27.1,
                    31,
                    26,
                    3.7,
                    29.7,
                    -31.3,
                    8.7,
                    21.7,
                    -19.4
                ],
                "4": [
                    -17.6,
                    -19.2,
                    -48.1,
                    -17.1,
                    -7.5,
                    -42.9,
                    -17.6,
                    35.3,
                    -44.4
                ],
                "5": [
                    27.6,
                    13.7,
                    -42.6,
                    49.3,
                    33.5,
                    4.8,
                    -31.7,
                    18.8,
                    -34.4,
                    45.2,
                    -43,
                    -23.9,
                    32.3,
                    33.5,
                    27.6,
                    5.8,
                    33.5,
                    -44.8,
                    -43,
                    21.5,
                    -38.3,
                    -38.3,
                    10.4,
                    42.1
                ],
                "6": [
                    26.8,
                    -31.1,
                    22.2,
                    -45.4,
                    -40.3,
                    -47.9,
                    33.8,
                    -10.7,
                    22.2,
                    13.1,
                    33.7,
                    -9.7
                ],
                "7": [
                    -18.9,
                    -33.9,
                    45,
                    23.4,
                    24.1,
                    -44.1,
                    19.6
                ],
                "8": [
                    -0.4,
                    -46.7,
                    25.6,
                    20.5,
                    -17.7,
                    15.4,
                    -26.3,
                    -10.1
                ],
                "9": [
                    21.2,
                    -9.4,
                    16.9,
                    -9.4,
                    23.2,
                    -4.2
                ],
                "10": [
                    38.8,
                    -6.9,
                    26.4,
                    38.8,
                    40.1,
                    19.9,
                    34,
                    34,
                    44.3,
                    8
                ]
            },
            11:{
                "0": [
                    -4.7,
                    -0.1,
                    7.9
                ],
                "1": [
                    35.3,
                    35.3,
                    42
                ],
                "2": [
                    44.4,
                    -41,
                    -10
                ],
                "3": [
                    24.8,
                    44.3,
                    1.1,
                    -24.6,
                    -15.5,
                    -12.1,
                    -28.2
                ],
                "4": [
                    18,
                    -0.6,
                    -15.9,
                    -17.6,
                    19.4,
                    -31.6,
                    22.3,
                    48.1
                ],
                "5": [
                    -22.8,
                    17.8,
                    -43.1,
                    13.4
                ],
                "6": [
                    -37,
                    -42.8,
                    -11.4,
                    41.1,
                    -16.4,
                    -13.4,
                    -11.9,
                    -49.5,
                    -37.2,
                    -38,
                    21.8
                ],
                "7": [
                    -37.8,
                    -30.9,
                    45,
                    -5.6,
                    11.6,
                    45,
                    37.4,
                    -40,
                    -22.3,
                    12.2
                ],
                "8": [
                    -14.1,
                    21.1,
                    26,
                    -25.8,
                    18.8,
                    -22.9,
                    1.5
                ],
                "9": [
                    -42.3,
                    36.8,
                    26.5,
                    34.3,
                    30.2,
                    5.8,
                    -46.4
                ],
                "10": [
                    -8.9,
                    15.4,
                    -9.6,
                    -45.5,
                    7.3
                ],
                "11": [
                    11.7,
                    -9.7,
                    3.4
                ]
            },
            12:{
                "0": [
                    -29.6,
                    -46.7,
                    -14.3,
                    26.9
                ],
                "1": [
                    -41.3
                ],
                "2": [
                    -45.5,
                    -23.4,
                    49.5,
                    21,
                    -45.5,
                    -16.2,
                    29.9,
                    -23.4
                ],
                "3": [
                    -2.4,
                    -14.8,
                    -45.8,
                    20.4,
                    25.6,
                    -27.9,
                    -32,
                    -37.5
                ],
                "4": [
                    -7.8,
                    6.8,
                    -28.6,
                    9,
                    27.5,
                    -32.6
                ],
                "5": [
                    -39.4,
                    41.8,
                    -18.4,
                    -32.1,
                    -46.2,
                    5.1,
                    22.9,
                    27.3,
                    -33.8,
                    38.5,
                    -23.1
                ],
                "6": [
                    -25.9,
                    -44.9,
                    -14.2,
                    31.2,
                    19.4,
                    -1.4,
                    -35.6,
                    19.2,
                    -33.7,
                    16,
                    -30.6,
                    -14.4,
                    21.8
                ],
                "7": [
                    14.1,
                    31,
                    36.3,
                    -34.8,
                    -13.4,
                    -17.2,
                    -34.5,
                    -32.8,
                    6.3,
                    -15.7
                ],
                "8": [
                    -44.8,
                    24.4,
                    27.8,
                    28.5,
                    43.5,
                    -18.9,
                    15.1,
                    45.7,
                    -13.9,
                    7.8
                ],
                "9": [
                    -36.9,
                    -48.6,
                    -39,
                    22.6,
                    -5.7,
                    -17.4,
                    -44.5
                ],
                "10": [
                    47.2,
                    0.1
                ],
                "11": [
                    10.9,
                    -31.3,
                    23.7,
                    -3.5,
                    5.3
                ],
                "12": [
                    -16.3
                ]
            },
            13:{
                "0": [
                    -10.1,
                    -22.3,
                    -14.9,
                    48.4,
                    4.3
                ],
                "1": [
                    -32.2,
                    -43.2,
                    28.8,
                    32.1,
                    -15.5
                ],
                "2": [
                    -35.6,
                    -1.9,
                    -12,
                    -33.2,
                    47.1,
                    -26.4,
                    49.6,
                    32.8,
                    7.8,
                    -46.7,
                    -19.5,
                    47.6,
                    -7.1,
                    5.3
                ],
                "3": [
                    39.6,
                    5.1,
                    20.1,
                    48.7,
                    26.3,
                    -6.7,
                    -9.6,
                    -30.8,
                    4,
                    36.2,
                    48.4,
                    31.5,
                    -18.1,
                    17.4,
                    -37.4,
                    -18.1,
                    -35.8,
                    -9.2
                ],
                "4": [
                    -6.5,
                    -15.5,
                    -14.1,
                    -4.2,
                    -32.3,
                    22.6,
                    34.6,
                    8.9,
                    -4.2,
                    0
                ],
                "5": [
                    -7.6,
                    -21.5,
                    8.9,
                    16.1,
                    -19.6,
                    17.1,
                    12.2,
                    -26.7,
                    39.8
                ],
                "6": [
                    -13.2,
                    -42.6,
                    21.5,
                    -44.1,
                    -43.1,
                    2.4,
                    -25.5,
                    31.8,
                    -50,
                    -25.1,
                    2.4,
                    -1.5,
                    -44.1,
                    -40.3,
                    -25,
                    29.4,
                    -0.8
                ],
                "7": [
                    -29.4,
                    -9.3,
                    -12.7,
                    -14.5,
                    28.9,
                    20,
                    13.7,
                    -49,
                    -6.8,
                    35.3,
                    -14.5
                ],
                "8": [
                    20.8,
                    -21.3,
                    26.8,
                    3.1,
                    -1.3,
                    47.2,
                    -22.5,
                    48.8,
                    -42.9,
                    -11.1,
                    -45.1,
                    10.9,
                    36.4,
                    -4.5
                ],
                "9": [
                    15.1,
                    15.1,
                    41.4,
                    0.1,
                    -47.8,
                    1.8,
                    12.7,
                    35.6,
                    -24.9,
                    -32.4,
                    -0.6,
                    -1,
                    -23.9,
                    -3.3
                ],
                "10": [
                    -31.5,
                    38,
                    30.8,
                    2.9,
                    -46.5,
                    22.2,
                    2.9,
                    -44.7,
                    -17.4,
                    -5.1
                ],
                "11": [
                    38.8,
                    32.5
                ],
                "12": [
                    -36.2,
                    10.7,
                    -49.5,
                    -25.7
                ],
                "13": [
                    -4.3,
                    2.5,
                    -39
                ]
            },
            14:{
                "0": [
                    22.7,
                    46.9,
                    45,
                    16.3
                ],
                "1": [
                    29,
                    -37.3,
                    9.1,
                    -6.4
                ],
                "2": [
                    -24.4,
                    -37.4,
                    30.4,
                    14.6,
                    -46.4,
                    -1.8
                ],
                "3": [
                    -3.6,
                    -10.5,
                    40.7,
                    -10.1,
                    20.1,
                    -38.5,
                    10,
                    -18,
                    -42,
                    -39.7,
                    5.8,
                    20
                ],
                "4": [
                    -29.3,
                    -41,
                    1.6,
                    -34.6,
                    -44.8,
                    -24.9,
                    -39.2,
                    -36.5,
                    -47.9,
                    12,
                    -16.9,
                    42.3,
                    -45.3,
                    12,
                    -31.3
                ],
                "5": [
                    8.2,
                    -36.9,
                    -28.4,
                    -25.9,
                    35.3,
                    -1,
                    -0.3,
                    17,
                    29.1,
                    13.6
                ],
                "6": [
                    13.1,
                    -45.7,
                    17,
                    32.8,
                    -48.5,
                    13.5,
                    -9.7,
                    12.6,
                    36,
                    27.1,
                    -46.2,
                    -46.3,
                    28.3,
                    16.1,
                    36,
                    -21,
                    -22,
                    47.6,
                    41.9,
                    -20.6,
                    -1.4,
                    48.7,
                    -10.7,
                    44.9
                ],
                "7": [
                    22.8,
                    19.7,
                    33.3,
                    47,
                    31.7,
                    3.7,
                    41.7,
                    -11.2,
                    15.2,
                    6.6,
                    -32.5,
                    39.5
                ],
                "8": [
                    19.2,
                    -34.5,
                    -14.7,
                    2.3,
                    27.9,
                    31.9,
                    12.1,
                    2.8,
                    -32.7,
                    -30.9,
                    -20.8,
                    -44.7,
                    26.2,
                    7.3,
                    48.3,
                    -25.6,
                    26.2,
                    31.1,
                    -19,
                    -14.7,
                    -13,
                    -37.8
                ],
                "9": [
                    -29.1,
                    21.4,
                    18.3,
                    -3.2,
                    29.2,
                    -16.4,
                    -49.9,
                    -40.4,
                    25.7,
                    -17.3,
                    -45.5,
                    18.2,
                    -33,
                    -22.9,
                    -24.7,
                    -10,
                    -47.1
                ],
                "10": [
                    32.1,
                    -14,
                    14.9,
                    -30.7,
                    -8.4,
                    44.8,
                    -43.5,
                    -3.3,
                    -20.4,
                    -16.5,
                    34.6
                ],
                "11": [
                    -10,
                    13.2,
                    -4.5,
                    -20.1,
                    34.7,
                    -4.2,
                    -26.7,
                    -14.1,
                    20.3,
                    40.2,
                    38.6,
                    -8.7,
                    -29.6
                ],
                "12": [
                    -47.2,
                    26.3,
                    1.9,
                    40.9,
                    5.1,
                    1.8,
                    -16.7,
                    42.5,
                    7.9,
                    48.1,
                    1.9,
                    28.6,
                    46.4,
                    5.1,
                    -26.9
                ],
                "13": [
                    37.3,
                    -5.5,
                    -5.3,
                    37.3,
                    33.8,
                    -22.3,
                    43.3,
                    -0.1
                ],
                "14": [
                    48.8
                ]
            },
            15:{
                "0": [
                    -20.6
                ],
                "1": [
                    12.7,
                    -11.5,
                    10,
                    37,
                    -39.5
                ],
                "2": [
                    47.7,
                    -5,
                    1,
                    -25,
                    46.3
                ],
                "3": [
                    -22,
                    43.4,
                    16.7,
                    -8.8,
                    16.7,
                    -4.6,
                    5.7,
                    -38.4,
                    -27.7,
                    28.3,
                    -9.4,
                    -38.4
                ],
                "4": [
                    21.4,
                    48,
                    -45.9,
                    -16.2,
                    27,
                    -36.1,
                    -33.4,
                    3.2,
                    -26.9,
                    -16.3,
                    47.7,
                    17.5,
                    -34.1
                ],
                "5": [
                    22.8,
                    -38.4,
                    -39,
                    13.3,
                    -29.5,
                    37,
                    -14.2,
                    -46
                ],
                "6": [
                    -32.4,
                    -25.6,
                    -36.7,
                    -20,
                    -7.4,
                    -32.9,
                    -25.5,
                    12.2,
                    13.8,
                    -20.5,
                    -4.9,
                    -22.4,
                    25.2,
                    2.1,
                    -36.5,
                    -14.4
                ],
                "7": [
                    35.6,
                    26.1,
                    35.9,
                    21,
                    23.9,
                    2.1,
                    2.6,
                    -23.7,
                    31.5,
                    -6.4,
                    -17.9
                ],
                "8": [
                    21.9,
                    -24.2,
                    -6.5,
                    -30.7,
                    5.6,
                    -30.5,
                    -26.6,
                    -47.4,
                    -32.4,
                    -15.8,
                    -7.3,
                    -2.1,
                    -38.5,
                    -5.2,
                    -49.6,
                    23.8,
                    -47.2,
                    -49.4
                ],
                "9": [
                    15.3,
                    -21.2,
                    -25.2,
                    -40.6,
                    -4.5,
                    23.2,
                    9.7,
                    -20.7,
                    9.2,
                    -46.6,
                    -48.6,
                    -20.7,
                    1.9,
                    11.4,
                    22.9,
                    3.2,
                    -10.6,
                    25.6
                ],
                "10": [
                    22.2,
                    39.4,
                    39.4,
                    -31,
                    46,
                    42.2,
                    25.9,
                    -37.6
                ],
                "11": [
                    -12.2,
                    -36.9,
                    13.5,
                    45.9,
                    34.6,
                    -27,
                    -19.3,
                    11.3
                ],
                "12": [
                    36.3,
                    -13.1,
                    -48.7,
                    -37.8,
                    8.2,
                    -49.9,
                    -45.4,
                    36.4,
                    -44.9,
                    3
                ],
                "13": [
                    -47.2,
                    -7.9,
                    24.3,
                    -2.7,
                    -3.4,
                    18.7,
                    29.4
                ],
                "14": [
                    -48.5,
                    -1,
                    25.8
                ],
                "15": [
                    43.1,
                    -16.8,
                    33,
                    -12.7
                ]
            },
            16:{
                "0": [17.8],
                "1": [
                    32,
                    -33,
                    -37,
                    -33
                ],
                "2": [
                    -16,
                    -8,
                    31,
                    -8
                ],
                "3": [
                    -17,
                    -35,
                    -17,
                    -35,
                    -25,
                    -35,
                    -16,
                    -17,
                    -17,
                    -17,
                    -17,
                    -35,
                    -35,
                    -37
                ],
                "4": [
                    20,
                    10,
                    26,
                    26,
                    10,
                    -41,
                    47,
                    42,
                    -29
                ],
                "5": [
                    29,
                    5,
                    38,
                    -36,
                    -36,
                    -36,
                    47,
                    -36,
                    -36,
                    31,
                    -34,
                    46,
                    5,
                    5,
                    12
                ],
                "6": [
                    -41,
                    -34,
                    -14,
                    -23,
                    -40,
                    -1,
                    11,
                    28,
                    -39,
                    29,
                    -14
                ],
                "7": [
                    7,
                    18,
                    -43,
                    -41,
                    9,
                    -46,
                    -21,
                    18,
                    -43,
                    -28,
                    22,
                    7,
                    22,
                    -43,
                    44,
                    -43,
                    -27,
                    18,
                    -40,
                    7,
                    -18,
                    -30,
                    45,
                    -14,
                    9,
                    41,
                    1,
                    -18,
                    -18,
                    22,
                    -16
                ],
                "8": [
                    -27,
                    -7,
                    -15,
                    46,
                    42,
                    -7,
                    -12,
                    -9,
                    -15,
                    27,
                    -21,
                    -27,
                    -9
                ],
                "9": [
                    28,
                    27,
                    3,
                    -18,
                    43,
                    24,
                    -22,
                    -6,
                    40,
                    -45,
                    41,
                    -45,
                    43,
                    -21,
                    -22,
                    -6,
                    46,
                    3,
                    -45,
                    33,
                    -45,
                    18
                ],
                "10": [
                    23,
                    39,
                    19,
                    42,
                    23,
                    39,
                    -19,
                    46,
                    23,
                    -12,
                    -30,
                    -30,
                    15,
                    -31,
                    -27
                ],
                "11": [
                    36,
                    -47,
                    -46,
                    -31,
                    -5,
                    38,
                    -12,
                    33,
                    11,
                    -5,
                    -5,
                    -31,
                    15,
                    4,
                    36,
                    -46,
                    16,
                    -5,
                    -5
                ],
                "12": [
                    33,
                    28,
                    4,
                    28,
                    -10,
                    7,
                    41,
                    2,
                    15,
                    -3,
                    25,
                    34,
                    -4,
                    -47
                ],
                "13": [
                    -20,
                    17,
                    -47,
                    17,
                    -4,
                    -20,
                    38,
                    -4,
                    -47,
                    17
                ],
                "14": [
                    25,
                    -26,
                    8,
                    8,
                    -20
                ],
                "15": [
                    2,
                    -20
                ],
                "16": [31.8]
            }
            // 其他排数的映射...
        };

        // 获取对应排数和点位的位置数组
        return positionMap[paishu]?.[point] || [];
    }
    openOrclose(any,str){
        if(str=="1"){
            cc.find("Canvas/Guize").active=true
        }else{
            cc.find("Canvas/Guize").active=false
        }
    }
}
