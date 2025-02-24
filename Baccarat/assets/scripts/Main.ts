import HttpRequest from "./HttpRequest";
const {ccclass, property} = cc._decorator;
interface BetDetail {
    amount: number;
    betType: number;
    betTypeStr: string;
    winAmount: number;
  }
  
  interface RequestBody {
    currency: number;
    details: BetDetail[];
    gameId: number; // 修正文档中的拼写错误 gameld -> gameId
  }
@ccclass
export default class Main extends cc.Component {
    

    @property(cc.Node)
    BG:cc.Node=null;

    @property(cc.Prefab)
    card:cc.Prefab=null
    speed: number = 1;
    winAmount: number;
    token:string="kwd11l8ignavim7rv89t2rezjyr4m1m4";
    //币种
    currency:number=1;
    currencyName:string="BTC";
    onLoad(){
        let currentUrl: string = window.location.href;
        this.token = this.getTokenFromUrl(currentUrl);
        this.currency = this.getCurrencyFromUrl(currentUrl);
        this.currencyName=this.getCurrencyNameFromUrl(currentUrl);  


        console.log("获取到的token:", this.token);
        console.log("获取到的currency:", this.currency);
        console.log("获取到的currencyName:", this.currencyName);

        HttpRequest.getInstance().token=this.token;

        cc.resources.load("icon/"+this.currencyName,cc.SpriteFrame, (err, spriteFrame) => {
            cc.find("Canvas/Panal/Bet1/icon").getComponent(cc.Sprite).spriteFrame=spriteFrame;
            cc.find("Canvas/Panal/Bet2/icon").getComponent(cc.Sprite).spriteFrame=spriteFrame;
            cc.find("Canvas/Panal/Bet3/icon").getComponent(cc.Sprite).spriteFrame=spriteFrame;
            cc.find("Canvas/BG/Banker betting/icon").getComponent(cc.Sprite).spriteFrame=spriteFrame;
            cc.find("Canvas/BG/And betting/icon").getComponent(cc.Sprite).spriteFrame=spriteFrame;
            cc.find("Canvas/BG/Idle home betting/icon").getComponent(cc.Sprite).spriteFrame=spriteFrame;
            cc.find("Canvas/Panal/autoBg/bg1/icon").getComponent(cc.Sprite).spriteFrame=spriteFrame;
            cc.find("Canvas/Panal/autoBg/bg2/icon").getComponent(cc.Sprite).spriteFrame=spriteFrame;
        });

        if(this.token==""){
            cc.find("Canvas/NotLoggedIn").active=true;
        }
        cc.find("Canvas/Panal/L/tips/qipao/Label").getComponent(cc.Label).string=this.currencyName+"："+this.currencyName+"-L=1:1";
        
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
    maxStake=100
    minStake=1
    start () {
        this.initTextLabel_1();
        this.initTextLabel_2();
        this.initTextLabel_3();
        this.initTextLabel_4();
        this.initTextLabel_5();
        this.initTextLabel_6(); 
        HttpRequest.getInstance().getgameDetail(27).then((res)=>{
            console.log(res);
            this.maxStake=res.data.maxStake;
            this.minStake=res.data.minStake;
        });
    }
    Banker:number[]=[]//庄家牌
    Player:number[]=[]//闲家牌
    isUsr_L:boolean=true
    //下注
    async bet() { 
        if(this.gamestatic==1)return
        this.gamestatic=1
        //删除所有子节点
        cc.find("Canvas/BG/Card1").removeAllChildren()
        cc.find("Canvas/BG/Card2").removeAllChildren()
        this.Banker=[]
        this.Player=[]
        cc.find("Canvas/BG/CardNum1/Label").getComponent(cc.Label).string="0"
        cc.find("Canvas/BG/CardNum2/Label").getComponent(cc.Label).string="0"
        cc.find("Canvas/BG/CardNum1").color=new cc.Color(72,72,72,255)
        cc.find("Canvas/BG/CardNum2").color=new cc.Color(72,72,72,255)
        if(this.庄 == 0&&this.闲==0&&this.和 == 0){  // 只在非旋转态下检查投注
            console.log("Please place a bet")
            let tips = cc.find("Canvas/tips");
            cc.find("Canvas/tips/Label").getComponent(cc.Label).string = "Please place a bet";
            cc.tween(tips)
                .parallel(
                    cc.tween(tips).to(0.5, {opacity: 255}),
                    cc.tween(tips).to(0.5, {position: cc.v3(0,0,0)})
                )
                .delay(2)
                .to(0.5, {position: cc.v3(0,-800,0)})
                .to(0.5, {opacity: 0})
                .call(() => {
                    this.gamestatic=0
                })
                .start();
            return;
        }

        console.log("下注")
        let details=[]
        if(this.庄==0&&this.和==0){
            details=[
                  {
                    "amount": this.闲,
                    "betType": 3,
                  }
            ]
        }else if(this.闲==0&&this.和==0){
            details=[
                {
                    "amount": this.庄,
                    "betType": 4,
                }
          ]
        }else if(this.闲==0&&this.庄==0){
            details=[
                {
                    "amount": this.和,
                    "betType": 5,
                  }
          ]
        }else if(this.和!=0&&this.庄!=0){
            details=[
                {
                    "amount": this.庄,
                    "betType": 4,
                  },
                {
                  "amount": this.和,
                  "betType": 5,
                },
          ]
        }else if(this.和!=0&&this.闲!=0){
            details=[
                  {
                    "amount": this.闲,
                    "betType": 3,
                  },
                {
                  "amount": this.和,
                  "betType": 5,
                },
          ]
        }
        let lamount
        await HttpRequest.getInstance().calBetAmount(
            (this.闲+this.和+this.庄)
          ).then((res)=>{
            lamount=res.data.lAmount
        });
        let isreturn=false
        await HttpRequest.getInstance().getuserfunds({currency:this.currency}).then((res)=>{
            console.log(res);
            if(res.data.lamount<lamount){
                this.isUsr_L=false
                cc.find("Canvas/Panal/L/No").getComponent(cc.Sprite).enabled=true
                cc.find("Canvas/Panal/L/Yes").getComponent(cc.Sprite).enabled=false
                // cc.find("Canvas/Lbuzu").active=true
                // if(this.isAuto){
                //     // this.isAuto=false
                //     isreturn=true
                // }
            }
        });
        if(isreturn){
            return
        }
        try {
            const response = await HttpRequest.getInstance().bet({
                "currency": this.currency.toString(),
                "details": details,
                "gameId": 5,
                "useL": this.isUsr_L
              });
              console.log('获取的响应:', response);
                let isInsufficient = false;

                if(response.msg=="insufficient funds"){
                    cc.find("Canvas/Insufficient Balance").active=true;
                    isInsufficient = true;
                    return;
                }
                if(isInsufficient){
                    return;
                }

                
                this.chuliresponse(response)
                } catch (error) {
                    this.gamestatic=0
                console.error('处理请求时出错:', error);
                return;
            }
        
    }
    
    chuliresponse(response){
        
        for (let index = 0; index < response.data.bankerCardList.length; index++) {
            let ccv2
            switch (index) {
                case 0:ccv2=cc.v2(0,0);break;
                case 1:ccv2=cc.v2(85,-50);break;
                case 2:ccv2=cc.v2(170,-100);break;
                default:ccv2=cc.v2(170,-100);
                    break;
            }
            this.scheduleOnce(()=>{
                this.insCard(response.data.bankerCardList[index],ccv2,"1")
            },1*index)
        }
        for (let index = 0; index < response.data.playerCardList.length; index++) {
            let ccv2
            switch (index) {
                case 0:ccv2=cc.v2(0,0);break;
                case 1:ccv2=cc.v2(85,-50);break;
                case 2:ccv2=cc.v2(170,-100);break;
                default:ccv2=cc.v2(170,-100);
                    break;
            }
            this.scheduleOnce(()=>{
                this.insCard(response.data.playerCardList[index],ccv2,"2")
                if(index==response.data.playerCardList.length-1){
                    this.scheduleOnce(()=>{
                        this.settle()
                    },0.5)
                }
            },(1*index+0.5))
        }
    }
    async postBetNew() {
        const url = '/pc/api/v1/baccarat/betNew';
        
        // 请求头设置
        const headers = {
          'Authorization': this.token, // 替换实际token
          'time-zone': "Asia/Shanghai",              // 时区示例
          'Content-Type': 'application/json'
        };
      
        // 请求体（已修正JSON格式）
        const body: RequestBody = {
          currency: 1,
          details: [
            {
              amount: 50,
              betType: 1,
              betTypeStr: "player_bet",
              winAmount: 0
            }
          ],
          gameId: 5
        };
      
        try {
          const response = await fetch(url, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(body)
          });
      
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
      
          const data = await response.json();
          console.log('Response:', data);
          return data;
        } catch (error) {
          console.error('Request failed:', error);
          throw error;
        }
      }
    insCard(data,pos:cc.Vec2,aorb:string){
        {
            let card= cc.instantiate(this.card)
            card.parent=cc.find("Canvas/BG/Card"+aorb)
            card.setPosition(786,580)
            //卡牌运动动效 到达目标点后scale.x到1
            cc.tween(card)
            .to(0.2, {position: cc.v3(pos.x,pos.y,0)})
            .to(0.1, {scaleX: 0})
            .call(()=>{
                card.getChildByName("cardbg").active=false
            })
            .to(0.1, {scaleX: 1})
            .start()
            //设置牌面
            switch(data.num){
                case 1:
                    card.getChildByName("Label").getComponent(cc.Label).string="A"
                    break
                case 11:
                    card.getChildByName("Label").getComponent(cc.Label).string="J"
                    break
                case 12:
                    card.getChildByName("Label").getComponent(cc.Label).string="Q"
                    break
                case 13:
                    card.getChildByName("Label").getComponent(cc.Label).string="K"
                    break
                default:
                    card.getChildByName("Label").getComponent(cc.Label).string=data.num
                    break
            }
            //设置花色
            card.getChildByName(data.suit.toString()).active=true
            if(aorb=="1"){
                this.Banker.push(data.num)
            }else{
                this.Player.push(data.num)
            }
        }
    }
    gamestatic=0
    async settle(){
        this.gamestatic=0
        let bankerPoint=this.getPoint(this.Banker)  
        let playerPoint=this.getPoint(this.Player)
        cc.find("Canvas/BG/CardNum1/Label").getComponent(cc.Label).string=bankerPoint.toString()
        cc.find("Canvas/BG/CardNum2/Label").getComponent(cc.Label).string=playerPoint.toString()
        if(bankerPoint>playerPoint){
            cc.find("Canvas/BG/CardNum1").color=cc.Color.GREEN
            cc.find("Canvas/BG/CardNum2").color=cc.Color.RED
        }else if(bankerPoint<playerPoint){
            cc.find("Canvas/BG/CardNum1").color=cc.Color.RED
            cc.find("Canvas/BG/CardNum2").color=cc.Color.GREEN
        }else{
            cc.find("Canvas/BG/CardNum1").color=cc.Color.YELLOW
            cc.find("Canvas/BG/CardNum2").color=cc.Color.YELLOW
        }
        // console.log("结算")
        // try {
        //     var dat = new FormData()
        //     dat.append("role ","2")
        //     dat.append("gameId","5")
        //     const response = await HttpRequest.getInstance().post(dat,`/pc/api/v1/baccarat/settle`);
        //         console.log('获取的响应:', response);
        //     } catch (error) {
        //         console.error('处理请求时出错:', error);
        //         return;
        // }
        this.scheduleOnce(()=>{
            this.autoLuoji()
        },1)
    }
    autoLuoji(){
        if(this.isAuto){
            this.autoTime--
            this.TEXT_LABEL_4.node.parent.getComponent(cc.EditBox).string=this.autoTime.toString()
            this.bet()
            if(this.autoTime<=0){
                this.isAuto=false
            }
        }
    }
    //点数计算：2到9的牌面值即为其点数。10、J、Q、K均视为0点。A为1点。点数只取个位数，例如，15点则视为5点。
    getPoint(cards:number[]){
        let point=0
        for(let i=0;i<cards.length;i++){
            if(cards[i]<=9){
                point+=cards[i]
            }else{
                point+=0
            }
        }
        point=point%10
        return point
    }
    

