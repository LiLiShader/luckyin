import HttpRequest from "./HttpRequest";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Main extends cc.Component {

    @property(cc.Node)
    BG:cc.Node=null;
    @property([cc.Prefab])
    columnPrefab:cc.Prefab[]=[];
    @property
    private delayBetweenColumns: number = 0.3; // 列之间的延迟时间

    private isSpinning: boolean = false;
    //icon池子
    private iconPool: cc.SpriteFrame[] = [];
    @property(sp.Skeleton)
    private spAni: sp.Skeleton[] = [];
    speed: number = 1;
    winAmount: number;
    token:string="jm4zl5m97uz99m4sjd8sj9tx0rnv5ns6";
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
            cc.find("Canvas/Down/betnum/icon").getComponent(cc.Sprite).spriteFrame=spriteFrame;
        });

        if(this.token==""){
            cc.find("Canvas/NotLoggedIn").active=true;
        }
        cc.find("Canvas/Down/L/tips/qipao/Label").getComponent(cc.Label).string=this.currencyName+"："+this.currencyName+"-L=1:1";
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
        this.initIconPool();
        this.initTextLabel();
        HttpRequest.getInstance().getgameDetail(27).then((res)=>{
            console.log(res);
            this.maxStake=res.data.maxStake;
            this.minStake=res.data.minStake;
        });
    }
    initIconPool() {
        for(let i = 1; i <= 9; i++){
            cc.resources.load(i.toString(), cc.SpriteFrame, (err, spriteFrame) => {
                this.iconPool.push(spriteFrame);
            });
        }   
    }


    private initColumn(gameResult: number[][]) {
        // 先执行退出动画，然后再生成新的图标
        this.clearColumnsWithAnimation(() => {
            // 退出动画完成后的回调，开始生成新图标
            this.generateNewColumns(gameResult);
        });
    }

    private clearColumnsWithAnimation(callback: Function) {
        let maxDelay = 0;
        
        // 反向遍历列
        for(let i = this.BG.children.length - 1; i >= 0; i--) {
            const column = this.BG.children[i];
            // 反向遍历每列中的图标
            for(let j = column.children.length - 1; j >= 0; j--) {
                const icon = column.children[j];
                
                // 计算延迟时间（反向顺序）
                const delay = ((this.BG.children.length - 1 - i) * 0.2) + 
                             ((column.children.length - 1 - j) * 0.1);
                maxDelay = Math.max(maxDelay, delay + 0.5); // 0.5是动画时间
                
                // 创建退出动画
                cc.tween(icon.children[0])
                .delay(delay)
                .to(0.3, { scale: 1.2 })
                .to(0.2, {
                    position: cc.v3(0, -1000),
                    scale: 0.5,
                    opacity: 0
                }, {
                    easing: 'quadIn'
                })
                .call(() => {
                    // 当动画完成时移除节点
                    icon.destroy();
                })
                .start();
            }
        }
        
        // 在所有退出动画完成后执行回调
        this.scheduleOnce(() => {
            callback();
        }, maxDelay);
    }

    private generateNewColumns(gameResult: number[][]) {
        
        // 创建所有列并设置初始位置
        for(let i = 0; i < gameResult.length; i++) {
            for(let j = 0; j < gameResult[i].length; j++) {
                let column = cc.instantiate(this.columnPrefab[gameResult[i][j]-1]);
                column.parent = this.BG.children[i];
                
                // 设置初始位置（在屏幕上方）
                column.children[0].setPosition(0, 2000);
                
                // 创建动画序列
                cc.tween(column.children[0])
                .delay((i * 0.3) + (j * 0.2)) // 每列和每行都有延迟
                .to(1-this.speed/5, {
                    position: cc.v3(0, 0),
                })
                .to(0.2, {
                    scale: 0.7,
                })
                .to(0.2, {
                    scale: 1,
                })
                .delay(0.2)
                .to(0.2, {
                    scale: 0.7,
                })
                .to(0.2, {
                    scale: 1,
                })
                .start();
            }
        }
    }
    private currentWinningInfo: any = null; // 当前获胜信息
    private checkAndFlashWinningIcons() {
        if (!this.currentWinningInfo) return; // 如果没有获胜信息，直接返回

        // 遍历所有图标节点
        this.BG.children.forEach(column => {
            column.children.forEach(icon => {
                
                if (icon.name === this.currentWinningInfo.winningNo.toString()) {
                    this.flashIcon(icon); // 播放闪红动画
                }
            });
        });
    }
    
    private flashIcon(icon: cc.Node, flashCount: number = 6) {
        const originalColor = icon.color; // 保存原始颜色
        const flashColor = cc.Color.RED; // 闪红颜色
    
        // 闪红动画
        cc.tween(icon.children[0])
            .repeat(flashCount,
                cc.tween()
                    .to(0.1, { color: flashColor }) // 变红
                    .to(0.1, { color: originalColor }) // 恢复
            )
            .start();
    }

    async bet() {
        if(this.betnum == 0 && !this.isSpinning){  // 只在非旋转态下检查投注
            let tips = cc.find("Canvas/tips");
            cc.find("Canvas/tips/Label").getComponent(cc.Label).string = "Please place a bet";
            cc.tween(tips)
                .parallel(
                    cc.tween(tips).to(0.5, {opacity: 255}),
                    cc.tween(tips).to(0.5, {position: cc.v3(0,0,0)})
                )
                .delay(2)
                .to(0.5, {position: cc.v3(0,700,0)})
                .to(0.5, {opacity: 0})
                .start();
            return;
        }
        if (this.isSpinning) return;
        this.isSpinning = true;

        try {
            const response = await HttpRequest.getInstance().bet({},this.betnum,this.currency,27,this.isUsr_L);
            let isInsufficient = false;
            if(response.msg=="insufficient funds"){
                console.log("余额不足")
                cc.find("Canvas/Insufficient Balance").active=true;
                isInsufficient = true;
                return;
            }
            if(isInsufficient){
                return;
            }
            console.log('获取的响应:', response);
            const results = JSON.parse(response.data.gameResult);
            
            cc.find("Canvas/Down/betnum/Mask").active=true;
            // cc.find("Canvas/Down/投注按钮Mask").active=true;

            // 依次处理每组结果
            this.processResultsSequentially(results, 0);
            
        } catch (error) {
            console.error('处理请求时出错:', error);
            this.isSpinning = false;
            return;
        }
    }

    // 添加新方法处理连续结果
    private processResultsSequentially(results: any[], currentIndex: number) {
        if (currentIndex >= results.length) {
            // 所有结果都处理完毕
            if (this.isAuto) {
                this.scheduleOnce(() => {
                    this.isSpinning = false;  // 移到这里，确保在开始新一轮前设置
                    this.bet();
                }, 0.5);
            } else {
                this.isSpinning = false;  // 非自动模式下，直接设置为false
            }
            cc.find("Canvas/Down/betnum/Mask").active=false;
            cc.find("Canvas/Down/投注按钮Mask").active=false;
            return;
        }

        const currentResult = results[currentIndex];
        this.initColumn(currentResult.gameResult);

        // 计算总动画时间
        const totalAnimationTime = this.calculateTotalAnimationTime(currentResult.gameResult);

        // 处理当前结果的获胜信息
        this.scheduleOnce(() => {
            this.showGameResult(currentResult.gameResult, currentResult.winningInfo, () => {
                // 在显示完当前结果后，继续处理下一个结果
                this.processResultsSequentially(results, currentIndex + 1);
            });
        }, totalAnimationTime);
    }

    // 计算动画总时间
    private calculateTotalAnimationTime(gameResult: number[][]): number {
        return (gameResult.length - 1) * 0.3 + 
               (gameResult[0].length - 1) * 0.2 + 2; // 2秒是完整动画时间
    }

    // 修改显示结果的方法
    private showGameResult(gameResult: number[][], winningInfo: any, callback: Function) {
        this.currentWinningInfo = winningInfo[0]; // 设置当前的获胜信息
        let tips = cc.find("Canvas/tips");
        let tipsLabel = cc.find("Canvas/tips/Label").getComponent(cc.Label);
        
        // 检查是否是第一次显示（第一个结果）
        const isFirstResult = winningInfo === undefined;
        
        if (isFirstResult) {
            // 第一次显示，扣除投注金额
            this.income -= this.betnum;
            this.showIncome();
        }

        // 检查是否获胜
        if (winningInfo && winningInfo.length > 0) {
            // 播放获胜动画
            this.spAni.forEach(ani => {
                ani.animation = "start";
            });
            
            // 计算本次获胜金额
            let currentWinAmount = 0;
            winningInfo.forEach(info => {
                const winAmount = Number(info.winAmount);
                if (!isNaN(winAmount)) {
                    currentWinAmount += winAmount;
                }
            });
            
            // 格式化获胜金额
            currentWinAmount = Number(currentWinAmount.toFixed(2));
            
            // 更新收入
            this.income += currentWinAmount;
            this.showIncome();
            
            // 胜利特效 - 同时播放三个特效
            for (let i = 1; i <= 3; i++) {
                let effectNode = cc.find(`Canvas/BG/Node${i}`);
                if (effectNode) {
                    effectNode.active = true;
                    let skeleton: sp.Skeleton = effectNode.getComponent(sp.Skeleton);
                    
                    // 监听动画完成事件
                    skeleton.setCompleteListener(() => {
                        effectNode.active = false;  // 动画播放完成后隐藏节点
                        skeleton.setCompleteListener(null);  // 移除监听器
                    });
                    
                    skeleton.animation = "start";
                }
            }
            
            // 设置获胜消息
            let winMessage = `Bet amount: ${this.betnum}\n Win: ${currentWinAmount}`;
            if (winningInfo.length > 1) {
                winMessage += ` (${winningInfo.length} lines)`;
            }
            tipsLabel.string = winMessage;
            
            console.log('Win Info:', {
                winningInfo: winningInfo,
                totalWin: currentWinAmount,
                lines: winningInfo.length
            });
        } else {
        
            // 设置失败消息
            tipsLabel.string = isFirstResult ? 
                `Lose: ${this.betnum}` : 
                "No win";
        }
        
        // 显示提示动画
        cc.tween(tips)
            .parallel(
                cc.tween(tips).to(0, {opacity: 255}),
                cc.tween(tips).to(0, {position: cc.v3(0,0,0)})
            )
            .delay(1)
            .to(0, {position: cc.v3(0,700,0)})
            .to(0, {opacity: 0})
            .call(() => {
                callback(); // 调用回调函数处理下一个结果
            })
            .start();
        // 在所有图标生成动画结束后触发闪红
        this.checkAndFlashWinningIcons();
        // this.scheduleOnce(() => {
        //     // callback();
        // }, this.calculateTotalAnimationTime(gameResult));
    }
    risk:number=1;//风险
    selectRick(event: cc.Event.EventTouch,string: string){
        cc.find("Canvas/Down/rick/select").active = !cc.find("Canvas/Down/rick/select").active;
        if(string!=""&&string!=null) cc.find("Canvas/Down/rick/Label").getComponent(cc.Label).string = string;
        switch (string) {
            case "high":this.risk=3;break;
            case "mid":this.risk=2;break;
            case "low":this.risk=1;break;
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
                node.children[i].color = new cc.Color(191,238,255,255);
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
    setBetnum(value:number){
        this.betnum=value;
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
                this.setBetnum(numberValue);
            });
            
            // 设置初始值
            editBox.string = this.minStake+'';
            this.setBetnum(this.minStake);
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
        this.setBetnum(newValue);
        this.TEXT_LABEL.string = newValue.toString();
    
    }
    @property(cc.Label)
    incomeLabel:cc.Label=null;//总收入
    showIncome(){
        //this.incomeLabel.string=this.income.toFixed(2).toString();
    }


    newGame(){
        cc.director.loadScene("Main");
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
