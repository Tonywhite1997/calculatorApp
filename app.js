const resultField = document.querySelector(".main__input__result");

const inputField = document.querySelector(".main__input__parameters");

const keys = document.querySelectorAll(".key")

const euqaulBtn = document.querySelector(".equals__to")
const clearBtn = document.querySelector(".clear")
const deleteBtn = document.querySelector(".fa-delete-left")


let calculatedResult;

keys.forEach((key)=>{
    key.addEventListener("click", function(){
        let {value} = this.dataset;
        inputField.value += value;
        // let finalNumber = parseInt(inputField.value)
        // calculatedResult = finalNumber
    })
})

euqaulBtn.addEventListener("click", ()=>{
    console.log(inputField.value);
    resultField.value = eval(inputField.value);
})

clearBtn.addEventListener("click", ()=>{
    inputField.value = "";
    resultField.value = "";
})

deleteBtn.addEventListener("click", ()=>{
    let inputValue
    let numberArray = [...inputField.value]
    let afterDeleteOp = numberArray.slice(0, -1);
    for(number of afterDeleteOp){
        inputValue = afterDeleteOp.join("")
    }
    inputField.value = inputValue;
})