    lastSelect=0//最后的选择

    betnum_1:number=0;//下注金额
    @property(cc.Label)
    TEXT_LABEL_1:cc.Label=null;
    private initTextLabel_1() {
        const editBox = this.TEXT_LABEL_1.node.parent.getComponent(cc.EditBox);
        if (editBox) {
            // 添加 TEXT_CHANGED 事件监听
            editBox.node.on('text-changed', (editbox: cc.EditBox) => {
                let text = editbox.string;
                
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
                
                // 处理整数部分的前导零和小数部分
            if (dotIndex !== -1) {
                // 分离整数和小数部分
                const integerPart = numericValue.substring(0, dotIndex);
                const decimalPart = numericValue.substring(dotIndex);
                // 去除整数部分的前导零，至少保留一个0
                const cleanedInteger = integerPart.replace(/^0+/, '') || '0';
                numericValue = cleanedInteger + decimalPart;
            } else {
                // 无小数点时，去除所有前导零，保留至少一个0
                numericValue = numericValue.replace(/^0+/, '') || '0';
            }
                
                // 转换为数字进行范围检查
                let numberValue = Number(numericValue);
                
                // 限制最小值和最大值
                if (numberValue < 0.0) {
                    numberValue = 0.0;
                    numericValue = '0.0';
                } else if (numberValue > this.maxStake) {
                    numberValue = this.maxStake;
                    numericValue = this.maxStake+'';
                }
                
                // 如果文本与处理后的值不同，更新EditBox的值
                if (text !== numericValue) {
                    editbox.string = numericValue;
                }
                this.betnum_1 = numberValue;
                
                if (numberValue > 0) {
                    cc.find("Canvas/Panal/Bet3/Mask").active = true;
                } else {
                    cc.find("Canvas/Panal/Bet3/Mask").active = false;
                }
                cc.find("Canvas/BG/Banker betting/Label").getComponent(cc.Label).string = numberValue + "";
                // this.庄 = numberValue;
                this.set庄(numberValue)

                this.lastSelect = 1;
            });
            
            // 设置初始值
            editBox.string = '0';
            this.betnum_1 = 0;
        }
    }
    ChengOrChu_1(event: cc.Event.EventTouch, string: string) {
        let newValue: number;
        
        if (string == "1") {
            // 乘2
            this.betnum_1 = Number(this.TEXT_LABEL_1.string);
            newValue = this.betnum_1 * 2;
        } else {
            // 除2
            this.betnum_1 = Number(this.TEXT_LABEL_1.string);
            newValue = Number((this.betnum_1 / 2).toFixed(2)); // 保留两位小数
        }
    
        // 限制最大最小值
        if (newValue < this.minStake) {
            newValue = this.minStake;
        } else if (newValue > this.maxStake) {
            newValue = this.maxStake;
        }
    
        // 更新值
        this.betnum_1 = newValue;
        // this.庄=newValue
        this.set庄(newValue)
        this.TEXT_LABEL_1.string = newValue.toString();
        cc.find("Canvas/BG/Banker betting/Label").getComponent(cc.Label).string=newValue.toString()
        this.TEXT_LABEL_1.node.parent.getComponent(cc.EditBox).string=newValue.toString()
        // 可选：当达到限制时显示提示

    }

