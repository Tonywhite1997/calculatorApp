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

        if(inputField.value.length === 0 && value==="^" ){
            return
        } 

        if(inputField.value.length === 0 && value==="%" ){
            return
        }

        if(inputField.value.length === 0 && value==="*" ){
            return
        }

        if(inputField.value.length === 0 && value==="-" ){
            return
        }      

        if(inputField.value.length === 0 && value==="+" ){
            return
        }      
        if(inputField.value.length === 0 && value==="/" ){
            return
        }      

        if(inputField.value.includes(".") && value === "."){
            return
        }
        
        for(i=0; i<inputField.value.length; i++){
            if(inputField.value[i] === "^" && inputField.value[i+1] === "^"){
                return
            }
        }
        
        inputField.value += value;

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
