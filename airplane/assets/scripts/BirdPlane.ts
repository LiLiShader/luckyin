import GameManage from "./GameManage";
import HttpRequest from "./HttpRequest";
import Obstacle, { ObstacleType } from "./Obstacle";

const {ccclass, property} = cc._decorator;

@ccclass
export default class BirdPlane extends cc.Component {

    // 小鸟重力值
    gravity: number = 0.12;

    // 小鸟弹跳值
    birdJump: number = 0.5;


    @property(cc.Node)
    angleNode:cc.Node=null

    @property(GameManage)
    GameCon:GameManage=null

    velocity: number = 0;

    timer:number=0;//drop定时器
    timer2:number=0;//drop定时器
    CD:boolean=false;

    WuDiNum:number=0; //无敌次数
    _changeTime = 0;    //小鸟静态帧切换计时
    _index = 1;         //小鸟当前显示的静态帧index

    winAmount:number=0;


    token:string="";
    //币种
    currency:number=1;
    onLoad(){
        let currentUrl: string = window.location.href;
        this.token = this.getTokenFromUrl(currentUrl);
        this.currency = this.getCurrencyFromUrl(currentUrl);
        console.log("获取到的token:", this.token);
        console.log("获取到的currency:", this.currency);
        HttpRequest.getInstance().token=this.token;
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
    start () {
        
        cc.director.getScheduler().setTimeScale(1);
        console.log("Time scale set to:", cc.director.getScheduler().getTimeScale());
        // 如果使用物理引擎，单独设置物理时间缩放
        cc.director.getPhysicsManager().enabledAccumulator = true;
        // cc.director.getPhysicsManager().timeScale = 10;
        // 初始化速度为0
        this.velocity = 0;

    }
    async onStartDrop() {
        await HttpRequest.getInstance().bet({},this.GameCon.BetNum,this.currency,88).then(response => {
            this.winAmount=response.data.winAmount
            this.GameCon.testOperations(this.GameCon.BetNum,Math.ceil(this.winAmount))
            console.log('获取的响应:', response);
            })
            .catch(error => {
                console.error('处理请求时出错:', error);
                return
            })
        this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(600, 600); // 设置初始速度
        this.scheduleOnce(()=>{
            this.schedule(this.onDrop,0.01);
        },0.3)
    }
    update(dt: number){
        if ( this.GameCon.gameState !=-1 ){
            return;
        }

        //呼扇翅膀
        this._changeTime += dt;
        if (this._changeTime > 0.08) {
            this._changeTime = 0;
            this._index = this._index + 1 > 3 ? 1 : this._index + 1;

        }
        if(!this.CD){
            this.timer2++
            if(this.timer2>30){
                this.CD=true
            }
        }
        
        if(this.node.angle>-25&&this.velocity<0){
            this.node.angle-=4
        }
        if(this.node.angle<25&&this.velocity>=0){
            this.node.angle+=4
        }
        // this.angleNode.angle=-this.node.angle
    }
    onDrop() {
        if ( this.GameCon.gameState !=-1 ){
            return;
        }
        
        this.node.y += this.velocity;
        this.node.x += 1;
        this.velocity -= this.gravity;
    }
    onJump() {
        this.timer=0
        // 弹跳时，重设向上的速度
        this.velocity = this.birdJump;
    }
    onBeginContact(contact, selfCollider: cc.PhysicsCollider, otherCollider: cc.PhysicsCollider){
        if (otherCollider.node.name == '航母') {
            selfCollider.node.getComponent(cc.RigidBody).linearVelocity=cc.v2(100,0)
            this.GameCon.win()
            this.scheduleOnce(()=>{
                selfCollider.node.getComponent(cc.RigidBody).linearVelocity=cc.v2(0,0)
                // let lastwin=this.GameCon.FUN-this.GameCon.BetNum
                let lastwin=this.winAmount
                cc.director.loadScene('Main',
                    ()=>{
                        let panal=cc.find("GameManager/UI_BG/Last win/Label")
                        panal.getComponent(cc.Label).string="Last win："+(lastwin).toFixed(5)+" FUN"
                        cc.tween(panal.parent)
                        .parallel(
                            cc.tween(panal.parent).to(0.5,{scale:2}),
                            cc.tween(panal.parent).to(0.5,{position:cc.v3(0,300)})
                        )
                        .delay(0.5)
                        .parallel(
                            cc.tween(panal.parent).to(0.5,{scale:1}),
                            cc.tween(panal.parent).to(0.5,{position:cc.v3(0,60)})
                        )
                        .start()
                    });
            },1)
        }
        if (otherCollider.node.name == 'sea') {
            selfCollider.node.getComponent(cc.RigidBody).linearVelocity=cc.v2(100,0)
            this.GameCon.lose()
            this.scheduleOnce(()=>{
                selfCollider.node.getComponent(cc.RigidBody).linearVelocity=cc.v2(0,0)
                cc.director.loadScene('Main',()=>{cc.find("GameManager/UI_BG/Last win/Label").getComponent(cc.Label).string=
                    "Last win："+0+" FUN"});
            },1)           
        }
        if(otherCollider.node.name=='ScoreObstacle'){
            let obstacle=otherCollider.node.getComponent(Obstacle)
            if (obstacle.obstacleType==ObstacleType.SCORE||obstacle.obstacleType==ObstacleType.MULTIPLY) {
                
                this.onJump()
            }else if(obstacle.obstacleType==ObstacleType.BOMB){
                // this.timer=0
                this.velocity -=this.birdJump*3;
            }
            this.GameCon.setMULTIPLIER(obstacle.getScoreEffect(this.GameCon.getMULTIPLIER()))
            otherCollider.node.getComponent(Obstacle).destroyObstacle()
            this.txNum(obstacle)
        }
    }
    @property({type:cc.Prefab})
    numPre:cc.Prefab=null
    txNum(obstacle:Obstacle){
        let numpre= cc.instantiate(this.numPre)
            numpre.getComponent(cc.Label).string="+"+obstacle.getScoreEffect(this.GameCon.getMULTIPLIER()).toString()
            numpre.parent=this.node
            numpre.setPosition(0,0)
            cc.tween(numpre)
            .to(1, { position: cc.v3(numpre.x,numpre.y+100) })
            .call(()=>{
                numpre.active=false
            })
            .start()
    }
}

