'use strict';

const increaseButton = document.getElementById('increaseButton'),
    decreaseButton = document.getElementById('decreaseButton'),
    appP = document.getElementById('appP');

let stateValue = 0;

increaseButton.addEventListener('click', () => {
    const increaseOptions = {
        type: 'increase',
        value: 1
    }
    sendAPI_Request(increaseOptions);
})

decreaseButton.addEventListener('click', () => {
    const decreaseOptions = {
        type: 'decrease',
        value: 1
    }
    sendAPI_Request(decreaseOptions);
})

function sendAPI_Request(options) {
    const { type, value } = options;

    fetch("/api/counterManagements", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ type, value })
    }).then(r => {
        r.json().then(_r => {
            stateValue = _r.counter;
            appP.innerText = stateValue;
        })
    }).catch(err => {
        throw err;
    })
}

function getCounter_Request(){

    fetch("/api/counterManagements", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    }).then(r => {
        r.json().then(_r => {
            stateValue = _r.counter;
            appP.innerText = stateValue;
        })
    }).catch(err => {
        throw err;
    })
}

getCounter_Request();