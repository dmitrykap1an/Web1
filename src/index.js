import './index.css'

let xButtons = document.querySelectorAll(".x_button");
let rButtons = document.querySelectorAll(".r-button");
let yButton = document.querySelector(".y_text");
let submit = document.querySelector(".submit");
let form = document.getElementById("form")
const request = new XMLHttpRequest()

form.onsubmit = function (){

    let x = checkX()
    let y = validateY()
    let r = checkR()
    let array = [x, y, r]
    if(x.status && y.status && r.status){
        console.log(array)
    }
    else{
        let errorString = ""
        array.forEach(function (input){
            if(!input.status){
                errorString += input.errorMessage + "\n"
            }
        })

        alert(errorString)
    }
    return false
}

function validateY(){
    let yVal = yButton.value.replace(",", ".")
    if(!isNaN(yVal)){
        return checkY(Math.round(Number.parseFloat(yVal) * 1000) / 1000)
    }
    else{
        return {
            status: false,
            value: 404,
            errorMessage: "Y должен быть представлен числом"
        }
    }
}

function checkY(yVal){
    if(yVal >= -5 && yVal <= 3 && yVal !== ""){
        return {
            status: true,
            value: yVal,
            errorMessage: ""
        }
    }
    else{
        return {
            status: false,
            value: 404,
            errorMessage: "Число Y должно быть в промежутке от -5 до 3"
        }
    }

}

function checkX(){
    let number = 404;
    xButtons.forEach(function (input){
        if(input.matches(":checked")){
            number = Number.parseFloat(input.value);
        }
    })

    if(number === 404){
        return {
            status: false,
            value: number,
            errorMessage: "Выберете X!"
        }
    }
    else return {
        status: true,
        value: number,
        errorMessage: ""
    }


}

function checkR(){
    let number = 404;
    rButtons.forEach(function (input){
        if(input.matches(":checked")){
            number = Number.parseFloat(input.value);
        }
    })

    if(number === 404){
        return {
            status: false,
            value: number,
            errorMessage: "Выберете R!"
        }
    }
    else return {
        status: true,
        value: number,
        errorMessage: ""
    }
}

function send(array){
    request.open("GET", "https://kaplaan.ru/script.php")
    request.send(array)

}