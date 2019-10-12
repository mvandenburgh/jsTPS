var currentTest;
var currentTrial;

testAdd();
testAndMask();
testOrMask();

function testAdd() {
    startTest("testAdd");

    let tps = new jsTPS();
    let num = new Num();
    assertEquals(num.getNum(), 0);

    // ADD 5 TRANSACTION
    tps.addTransaction(new AddToNum_Transaction(num, 5));
    assertEquals(5, num.getNum());
    assertEquals(1, tps.getSize());
    assertEquals(0, tps.getRedoSize());
    assertEquals(1, tps.getUndoSize());

    // ADD 10 TRANSACTION
    tps.addTransaction(new AddToNum_Transaction(num, 10));
    assertEquals(15, num.getNum());
    assertEquals(2, tps.getSize());
    assertEquals(0, tps.getRedoSize());
    assertEquals(2, tps.getUndoSize());

    // ADD 15 TRANSACTION
    tps.addTransaction(new AddToNum_Transaction(num, 20));
    assertEquals(35, num.getNum());
    assertEquals(3, tps.getSize());
    assertEquals(0, tps.getRedoSize());
    assertEquals(3, tps.getUndoSize());
}

function testAndMask() {
    startTest("testAndMask");
    let tps = new jsTPS;
    let num = new Num();
    assertEquals(0, num.getNum());

    // ADD 5 TRANSACTION
    tps.addTransaction(new AddToNum_Transaction(num, 12));
    tps.addTransaction(new AndMask_Transaction(num, num.getNum(), 4));
    assertEquals(4, num.getNum());
    assertEquals(2, tps.getSize());

    tps.undoTransaction();
    assertEquals(12, num.getNum());
    assertEquals(2, tps.getSize());
    assertEquals(1, tps.getRedoSize());
    assertEquals(1, tps.getUndoSize());
}

function testOrMask() {
    startTest("testOrMask");
    let tps = new jsTPS;
    let num = new Num();
    assertEquals(0, num.getNum());

    // ADD 5 TRANSACTION
    tps.addTransaction(new AddToNum_Transaction(num, 12));
    tps.addTransaction(new OrMask_Transaction(num, num.getNum(), 4));
    assertEquals(12, num.getNum());
    assertEquals(2, tps.getSize());

    tps.undoTransaction();
    assertEquals(12, num.getNum());
    assertEquals(2, tps.getSize());
    assertEquals(1, tps.getRedoSize());
    assertEquals(1, tps.getUndoSize());
}


function assertEquals(expected, provided) {
    console.log(currentTest + currentTrial);
    console.log("expected: " + expected);
    console.log("actual: " + provided);
    let elem = document.getElementById(currentTest + currentTrial);
    provided === expected ? setPassed(elem) : setFailed(elem);
    currentTrial++;

}

function setPassed(elem) {
    //let elem = document.getElementById(id);
    elem.innerHTML = "Passed";
    elem.style.color = "green";
}

function setFailed(elem) {
    //let elem = document.getElementById(id);
    elem.innerHTML = "Failed";
    elem.style.color = "red";
}

function startTest(test) {
    currentTest = test;
    currentTrial = 1;
}