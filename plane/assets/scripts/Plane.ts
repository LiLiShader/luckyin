// 文件路径: scripts/Plane.ts

import CameraFollow from './CameraFollow';
import GameManager from './GameManage';
import HttpRequest from './HttpRequest';
import Obstacle, { ObstacleType } from './Obstacle';

const { ccclass, property } = cc._decorator;

@ccclass
export default class Plane extends cc.Component {

    initialVelocity: cc.Vec2 = cc.v2(1200, 800); // 飞机初始速度

    gameManage: GameManager = null; // 引用 GameManager 以便更新分数
    @property({type:cc.Prefab})
    numPre:cc.Prefab=null
    private rigidBody: cc.RigidBody = null;
    isLaunch:boolean=false
    onLoad() {
        // cc.director.getScheduler().setTimeScale(3);
        // this.initialVelocity=cc.v2(1000+Math.random()*200, 600+Math.random()*200);
        this.initialVelocity=cc.v2(600, 400);
        this.gameManage = cc.find('GameManager').getComponent(GameManager);
        this.rigidBody = this.getComponent(cc.RigidBody);
        if (this.rigidBody) {
            this.rigidBody.enabled = false; // 初始禁用物理
        }
    }
    protected update(dt: number): void {
        // if(this.isLaunch){
        //     this.node.setPosition(this.node.position.x+1,this.node.position.y+1)
        // }
    }
    // 发射飞机
    async launch() {
        

        if (!this.rigidBody) return;
        cc.find('GameManager/Main Camera').getComponent(CameraFollow).followSpeed=5
        this.rigidBody.enabled = true; // 启用物理
        this.rigidBody.linearVelocity = this.initialVelocity; // 设置初始速度
        this.isLaunch=true
    }

    // 碰撞事件回调
    onBeginContact(contact, selfCollider, otherCollider) {
        const otherNode = otherCollider.node;
        const obstacle = otherNode.getComponent(Obstacle);

        if (obstacle) {
            
            // const scoreEffect = obstacle.getScoreEffect(this.gameManage.getScore());

            if (obstacle.obstacleType === ObstacleType.SCORE || obstacle.obstacleType === ObstacleType.MULTIPLY) {
                // 更新分数并给予飞机向上推力
                console.log(this.rigidBody.linearVelocity)//显示当前速度

                this.rigidBody.linearVelocity=cc.v2(this.rigidBody.linearVelocity.x+20,this.rigidBody.linearVelocity.y+20)
                // this.gameManage.updateScore(scoreEffect);
                this.scheduleOnce(()=>{
                    this.node.setPosition(this.node.position.x,this.node.position.y+20)
                },0)
                cc.tween(this.node.getChildByName("plane"))
                .to(0.1,{rotation:-30}) 
                .to(0.1,{rotation:0})
                .start()
                // this.applyUpwardForce(cc.v2(0, 1000));
                // this.rigidBody.linearVelocity=cc.v2(this.rigidBody.linearVelocity.x,this.rigidBody.linearVelocity.y+50)
            } else if (obstacle.obstacleType === ObstacleType.BOMB) {
                // 更新分数
                // this.gameManage.updateScore(scoreEffect);
            }
            let numpre= cc.instantiate(this.numPre)
            // numpre.getComponent(cc.Label).string=scoreEffect.toString()
            numpre.parent=this.node
            numpre.setPosition(0,0)
            cc.tween(numpre)
            .to(0.5, { opacity: 255 })
            .to(1.2, { position: cc.v3(numpre.x,numpre.y+100) })
            .call(()=>{
                numpre.active=false
            })
            .start()
            // 销毁障碍物
            obstacle.destroyObstacle();
        }
        if(otherNode.name=='sea'){
            // this.reset(cc.v2(-602,-132))
            //加载场景
            this.scheduleOnce(()=>{
                cc.director.loadScene('Main');
            },0.5)
        }
        if(otherNode.name=='航母'){
            //selfCollider速度变为

            selfCollider.node.getComponent(cc.RigidBody).linearVelocity=cc.v2(100,0)
            this.scheduleOnce(()=>{
                cc.director.loadScene('Main');
            },1)
        }
    }

    // 处理碰撞后增加向上推力
    applyUpwardForce(force: cc.Vec2) {
        if (this.rigidBody) {
            this.rigidBody.applyLinearImpulse(force, cc.v2(this.node.position), true);
        }
    }

    // 重置飞机到初始状态
    reset(position: cc.Vec2) {
        this.rigidBody.enabled = false;
        this.node.setPosition(position); // 重置到起始位置
        this.rigidBody.linearVelocity = cc.v2(0, 0); // 清除速度
        this.rigidBody.angularVelocity = 0; // 清除旋转速度
    }
}
