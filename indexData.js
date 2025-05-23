import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyCnXfnbDRM3xzhzLW9D7yfQ81Be3RHLNdI",
    authDomain: "dbfyp-27eb4.firebaseapp.com",
    databaseURL: "https://dbfyp-27eb4-default-rtdb.firebaseio.com",
    projectId: "dbfyp-27eb4",
    storageBucket: "dbfyp-27eb4.appspot.com",
    messagingSenderId: "107812965407",
    appId: "1:107812965407:web:bf72b18b4ff31b6394992a",
    measurementId: "G-M0N7NX6S7Z"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const batTempChartCtx = document.getElementById("batTempChart")?.getContext("2d");
const batTempChart = batTempChartCtx && new Chart(batTempChartCtx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Battery Temperature (°C)',
            data: [],
            backgroundColor: 'rgba(16, 185, 129, 0.2)',
            borderColor: 'var(--secondary-green)',
            borderWidth: 2,
            pointBackgroundColor: 'var(--primary-green)',
            pointRadius: 4,
            tension: 0.4
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: { position: 'top', labels: { color: 'var(--text-dark)' } },
            tooltip: { backgroundColor: 'var(--dark-green)', titleColor: 'var(--text-light)', bodyColor: 'var(--text-light)' }
        },
        scales: {
            x: {
                title: { display: true, text: 'Time', color: 'var(--text-dark)' },
                grid: { color: 'var(--light-green)' }
            },
            y: {
                title: { display: true, text: 'Battery Temperature (°C)', color: 'var(--text-dark)' },
                grid: { color: 'var(--light-green)' }
            }
        }
    }
});

const batTempDataRef = ref(database, 'batTempData');
onValue(batTempDataRef, (snapshot) => {
    if (!batTempChart) return;
    const batTempData = snapshot.val();
    const keys = Object.keys(batTempData);
    const values = Object.values(batTempData);
    batTempChart.data.labels = keys;
    batTempChart.data.datasets[0].data = values;
    batTempChart.update();
}, { onlyOnce: false });

const batVolChartCtx = document.getElementById("batVolChart")?.getContext("2d");
const batVolChart = batVolChartCtx && new Chart(batVolChartCtx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Battery Voltage (V)',
            data: [],
            backgroundColor: 'rgba(16, 185, 129, 0.2)',
            borderColor: 'var(--secondary-green)',
            borderWidth: 2,
            pointBackgroundColor: 'var(--primary-green)',
            pointRadius: 4,
            tension: 0.4
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: { position: 'top', labels: { color: 'var(--text-dark)' } },
            tooltip: { backgroundColor: 'var(--dark-green)', titleColor: 'var(--text-light)', bodyColor: 'var(--text-light)' }
        },
        scales: {
            x: {
                title: { display: true, text: 'Time', color: 'var(--text-dark)' },
                grid: { color: 'var(--light-green)' }
            },
            y: {
                title: { display: true, text: 'Battery Voltage (V)', color: 'var(--text-dark)' },
                grid: { color: 'var(--light-green)' }
            }
        }
    }
});

const batVolDataRef = ref(database, 'volData');
onValue(batVolDataRef, (snapshot) => {
    if (!batVolChart) return;
    const batVolData = snapshot.val();
    const keys = Object.keys(batVolData);
    const values = Object.values(batVolData);
    batVolChart.data.labels = keys;
    batVolChart.data.datasets[0].data = values;
    batVolChart.update();
}, { onlyOnce: false });

const batCurChartCtx = document.getElementById("batCurChart")?.getContext("2d");
const batCurChart = batCurChartCtx && new Chart(batCurChartCtx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Battery Current (mA)',
            data: [],
            backgroundColor: 'rgba(16, 185, 129, 0.2)',
            borderColor: 'var(--secondary-green)',
            borderWidth: 2,
            pointBackgroundColor: 'var(--primary-green)',
            pointRadius: 4,
            tension: 0.4
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: { position: 'top', labels: { color: 'var(--text-dark)' } },
            tooltip: { backgroundColor: 'var(--dark-green)', titleColor: 'var(--text-light)', bodyColor: 'var(--text-light)' }
        },
        scales: {
            x: {
                title: { display: true, text: 'Time', color: 'var(--text-dark)' },
                grid: { color: 'var(--light-green)' }
            },
            y: {
                title: { display: true, text: 'Battery Current (mA)', color: 'var(--text-dark)' },
                grid: { color: 'var(--light-green)' }
            }
        }
    }
});

