// 文件路径: scripts/GameManager.ts
import AutoPlane from './AutoPlane';
import Obstacle, { ObstacleType } from './Obstacle';
import Plane from './Plane';

const { ccclass, property } = cc._decorator;

@ccclass
export default class GameManage extends cc.Component {

    plane: AutoPlane = null; // 飞机节点

    @property(cc.Label)
    scoreLabel: cc.Label = null; // 分数显示标签

    @property(cc.Node)
    launchButton: cc.Node = null; // 发射按钮
    @property(cc.Node)
    obs:cc.Node=null

    gameState:number=-1
    FUN: number = 0;//最终金额
    BetNum:number=0.1//下注金额
    MULTIPLIER:number=1//倍率

    //障碍物
    @property({type:Obstacle})
    allObstacles:Obstacle[]=[]
    onLoad() {
        // 从本地存储读取 BetNum 值
        const savedBetNum = cc.sys.localStorage.getItem('gameBetNum');
        if (savedBetNum !== null) {
            this.BetNum = parseFloat(savedBetNum);
            // 更新UI显示
            this.updateBetNumUI();

        }
        //游戏运行速度减半
        // this.launchButton.on('click', this.onLaunchPlane, this);
        
        //设置重力
        cc.director.getPhysicsManager().enabled = true;
        cc.director.getPhysicsManager().gravity = cc.v2(0, -120); // 添加这行，设置重力为 -320

        this.plane=cc.find("GameManager/Plane").getComponent(AutoPlane)
    }
    // 更新下注金额UI显示
    private updateBetNumUI() {
        cc.find("GameManager/UI_BG/panal3/Num").getComponent(cc.Label).string = 
            this.BetNum.toFixed(2) + " FUN";
    }
    protected start(): void {
        
        // for(let i=0;i<10;i++){
        //     let obs= cc.instantiate(this.obs)
        //     // 在指定范围内随机生成位置
        //     // x: -600 到 10000
        //     // y: 40 到 2000
        //     const randomX = Math.random() * (10000 - (-600)) + (-600);
        //     const randomY = Math.random() * (800) + 0;
        //     obs.setPosition(cc.v2(randomX, randomY));
        //     obs.parent = this.node;
        //     obs.getComponent(Obstacle).init(cc.v2(randomX, randomY))
        //     obs.getComponent(Obstacle).是随机=true
        // }
        // let obs=cc.find("GameManager/Obstacles")
        // for(let i=0;i<obs.children.length;i++){
        //     this.allObstacles.push(obs.children[i].getComponent(Obstacle))
        // }
        this.setFUN()
    }
    // 发射飞机
    onLaunchPlane() {
        
    }

    getMULTIPLIER(): number {
        return this.MULTIPLIER;
    }
    setMULTIPLIER(value:number){
        this.MULTIPLIER=value
        
        cc.find("GameManager/UI_BG/panal2/Num").getComponent(cc.Label).string="x"+this.MULTIPLIER.toFixed(2)
        this.setFUN()
    }
    setFUN(){
        this.FUN=this.BetNum*this.MULTIPLIER
        cc.find("GameManager/Plane/scoreLabel").getComponent(cc.Label).string=this.FUN.toFixed(2)+" FUN"
    }

