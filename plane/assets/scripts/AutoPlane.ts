import GameManage from "./GameManage";
import HttpRequest from "./HttpRequest";
import Obstacle, { ObstacleType } from "./Obstacle";

const {ccclass, property} = cc._decorator;

@ccclass
export default class AutoPlane extends cc.Component {

    //获取token和币种
    token:string="kwd11l8ignavim7rv89t2rezjyr4m1m4";
    currency:number=1;
    onLoad(){
        const savedSpeed = cc.sys.localStorage.getItem('gameSpeed');
        if (savedSpeed !== null) {
            this.speed = parseFloat(savedSpeed);
        }
        // 从本地存储读取 lastwin 值
        const savedLastWin = cc.sys.localStorage.getItem('gameLastWin');
        if (savedLastWin !== null) {
            this.lastwin = parseFloat(savedLastWin);
            this.setLastWin(this.lastwin)

        }


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
// 设置 lastwin 的方法
    setLastWin(value: number) {
        this.lastwin = value;
        // 保存到本地存储
        cc.sys.localStorage.setItem('gameLastWin', value.toString());
        // 如果需要更新UI
        this.updateLastWinUI();
    }

    // 获取 lastwin 的方法
    getLastWin(): number {
        return this.lastwin;
    }

    // 更新UI显示
    private updateLastWinUI() {
        const scoreLabel = cc.find("GameManager/UI_BG/Last win/Label");
        if (scoreLabel) {
            scoreLabel.getComponent(cc.Label).string ="Last win："+ this.lastwin.toFixed(6);+"FUN"
        }
    }
    //发射飞机
    private speed:number=0.5;
    // 设置 speed 的方法
    setSpeed(value: number) {
        this.speed = value;
        // 保存到本地存储
        cc.sys.localStorage.setItem('gameSpeed', value.toString());
    }

    // 获取 speed 的方法
    getSpeed(): number {
        return this.speed;
    }
    @property(GameManage)
    GameCon:GameManage=null
    winAmount:number=0;
    encounteredElements:string[]=[];
    target:number=0;
    async onStartDrop() {
        let isInsufficient = false;
        await HttpRequest.getInstance().bet({},this.GameCon.BetNum,this.currency,88).then(response => {
            console.log('获取的响应:', response);
            if(response.msg=="insufficient funds"){
                console.log("余额不足")
                cc.find("GameManager/UI_BG/Insufficient Balance").active=true;
                isInsufficient = true;
                return;
            }

            this.winAmount=response.data.winAmount
            this.encounteredElements=response.data.encounteredElements
            console.log(this.encounteredElements)
            this.target=Number((this.winAmount/this.GameCon.BetNum).toFixed(4))
            // this.GameCon.testOperations(1,target)
            this.GameCon.generateObstacles(this.encounteredElements);
            })
            .catch(error => {
                console.error('处理请求时出错:', error);
                return
            })

        if(isInsufficient){
            return
        }
        cc.find("GameManager/UI_BG/autobtn/Mask").active=true
        this.Trajectory()
    }
    //运动轨迹
    Trajectory() {
        const sortedObstacles = this.GameCon.allObstacles
            .filter(obs => obs && obs.node && obs.node.active)
            .sort((a, b) => a.node.x - b.node.x);
    
        const pathPoints = sortedObstacles.map(obs => {
            // 可以添加一些随机偏移，使路径更自然
            const randomY = obs.node.y + (Math.random() - 0.5) * 20;
            return cc.v3(obs.node.x, randomY);
        });
    
        if (pathPoints.length === 0) return;
    
        let tween = cc.tween(this.node);
        
        // 直接使用 to 动作，不使用 parallel
        pathPoints.forEach((point, index) => {
            const duration = this.calculateDuration(
                index === 0 ? this.node.position : pathPoints[index - 1],
                point
            );
            
            tween = tween.to(duration, { position: point }, { easing: 'linear' });
        });
    
        // 获取最后一个路径点的位置
        const lastPathPoint = pathPoints[pathPoints.length - 1];
        
        // 找到航母群中第二个x坐标大于最后一个路径点的子物体
        let 航母群 = cc.find("GameManager/Hangmus");
        let endPos = null;
        let count = 0;
        
        if (航母群) {
            // 将子节点转换为数组并按x坐标排序
            const children = Array.from(航母群.children)
                .sort((a, b) => a.x - b.x);
    
            // 找到第二个x坐标大于最后一个路径点的子物体
            for (let child of children) {
                if (child.x > lastPathPoint.x) {
                    console.log(child.name, child.x, lastPathPoint.x);
                    count++;
                    if (count === 2) {
                        endPos = child.position;
                        break;
                    }
                }
            }
        }
    
        // 如果找到了终点，添加到路径中
        if (endPos) {
            
            //如果最终数值为0
            if(this.target==0){
                endPos.x = endPos.x + 450;
                endPos.y = endPos.y - 150;
            }else{
                endPos.x = endPos.x + Math.random() * 100;
            }
        } else {
            console.error("endPos is null or undefined");
            // 处理 endPos 为 null 的情况，例如设置一个默认值
            endPos = cc.v2(0, 0); // 或者其他适合的默认值
        }
        if (endPos) {
            const duration = this.calculateDuration(
                lastPathPoint,
                endPos
            );
            tween = tween.to(duration, { 
                position: endPos 
            }, {
                easing: 'linear'
            })
            // 添加到达终点后的回调
            .call(() => {
                // 1秒后切换场景
                cc.find("GameManager/UI_BG/score").active=true
                this.setLastWin(this.winAmount)
                cc.find("GameManager/UI_BG/score/Label").getComponent(cc.Label).string=this.lastwin.toFixed(6)
                this.scheduleOnce(() => {
                    cc.director.loadScene('Main');
                    // cc.find("GameManager/UI_BG/autobtn/Mask").active=false
                }, 2);
            });
        }
    
        tween.start();
    }
    lastwin:number=0;
    // 路径完成时的回调
    private onTrajectoryComplete() {
        // 可以在这里添加完成后的逻辑
        console.log('Trajectory completed!');
    }
    // 方式2：基于距离的动态速度计算
    private calculateDuration(startPos: cc.Vec3, endPos: cc.Vec3): number {
        const distance = cc.Vec3.distance(startPos, endPos);
        const minDuration = 0.1+this.speed;  // 最小持续时间
        const maxDuration = 0.3+this.speed;  // 最大持续时间
        const baseDistance = 500; // 基准距离
        
        // 根据距离动态计算持续时间
        let duration = (distance / baseDistance) * 1.0;
        
        // 限制在最小和最大持续时间之间
        return Math.max(minDuration, Math.min(maxDuration, duration));
    }

    //碰撞检测
    update(){
        // 新增：检测与障碍物的距离
        const birdPos = this.node.getPosition();
        this.GameCon.allObstacles.forEach(obstacle => {
            if (!obstacle || !obstacle.node || !obstacle.node.active) return;
            
            const obstaclePos = obstacle.node.getPosition();
            const distance = this.getDistance(birdPos, obstaclePos);

            // 如果距离小于20，隐藏障碍物
            if (distance < 80) {
                //获得分数
                obstacle.node.active = false;
                this.GameCon.setMULTIPLIER(obstacle.getScoreEffect(this.GameCon.getMULTIPLIER()))
                this.txNum(obstacle)
            }
        });
    }
    // 计算两点之间距离的辅助方法
    private getDistance(pos1: cc.Vec2, pos2: cc.Vec2): number {
        const dx = pos1.x - pos2.x;
        const dy = pos1.y - pos2.y;
        return Math.sqrt(dx * dx + dy * dy);
    }
    //显示分数变化特效
    @property({type:cc.Prefab})
    numPre:cc.Prefab=null
    txNum(obstacle:Obstacle){
        let numpre= cc.instantiate(this.numPre)
            switch(obstacle.obstacleType){
                case ObstacleType.SCORE:
                    numpre.getComponent(cc.Label).string="+"+obstacle.scoreValue
                    break
                case ObstacleType.MULTIPLY:
                    numpre.getComponent(cc.Label).string="x"+obstacle.scoreValue
                    break
                case ObstacleType.BOMB:
                    numpre.getComponent(cc.Label).string="/"+2
                    numpre.color=cc.Color.RED
                    break
            }
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
