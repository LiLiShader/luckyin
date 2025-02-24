import Hand from './Hand';
const { ccclass, property } = cc._decorator;

/**
 * Player 类表示游戏中的玩家
 * 可以作为庄家或闲家使用
 */
@ccclass
export default class Player extends cc.Component {
    public hand: Hand = new Hand();  // 当前手牌

    @property
    isDealer: boolean = false;  // 是否为庄家

    /**
     * 重置玩家的手牌
     */
    resetHand(): void {
        this.hand.clear();
    }

    /**
     * 庄家判断是否需要继续要牌
     * 庄家需至少到17点，软17（含A）需继续拿牌
     */
    shouldHit(): boolean {
        if (this.isDealer) {
            const score = this.hand.getScore();
            return score < 17 || (score === 17 && this.hasSoft17());
        }
        return false;
    }

    /**
     * 判断是否是软17
     * @returns {boolean} 是否为软17（含A）
     */
    private hasSoft17(): boolean {
        return this.hand.getScore() === 17 && this.hand.cards.some(card => card.isAce());
    }
}
