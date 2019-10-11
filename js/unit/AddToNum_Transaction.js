class AddToNum_Transaction {
    constructor(initNum, initAmountToAdd) {
        this.num = initNum;
        this.amountToAdd = initAmountToAdd;
    }

    doTransaction() {
        let oldNum = this.num.getNum();
        let newNum = oldNum + this.amountToAdd;
        this.num.setNum(newNum);
    }

    undoTransaction() {
        let oldNum = this.num.getNum();
        let newNum = oldNum - this.amountToAdd;
        this.num.setNum(newNum);
    }
}