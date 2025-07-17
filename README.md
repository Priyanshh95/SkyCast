# SkyCast Weather App

SkyCast is a modern, responsive web application that fetches and displays real-time weather data for any city using the OpenWeatherMap API. It features a clean UI, extra weather details, and geolocation support.

## Features
- Search weather by city name
- Display temperature, weather description, humidity, wind speed, min/max/feels-like temperature
- Show current date and time
- Fetch weather for your current location (geolocation)
- Display state/region (if available)
- Responsive and visually appealing design

## Tech Stack
- **Frontend:** React, Vite
- **Styling:** CSS (Flexbox, responsive design)
- **API:** OpenWeatherMap (Current Weather & Geocoding APIs)

## Getting Started

### Prerequisites
- Node.js (v16 or higher recommended)
- npm

### Setup & Run
1. **Clone the repository:**
   ```sh
   git clone https://github.com/your-username/skycast.git
   cd skycast
   ```
2. **Install dependencies:**
   ```sh
   npm install
   ```
3. **Start the development server:**
   ```sh
   npm run dev
   ```
4. **Open your browser:**
   Visit [http://localhost:5173](http://localhost:5173)

### API Key
- The app uses a public OpenWeatherMap API key (for demo/learning purposes). You can replace it in `src/App.jsx` with your own key for production use.

## License
This project is for educational/demo purposes. Feel free to use and modify it!
