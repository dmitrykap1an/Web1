const xButtons = document.querySelectorAll(".x_button"),
    rButtons = document.querySelectorAll(".r-button"),
    yButton = document.querySelector(".y_text"),
    form = document.getElementById("form"),
    table = document.querySelector(".my_table"),
    tbody = table.getElementsByTagName("tbody")[0];

form.addEventListener("click",onsubmit);

function onsubmit(){

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
    return false;
}

function validateY(){
    let yVal = yButton.value.replace(",", ".")
    if(!isNaN(yVal)){
        return checkY(Number.parseFloat(yVal).toFixed(3))
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
    if(yVal >= -5 && yVal <= 3){
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
    const x = document.createElement("td");
    const y = document.createElement("td");
    const R = document.createElement("td");
    const hit = document.createElement("td");
    const request_time = document.createElement("td");
    const timing = document.createElement("td");
    x.innerHTML = response.x;
    y.innerHTML = response.y;
    R.innerHTML = response.R;
    hit.innerHTML = response.result;
    request_time.innerHTML = response.server_time;
    timing.innerHTML = response.execute_time + " ms";
    row.appendChild(x);
    row.appendChild(y);
    row.appendChild(R);
    row.appendChild(hit);
    row.appendChild(request_time);
    row.appendChild(timing);
    tbody.insertBefore(row, tbody.firstChild);
}

function getResponse(request){
    console.log(request.responseText);
    const response = JSON.parse(request.responseText)
    updateTable(response)
}
function sendRequest(array){

    const path = "script.php?x=" + array[0] + "&y=" + array[1] + "&R=" + array[2]
    const request = new XMLHttpRequest()
    request.open("GET", path, true)

    request.onreadystatechange = () =>{
        if(request.readyState === 4 && request.status === 200){
            getResponse(request)
        }
    }
    request.send()

}
