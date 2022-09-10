import './index.css'

let xButtons = document.querySelectorAll(".x_button");
let rButtons = document.querySelectorAll(".r-button");
let yButton = document.querySelector(".y_text");
let submit = document.querySelector(".submit");
let form = document.getElementById("form")

form.onsubmit = function (){
    let yVal = yButton.value
    xButtons.forEach( function (input){
        if(input.matches(":checked")){
            console.log(input.value)
        }
    })
    if(yVal >= -5 && yVal <= 3){
        console.log(yVal)
    }

    rButtons.forEach(function (input){
        if(input.matches(":checked")){
            console.log(input.value)
        }
    })

    return false
}
