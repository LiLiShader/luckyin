import { _decorator, BoxCollider, Color, Component, director, EventTouch, find, instantiate, Label, macro, math, Node, PhysicsMaterial, PhysicsSystem, Prefab, Quat, RigidBody, Sprite, tween, UITransform, v3, Vec3 } from 'cc';
import HttpRequest from './HttpRequest';
const { ccclass, property } = _decorator;

@ccclass('Main')
export class Main extends Component {
    //筹码的预制体
    @property(Prefab)
    betPrefabs: Prefab[] = [];
    //按照下注顺序记录下注的和筹码
    @property(Array)
    obBet: {order:Node,num:number}[] = [];
    // 骰子
    @property(Node)
    sicBos: Node[] = [];
    //初始金额
    @property(Number)
    money: number = 100;
    //设置初始金额
    setMoney(money:number){
        this.money = money;
        find("Canvas/Money").getComponent(Label).string = "Remaining principal:"+this.money;
    }
    //下注码数
    @property(Number)
    betNum: number = 10;
    details=[]

    token:string="kwd11l8ignavim7rv89t2rezjyr4m1m4";
    //币种
    currency:number=1;
    onLoad(){
        let currentUrl: string = window.location.href;
        this.token = this.getTokenFromUrl(currentUrl);
        this.currency = this.getCurrencyFromUrl(currentUrl);
        console.log("获取到的token:", this.token);
        console.log("获取到的currency:", this.currency);
        HttpRequest.getInstance().token=this.token;

        if(this.token==""){
            find("Canvas/NotLoggedIn").active=true;
        }
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
    start() {
    // 添加永久摇摆动画
    const starNode = find("Canvas/Star/Star");
    tween(starNode)
        .repeatForever(
            tween()
                .to(0.4, { eulerAngles: v3(0, 0, 5) })
                .to(0.4, { eulerAngles: v3(0, 0, -5) })
        )
        .start();
        this.setMoney(macro.REPEAT_FOREVER);
        // 设置游戏重力
        PhysicsSystem.instance.gravity = new Vec3(0, -20, 0);
        //设置按钮点击事件
        for (let i = 0; i < 6; i++) {
            let child = find(this.Lujing+"/Layout_one").children[i];
            child.on(Node.EventType.TOUCH_END, () => this.onBet(child), this);
        }
        for (let i = 1; i < 16; i++) {
            let child = find(this.Lujing+"/Layout_two").children[i];
            child.on(Node.EventType.TOUCH_END, () => this.onBet(child), this);
        }
        for (let i = 0; i < 14; i++) {
            let child = find(this.Lujing+"/Layout_three").children[i];
            child.on(Node.EventType.TOUCH_END, () => this.onBet(child), this);
        }
        for (let i = 0; i < 13; i++) {
            let child = find(this.Lujing+"/Layout_four").children[i];
            if(i!=5&&i!=7){
                child.on(Node.EventType.TOUCH_END, () => this.onBet(child), this);
            }
        }
        for (let i = 0; i < 3; i++) {
            find(this.Lujing+"/Layout_four").children[5].children[i].on(Node.EventType.TOUCH_END, () => this.onBet(find(this.Lujing+"/Layout_four").children[5].children[i]), this);
            find(this.Lujing+"/Layout_four").children[7].children[i].on(Node.EventType.TOUCH_END, () => this.onBet(find(this.Lujing+"/Layout_four").children[7].children[i]), this);
        }
    }
    // 添加一个标志位来控制是否可以下注
    private canBet: boolean = true;
    //投掷骰子
    private async throwDice():Promise<void> {
        //检测是否下注
        if(this.obBet.length==0){
            console.log("没有下注");
            return;
        }
        // 设置不能下注
        this.canBet = false;
        //缩小投掷按钮
        tween(find(this.Lujing))
        .to(0.3, { scale: v3(0.8, 0.8, 0.8) })
        .start();
        //重置UI
        for (let i = 0; i < 6; i++) {
            let child = find(this.Lujing+"/Layout_one").children[i];  
            child.getComponent(Sprite).color=this.COLORS.hyaline;
        }
        for (let i = 0; i < 16; i++) {
            let child = find(this.Lujing+"/Layout_two").children[i];
            child.getComponent(Sprite).color=this.COLORS.hyaline;
        }
        for (let i = 0; i < 14; i++) {
            let child = find(this.Lujing+"/Layout_three").children[i];
            child.getComponent(Sprite).color=this.COLORS.hyaline;
        }
        for (let i = 0; i < 13; i++) {
            let child = find(this.Lujing+"/Layout_four").children[i];
            child.getComponent(Sprite).color=this.COLORS.hyaline;
        }
        for (let i = 0; i < 3; i++) {
            find(this.Lujing+"/Layout_four").children[5].children[i].getComponent(Sprite).color=this.COLORS.hyaline;
            find(this.Lujing+"/Layout_four").children[7].children[i].getComponent(Sprite).color=this.COLORS.hyaline;
        }
        //禁用GO按钮
        find("Canvas/Go").active=false;
        let isInsufficient = false;
        this.details = this.details.filter(item => item.amount !== 0);
        console.log(this.details)
        let res
        await HttpRequest.getInstance().bet({
            "currency": this.currency,
            "details": this.details,
            "gameId": 49
          }).then(response => {
            console.log(response.msg)
            res=response
            if(response.msg=="insufficient funds"){
                console.log("余额不足")
                find("Canvas/Insufficient Balance").active=true;
                isInsufficient = true;
                return;
            }
            if(response.code!=200){
                find("Canvas/500").active=true;
                return;
            }
            console.log(response)
            if(response.data.gameResult.length>0){
                this.points.push(Number(response.data.gameResult[1]))
                this.points.push(Number(response.data.gameResult[3]))
                this.points.push(Number(response.data.gameResult[5]))
            }
            
            console.log('获取的响应:', response,this.points);
            })
            .catch(error => {
                // for (let i = 0; i < this.sicBos.length; i++) {
                //     for (let j = 0; j < 6; j++) {
                //         if(this.sicBos[i].getChildByName((j+1).toString()).getWorldPosition().y>1.1){
                //             this.points.push(j+1);
                //             break;
                //         }
                //     }
                // }
                console.error('处理请求时出错:', error);
                return
            })
            if(!isInsufficient&&res.code==200){    
                this.unscheduleAllCallbacks();
                console.log("!!!!!!!!!!!!!!!!!!!!")
                for (let i = 0; i < this.sicBos.length; i++) {
                    this.sicBos[i].getComponent(RigidBody).type=RigidBody.Type.DYNAMIC

                    this.sicBos[i].setPosition(v3(1-i, 15, 1-i));
                    this.sicBos[i].setRotation(math.random()*90, math.random()*90, math.random()*90,1);
                    // this.sicBos[i].setPosition(v3(1, 3, 1));
                    // this.sicBos[i].setRotation(0, 0, 0,1);

                    this.scheduleOnce(() => {
                        this.sicBos[i].rotation=this.DICE_ROTATIONS[this.points[i]];

                        // this.sicBos[i].getComponent(RigidBody).type=RigidBody.Type.STATIC
                    }, 7);
                }
                this.scheduleOnce(() => {
                    this.judgePoint();
                }, 7);
            }
    }
    // 定义骰子点数对应的旋转四元数映射
private readonly DICE_ROTATIONS = {
    1: new Quat(0, 0, 0, 0),    // 1点
    2: new Quat(1, 0, 0, 0),    // 2点
    3: new Quat(0, 0, -1, 1),   // 3点
    4: new Quat(-1, 0, 0, 1),   // 4点
    5: new Quat(0, 0, 1, 1),    // 5点
    6: new Quat(1, 0, 0, 1)     // 6点
};
points:number[]=[];
    //判断点数
    private async judgePoint():Promise<void>{
        // let points = [];
        // for (let i = 0; i < this.sicBos.length; i++) {
        //     for (let j = 0; j < 6; j++) {
        //         if(this.sicBos[i].getChildByName((j+1).toString()).getWorldPosition().y>1.1){
        //             points.push(j+1);
        //             console.log(this.sicBos[i].rotation)
        //             break;
        //         }
        //     }
        // }
        

        
        
        find("Canvas/Go/Layout_bet").active=false;
        find("Canvas/Go").active=true;//启用GO按钮
        tween(find(this.Lujing))
        .to(0.3, { scale: v3(1, 1, 1) })
        .call(() => {
            this.judgeSum(this.points);//结算数字总和
            this.judgeTwoPoints(this.points);//结算两个数字的组合
            this.judgeSinglePoint(this.points);//结算单个数字
            this.judgeSize(this.points);//结算大小
            this.judgeOddEven(this.points);//结算奇偶
            this.judgePair(this.points);//结算对子
            this.judgeThreeSame(this.points);//结算三个一样的数字
            this.onClearBet();//结算后清空所有下注
        })
        .start();
    }
    //结算points数字总和
    private judgeSum (points:number[]){
        let sum = 0;
        for (const point of points) {
            sum += point;
        }  
        console.log(sum.toFixed(1));
        //判断points数字是否都相同
        if(points.every(point => point === points[0])){

        }else{
            let button = find(this.Lujing+"/Layout_three").children[sum-4];
            // if(button.name =="0")
            {

                button.getComponent(Sprite).color=this.COLORS.DEFAULT;
                if(button.name !="0"){
                    let mag = 0;
                    if(sum==4||sum==17){
                        mag = 50;
                    }else if(sum==5||sum==16){
                        mag = 20;
                    }else if(sum==6||sum==15){
                        mag = 15;
                    }else if(sum==7||sum==14){
                        mag = 12;
                    }else if(sum==8||sum==13){
                        mag = 8;
                    }else if(sum==9||sum==12||sum==10||sum==11){
                        mag = 6;
                    }
                    this.setMoney(this.money + Number(button.name) * mag);
                }
            }

        }
    }
    //结算points两个数字的组合
    private judgeTwoPoints(points:number[]){
        // 定义所有可能的点数组合
        const combinations = [
            [1,2], [1,3], [1,4], [1,5], [1,6],
            [2,3], [2,4], [2,5], [2,6],
            [3,4], [3,5], [3,6],
            [4,5], [4,6],
            [5,6]
        ];

        // 检查每个组合
        combinations.forEach((combo, index) => {
            if (points.find(point => point === combo[0]) && 
                points.find(point => point === combo[1])) {
                find(this.Lujing+"/Layout_two").children[index+1].getComponent(Sprite).color = this.COLORS.DEFAULT;
                if(find(this.Lujing+"/Layout_two").children[index+1].name !="0"){
                    this.setMoney(this.money + Number(find(this.Lujing+"/Layout_two").children[index+1].name) * 5);
                }
            }
        });
    }
    //结算单个数字 points是否包含1、2、3、4、5、6 逐步检查
    private judgeSinglePoint(points: number[]) {
        for (let i = 1; i <= 6; i++) {
            // 统计当前点数出现的次数
            const count = points.filter(point => point === i).length;
            
            if (count > 0) {
                // 找到对应的UI元素并改变颜色
                find(this.Lujing+"/Layout_one").children[i-1].getComponent(Sprite).color = this.COLORS.DEFAULT;
                // 可以在这里使用count处理具体逻辑
                if(find(this.Lujing+"/Layout_one").children[i-1].name !="0"){
                    this.setMoney(this.money + Number(find(this.Lujing+"/Layout_one").children[i-1].name) * count);
                }
            }
        }
    }
    //判断大小 4-10是小，11-17是大
    private judgeSize(points:number[]){
        let sum = 0;
        for (const point of points) {
            sum += point;
        }
        if(sum>=4&&sum<=10){
            find(this.Lujing+"/Layout_four").children[0].getComponent(Sprite).color=this.COLORS.DEFAULT;
            if(find(this.Lujing+"/Layout_four").children[0].name !="0"){
                this.setMoney(this.money + Number(find(this.Lujing+"/Layout_four").children[0].name) * 1);
            }
        }else if(sum>=11&&sum<=17){
            find(this.Lujing+"/Layout_four").children[12].getComponent(Sprite).color=this.COLORS.DEFAULT;
            if(find(this.Lujing+"/Layout_four").children[12].name !="0"){
                this.setMoney(this.money + Number(find(this.Lujing+"/Layout_four").children[12].name) * 1);
            }
        }
    }
    //判断总和奇偶
    private judgeOddEven(points:number[]){
        if(points.reduce((a,b)=>a+b,0)%2===0){
            find(this.Lujing+"/Layout_four").children[11].getComponent(Sprite).color=this.COLORS.DEFAULT; 
            if(find(this.Lujing+"/Layout_four").children[11].name !="0"){
                this.setMoney(this.money + Number(find(this.Lujing+"/Layout_four").children[11].name) * 1);
            }
        }else{
            find(this.Lujing+"/Layout_four").children[1].getComponent(Sprite).color=this.COLORS.DEFAULT;
            if(find(this.Lujing+"/Layout_four").children[1].name !="0"){
                this.setMoney(this.money + Number(find(this.Lujing+"/Layout_four").children[1].name) * 1);
            }
        }
    }
    //判断是否含有对子
    private judgePair(points:number[]){
        for (let i = 1; i <= 6; i++) {
            if(points.filter(point => point === i).length===2){
                if(i<=3){
                    find(this.Lujing+"/Layout_four").children[i+1].getComponent(Sprite).color=this.COLORS.DEFAULT;
                    if(find(this.Lujing+"/Layout_four").children[i+1].name !="0"){
                        this.setMoney(this.money + Number(find(this.Lujing+"/Layout_four").children[i+1].name) * 8);
                    }
                }else{
                    find(this.Lujing+"/Layout_four").children[i+4].getComponent(Sprite).color=this.COLORS.DEFAULT;
                    if(find(this.Lujing+"/Layout_four").children[i+4].name !="0"){
                        this.setMoney(this.money + Number(find(this.Lujing+"/Layout_four").children[i+4].name) * 8);
                    }
                }
            }
        }
    }
    //判断是否有三个一样的数字
    private judgeThreeSame(points:number[]){
        let isThreeSame = false;
        for (let i = 1; i <= 6; i++) {
            if(points.filter(point => point === i).length===3){
                if(i<=3){
                    find(this.Lujing+"/Layout_four").children[5].children[i-1].getComponent(Sprite).color=this.COLORS.DEFAULT;
                    if(find(this.Lujing+"/Layout_four").children[5].children[i-1].name !="0"){
                        this.setMoney(this.money + Number(find(this.Lujing+"/Layout_four").children[5].children[i-1].name) * 150);
                    }
                }else{
                    find(this.Lujing+"/Layout_four").children[7].children[i-4].getComponent(Sprite).color=this.COLORS.DEFAULT;
                    if(find(this.Lujing+"/Layout_four").children[7].children[i-4].name !="0"){
                        this.setMoney(this.money + Number(find(this.Lujing+"/Layout_four").children[7].children[i-4].name) * 150);
                    }
                }
                isThreeSame = true;
                find(this.Lujing+"/Layout_four").children[6].getComponent(Sprite).color=this.COLORS.DEFAULT;
                if(find(this.Lujing+"/Layout_four").children[6].name !="0"){
                    this.setMoney(this.money + Number(find(this.Lujing+"/Layout_four").children[6].name) * 30);
                }
            }
        }
    }
    //奇偶下注情况
    奇数还是偶数:number=0
    大数还是小数:number=0
    //按钮事件 点击下注
    onBet(button: Node) {
        if(this.money < this.betNum) {
            console.log("筹码不足",this.money,this.betNum);
            return;
        }
        // 增加判断,如果不能下注则直接返回
        if(!this.canBet) {
            console.log("投掷中,不能下注");
            return;
        }
        if(button.position.z==3){
            if(this.奇数还是偶数!=2){
                this.奇数还是偶数=1;
            }else{
                console.log("已经下注奇偶数");
                return
            }
        }
        if(button.position.z==4){
            if(this.奇数还是偶数!=1){
                this.奇数还是偶数=2;
            }else{
                console.log("已经下注奇数");
                return
            }
        }
        if(button.position.z==1){
            if(this.大数还是小数!=2){
                this.大数还是小数=1;
            }else{
                console.log("已经下注大数");
                return
            }
        }
        if(button.position.z==2){
            if(this.大数还是小数!=1){
                this.大数还是小数=2;
            }else{
                console.log("已经下注小数");
                return
            }
        }
        this.setMoney(this.money-this.betNum);//扣除筹码
        button.name = (Number(button.name) + this.betNum).toFixed(1).toString(); //赋值当前按钮筹码

        for (let index = 0; index < this.details.length; index++) {
            if(this.details[index].betType===button.position.z){
                this.details[index].amount=Number(button.name)
                break
            }else if(index==this.details.length-1){
                this.details.push({
                    "amount":Number(button.name),
                    "betType":button.position.z,
                })
                break
            }
        }
        if(this.details.length<1){
            this.details.push({
                "amount":Number(button.name),
                "betType":button.position.z,
            })
        }
        console.log(this.details)
        //按照下注顺序记录下注的和筹码
        this.obBet.push({order:button,num:this.betNum});

        //下注动画
        let prefab:Prefab;
        let pos:Vec3;
        
        // 在方法中使用
        const config = this.BET_CONFIG[this.betNum] || this.BET_CONFIG[0.1]; // 默认使用40的配置
        prefab = this.betPrefabs[config.prefabIndex];
        pos = find(`Canvas/Go/Layout_bet/${config.layoutIndex}`).getWorldPosition();

        let node = instantiate(prefab);
        button.addChild(node);
        node.getChildByName("Label").getComponent(Label).string = button.name;


        const localPos = button.getComponent(UITransform).convertToNodeSpaceAR(pos);
        node.setPosition(localPos)
        tween(node)
        .to(0.2, { position: v3(0,0,0) })
        .start()
    }
    //撤销上次下注
    private isCancelling = false;
    onCancel(){
        if(this.obBet.length>0 && !this.isCancelling){
            this.isCancelling = true;
            let last = this.obBet[this.obBet.length-1];
            this.setMoney(this.money+last.num);
            last.order.name = (Number(last.order.name)-last.num).toString();

            for (let index = 0; index < this.details.length; index++) {
                if(this.details[index].betType===last.order.position.z){
                    this.details[index].amount=Number(Number(last.order.name).toFixed(1))


                    console.log(this.details[index].betType,this.details[index].amount)
                    if(this.details[index].betType==3&&this.details[index].amount==0){
                        this.奇数还是偶数=0;
                    }
                    if(this.details[index].betType==4&&this.details[index].amount==0){
                        this.奇数还是偶数=1;
                    }

                    if(this.details[index].betType==1&&this.details[index].amount==0){
                        this.大数还是小数=0;
                    }
                    if(this.details[index].betType==2&&this.details[index].amount==0){
                        this.大数还是小数=1;
                    }
                    break
                }
                
            }
            console.log(this.details)

            this.obBet.pop();

            // 获取当前筹码配置，如果没有对应配置则使用默认值(0.1)
            const config = this.BET_CONFIG[this.betNum] || this.BET_CONFIG[0.1];

            // 获取筹码栏对应位置的世界坐标
            let pos = find(`Canvas/Go/Layout_bet/${config.layoutIndex}`).getWorldPosition();

            // 获取最后一个下注筹码节点
            let node = last.order.children[last.order.children.length-1];

            // 将世界坐标转换为按钮节点的本地坐标系
            const localPos = last.order.getComponent(UITransform).convertToNodeSpaceAR(pos);
            tween(node)
            .to(0.2, { position: localPos })
            .call(() => {
                if (node.isValid) {
                    node.active = false;
                    node.parent = null;
                }
                this.isCancelling = false;
            })
            .start()
        }else{
            console.log("没有下注");
        }
    }
    //结算后清空所有下注
    onClearBet(){
        for (let i = 0; i < 6; i++) {
            let child = find(this.Lujing+"/Layout_one").children[i];
            child.name = "0";
        }
        for (let i = 0; i < 15; i++) {
            let child = find(this.Lujing+"/Layout_two").children[i];
            child.name = "0";
        }
        for (let i = 0; i < 14; i++) {
            let child = find(this.Lujing+"/Layout_three").children[i];
            child.name = "0";
        }
        for (let i = 0; i < 13; i++) {
            let child = find(this.Lujing+"/Layout_four").children[i];
            if(i!=5&&i!=7){
                child.name = "0";
            }
        }
        for (let i = 0; i < 3; i++) {
            find(this.Lujing+"/Layout_four").children[5].children[i].name = "0";
            find(this.Lujing+"/Layout_four").children[7].children[i].name = "0";
        }
        find("Canvas/Star").active=true;

    }
    //切换筹码
    onChangeBet(event:EventTouch, bet:number){
        this.betNum = Number((Number(bet).toFixed(1)));
        this.updateBet();
    }
    //新的一局
    onNewGame(){
        // 重置下注状态
        this.canBet = true;
        find("Canvas/Star").active=false;
        find("Canvas/Go/Layout_bet").active=true;
        this.updateBet();
        for (let i = 0; i < this.sicBos.length; i++) {
            this.sicBos[i].setPosition(v3(1-i, 15, 1-i));
            this.sicBos[i].getComponent(RigidBody).type=RigidBody.Type.STATIC;
        }
        //撤销下注清空
        this.obBet = [];
        this.details = [];
        this.points = [];
        this.奇数还是偶数=0;
        this.大数还是小数=0;
        //重置UI
        for (let i = 0; i < 6; i++) {
            let child = find(this.Lujing+"/Layout_one").children[i];  
            child.getComponent(Sprite).color=this.COLORS.DEFAULT;
            for (let index = child.children.length-1; index >0; index--) {
                if(child.children[index].name !="Label"){
                    child.children[index].active=false;
                    child.children[index].parent=null;
                }
            }
        }
        for (let i = 0; i < 16; i++) {
            let child = find(this.Lujing+"/Layout_two").children[i];
            child.getComponent(Sprite).color=this.COLORS.DEFAULT;
            for (let index = child.children.length-1; index >0; index--) {
                if(child.children[index].name !="Label"){
                    child.children[index].active=false;
                    child.children[index].parent=null;
                }
            }
        }
        for (let i = 0; i < 14; i++) {
            let child = find(this.Lujing+"/Layout_three").children[i];
            child.getComponent(Sprite).color=this.COLORS.DEFAULT;
            for (let index = child.children.length-1; index >0; index--) {
                if(child.children[index].name !="Label"){
                    child.children[index].active=false;
                    child.children[index].parent=null;
                }
            }
        }
        for (let i = 0; i < 13; i++) {
            {
                let child = find(this.Lujing+"/Layout_four").children[i];
                child.getComponent(Sprite).color=this.COLORS.DEFAULT;
                if(i!=5&&i!=7){
                    for (let index = child.children.length-1; index >0; index--) {
                        if(child.children[index].name !="Label"){
                            child.children[index].active=false;
                            child.children[index].parent=null;
                        }
                    }
                }
            }
        }
        for (let i = 0; i < 3; i++) {
            find(this.Lujing+"/Layout_four").children[5].children[i].getComponent(Sprite).color=this.COLORS.DEFAULT;
            find(this.Lujing+"/Layout_four").children[7].children[i].getComponent(Sprite).color=this.COLORS.DEFAULT;
            for (let index = find(this.Lujing+"/Layout_four").children[5].children[i].children.length-1; index >0; index--) {
                if(find(this.Lujing+"/Layout_four").children[5].children[i].children[index].name !="Label"){
                    find(this.Lujing+"/Layout_four").children[5].children[i].children[index].active=false;
                    find(this.Lujing+"/Layout_four").children[5].children[i].children[index].parent=null;
                }
            }
            for (let index = find(this.Lujing+"/Layout_four").children[7].children[i].children.length-1; index >0; index--) {
                if(find(this.Lujing+"/Layout_four").children[7].children[i].children[index].name !="Label"){
                    find(this.Lujing+"/Layout_four").children[7].children[i].children[index].active=false;
                    find(this.Lujing+"/Layout_four").children[7].children[i].children[index].parent=null;
                }
            }
        }
    }
    updateBet(){
        const config = this.BET_CONFIG[this.betNum] || this.BET_CONFIG[0.1];
        // 先将所有筹码归位
        Object.values(this.BET_CONFIG).forEach(betConfig => {
            find(`Canvas/Go/Layout_bet/${betConfig.layoutIndex}`).setPosition(betConfig.lostposition);
        });

        find(`Canvas/Go/Layout_bet/${config.layoutIndex}`).setPosition(config.position);
    }

    /////////////////////////////////////////////////////////////////工具函数常量变量
    // 定义颜色常量
    private readonly COLORS = {
        DEFAULT: new Color(255, 255, 255),    // 白色
        hyaline: new Color(200, 200, 200,150),     // 透明
    };
    Lujing:string="Canvas/Layout_Panal";
    // 在类中定义映射关系
    private readonly BET_CONFIG = {
        0.1: { 
            prefabIndex: 0, 
            layoutIndex: '0',
            position: v3(-220, -30, 0),
            lostposition: v3(-220, -0, 0)
        },
        1: { 
            prefabIndex: 1, 
            layoutIndex: '1',
            position: v3(-132, -30, 0),
            lostposition: v3(-132, -0, 0)
        },
        2: { 
            prefabIndex: 2, 
            layoutIndex: '2',
            position: v3(-44, -30, 0),
            lostposition: v3(-44, -0, 0)
        },
        5: { 
            prefabIndex: 3, 
            layoutIndex: '3',
            position: v3(44, -30, 0),
            lostposition: v3(44, -0, 0)
        },
        25: { 
            prefabIndex: 4, 
            layoutIndex: '4',
            position: v3(132, -30, 0),
            lostposition: v3(132, -0, 0)
        },
        100: { 
            prefabIndex: 5, 
            layoutIndex: '5',
            position: v3(220, -30, 0),
            lostposition: v3(220, -0, 0)
        }
    };
    /**
 * 创建序列动画
 * @param nodes 需要执行动画的节点数组
 * @param totalTime 总动画时长
 * @param targetWorldPos 目标世界坐标
 * @param onComplete 每个节点动画完成时的回调
 */
private createSequenceAnimation(
    nodes: Node[], 
    totalTime: number, 
    targetWorldPos: Vec3,
    onComplete?: (node: Node) => void
) {
    // 计算时间参数
    const singleTime = totalTime / nodes.length;
    const delayStep = singleTime;

    // 为每个节点设置动画
    nodes.forEach((node, index) => {
        tween(node)
        .delay(delayStep * index)
        .to(singleTime, { 
            position: node.parent.getComponent(UITransform)
                .convertToNodeSpaceAR(targetWorldPos) 
        })
        .call(() => {
            onComplete?.(node);
        })
        .start();
    });
}
    Close余额不足(){
        find("Canvas/Insufficient Balance").active=false;
        //重新加载场景
        director.loadScene("scene");
    }
}