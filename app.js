const resultField = document.querySelector(".main__input__result");

const inputField = document.querySelector(".main__input__parameters");

const keys = document.querySelectorAll(".key")

const euqaulBtn = document.querySelector(".equals__to")
const clearBtn = document.querySelector(".clear")
const deleteBtn = document.querySelector(".fa-delete-left")

let clickCounter = 0;
let dotClickCounter = 0;
keys.forEach((key)=>{
    key.addEventListener("click", function(){
        let{value} = this.dataset;

        if(resultField.value.includes("NaN") || resultField.value.includes("∞") || resultField.value.includes("Syntax Error")){
            return clearInputField()
        }

        let operators = ["^", "%", "*", "-", "+", "/", "."];
        let dotOperators = ["^", "%", "*", "-", "+", "/"];

        if(value === "." && inputField.value.length === 0){
            return
        }
        if(value === "."){
            dotClickCounter += 1;
        }

        let parameters = [...inputField.value]

        if(dotOperators.includes(parameters.slice(-1).join()) && value === "."){
            dotClickCounter = 0;
        }

        if(dotClickCounter >= 2 && value === "."){
            return
        }

        for(let dotOperator of dotOperators){
            if(value === dotOperator){
                dotClickCounter = 0;
            }
        }


        if(!operators.includes(value)){
            clickCounter = 0
        }

        for(operand of operators){

            if(inputField.value.length === 0 && resultField.value.length !== 0 && value === operand){
                inputField.value = resultField.value.replace(/,/g, "");
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
        console.log(dotClickCounter);

    });
});

function clearInputField(){
    clickCounter = 0;
    dotClickCounter = 0;
    inputField.value = "";
    resultField.value = "";
}

function deleteLastInput(){

    let operators = ["^", "%", "*", "-", "+", "/", "."];
    let dotOperators = ["^", "%", "*", "-", "+", "/"];

    if(inputField.value === ""){
        return;
    };

    let inputValue;
    let numberArray = [...inputField.value];

    let lastElement = numberArray.slice(-1).join("")
    if(lastElement === "."){
        dotClickCounter = 0;
    }
    if(dotOperators.includes(lastElement)){
        dotClickCounter = 1;
    }
    console.log(dotClickCounter);
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
        clearInputField()
    }
    
    let afterDeleteOp = numberArray.slice(0, -1);
    inputValue = afterDeleteOp.join("")
    inputField.value = inputValue;    
}

euqaulBtn.addEventListener("click", ()=>{
    clickCounter = 0;
    dotClickCounter = 0;
    if(inputField.value === ""){
        return
    }

    let parameters = inputField.value.replace(/\^/g, "**")

    try{
        let evaluatedResult = eval(parameters).toLocaleString();
        resultField.value = evaluatedResult
    
        inputField.value = "";
    }
    catch(err){
        if(err){
            resultField.value = "Syntax Error"
            clickCounter = 1
            return
        }
    }
})

clearBtn.addEventListener("click", clearInputField)

deleteBtn.addEventListener("click", deleteLastInput)