const batCurDataRef = ref(database, 'currentData');
onValue(batCurDataRef, (snapshot) => {
    if (!batCurChart) return;
    const batCurData = snapshot.val();
    const keys = Object.keys(batCurData);
    const values = Object.values(batCurData);
    batCurChart.data.labels = keys;
    batCurChart.data.datasets[0].data = values;
    batCurChart.update();
}, { onlyOnce: false });

const batSocChartCtx = document.getElementById("batSocChart")?.getContext("2d");
const batSocChart = batSocChartCtx && new Chart(batSocChartCtx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Battery SOC (%)',
            data: [],
            backgroundColor: 'rgba(16, 185, 129, 0.2)',
            borderColor: 'var(--secondary-green)',
            borderWidth: 2,
            pointBackgroundColor: 'var(--primary-green)',
            pointRadius: 4,
            tension: 0.4
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: { position: 'top', labels: { color: 'var(--text-dark)' } },
            tooltip: { backgroundColor: 'var(--dark-green)', titleColor: 'var(--text-light)', bodyColor: 'var(--text-light)' }
        },
        scales: {
            x: {
                title: { display: true, text: 'Time', color: 'var(--text-dark)' },
                grid: { color: 'var(--light-green)' }
            },
            y: {
                title: { display: true, text: 'Battery SOC (%)', color: 'var(--text-dark)' },
                grid: { color: 'var(--light-green)' }
            }
        }
    }
});

const batSocDataRef = ref(database, 'socData');
onValue(batSocDataRef, (snapshot) => {
    if (!batSocChart) return;
    const batSocData = snapshot.val();
    const keys = Object.keys(batSocData);
    const values = Object.values(batSocData);
    batSocChart.data.labels = keys;
    batSocChart.data.datasets[0].data = values;
    batSocChart.update();
}, { onlyOnce: false });

const batSohChartCtx = document.getElementById("batSohChart")?.getContext("2d");
const batSohChart = batSohChartCtx && new Chart(batSohChartCtx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Battery SOH (%)',
            data: [],
            backgroundColor: 'rgba(16, 185, 129, 0.2)',
            borderColor: 'var(--secondary-green)',
            borderWidth: 2,
            pointBackgroundColor: 'var(--primary-green)',
            pointRadius: 4,
            tension: 0.4
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: { position: 'top', labels: { color: 'var(--text-dark)' } },
            tooltip: { backgroundColor: 'var(--dark-green)', titleColor: 'var(--text-light)', bodyColor: 'var(--text-light)' }
        },
        scales: {
            x: {
                title: { display: true, text: 'Time', color: 'var(--text-dark)' },
                grid: { color: 'var(--light-green)' }
            },
            y: {
                title: { display: true, text: 'Battery SOH (%)', color: 'var(--text-dark)' },
                grid: { color: 'var(--light-green)' }
            }
        }
    }
});

const batSohDataRef = ref(database, 'sohData');
onValue(batSohDataRef, (snapshot) => {
    if (!batSohChart) return;
    const batSohData = snapshot.val();
    const keys = Object.keys(batSohData);
    const values = Object.values(batSohData);
    batSohChart.data.labels = keys;
    batSohChart.data.datasets[0].data = values;
    batSohChart.update();
}, { onlyOnce: false });

const motTempChartCtx = document.getElementById("motTempChart")?.getContext("2d");
const motTempChart = motTempChartCtx && new Chart(motTempChartCtx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Motor Temperature (°C)',
            data: [],
            backgroundColor: 'rgba(16, 185, 129, 0.2)',
            borderColor: 'var(--secondary-green)',
            borderWidth: 2,
            pointBackgroundColor: 'var(--primary-green)',
            pointRadius: 4,
            tension: 0.4
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: { position: 'top', labels: { color: 'var(--text-dark)' } },
            tooltip: { backgroundColor: 'var(--dark-green)', titleColor: 'var(--text-light)', bodyColor: 'var(--text-light)' }
        },
        scales: {
            x: {
                title: { display: true, text: 'Time', color: 'var(--text-dark)' },
                grid: { color: 'var(--light-green)' }
            },
            y: {
                title: { display: true, text: 'Motor Temperature (°C)', color: 'var(--text-dark)' },
                grid: { color: 'var(--light-green)' }
            }
        }
    }
});

const motTempDataRef = ref(database, 'motTempData');
onValue(motTempDataRef, (snapshot) => {
    if (!motTempChart) return;
    const motTempData = snapshot.val();
    const keys = Object.keys(motTempData);
    const values = Object.values(motTempData);
    motTempChart.data.labels = keys;
    motTempChart.data.datasets[0].data = values;
    motTempChart.update();
}, { onlyOnce: false });