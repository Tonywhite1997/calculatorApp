const resultField = document.querySelector(".main__input__result");

const inputField = document.querySelector(".main__input__parameters");

const keys = document.querySelectorAll(".key")

const euqaulBtn = document.querySelector(".equals__to")
const clearBtn = document.querySelector(".clear")
const deleteBtn = document.querySelector(".fa-delete-left")

let clickCounter = 0;
keys.forEach((key)=>{
    key.addEventListener("click", function(){
        let{value} = this.dataset;

        let operators = ["^", "%", "*", "-", "+", "/", "."]

        if(!operators.includes(value)){
            clickCounter = 0
        }

        for(operand of operators){

            if(inputField.value.length === 0 && resultField.value.length !== 0 && value === operand){
                inputField.value = resultField.value;
            }

            if(inputField.value.length === 0 && value === operand && resultField.value.length === 0){
                return
            }

            if(value === operand){
                clickCounter += 1

                if(clickCounter >= 2){
                    return
                }
            }
        }
        
        inputField.value += value;

    });
});

function clearInputField(){
    clickCounter = 0;
    inputField.value = "";
    resultField.value = "";
}

function deleteLastInput(){

    let operators = ["^", "%", "*", "-", "+", "/", "."]

    if(inputField.value === ""){
        return;
    };

    let inputValue;
    let numberArray = [...inputField.value];

    let lastElement = numberArray.slice(-1).join("")
    let matched = operators.find((operand)=>{
        return lastElement === operand
    })

    if(matched){
        clickCounter = 0;
    }

    for(let operand of operators){
        if(!matched && numberArray.slice(-2)[0] === operand){
            clickCounter = 1
        }
    }

    if(numberArray.length ===  1){
        return inputField.value = "";
    }
    
    let afterDeleteOp = numberArray.slice(0, -1);
    inputValue = afterDeleteOp.join("")
    inputField.value = inputValue;    
}

euqaulBtn.addEventListener("click", ()=>{
    clickCounter = 0;
    if(inputField.value === ""){
        return
    }
    let parameters = [...inputField.value]
    for(i=0; i<parameters.length; i++){
        if(parameters[i] === "^"){
            parameters.splice(i, 1, "**")
        }
    }

    let formattedInput = parameters.join("")

    resultField.value = eval(formattedInput).toLocaleString();
    inputField.value = "";
})

clearBtn.addEventListener("click", clearInputField)

deleteBtn.addEventListener("click", deleteLastInput)