    // 重置游戏
    resetGame() {
        this.MULTIPLIER = 1;
        this.BetNum = 0.1;
        // this.updateScore(0);
        // this.plane.reset(cc.v2(0, 0));
    }
    generateOperations(start: number, target: number, minSteps: number = 10, maxSteps: number = 20): string[] {
        interface Operation {
            op: string;
            num: number;
            result: number;
        }
        const targetNum = target //原始目标数值
        target = Math.ceil(target) //取整目标数值
    
        const tryReachTarget = (current: number, steps: number, operations: Operation[]): Operation[] | null => {
            // 如果已经达到最小步数，并且是最后一步，允许使用小数达到精确值
            if (operations.length >= minSteps - 1 && operations.length < maxSteps) {
                console.log("当前值:", current, "目标值:", targetNum, "步数:", steps);
                // 计算需要的倍数或加数来达到精确目标
                if (current < targetNum) {
                    // 需要增加
                    const multiplier = targetNum / current;
                    if (multiplier <= 9) {
                        // 如果倍数小于9，使用乘法
                        const result = current * multiplier;
                        return [...operations, { 
                            op: '×', 
                            num: Number(multiplier.toFixed(4)), 
                            result: Number(result.toFixed(4)) 
                        }];
                    }
                    const addend = targetNum - current;
                    if (addend < 9) {
                        // 如果加数小于9，使用加法
                        return [...operations, { 
                            op: '+', 
                            num: Number(addend.toFixed(4)), 
                            result: Number(targetNum.toFixed(4)) 
                        }];
                    }
                } else if (current > targetNum) {
                    const divider = current / targetNum;
                    if (divider <= 2) {
                        // 如果当前值是目标值的2倍以内
                        return [...operations, { 
                            op: '÷', 
                            num: Number(divider.toFixed(4)), 
                            result: Number(targetNum.toFixed(4)) 
                        }];
                    }
                }
            }
    
            if (operations.length >= maxSteps) return null;
            if (operations.length >= minSteps && Math.abs(current - target) < 0.0001) {
                return operations;
            }
    
            let possibleOperations: Operation[] = [];
    
            // 乘法（2-9）
            for (let i = 2; i < 10; i++) {
                possibleOperations.push({ op: '×', num: i, result: current * i });
            }
    
            // 加法（1-9）
            for (let i = 1; i < 10; i++) {
                possibleOperations.push({ op: '+', num: i, result: current + i });
            }
    
            // 除以2
            if (current % 2 === 0) {
                possibleOperations.push({ op: '÷', num: 2, result: current / 2 });
            }
    
            // 随机打乱操作顺序
            possibleOperations.sort(() => Math.random() - 0.5);
    
            for (const { op, num, result } of possibleOperations) {
                // 剪枝：如果结果比目标值大太多，跳过
                if (result > target * 2) continue;
    
                const newOperations = [...operations, { op, num, result }];
                const solution = tryReachTarget(result, steps + 1, newOperations);
                if (solution !== null) {
                    return solution;
                }
            }
    
            return null;
        };
    
        // 尝试多次找到解决方案
        for (let i = 0; i < 100; i++) {
            const solution = tryReachTarget(start, 0, []);
            if (solution !== null) {
                // 格式化输出
                const results: string[] = [`起始数值: ${start}`];
                let current = start;
                solution.forEach((op, index) => {
                    const step = `第${index + 1}步: ${current} ${op.op} ${op.num} = ${op.result}`;
                    results.push(step);
                    current = op.result;
                });
                return results;
            }
        }
    
        return ["找不到合适的运算步骤"];
    }
    win(){
        this.gameState=1
    }
    lose(){
        this.gameState=0
    }
    setSPeed(event:cc.Event.EventTouch,speed:number){
        // cc.director.getScheduler().setTimeScale(Number(speed));
        this.plane.setSpeed(Number(speed))
    }

    // 生成障碍物的方法
    generateObstacles(operations: string[]) {
        // 获取父节点
        const obstaclesParent = cc.find("GameManager/Obstacles");
        if (!obstaclesParent) {
            console.error("找不到Obstacles父节点");
            return;
        }

        // 清除现有的障碍物
        obstaclesParent.removeAllChildren();
        this.allObstacles = [];  // 重置障碍物数组

        let currentX = 300;  // 起始X坐标
        let currentY = 600;  // 起始Y坐标

        // 遍历操作步骤
        for (const step of operations) {
            let operator = step[0]; // 操作符
            let value = parseFloat(step.slice(1)); // 数值

            // 创建障碍物
            let obs = cc.instantiate(this.obs);

            // 设置位置
            currentX += Math.random() * 200 + 500;
            currentY += (Math.random() - 0.2) * 200;
            obs.setPosition(cc.v2(currentX, currentY));

            // 设置父节点
            obs.parent = obstaclesParent;

            // 获取 Obstacle 组件
            let obstacleComponent = obs.getComponent(Obstacle);

            // 根据运算符设置障碍物类型和值
            switch (operator) {
                case '+':
                    obstacleComponent.obstacleType = ObstacleType.SCORE;
                    obstacleComponent.scoreValue = value;
                    break;
                case '*':
                    if (value > 1) {
                        obstacleComponent.obstacleType = ObstacleType.MULTIPLY;
                        obstacleComponent.scoreValue = value;
                    } else {
                        obstacleComponent.obstacleType = ObstacleType.BOMB;
                        obstacleComponent.scoreValue = value;
                    }
                    break;
            }
            // 初始化障碍物
            obstacleComponent.init(cc.v2(currentX, currentY));
            // 添加到障碍物数组
            this.allObstacles.push(obstacleComponent);
        }
        // 打印日志确认生成的障碍物数量
        console.log(`Generated ${this.allObstacles.length} obstacles`);
    }
    // 使用示例
    testOperations(start:number,target:number) {
        const results = this.generateOperations(start, target);
        // 根据运算步骤生成障碍物
        this.generateObstacles(results);
        results.forEach(step => {
            console.log(step);
        });
    }

    selectBetNum(event:cc.Event.EventTouch,num:number){
        this.BetNum = Number(num);
        // 保存到本地存储
        cc.sys.localStorage.setItem('gameBetNum', this.BetNum.toString());
        
        this.updateBetNumUI();
        cc.find("GameManager/UI_BG/panal3/Layout").active = false;
        this.setFUN();
    }
    openselectBetNum(){
        cc.find("GameManager/UI_BG/panal3/Layout").active=!cc.find("GameManager/UI_BG/panal3/Layout").active
    }
    新游戏(){
        cc.director.loadScene('Main');
    }
}

