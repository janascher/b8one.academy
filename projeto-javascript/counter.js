// ---------- COMO FAZER 02 ----------

(() => {
    const minusButton = document.querySelector(".minus-button");
    const plusButton = document.querySelector(".plus-button");
    const counterValueSpan = document.querySelector(".counter-value");

    function counterButtonHandler(operation) {
        
        let counterCurrentValue = +counterValueSpan.innerHTML

        switch (operation) {
            case "+":
                counterCurrentValue++
                counterValueSpan.innerHTML = counterCurrentValue
                break;
            case "-":
                counterCurrentValue--
                if (counterCurrentValue >= 0) {
                    counterValueSpan.innerHTML = counterCurrentValue
                }
                break;
            default:
                break;
        }
    }

    minusButton.addEventListener("click", () => counterButtonHandler("-"))
    plusButton.addEventListener("click", () => counterButtonHandler("+"))
})()

// ---------- COMO FAZER 01 ----------
//
// (() => {
//     const minusButton = document.querySelector(".minus-button");
//     const plusButton = document.querySelector(".plus-button");
//     const counterValueSpan = document.querySelector(".counter-value");
// 
//     function minusButtonHandler() {
//         let counterCurrentValue = +counterValueSpan.innerHTML
//         counterCurrentValue--
//         if (counterCurrentValue >= 0) {
//             counterValueSpan.innerHTML = counterCurrentValue
//         }        
//     }
// 
//     function plusButtonHandler() {
//         let counterCurrentValue = +counterValueSpan.innerHTML
//         counterCurrentValue++
//         counterValueSpan.innerHTML = counterCurrentValue
//     }
// 
//     minusButton.addEventListener("click", minusButtonHandler);
//     plusButton.addEventListener("click", plusButtonHandler);
// })()