import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyDF88C2xzAkyQYzG2S4XQrMTpmY_7GYw6I",
    authDomain: "heisenberg-b4608.firebaseapp.com",
    databaseURL: "https://heisenberg-b4608-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "heisenberg-b4608",
    storageBucket: "heisenberg-b4608.firebasestorage.app",
    messagingSenderId: "707937071538",
    appId: "1:707937071538:web:08de581e16ea1b41e474ab",
    measurementId: "G-SFTF7YFB8F"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const temperatureElem = document.getElementById("ftemp");
const tempBat = document.getElementById("tempBat");
const currentElem = document.getElementById("fcur");
const voltageElem = document.getElementById("fvol");
const speedElem = document.getElementById("fspeed");
const socelem = document.getElementById("socBat");
const soh = document.getElementById("soh");
const carPow = document.getElementById("carPower");
const alertSound = document.getElementById("alertSound");
const disCard = document.getElementById("distCol");

const batteryServiceElem = document.getElementById("batSer");
const overheatElem = document.getElementById("vehOver");
const colfan = document.getElementById("colFan");

let alertTimeout;

let voltageBelowThresholdTimer = 0;
let voltageInterval = null;

let batteryOverheatTimer = 0;
let overheatInterval = null;

let colFanTim = 0;
let colFanInterval = null;

const dataRef = ref(database, 'parameters');

function extractNumber(value) {
    if (typeof value !== 'string') value = String(value);
    return value.replace(/[^0-9.-]/g, "");
}

onValue(dataRef, (snapshot) => {
    const data = snapshot.val();

    const motorTemperature = parseFloat(extractNumber(data.motorTemperature));
    const batteryTemperature = parseFloat(extractNumber(data.batteryTemperature));
    const current = parseFloat(extractNumber(data.current));
    const voltage = parseFloat(extractNumber(data.systemVoltage));
    const soc = parseFloat(extractNumber(data.batteryPercent));
    const sohValue = parseFloat(extractNumber(data.batteryHealth));
    const power = parseFloat(extractNumber(data.power));
    const rpm = parseFloat(extractNumber(data.rpm));
    const distance = parseFloat(extractNumber(data.distance));

    temperatureElem.textContent = `${motorTemperature}`;
    tempBat.textContent = `${batteryTemperature}`;
    currentElem.textContent = `${current}`;
    voltageElem.textContent = `${voltage}`;
    speedElem.textContent = `${rpm}`;
    socelem.textContent = `${soc}`;
    soh.textContent = `${sohValue}`;
    carPow.textContent = `${power}`;
    disCard.textContent = `${distance}`;

    const distanceCard = disCard.closest('.card');
    if (distance < 45) {
        distanceCard.style.backgroundColor = 'var(--danger-red)';
        distanceCard.style.color = 'var(--text-light)';
        distanceCard.querySelector('h3').style.color = 'var(--text-dark)';
    } else if (distance >= 45 && distance < 60) {
        distanceCard.style.backgroundColor = 'var(--warning-yellow)';
        distanceCard.style.color = 'var(--text-dark)';
        distanceCard.querySelector('h3').style.color = 'var(--text-dark)';
    } else {
        distanceCard.style.backgroundColor = '';
        distanceCard.style.color = '';
        distanceCard.querySelector('h3').style.color = 'var(--dark-green)';
    }

    if (voltage < 7) {
        if (!voltageInterval) {
            voltageInterval = setInterval(() => {
                voltageBelowThresholdTimer++;
                if (voltageBelowThresholdTimer >= 0) {
                    batteryServiceElem.parentElement.style.display = "block";
                }
            }, 1000);
        }
    } else {
        clearInterval(voltageInterval);
        voltageInterval = null;
        voltageBelowThresholdTimer = 0;
        batteryServiceElem.parentElement.style.display = "none";
    }

    if (batteryTemperature > 45 || motorTemperature > 45) {
        if (!overheatInterval) {
            overheatInterval = setInterval(() => {
                batteryOverheatTimer++;
                if (batteryOverheatTimer >= 0) {
                    overheatElem.parentElement.style.display = "block";
                }
            }, 1000);
        }
    } else {
        clearInterval(overheatInterval);
        overheatInterval = null;
        batteryOverheatTimer = 0;
        overheatElem.parentElement.style.display = "none";
    }

    if (batteryTemperature > 40 || motorTemperature > 40) {
        if (!colFanInterval) {
            colFanInterval = setInterval(() => {
                colFanTim++;
                if (colFanTim >= 0) {
                    colfan.parentElement.style.display = "block";
                }
            }, 1000);
        }
    } else {
        clearInterval(colFanInterval);
        colFanInterval = null;
        colFanTim = 0;
        colfan.parentElement.style.display = "none";
    }

    function checkThreshold(element, value, threshold) {
        const card = element.closest('.card');
        if (value > threshold) {
            card.style.backgroundColor = 'var(--danger-red)';
            card.style.color = 'var(--text-light)';
            card.querySelector('h3').style.color = 'var(--text-dark)';
            if (alertSound.paused) {
                alertSound.play();
                clearTimeout(alertTimeout);
                alertTimeout = setTimeout(() => {
                    alertSound.pause();
                    alertSound.currentTime = 0;
                }, 5000);
            }
        } else {
            card.style.backgroundColor = '';
            card.style.color = '';
            card.querySelector('h3').style.color = 'var(--dark-green)';
        }
    }

    function checkThresholdLess(element, value, threshold) {
        const card = element.closest('.card');
        if (value < threshold) {
            card.style.backgroundColor = 'var(--danger-red)';
            card.style.color = 'var(--text-light)';
            card.querySelector('h3').style.color = 'var(--text-dark)';
            if (alertSound.paused) {
                alertSound.play();
                clearTimeout(alertTimeout);
                alertTimeout = setTimeout(() => {
                    alertSound.pause();
                    alertSound.currentTime = 0;
                }, 5000);
            }
        } else {
            card.style.backgroundColor = '';
            card.style.color = '';
            card.querySelector('h3').style.color = 'var(--dark-green)';
        }
    }

    checkThreshold(tempBat, batteryTemperature, 35);
    checkThreshold(temperatureElem, motorTemperature, 35);
    checkThreshold(currentElem, current, 3000);
    checkThresholdLess(currentElem, current, 0.5);
    checkThreshold(voltageElem, voltage, 12.6);
    checkThresholdLess(voltageElem, voltage, 2.6);
    checkThresholdLess(socelem, soc, 30);
    checkThresholdLess(soh, sohValue, 89);
});

const cursorDot = document.querySelector("[data-cursor-dot]");
const cursorOutline = document.querySelector("[data-cursor-outline]");

window.addEventListener("mousemove", function (e) {
    const posX = e.clientX;
    const posY = e.clientY;
    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;
    cursorOutline.style.left = `${posX}px`;
    cursorOutline.style.top = `${posY}px`;
});