import Main from "./Main";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ButtonManager extends cc.Component {
    main:Main = null
    RewardArray:cc.Node[] = [];
    start () {
        this.RewardArray = cc.find("Canvas").getComponent(Main).RewardArray;
        this.main = cc.find("Canvas").getComponent(Main);
    }

    onBeginContact(contact, selfCollider: cc.PhysicsCollider, otherCollider: cc.PhysicsCollider) {
        if (otherCollider.node.group === 'betball') {
            // const parentNode = selfCollider.node.parent;
            // const childIndex = parentNode.children.indexOf(selfCollider.node);
            
            // cc.find("Canvas").getComponent(Main).test[childIndex.toString()].push(Number(otherCollider.node.name));
            // console.log(cc.find("Canvas").getComponent(Main).test);
            this.main.nowBetNumber -=1
            if(this.main.nowBetNumber <= 0){
                this.main.nowBetNumber = 0
                cc.find("Canvas/bg/leftUI/Mask").active = false;
                if(this.main.isAuto){
                    this.main.Bet();
                }   
            }

            otherCollider.node.destroy();
            let item= cc.instantiate(this.main.RewardItem);
            item.setParent(this.main.RewardParent);
            if(this.main.RewardParent.children.length >5) {
                this.main.RewardParent.children[0].destroy();
            }
            this.RewardArray.push(item);
            cc.find("item/Label",item).getComponent(cc.Label).string = this.node.getChildByName("num").getComponent(cc.Label).string;
        }
    }
}
