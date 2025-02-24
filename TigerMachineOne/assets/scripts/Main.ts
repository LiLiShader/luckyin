import HttpRequest from "./HttpRequest";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Main extends cc.Component {

    @property(cc.Node)
    private one: cc.Node = null;
    @property(cc.Node)
    private twe: cc.Node = null;
    @property(cc.Node)
    private three: cc.Node = null;

    @property
    private delayBetweenColumns: number = 0.3; // 列之间的延迟时间

    private isSpinning: boolean = false;
    //icon池子
    private iconPool: cc.SpriteFrame[] = [];
    @property(sp.Skeleton)
    private spAni: sp.Skeleton[] = [];
    speed: number = 1;
    token:string="kwd11l8ignavim7rv89t2rezjyr4m1m4";
    //币种
    currency:number=1;
    currencyName:string="BTC";

    onLoad(){
        let currentUrl: string = window.location.href;
        this.token = this.getTokenFromUrl(currentUrl);
        this.currency = this.getCurrencyFromUrl(currentUrl);
        this.currencyName=this.getCurrencyNameFromUrl(currentUrl);

        HttpRequest.getInstance().token=this.token;

        cc.resources.load("icon/"+this.currencyName,cc.SpriteFrame, (err, spriteFrame) => {
            cc.find("Canvas/BG/ceil/icon").getComponent(cc.Sprite).spriteFrame=spriteFrame;
        });

        if(this.token==""){
            cc.find("Canvas/NotLoggedIn").active=true;
        }
        cc.find("Canvas/Down/L/tips/qipao/Label").getComponent(cc.Label).string=this.currencyName+"："+this.currencyName+"-L=1:1";
    }
    maxStake=100
    minStake=1

    start () {
        this.initializeAnimations();
        this.initIconPool();
        this.initTextLabel();

        HttpRequest.getInstance().getgameDetail(25).then((res)=>{
            console.log(res);
            this.maxStake=res.data.maxStake;
            this.minStake=res.data.minStake;
        });
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
    
    initIconPool() {
        for(let i = 1; i <= 9; i++){
            cc.resources.load(i.toString(), cc.SpriteFrame, (err, spriteFrame) => {
                this.iconPool.push(spriteFrame);
            });
        }   

    }

    private initializeAnimations() {
        // 确保每个节点都有动画组件
        if (!this.one.getComponent(cc.Animation)) {
            this.one.addComponent(cc.Animation);
        }
        if (!this.twe.getComponent(cc.Animation)) {
            this.twe.addComponent(cc.Animation);
        }
        if (!this.three.getComponent(cc.Animation)) {
            this.three.addComponent(cc.Animation);
        }
    }

    async bet() {
        if(this.betnum==0){
            let tips=cc.find("Canvas/tips");
            cc.find("Canvas/tips/Label").getComponent(cc.Label).string="Please place a bet";
            cc.tween(tips)
            .parallel(
                        cc.tween(tips).to(0.5,{opacity:255}),
                        cc.tween(tips).to(0.5,{position:cc.v3(0,0,0)})
                    )
                    .delay(2)
                    .to(0.5,{position:cc.v3(0,700,0)})
                    .to(0.5,{opacity:0})
                    .start();
            return;
        }
        if (this.isSpinning) return;
        let isWin=false
        let gameResult=[]
        let winAmount
        console.log(this.betnum);
        let isInsufficient=false;

        console.log("风险：",this.risk)
        await HttpRequest.getInstance().bet({},this.betnum,this.currency,25,this.risk,this.isUsr_L).then(response => {
            console.log('获取的响应:', response);
            if(response.msg=="insufficient funds"){
                console.log("余额不足")
                cc.find("Canvas/Insufficient Balance").active=true;
                isInsufficient = true;
                return;
            }
            if(response.data.winAmount>0){
                isWin=true;
            }else{
                isWin=false;
            }
            winAmount=response.data.winAmount;
            gameResult.push(Number(response.data.gameResult[1]));
            gameResult.push(Number(response.data.gameResult[3]));
            gameResult.push(Number(response.data.gameResult[5]));

            console.log("gameResult:",gameResult);
            console.log('获取的响应:', response
            );
        })
        .catch(error => {
            console.error('处理请求时出错:', error);
            return
        });
        if(isInsufficient){
            return;
        }
        cc.find("Canvas/Down/betnum/Mask").active=true;

        this.isSpinning = true;
        this.scheduleOnce(()=>{
            this.one.children[0].getComponent(cc.Sprite).spriteFrame = this.iconPool[Math.floor(Math.random()*8)];
            this.twe.children[0].getComponent(cc.Sprite).spriteFrame = this.iconPool[Math.floor(Math.random()*8)];
            this.three.children[0].getComponent(cc.Sprite).spriteFrame = this.iconPool[Math.floor(Math.random()*8)];
            this.one.children[2].getComponent(cc.Sprite).spriteFrame = this.iconPool[Math.floor(Math.random()*8)];
            this.twe.children[2].getComponent(cc.Sprite).spriteFrame = this.iconPool[Math.floor(Math.random()*8)];
            this.three.children[2].getComponent(cc.Sprite).spriteFrame = this.iconPool[Math.floor(Math.random()*8)];
    

            this.one.children[1].getComponent(cc.Sprite).spriteFrame = this.iconPool[gameResult[0]];
            this.twe.children[1].getComponent(cc.Sprite).spriteFrame = this.iconPool[gameResult[1]];
            this.three.children[1].getComponent(cc.Sprite).spriteFrame = this.iconPool[gameResult[2]];
        },0.5)
        
        try {
            // 在播放动画前设置监听
            const onAnimFinished = () => {
                this.isSpinning = false;
                let tips=cc.find("Canvas/tips");
                if(isWin){
                    this.spAni[0].animation = "start";
                    this.spAni[1].animation = "start";
                    this.spAni[2].animation = "start";

                    this.income+=winAmount;
                    this.showIncome();

                    cc.find("Canvas/tips/Label").getComponent(cc.Label).string="Win:"+winAmount;
                    cc.tween(tips)
                    .parallel(
                        cc.tween(tips).to(0.5,{opacity:255}),
                        cc.tween(tips).to(0.5,{position:cc.v3(0,0,0)})
                    )
                    .delay(3-this.speed/2)
                    .to(0.5,{position:cc.v3(0,700,0)})
                    .to(0.5,{opacity:0})
                    .start();
                    
                }else{
                    
                    this.income-=this.betnum;
                    this.showIncome();

                    cc.find("Canvas/tips/Label").getComponent(cc.Label).string="Lose:"+this.betnum;
                    cc.tween(tips)
                    .parallel(
                        cc.tween(tips).to(0.5,{opacity:255}),
                        cc.tween(tips).to(0.5,{position:cc.v3(0,0,0)})
                    )
                    .delay(2)
                    .to(0.5,{position:cc.v3(0,700,0)})
                    .to(0.5,{opacity:0})
                    .start();
                }
                this.scheduleOnce(() => {
                    if(this.isAuto)this.bet();
                }, 0.5);
                cc.find("Canvas/Down/betnum/Mask").active=false;
                // 移除监听器
                this.three.getComponent(cc.Animation).off('finished', onAnimFinished);
            };

            // 添加监听器
            this.three.getComponent(cc.Animation).on('finished', onAnimFinished);

            // 立即播放第一列
            this.playColumnAnimation(this.one);
            
            // 延迟播放第二列
            this.scheduleOnce(() => {
                this.playColumnAnimation(this.twe);
            }, this.delayBetweenColumns);
            
            // 延迟播放第三列
            this.scheduleOnce(() => {
                this.playColumnAnimation(this.three);
            }, this.delayBetweenColumns * 2);
        } catch (error) {
            this.isSpinning = false;
        }
    }
    newgame(){
        cc.director.loadScene("Main");
    }
    private playColumnAnimation(node: cc.Node) {
        const anim = node.getComponent(cc.Animation);
        // 确保动画速度与当前选择的速度相匹配
        const state = anim.play("roll");
        if (state) {
            state.speed = this.speed; // 使用实例变量speed来控制动画速度
        }
    }
    risk:number=0;//风险
    selectRick(event: cc.Event.EventTouch,string: string){
        cc.find("Canvas/Down/rick/select").active = !cc.find("Canvas/Down/rick/select").active;
        if(string!=""&&string!=null) cc.find("Canvas/Down/rick/Label").getComponent(cc.Label).string = string;
        switch (string) {
            case "high":this.risk=2;break;
            case "mid":this.risk=1;break;
            case "low":this.risk=0;break;
        }
    }
    selectSpeed(event: cc.Event.EventTouch,string: string){
        
        switch (string) {
            case "0":this.speed=1;break;
            case "1":this.speed=2;break;
            case "2":this.speed=5;break;
        }
        let node=cc.find("Canvas/Down/speed");
        for(let i = 0; i < node.children.length; i++){
            if(i!=Number(string)){
                node.children[i].color = new cc.Color(142,142,142,255);
                node.children[i].children[0].active=false;
            }else{
                node.children[i].color = new cc.Color(255,255,255,255);
                node.children[i].children[0].active=true;
            }
        }
    }
    isAuto:boolean=false;
    selectAuto(){
        cc.find("Canvas/Down/auto/no").getComponent(cc.Sprite).enabled = !cc.find("Canvas/Down/auto/no").getComponent(cc.Sprite).enabled;
        cc.find("Canvas/Down/auto/yes").getComponent(cc.Sprite).enabled = !cc.find("Canvas/Down/auto/yes").getComponent(cc.Sprite).enabled;
        this.isAuto=!this.isAuto;

        // if(this.isAuto){
        //     this.bet();
        // }
    }
    income:number=0;//总收入
    betnum:number=0;//下注金额
    setbetnum(value){
        this.betnum=value
        this.xiuzhengL()
    }
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
                // this.betnum = numberValue;
                this.setbetnum(numberValue);
                
            });
            
            // 设置初始值
            editBox.string = this.minStake+"";
            this.setbetnum(this.minStake);
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
        if (newValue < this.minStake) {
            newValue = this.minStake;
        } else if (newValue > this.maxStake) {
            newValue = this.maxStake;
        }
    
        // 更新值
        // this.betnum = newValue;
        this.setbetnum(newValue);
        this.TEXT_LABEL.string = newValue.toString();
    
    }
    @property(cc.Label)
    incomeLabel:cc.Label=null;//总收入
    showIncome(){
        this.incomeLabel.string=this.income.toFixed(2).toString();
    }
    openOrclose(any,str){
        if(str=="1"){
            cc.find("Canvas/Guize").active=true
        }else{
            cc.find("Canvas/Guize").active=false
        }
    }


    isUsr_L:boolean=true
    NoUseL(){
        this.isUsr_L=false
        cc.find("Canvas/Down/L/No").getComponent(cc.Sprite).enabled=true
        cc.find("Canvas/Down/L/Yes").getComponent(cc.Sprite).enabled=false
    }
    YesUseL(){
        this.isUsr_L=true
        cc.find("Canvas/Down/L/No").getComponent(cc.Sprite).enabled=false
        cc.find("Canvas/Down/L/Yes").getComponent(cc.Sprite).enabled=true
        this.xiuzhengL()
    }
    xiuzhengL(){
        HttpRequest.getInstance().calBetAmount(
            (this.betnum)
          ).then((res)=>{
            let lamount=res.data.lAmount
            HttpRequest.getInstance().getuserfunds({currency:this.currency}).then((res)=>{
                console.log(res);
                if(res.data.lamount<lamount){
                    this.isUsr_L=false
                    cc.find("Canvas/Down/L/No").getComponent(cc.Sprite).enabled=true
                    cc.find("Canvas/Down/L/Yes").getComponent(cc.Sprite).enabled=false
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
        cc.find("Canvas/Down/L/tips/qipao").active=!cc.find("Canvas/Down/L/tips/qipao").active
    }
}
