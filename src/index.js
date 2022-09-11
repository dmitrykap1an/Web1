
let xButtons = document.querySelectorAll(".x_button");
let rButtons = document.querySelectorAll(".r-button");
let yButton = document.querySelector(".y_text");
let form = document.getElementById("form")
let table = document.querySelector(".my_table")
const tbody = table.getElementsByTagName("tbody")[0];

form.onsubmit= function (){

    let x = checkX()
    let y = validateY()
    let r = checkR()
    let array = [x, y, r]
    if(x.status && y.status && r.status){
        sendRequest([x.value, y.value, r.value])
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
function updateTable(response) {
    const row = document.createElement("tr");
    const cell_x = document.createElement("td");
    const cell_y = document.createElement("td");
    const cell_R = document.createElement("td");
    const cell_hit = document.createElement("td");
    const cell_request_time = document.createElement("td");
    const cell_timing = document.createElement("td");
    cell_x.innerHTML = response.x;
    cell_y.innerHTML = response.y;
    cell_R.innerHTML = response.R;
    cell_hit.innerHTML = response.result;
    cell_request_time.innerHTML = response.server_time;
    cell_timing.innerHTML = response.script_exec_time + "ms";
    row.appendChild(cell_x);
    row.appendChild(cell_y);
    row.appendChild(cell_R);
    row.appendChild(cell_hit);
    row.appendChild(cell_request_time);
    row.appendChild(cell_timing);
    tbody.insertBefore(row, tbody.firstChild);
}

function getResponse(request){
    console.log(request.responseText);
    const response = JSON.parse(request.responseText)
    if (response.correct === "true") {
        updateTable(response);
    } else {
        alert("Ошибка обработки запроса сервером");
    }

}
function sendRequest(array){

    const path = "script.php?x=" + array[0].value + "&y=" + array[1].value + "&R=" + array[2].value
    const request = new XMLHttpRequest()
    request.open("GET", path, true)

    request.responseType = "text"
    request.setRequestHeader("Content-Type", "application/x-www-form-url")
    request.onreadystatechange = () =>{
        if(request.readyState === 4 && request.status === 200){
            getResponse(request)
        }
    }
    request.send()

}
