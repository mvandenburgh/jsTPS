var currentTest;
var currentTrial;

testAdd();
testAndMask();
testOrMask();
testUndo();
testRedo();

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

function testUndo() {
    startTest("testUndo");
    let tps = new jsTPS;
    let num = new Num();
    assertEquals(num.getNum(), 0);
    assertFalse(tps.hasTransactionToUndo());
    assertFalse(tps.hasTransactionToRedo());

    // ADD 3 TRANSACTIONS (5, 10, and 15)
    tps.addTransaction(new AddToNum_Transaction(num, 5));
    tps.addTransaction(new AddToNum_Transaction(num, 10));
    tps.addTransaction(new AddToNum_Transaction(num, 20));
    assertTrue(tps.hasTransactionToUndo());
    assertFalse(tps.hasTransactionToRedo());
    assertEquals(35, num.getNum());
    assertTrue(tps.hasTransactionToUndo());
    assertEquals(3, tps.getSize());
    assertEquals(0, tps.getRedoSize());
    assertEquals(3, tps.getUndoSize());

    // UNDO A TRANSACTION
    tps.undoTransaction();
    assertTrue(tps.hasTransactionToUndo());
    assertTrue(tps.hasTransactionToRedo());
    assertEquals(15, num.getNum());
    assertEquals(3, tps.getSize());
    assertEquals(1, tps.getRedoSize());
    assertEquals(2, tps.getUndoSize());

    // UNDO ANOTHER
    tps.undoTransaction();
    assertTrue(tps.hasTransactionToUndo());
    assertTrue(tps.hasTransactionToRedo());
    assertEquals(5, num.getNum());
    assertEquals(3, tps.getSize());
    assertEquals(2, tps.getRedoSize());
    assertEquals(1, tps.getUndoSize());

    // AND ANOTHER
    tps.undoTransaction();
    assertFalse(tps.hasTransactionToUndo());
    assertTrue(tps.hasTransactionToRedo());
    assertEquals(0, num.getNum());
    assertEquals(3, tps.getSize());
    assertEquals(3, tps.getRedoSize());
    assertEquals(0, tps.getUndoSize());

    // WE HAVE NO MORE TO UNDO SO THIS SHOULD DO NOTHING
    tps.undoTransaction();
    assertFalse(tps.hasTransactionToUndo());
    assertTrue(tps.hasTransactionToRedo());
    assertEquals(0, num.getNum());
    assertEquals(3, tps.getSize());
    assertEquals(3, tps.getRedoSize());
    assertEquals(0, tps.getUndoSize());
}

function testRedo() {
    startTest("testredo");
    let tps = new jsTPS();
    let num = new Num();
    assertEquals(num.getNum(), 0);

    // ADD 3 TRANSACTIONS (5, 10, and 15)
    tps.addTransaction(new AddToNum_Transaction(num, 5));
    tps.addTransaction(new AddToNum_Transaction(num, 10));
    tps.addTransaction(new AddToNum_Transaction(num, 20));
    assertTrue(tps.hasTransactionToUndo());
    assertFalse(tps.hasTransactionToRedo());
    assertEquals(35, num.getNum());
    assertEquals(3, tps.getSize());
    assertEquals(0, tps.getRedoSize());
    assertEquals(3, tps.getUndoSize());

    // UNDO A TRANSACTION AND THEN REDO IT
    tps.undoTransaction();
    tps.doTransaction();
    assertTrue(tps.hasTransactionToUndo());
    assertFalse(tps.hasTransactionToRedo());
    assertEquals(35, num.getNum());
    assertEquals(3, tps.getSize());
    assertEquals(0, tps.getRedoSize());
    assertEquals(3, tps.getUndoSize());

    // UNDO TWO TRANSACTIONS AND THEN REDO THEM
    tps.undoTransaction();
    tps.undoTransaction();
    tps.doTransaction();
    tps.doTransaction();
    assertTrue(tps.hasTransactionToUndo());
    assertFalse(tps.hasTransactionToRedo());
    assertEquals(35, num.getNum());
    assertEquals(3, tps.getSize());
    assertEquals(0, tps.getRedoSize());
    assertEquals(3, tps.getUndoSize());

    // UNDO ALL THREE TRANSACTIONS AND REDO THEM
    tps.undoTransaction();
    tps.undoTransaction();
    tps.undoTransaction();
    tps.doTransaction();
    tps.doTransaction();
    tps.doTransaction();
    assertTrue(tps.hasTransactionToUndo());
    assertFalse(tps.hasTransactionToRedo());
    assertEquals(35, num.getNum());
    assertEquals(3, tps.getSize());
    assertEquals(0, tps.getRedoSize());
    assertEquals(3, tps.getUndoSize());

    // UNDO THREE TRANSACTIONS AND REDO TWO
    tps.undoTransaction();
    tps.undoTransaction();
    tps.undoTransaction();
    tps.doTransaction();
    tps.doTransaction();
    assertTrue(tps.hasTransactionToUndo());
    assertTrue(tps.hasTransactionToRedo());
    assertEquals(15, num.getNum());
    assertEquals(3, tps.getSize());
    assertEquals(1, tps.getRedoSize());
    assertEquals(2, tps.getUndoSize());

    // UNDO ALL THREE TRANSACTIONS AND REDO FOUR, WHICH
    // SHOULD NOT PRODUCE AN ERROR BUT THE LAST
    // REDO SHOULD DO NOTHING
    tps.undoTransaction();
    tps.undoTransaction();
    tps.undoTransaction();
    tps.doTransaction();
    tps.doTransaction();
    tps.doTransaction();
    tps.doTransaction();
    assertTrue(tps.hasTransactionToUndo());
    assertFalse(tps.hasTransactionToRedo());
    assertEquals(35, num.getNum());
    assertEquals(3, tps.getSize());
    assertEquals(0, tps.getRedoSize());
    assertEquals(3, tps.getUndoSize());
}

function assertEquals(expected, actual) {
    console.log(currentTest + currentTrial);
    console.log("expected: " + expected);
    console.log("actual: " + actual);
    let elem = document.getElementById(currentTest + currentTrial);
    actual === expected ? setPassed(elem) : setFailed(elem);
    currentTrial++;
}

function assertTrue(actual) {
    let elem = document.getElementById(currentTest + currentTrial);
    actual ? setPassed(elem) : setFailed(elem);
    currentTrial++;
}

function assertFalse(actual) {
    let elem = document.getElementById(currentTest + currentTrial);
    !actual ? setPassed(elem) : setFailed(elem);
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