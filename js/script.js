// script.js
let map = L.map('map').setView([8.5241, 76.9366], 13);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

let dataPoints = [];
let collecting = false;
let intervalId = null;

// Sample Data (Thiruvananthapuram)
const sampleData = [
  { lat: 8.5241, lng: 76.9366, x: 0.2, y: 0.4, z: 0.1 },
  { lat: 8.527, lng: 76.937, x: 0.6, y: 0.5, z: 0.3 },
  { lat: 8.526, lng: 76.938, x: 1.1, y: 0.9, z: 0.7 },
  { lat: 8.528, lng: 76.935, x: 1.5, y: 1.2, z: 1.0 },
  { lat: 8.523, lng: 76.932, x: 2.1, y: 1.8, z: 1.6 },
  { lat: 8.529, lng: 76.934, x: 2.6, y: 2.2, z: 2.0 },
  { lat: 8.525, lng: 76.939, x: 3.0, y: 2.5, z: 2.4 },
  { lat: 8.522, lng: 76.936, x: 3.4, y: 3.0, z: 2.8 },
  { lat: 8.530, lng: 76.933, x: 4.0, y: 3.5, z: 3.2 },
  { lat: 8.521, lng: 76.937, x: 4.5, y: 4.0, z: 3.8 },
];

// Calculate score based on accelerometer
function calculateScore(x, y, z) {
  return Math.sqrt(x * x + y * y + z * z);
}

// Get color based on score
function getColor(score) {
  if (score < 1) return 'green';
  if (score < 2) return 'blue';
  if (score < 3.5) return 'orange';
  return 'red';
}

function displayDataPoints(points) {
    points.forEach(p => {
      if (typeof p.lat !== 'number' || typeof p.lng !== 'number') return; // Skip invalid
      const score = calculateScore(p.x, p.y, p.z);
      const color = getColor(score);
      L.circleMarker([p.lat, p.lng], {
        radius: 8,
        fillColor: color,
        color: '#000',
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8
      }).addTo(map);
    });
  }
  

// Simulate accelerometer values
function getSimulatedAccelerometer() {
  return {
    x: Math.random() * 5,
    y: Math.random() * 5,
    z: Math.random() * 5,
  };
}

// Collect sensor data
function collectSensorData() {
  navigator.geolocation.getCurrentPosition(position => {
    const coords = position.coords;
    const accel = getSimulatedAccelerometer();
    const point = {
      lat: coords.latitude,
      lng: coords.longitude,
      accuracy: coords.accuracy,
      ...accel
    };
    dataPoints.push(point);
    displayDataPoints([point]);
    localStorage.setItem('sensorData', JSON.stringify(dataPoints));
  });
}

// Start/Stop Collection
const startStopBtn = document.getElementById('startStopBtn');
let watchId = null;

startStopBtn.addEventListener('click', () => {
  collecting = !collecting;
  startStopBtn.textContent = collecting ? 'Stop Collection' : 'Start Collection';
  
  if (collecting) {
    watchId = navigator.geolocation.watchPosition(position => {
      const coords = position.coords;
      const accel = getSimulatedAccelerometer();
      const point = {
        lat: coords.latitude,
        lng: coords.longitude,
        accuracy: coords.accuracy,
        ...accel
      };
      dataPoints.push(point);
      displayDataPoints([point]);
      localStorage.setItem('sensorData', JSON.stringify(dataPoints));
    });
  } else {
    navigator.geolocation.clearWatch(watchId);
  }
});


// Download Database
document.getElementById('downloadBtn').addEventListener('click', () => {
  const blob = new Blob([JSON.stringify(dataPoints)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'sensor_data.json';
  a.click();
});

// Upload Database
document.getElementById('uploadInput').addEventListener('change', (event) => {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function (e) {
    const importedData = JSON.parse(e.target.result);
    dataPoints = dataPoints.concat(importedData);
    displayDataPoints(importedData);
    localStorage.setItem('sensorData', JSON.stringify(dataPoints));
  };
  reader.readAsText(file);
});

// Load Sample + Stored Data
window.onload = () => {
  displayDataPoints(sampleData);
  dataPoints = [...sampleData];
  const stored = localStorage.getItem('sensorData');
  if (stored) {
    const parsed = JSON.parse(stored);
    dataPoints = dataPoints.concat(parsed);
    displayDataPoints(parsed);
  }
};
