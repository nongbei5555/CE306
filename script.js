let transactions = [];
let form = document.querySelector(".form-row");
let inputs = form.querySelectorAll("input");
let selects = form.querySelectorAll("select");
let typeSelect = selects[0];
let nameInput = inputs[0];
let categorySelect = selects[1];
let amountInput = inputs[1];
let addButton = form.querySelector("button");
let table = document.querySelector("table");
let summary = document.querySelectorAll("body > p");

addButton.onclick = function () {
    let type = typeSelect.value;
    let name = nameInput.value.trim();
    let category = categorySelect.value.trim();
    let amount = Number(amountInput.value);

    if (name === "" || amount <= 0 || isNaN(amount)) {
        alert("กรุณากรอกข้อมูลให้ครบถ้วน");
        return;
    }

    transactions.push({
        type: type,
        name: name,
        category: category,
        amount: amount
    });

    displayTransactions();

    updateSummary();

    nameInput.value = "";
    amountInput.value = "";
};

function displayTransactions() {
    while (table.rows.length > 1) {
        table.deleteRow(1);
    }
    transactions.forEach(function (item, index) {
        let row = table.insertRow();
        row.insertCell(0).innerText = index + 1;
        row.insertCell(1).innerText = item.type;
        row.insertCell(2).innerText = item.name;
        row.insertCell(3).innerText = item.category;
        row.insertCell(4).innerText =
            "฿" + item.amount.toLocaleString("en-US");
    });
}

function updateSummary() {
    let totalIncome = 0;
    let totalExpense = 0;
    transactions.forEach(function (item) {
        if (item.type === "รายรับ") {
            totalIncome += item.amount;
        }
        else if (item.type === "รายจ่าย") {
            totalExpense += item.amount;
        }
    });

    let balance = totalIncome - totalExpense;

    summary[0].innerHTML =
        "ยอดรายรับรวม : <strong>฿" +
        totalIncome.toLocaleString("en-US", {
            minimumFractionDigits: 1,
            maximumFractionDigits: 1
        }) +
        "</strong>";

    summary[1].innerHTML =
        "ยอดรายจ่ายรวม : <strong>฿" +
        totalExpense.toLocaleString("en-US", {
            minimumFractionDigits: 1,
            maximumFractionDigits: 1
        }) +
        "</strong>";

    if (balance < 0) {
        summary[2].innerHTML =
            "ยอดเงินคงเหลือสุทธิ : <strong>-฿" +
            Math.abs(balance).toLocaleString("en-US", {
                minimumFractionDigits: 1,
                maximumFractionDigits: 1
            }) +
            "</strong>";
    } else {
        summary[2].innerHTML =
            "ยอดเงินคงเหลือสุทธิ : <strong>฿" +
            balance.toLocaleString("en-US", {
                minimumFractionDigits: 1,
                maximumFractionDigits: 1
            }) +
            "</strong>";
    }
}

let buttons = document.querySelectorAll("button");
let clearButton = buttons[buttons.length - 1];
clearButton.onclick = function () {
    let confirmClear = confirm(
        "คุณต้องการล้างข้อมูลทั้งหมดหรือไม่?"
    );
    if (confirmClear) {
        transactions = [];
        while (table.rows.length > 1) {
            table.deleteRow(1);
        }
        updateSummary();
    }
};
updateSummary();