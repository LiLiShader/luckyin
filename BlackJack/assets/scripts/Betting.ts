/**
 * Betting 类处理下注金额和余额的计算
 */
export default class Betting {
    private betAmount: number = 10;  // 每轮下注金额
    private playerBalance: number = 100;  // 玩家初始余额

    /**
     * 设置下注金额 
     * @param amount {number} 设置的赌注金额
     */
    placeBet(amount: number): void {
        this.betAmount = amount;
    }

    /**
     * 玩家赢得普通对局
     * 奖励 2 倍的赌注
     */
    win(): void {
        this.playerBalance += this.betAmount * 2;

        let playerNode=cc.find("Canvas/Player Node");
        for(let i=0;i<playerNode.childrenCount;i++){
            playerNode.children[i].getChildByName("Sign").active=true;
            playerNode.children[i].getChildByName("Sign").color=cc.color(0,255,56,255);
        }
        cc.find("Canvas/playerScoreNode").color=cc.color(0,255,56,255);
    }
    winLeft(): void {
        this.playerBalance += this.betAmount * 2;
        let playerNode=cc.find("Canvas/Player Node left");
        for(let i=0;i<playerNode.childrenCount;i++){
            playerNode.children[i].getChildByName("Sign").active=true;
            playerNode.children[i].getChildByName("Sign").color=cc.color(0,255,56,255);
        }
        cc.find("Canvas/playerleftScoreNode").color=cc.color(0,255,56,255);
    }
    winRight(): void {
        this.playerBalance += this.betAmount * 2;
        let playerNode=cc.find("Canvas/Player Node right");
        for(let i=0;i<playerNode.childrenCount;i++){
            playerNode.children[i].getChildByName("Sign").active=true;
            playerNode.children[i].getChildByName("Sign").color=cc.color(0,255,56,255);
        }
        cc.find("Canvas/playerrightScoreNode").color=cc.color(0,255,56,255);
    }
    loseLeft(): void {
        this.playerBalance -= this.betAmount;   
        let playerNode=cc.find("Canvas/Player Node left");
        for(let i=0;i<playerNode.childrenCount;i++){
            playerNode.children[i].getChildByName("Sign").active=true;
            playerNode.children[i].getChildByName("Sign").color=cc.color(255,0,0,255);
        }
        cc.find("Canvas/playerleftScoreNode").color=cc.color(255,0,0,255);
    }
    loseRight(): void {
        this.playerBalance -= this.betAmount;   
        let playerNode=cc.find("Canvas/Player Node right");
        for(let i=0;i<playerNode.childrenCount;i++){
            playerNode.children[i].getChildByName("Sign").active=true;
            playerNode.children[i].getChildByName("Sign").color=cc.color(255,0,0,255);
        }
        cc.find("Canvas/playerrightScoreNode").color=cc.color(255,0,0,255);
    }
    pushLeft(): void {
        let playerNode=cc.find("Canvas/Player Node left");
        for(let i=0;i<playerNode.childrenCount;i++){
            playerNode.children[i].getChildByName("Sign").active=true;
            playerNode.children[i].getChildByName("Sign").color=cc.color(255,255,0,255);
        }
        cc.find("Canvas/playerleftScoreNode").color=cc.color(255,255,0,255);
    }
    pushRight(): void {
        let playerNode=cc.find("Canvas/Player Node right");
        for(let i=0;i<playerNode.childrenCount;i++){
            playerNode.children[i].getChildByName("Sign").active=true;
            playerNode.children[i].getChildByName("Sign").color=cc.color(255,255,0,255);
        }
        cc.find("Canvas/playerrightScoreNode").color=cc.color(255,255,0,255);
    }

    /**
     * 玩家赢得 Blackjack，对局奖励 2.5 倍赌注
     */
    winBlackjack(): void {
        this.playerBalance += this.betAmount * 2.5;
    }

    /**
     * 玩家输掉对局，扣除赌注
     */
    lose(): void {
        this.playerBalance -= this.betAmount;
        console.log("lose",this.playerBalance)
        let playerNode=cc.find("Canvas/Player Node");
        for(let i=0;i<playerNode.childrenCount;i++){
            playerNode.children[i].getChildByName("Sign").active=true;
            playerNode.children[i].getChildByName("Sign").color=cc.color(255,0,0,255);
        }
        cc.find("Canvas/playerScoreNode").color=cc.color(255,0,0,255);
    }

    /**
     * 平局时退还赌注
     */
    push(): void {
        console.log("push",this.playerBalance)
        let playerNode=cc.find("Canvas/Player Node");
        for(let i=0;i<playerNode.childrenCount;i++){
            playerNode.children[i].getChildByName("Sign").active=true;
            playerNode.children[i].getChildByName("Sign").color=cc.color(255,255,0,255);
        }
        cc.find("Canvas/playerScoreNode").color=cc.color(255,255,0,255);
        // 无变化，退还赌注
    }
    // 双倍下注，将当前赌注金额翻倍
    doubleBet(): void {
        this.betAmount *= 2;
    }
    /**
     * 获取当前余额
     * @returns {number} 玩家当前余额
     */
    getBalance(): number {
        return this.playerBalance;
    }

}
