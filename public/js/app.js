'use strict';

let stateValue = 0;

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
            pointers.appCounterState.innerText = stateValue;
        })
    }).catch(err => {
        throw err;
    })
}

function getCounter_Request() {

    fetch("/api/counterManagements", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    }).then(r => {
        r.json().then(_r => {
            stateValue = _r.counter;
            pointers.appCounterState.innerText = stateValue;
        })
    }).catch(err => {
        throw err;
    })
}

loadTemplatsContent('counter', () => {
    pointers.increaseButton = document.getElementById('increaseButton');
    pointers.decreaseButton = document.getElementById('decreaseButton');
    pointers.appCounterState = document.getElementById('appCounterState');

    pointers.increaseButton.addEventListener('click', () => {
        const increaseOptions = {
            type: 'increase',
            value: 1
        }
        sendAPI_Request(increaseOptions);
    })

    pointers.decreaseButton.addEventListener('click', () => {
        const decreaseOptions = {
            type: 'decrease',
            value: 1
        }
        sendAPI_Request(decreaseOptions);
    })

    getCounter_Request();
});