import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import "./App.css";
import Home from "./components/Home";
import Graph from "./components/Graph";
import RouteCalculator from "./components/RouteCalculator";
import DriverPage from "./components/DriverPage";
import ScheduleRide from "./components/ScheduleRide";

function App() {
  return (
    <div className="App">
      <div>
        <Navigation />

        <Router>
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/Graph" element={<Graph />} />

            <Route path="/RouteCalculator" element={<RouteCalculator />} />
            <Route path="/DriverPage" element={<DriverPage />} />

            <Route path="/ScheduleRide" element={<ScheduleRide />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
