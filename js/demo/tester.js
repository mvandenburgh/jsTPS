var tps = new jsTPS();
var num = new Num();
var numIs = document.getElementById("numIs");
var inForm = document.getElementById("in");
var stack = document.getElementById("stack");
update();

document.getElementById("addbtn").addEventListener("click", function () {
    if (inForm.value.trim() !== "") {
        tps.addTransaction(new AddToNum_Transaction(num, Number(inForm.value)))
        update();
        console.log("ADDED");
        console.log(num.getNum());
        let newRow = stack.insertRow(tps.getSize() - 1);
        let newCell = newRow.insertCell(0);
        newCell.innerHTML = "----Add " + inForm.value;
        inForm.value = "";// Number(inForm.value) + 1;
    }
});

document.getElementById("undobtn").addEventListener("click", function () {
    if (tps.hasTransactionToUndo()) {
        tps.undoTransaction();
        update();
        console.log("UNDO");
        console.log(num.getNum());
        stack.deleteRow(tps.getUndoSize());
        inForm.value = "";
    }
});

document.getElementById("redobtn").addEventListener("click", function () {
    if (tps.hasTransactionToRedo()) {
        let newRow = stack.insertRow(stack.rows.length);
        let newCell = newRow.insertCell(0);
        newCell.innerHTML = "----Add " + tps.peekDo().amountToAdd;
        tps.doTransaction();
        update();
        console.log("REDO");
        console.log(num.getNum());
        inForm.value = "";
    }
});

document.getElementById("clearbtn").addEventListener("click", function () {
    tps.clearAllTransactions();
    update();
    console.log("CLEAR");
    console.log(num.getNum());
    stack.innerHTML = "";
    inForm.value = "";
});

document.getElementById("resetbtn").addEventListener("click", function () {
    tps.clearAllTransactions();
    num = new Num();
    update();
    console.log("RESET");
    console.log(num.getNum());
    stack.innerHTML = "";
    inForm.value = "";
});

function update() {
    numIs.innerHTML = num.getNum();
    document.getElementById("numTrans").innerHTML = tps.getSize();
    document.getElementById("indStack").innerHTML = tps.mostRecentTransaction;
}