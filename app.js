const resultField = document.querySelector(".main__input__result");

const inputField = document.querySelector(".main__input__parameters");

const keys = document.querySelectorAll(".key")

const euqaulBtn = document.querySelector(".equals__to")
const clearBtn = document.querySelector(".clear")
const deleteBtn = document.querySelector(".fa-delete-left")

let clickCounter = 0;
keys.forEach((key)=>{
    key.addEventListener("click", function(){
        resultField.value = "";
        let{value} = this.dataset;

        if(value === "()"){
            clickCounter += 1

            if(clickCounter < 0){
                clickCounter = 1;
            }

            if(clickCounter === 1){
                value = "("
            }
            if(clickCounter === 2){
                value = ")"
                clickCounter = 0;
            }
            if(clickCounter > 2){
                return;
            }
        }

        if(value === "^"){
            value = "**";
        };

        if(inputField.value === "Error"){
            inputField.value = ""
        }
        inputField.value += value;

        if(value==="1"||value==="2"||value==="3"||value==="4"||value==="5"||value==="6"||value==="7"||value==="8"||value==="9"||value==="0"){
            resultField.value = "";
        }

    });
});

function clearInputField(){
    inputField.value = "";
    resultField.value = "";
    clickCounter = 0;
}

function deleteLastInput(){
    if(inputField.value === ""){
        return;
    };

    if(inputField.value === "Error"){
        return inputField.value = "";
    }

    let inputValue;
    let numberArray = [...inputField.value];

    if(numberArray.length ===  1){
        return inputField.value = "";
    }
    
    let afterDeleteOp = numberArray.slice(0, -1);
    for(number of afterDeleteOp){
        if(number === "(" || ")"){
            clickCounter = 1
        }
        inputValue = afterDeleteOp.join("")
    }
    inputField.value = inputValue;
}

euqaulBtn.addEventListener("click", ()=>{
    if(inputField.value === ""){
        return
    }

    if(inputField.value[0] === "*"|| inputField.value[0] === "%" || inputField.value[0] === "/" || inputField.value[0] === "^"){
        return inputField.value = "Error"
    }

    if(inputField.value[0] === "(" && inputField.value[1] === ")"){
        return inputField.value = "Error";
    }

    resultField.value = eval(inputField.value).toLocaleString();
    inputField.value = "";
})

clearBtn.addEventListener("click", clearInputField)

deleteBtn.addEventListener("click", deleteLastInput)
