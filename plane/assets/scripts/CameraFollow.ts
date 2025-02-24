// 文件路径: scripts/CameraFollow.ts

const { ccclass, property } = cc._decorator;

@ccclass
export default class CameraFollow extends cc.Component {
    @property(cc.Node)
    target: cc.Node = null; // 需要跟随的目标节点

    @property
    followSpeed: number = 10; // 跟随速度，越大跟随越迅速

    offset: cc.Vec3 = cc.v3(500, 0, 0); // 摄像机相对目标的偏移量

    update(dt: number) {
        if (!this.target) return;

        // 计算目标位置加上偏移量
        const targetPosition = this.target.position.add(this.offset);

        // 获取当前摄像机的位置
        const currentPosition = this.node.position;

        // 通过线性插值计算新的摄像机位置，实现平滑跟随效果
        const newPosition = currentPosition.lerp(targetPosition, dt * this.followSpeed);

        // 设置摄像机的新位置
        this.node.setPosition(newPosition);
    }
}
