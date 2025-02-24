/**
 * 定义扑克牌的花色
 */
// export enum Suit {
//     Spades,
//     Hearts,
//     Diamonds,
//     Clubs
// }

/**
 * 定义扑克牌的点数
 */
// export enum Rank {
//     Two = 2, Three, Four, Five, Six, Seven, Eight, Nine, Ten,
//     Jack = 10, Queen = 10, King = 10, Ace = 11
// }

/**
 * Card 类表示一张牌的对象
 */
export default class Card {
    constructor(public suit: number, public rank: number) {}

    /**
     * 获取牌的数值
     * J、Q、K 都视为 10 点，其他按点数值计算
     */
    getValue(): number {
        let num
        switch (this.rank) {
            case 1:
                num=11
                break;
            case 11:
            case 12:
            case 13:
                num=10
                break;
            default:
                num=this.rank
                break;
        }
        return num;
    }

    /**
     * 判断这张牌是否是 A
     */
    isAce(): boolean {
        return this.rank === 1;
    }

    /**
     * 返回卡牌的字符串表示，例如 "Spades A" 或 "Hearts 10"
     */
    // toString(): string {
    //     // 使用枚举的字符串表示
    //     const suitName = Suit[this.suit];
    //     const rankName = this.rank === 10 ? '10' : Rank[this.rank];
    //     // return `${suitName} ${rankName}`;
    //     return `${suitName}`;
    // }
}