    betnum_2:number=0;//下注金额
    @property(cc.Label)
    TEXT_LABEL_2:cc.Label=null;
    private initTextLabel_2() {
        const editBox = this.TEXT_LABEL_2.node.parent.getComponent(cc.EditBox);
        if (editBox) {
            // 添加 TEXT_CHANGED 事件监听
            editBox.node.on('text-changed', (editbox: cc.EditBox) => {
                let text = editbox.string;
                
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
                
                // 处理整数部分的前导零和小数部分
            if (dotIndex !== -1) {
                // 分离整数和小数部分
                const integerPart = numericValue.substring(0, dotIndex);
                const decimalPart = numericValue.substring(dotIndex);
                // 去除整数部分的前导零，至少保留一个0
                const cleanedInteger = integerPart.replace(/^0+/, '') || '0';
                numericValue = cleanedInteger + decimalPart;
            } else {
                // 无小数点时，去除所有前导零，保留至少一个0
                numericValue = numericValue.replace(/^0+/, '') || '0';
            }
                
                // 转换为数字进行范围检查
                let numberValue = Number(numericValue);
                
                // 限制最小值和最大值
                if (numberValue < this.minStake) {
                    numberValue = this.minStake;
                    numericValue = this.minStake+'';
                } else if (numberValue > this.maxStake) {
                    numberValue = this.maxStake;
                    numericValue = this.maxStake+'';
                }
                
                // 如果文本与处理后的值不同，更新EditBox的值
                if (text !== numericValue) {
                    editbox.string = numericValue;
                }
                this.betnum_2 = numberValue;
                
                cc.find("Canvas/BG/And betting/Label").getComponent(cc.Label).string = numberValue + "";
                // this.和 = numberValue;
                this.set和(numberValue)
                this.lastSelect = 2;
            });
            
            // 设置初始值
            editBox.string = '0';
            this.betnum_2 = 0;
        }
    }
    ChengOrChu_2(event: cc.Event.EventTouch, string: string) {
        let newValue: number;
        
        if (string == "1") {
            // 乘2
            this.betnum_2 = Number(this.TEXT_LABEL_2.string);
            newValue = this.betnum_2 * 2;
        } else {
            // 除2
            this.betnum_2 = Number(this.TEXT_LABEL_2.string);
            newValue = Number((this.betnum_2 / 2).toFixed(2)); // 保留两位小数
        }
    
        // 限制最大最小值
        if (newValue < this.minStake) {
            newValue = this.minStake;
        } else if (newValue > this.maxStake) {
            newValue = this.maxStake;
        }
    
        // 更新值
        this.betnum_2 = newValue;
        // this.和=newValue
        this.set和(newValue)

        this.TEXT_LABEL_2.string = newValue.toString();
        cc.find("Canvas/BG/And betting/Label").getComponent(cc.Label).string=newValue.toString()
        this.TEXT_LABEL_2.node.parent.getComponent(cc.EditBox).string=newValue.toString()
    }

