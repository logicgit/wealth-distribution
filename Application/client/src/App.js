import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom"

import Home from "./pages/Home"
import Debug from "./pages/Debug"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/debug" element={<Debug/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
