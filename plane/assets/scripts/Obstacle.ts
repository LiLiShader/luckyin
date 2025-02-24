// 文件路径: scripts/Obstacle.ts

const { ccclass, property } = cc._decorator;

// 定义枚举类型
export enum ObstacleType {
    SCORE = 0,      // 加分障碍物
    BOMB = 1,       // 炸弹障碍物
    MULTIPLY = 2    // 乘法障碍物
}
//障碍物
@ccclass
export default class Obstacle extends cc.Component {
    @property({ type: cc.Enum(ObstacleType) })
    obstacleType: ObstacleType = ObstacleType.SCORE; // 使用 cc.Enum 包装枚举
    是随机:boolean=false
    @property
    scoreValue: number = 1; // 分数值或乘数值
    zinode:cc.Node=null
    init(pos:cc.Vec2) {
        if(this.是随机){
            // 随机设置障碍物类型（0-2之间的整数，对应 ObstacleType 枚举）
            if(Math.random()>0.2){
                this.obstacleType = Math.floor(Math.random() * 3);
            }else{
                this.obstacleType = ObstacleType.BOMB;
            }
            // 随机设置分数值，范围在2-10之间的整数
            this.scoreValue = Math.floor(Math.random() * (4)) + 2;
        }
        

        if(this.obstacleType==ObstacleType.SCORE){
            this.node.children[0].getChildByName("Label").getComponent(cc.Label).string="+"+this.scoreValue
        }else if(this.obstacleType==ObstacleType.BOMB){
            // this.node.getChildByName("Label").getComponent(cc.Label).string="BOOM"
            this.node.children[0].getChildByName("Boom").active=true
            this.node.children[0].getChildByName("光").active=false
            this.node.children[0].getChildByName("Label").active=false
        }else if(this.obstacleType==ObstacleType.MULTIPLY){
            this.node.children[0].getChildByName("Label").getComponent(cc.Label).string="x"+this.scoreValue
        }
        // this.zinode=this.node.children[0]
        // this.zinode.parent=cc.find("GameManager")
        // this.zinode.setPosition(pos.x,pos.y)
    }
    // 获取得分效果，根据障碍物类型返回不同的分数变化
    getScoreEffect(currentScore: number): number {
        switch (this.obstacleType) {
            case ObstacleType.SCORE:
                return currentScore+this.scoreValue; // 直接增加分数
            case ObstacleType.BOMB:
                return currentScore * this.scoreValue; // 减半分数
            case ObstacleType.MULTIPLY:
                return currentScore * this.scoreValue; // 返回乘法分数变化
            default:
                return 0;
        }
    }

    // 销毁障碍物
    destroyObstacle() {
        this.zinode.destroy()
        this.node.destroy();
    }
}