    betnum_3:number=0;//下注金额
    @property(cc.Label)
    TEXT_LABEL_3:cc.Label=null;
    private initTextLabel_3() {
        const editBox = this.TEXT_LABEL_3.node.parent.getComponent(cc.EditBox);
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
                
                // 如果第一个字符是小数点，在前面添加
                if (numericValue.startsWith('.')) {
                    numericValue = '0' + numericValue;
                }
                // 处理整数部分的前导零和小数部分
            if (dotIndex !== -1) {
                // 分离整数和小数部分
                const integerPart = numericValue.substring(0, dotIndex);
                const decimalPart = numericValue.substring(dotIndex);
                // 去除整数部分的前导零，至少保留一个0
                const cleanedInteger = integerPart.replace(/^0+/, '') || '0';
                numericValue = cleanedInteger + decimalPart;
            } else {
                // 无小数点时，去除所有前导零，保留至少一个0
                numericValue = numericValue.replace(/^0+/, '') || '0';
            }
                
                // 转换为数字进行范围检查
                let numberValue = Number(numericValue);
                
                // 限制最小值和最大值
                if (numberValue < this.minStake) {
                    numberValue = this.minStake;
                    numericValue = this.minStake+'';
                } else if (numberValue > this.maxStake) {
                    numberValue = this.maxStake;
                    numericValue = this.maxStake+'';
                }
                
                if (text !== numericValue) {
                    editbox.string = numericValue;
                }
                this.betnum_3 = numberValue;
                
                if(numberValue>0){
                    cc.find("Canvas/Panal/Bet1/Mask").active=true
                }else{
                    cc.find("Canvas/Panal/Bet1/Mask").active=false
                }
                cc.find("Canvas/BG/Idle home betting/Label").getComponent(cc.Label).string=numberValue+""
                // this.闲=numberValue
                this.set闲(numberValue)
                this.lastSelect=3
            });
            
            // 设置初始值
            editBox.string = '0';
            this.betnum_3 = 0;
        }
    }
    ChengOrChu_3(event: cc.Event.EventTouch, string: string) {
        let newValue: number;
        
        if (string == "1") {
            // 乘2
            this.betnum_3 = Number(this.TEXT_LABEL_3.string);
            newValue = this.betnum_3 * 2;
        } else {
            // 除2
            this.betnum_3 = Number(this.TEXT_LABEL_3.string);
            newValue = Number((this.betnum_3 / 2).toFixed(2)); // 保留两位小数
        }
    
        // 限制最大最小值
        if (newValue < this.minStake) {
            newValue = this.minStake;
        } else if (newValue > this.maxStake) {
            newValue = this.maxStake;
        }
    
        // 更新值
        this.betnum_3 = newValue;
        // this.闲=newValue
        this.set闲(newValue)
        this.TEXT_LABEL_3.string = newValue.toString();
        cc.find("Canvas/BG/Idle home betting/Label").getComponent(cc.Label).string=newValue.toString()
        this.TEXT_LABEL_3.node.parent.getComponent(cc.EditBox).string=newValue.toString()

    }

    chexiao(){
        console.log(this.lastSelect)
        switch(this.lastSelect){
            case 1:
                this.betnum_1=0
                this.TEXT_LABEL_1.string = '0.0';
                this.TEXT_LABEL_1.node.parent.getComponent(cc.EditBox).string='0'
                cc.find("Canvas/BG/Banker betting/Label").getComponent(cc.Label).string='0'
                cc.find("Canvas/Panal/Bet3/Mask").active=false
                this.lastSelect=0
                // this.庄=0
                this.set庄(0)
                break
            case 2:
                this.betnum_2=0
                this.TEXT_LABEL_2.string = '0.0';
                this.TEXT_LABEL_2.node.parent.getComponent(cc.EditBox).string='0'
                cc.find("Canvas/BG/And betting/Label").getComponent(cc.Label).string='0'
                // cc.find("Canvas/Panal/Bet3/Mask").active=false
                this.lastSelect=0
                // this.和=0
                this.set和(0)
                break
            case 3:
                this.betnum_3=0
                this.TEXT_LABEL_3.string = '0.0';
                this.TEXT_LABEL_3.node.parent.getComponent(cc.EditBox).string='0'
                cc.find("Canvas/BG/Idle home betting/Label").getComponent(cc.Label).string='0'
                cc.find("Canvas/Panal/Bet1/Mask").active=false
                this.lastSelect=0
                // this.闲=0
                this.set闲(0)
                break
            case 0:
                this.betnum_1=0
                this.TEXT_LABEL_1.string = '0.0';
                this.TEXT_LABEL_1.node.parent.getComponent(cc.EditBox).string='0'
                cc.find("Canvas/BG/Banker betting/Label").getComponent(cc.Label).string='0'
                cc.find("Canvas/Panal/Bet3/Mask").active=false
                this.betnum_2=0
                this.TEXT_LABEL_2.string = '0.0';
                this.TEXT_LABEL_2.node.parent.getComponent(cc.EditBox).string='0'
                cc.find("Canvas/BG/And betting/Label").getComponent(cc.Label).string='0'
                cc.find("Canvas/Panal/Bet3/Mask").active=false
                this.betnum_3=0
                this.TEXT_LABEL_3.string = '0.0';
                this.TEXT_LABEL_3.node.parent.getComponent(cc.EditBox).string='0'
                cc.find("Canvas/BG/Idle home betting/Label").getComponent(cc.Label).string='0'
                cc.find("Canvas/Panal/Bet1/Mask").active=false
                this.set庄(0)
                this.set和(0)
                this.set闲(0)

                break
        }
    }

    newGame(){
        cc.director.loadScene("Main");
    }
    
    庄:number=0
    和:number=0
    闲:number=0
    set庄(value){
        this.庄=value
        this.xiuzhengL()

    }
    set闲(value){
        this.闲=value
        this.xiuzhengL()

    }
    set和(value){
        this.和=value
        this.xiuzhengL()

    }
    // betMap  = {
    //     "1": 0, // 
    //     "2": 0 ,// 
    //     "3": 0, // 闲
    //     "4": 0, // 庄
    //     "5": 0, // 和
    // };



    isAuto:boolean=false;
    selectAuto(){
        cc.find("Canvas/Panal/bg/noAuto").getComponent(cc.Sprite).enabled = !cc.find("Canvas/Panal/bg/noAuto").getComponent(cc.Sprite).enabled;
        cc.find("Canvas/Panal/bg/Auto").getComponent(cc.Sprite).enabled = !cc.find("Canvas/Panal/bg/Auto").getComponent(cc.Sprite).enabled;
        cc.find("Canvas/Panal/autoBg").active = !cc.find("Canvas/Panal/autoBg").active;
    }
    startAuto(){
        if(this.isAuto)return
        if(this.autoTime>0){
            this.isAuto=true
            this.autoLuoji()
        }
    }
    stopAuto(){
        this.isAuto=false
    }
    autoTime:number=0;//自动下注次数
    @property(cc.Label)
    TEXT_LABEL_4:cc.Label=null;
    initTextLabel_4(){
        const editBox = this.TEXT_LABEL_4.node.parent.getComponent(cc.EditBox);
        if (editBox) {
            editBox.node.on('text-changed', (editbox: cc.EditBox) => {
                const text = editbox.string;
                let numericValue = text.replace(/[^0-9]/g, '');
                editbox.string = numericValue;
                this.autoTime=Number(numericValue)
            });
            editBox.string = '0';
            this.autoTime = 0;
        }
    }

    autoWin:number=0;//止盈
    @property(cc.Label)
    TEXT_LABEL_5:cc.Label=null;
    //只能正数包含小数 默认是0
    initTextLabel_5(){
        const editBox = this.TEXT_LABEL_5.node.parent.getComponent(cc.EditBox);
        if (editBox) {
            editBox.node.on('text-changed', (editbox: cc.EditBox) => {
                const text = editbox.string;
                let numericValue = text.replace(/[^0-9.]/g, '');
                editbox.string = numericValue;
            });
            editBox.string = '0.0';
            this.autoWin = 0.0;
        }
    }
    autoLose:number=0;//止损
    @property(cc.Label)
    TEXT_LABEL_6:cc.Label=null;
    //只能正数包含小数
    initTextLabel_6(){
        const editBox = this.TEXT_LABEL_6.node.parent.getComponent(cc.EditBox);
        if (editBox) {
            editBox.node.on('text-changed', (editbox: cc.EditBox) => {
                const text = editbox.string;
                let numericValue = text.replace(/[^0-9.]/g, '');
                editbox.string = numericValue;
            });
            editBox.string = '0.0';
            this.autoLose = 0.0;
        }
    }

    openOrclose(any,str){
        if(str=="1"){
            cc.find("Canvas/Guize").active=true
        }else{
            cc.find("Canvas/Guize").active=false
        }
    }

    NoUseL(){
        this.isUsr_L=false
        cc.find("Canvas/Panal/L/No").getComponent(cc.Sprite).enabled=true
        cc.find("Canvas/Panal/L/Yes").getComponent(cc.Sprite).enabled=false
    }
    YesUseL(){
        this.isUsr_L=true
        cc.find("Canvas/Panal/L/No").getComponent(cc.Sprite).enabled=false
        cc.find("Canvas/Panal/L/Yes").getComponent(cc.Sprite).enabled=true
        this.xiuzhengL()
    }
    xiuzhengL(){
        
        HttpRequest.getInstance().calBetAmount(
            (this.闲+this.和+this.庄)
          ).then((res)=>{
            let lamount=res.data.lAmount
            HttpRequest.getInstance().getuserfunds({currency:this.currency}).then((res)=>{
                console.log(res);
                if(res.data.lamount<lamount){
                    this.isUsr_L=false
                    cc.find("Canvas/Panal/L/No").getComponent(cc.Sprite).enabled=true
                    cc.find("Canvas/Panal/L/Yes").getComponent(cc.Sprite).enabled=false
                    if(this.isAuto){
                        cc.find("Canvas/Lbuzu").active=true
                        cc.director.pause()
                    }
                }
            });
        });
    }
    closeTips(){
        cc.find("Canvas/Lbuzu").active=false
        cc.director.resume()
    }
    OnOffTips(){
        cc.find("Canvas/Panal/L/tips/qipao").active=!cc.find("Canvas/Panal/L/tips/qipao").active
    }
}
