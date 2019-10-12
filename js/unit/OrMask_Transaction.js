class OrMask_Transaction {
    constructor(initNum, initIntNum, initMask) {
        this.num = initNum;
        this.intNum = initIntNum;
        this.mask = initMask;
    }

    doTransaction() {
        this.num.orMask(this.mask);
        console.log("ORMASK");
        console.log(this.mask);
    }

    undoTransaction() {
        this.num.setNum(this.intNum);
    }
}