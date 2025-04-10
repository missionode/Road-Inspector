# Road-Inspector
Road-Quality-Tracker: Early prototype for checking the quality of roads using in a contributory way everyone  user can install the app and travel and the app marks and update the quality of roads Color grades:  Green colored dot means the road is in Green: Low roughness. Blue: Medium roughness. Orange: High roughness. Red: Highest roughness

# 🛣️ Road Condition Mapper

An interactive web-based tool that uses simulated accelerometer data and real-time GPS location to map road conditions visually using Leaflet and heatmaps.

---

## 🚀 Features

- 🌍 Live Map Visualization using Leaflet.js
- 📍 Real-time GPS tracking
- 📊 Simulated accelerometer data (X, Y, Z axes)
- 🌡️ Heat-based road condition markers using `Leaflet.heat`
- 💾 Local data storage (via `localStorage`)
- ⬇️ Download sensor data as `.json`
- ⬆️ Upload previous data to visualize again

---

## 📦 Technologies Used

- `Leaflet.heat` plugin for heatmap visualization
- Browser's Geolocation API for live GPS
- Vanilla JavaScript for interactivity

---

## 🧠 How it Works

1. **Start Collection**:
   - Requests GPS permission once.
   - Starts collecting your location every few seconds.
   - Simulates accelerometer data (`x`, `y`, `z`).
   - Calculates a "road condition score" using `√(x² + y² + z²)`.

2. **Heatmap Rendering**:
   - The stronger the shake/vibration, the more intense the color.
   - Low values = green (smooth road), high values = red (rough road).

3. **Storage**:
   - All collected data is stored in browser `localStorage`.
   - You can download or re-upload data for future analysis.

---

## 📂 Project Structure

