//will load the expense data from localStorage
if (localStorage.getItem("expense") == null)
    localStorage.setItem("expense", "[]")

//retrieving values from localStorage
var expense = JSON.parse(localStorage.getItem("expense"));

// below function will display the transaction history
displayList()

// function will calculate the Balance, totalIncome, totalExpense and will update the values in ui
calculateExpense()

console.log(expense)

function add(e) {
    // will stop page from refreshing every ime add transaction is clicked
    e.preventDefault()

    let $text = document.querySelector("#text");
    let $amount = document.querySelector("#amount");

    // checking if the text fields are empty and if the amount is integer or not
    if ($text.value && parseInt($amount.value)) {

        // wrapping the amount and text into object and pushing into array.
        expense.push({
            text: $text.value,
            amount: parseInt($amount.value),
        })


        // saving the updated expense array into localStorage
        localStorage.setItem("expense", JSON.stringify(expense));

        // also updating the expense variable by pulling the expense from localStorag.
        expense = JSON.parse(localStorage.getItem("expense"));

        console.log(expense);

        // after retrieving he values from text fields, the value will be removed and set to null.
        $text.value = "";
        $amount.value = ""

        // function will calculate the Balance, totalIncome, totalExpense and will update the values in ui
        calculateExpense()

        // below function will display the transaction history
        displayList()

        console.log(expense)
    } else {
        // if input fields are empty then warning message will be displayed
        document.querySelector("#warning").style.display = "block"
    }
}

function displayList() {
    //  function will display the transaction history
    var $ul = document.querySelector("#list");

    // setiing ul element to null
    $ul.innerHTML = ""


    // looping over each expense and creating a li element which will hold the text and amount
    expense.forEach(item => {

        let $li = document.createElement("li")

        let $textSpan = document.createElement("span")
        let $textNode = document.createTextNode(item.text)
        $textSpan.appendChild($textNode)

        let $amountSpan = document.createElement("span")
        let $amountNode = document.createTextNode(item.amount >= 0 ? `+${item.amount}` : item.amount)
        $amountSpan.appendChild($amountNode)

        $li.appendChild($textSpan)
        $li.appendChild($amountSpan)

        if (item.amount >= 0)
            $li.style.borderRight = "7px solid #32e0c4"
        else
            $li.style.borderRight = "7px solid red"

        $ul.appendChild($li)
    });
}

function calculateExpense() {
    // function will calculate the Balance, totalIncome, totalExpense and will update the values in ui

    let $totalBalance = document.querySelector("#balance")
    let $income = document.querySelector("#money-plus")
    let $spent = document.querySelector("#money-minus")


    let totalBalance = 0
    let income = 0
    let spent = 0

    // looping over each expense and calculating totalBalance, total income and total amount spent
    expense.forEach(item => {
        totalBalance += item.amount

        income += item.amount > 0 ? item.amount : 0

        spent += spent + item.amount < 0 ? item.amount * -1 : 0

    })


    // updating calculate amount in ui
    $totalBalance.innerHTML = `$${totalBalance}`
    $income.innerHTML = `+$${income}`
    $spent.innerHTML = `-$${spent}`
}