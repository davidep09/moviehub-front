import {NextUIProvider} from "@nextui-org/react";
import {Routes, Route, useNavigate} from 'react-router-dom';
import Index from './pages/Index.jsx';
import Home from './pages/Home';
import Trends from './pages/Trends';
import Movie from "./pages/Movie.jsx";
import Serie from "./pages/Serie.jsx";

function App() {
    const navigate = useNavigate();
    return (
        <NextUIProvider navigate={navigate}>
            <Routes>
                <Route path="/" element={<Index/>}/>
                <Route path="/home" element={<Home/>}/>
                <Route path="/trends" element={<Trends/>}/>
                <Route path="/movie/:id" element={<Movie/>}/>
                <Route path="/serie/:id" element={<Serie/>}/>
            </Routes>
        </NextUIProvider>

    );
}

export default App;
