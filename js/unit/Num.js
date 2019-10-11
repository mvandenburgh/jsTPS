class Num {

    // THE NUMBER THIS CLASS MANAGES
    constructor() {
        this.num = 0;
    }

    setNum(initNum) {
        this.num = initNum;
    }

    getNum() {
        return this.num;
    }

    andMask(mask) {
        this.num = this.num & mask;
    }

    orMask(mask) {
        this.num = this.num | mask;
    }
}
