import {NextUIProvider} from "@nextui-org/react";
import {Routes, Route, useNavigate} from 'react-router-dom';
import Index from './pages/Index.jsx';
import Home from './pages/Home';
import Trends from './pages/Trends';
import Movie from "./pages/Movie.jsx";
import Serie from "./pages/Serie.jsx";
import Profile from "./pages/Profile.jsx";
import Search from "./pages/Search.jsx";
import Finder from "./pages/Finder.jsx";
import Lists from "./pages/Lists.jsx";
import List from "./pages/List.jsx";

function App() {
    const navigate = useNavigate();
    return (
        <NextUIProvider navigate={navigate}>
            <Routes>
                <Route path="/" element={<Index/>}/>
                <Route path="/home" element={<Home/>}/>
                <Route path="/profile" element={<Profile/>}/>
                <Route path="/trends" element={<Trends/>}/>
                <Route path="/movie/:id" element={<Movie/>}/>
                <Route path="/serie/:id" element={<Serie/>}/>
                <Route path="/search/" element={<Search/>}/>
                <Route path="/finder" element={<Finder/>}/>
                <Route path="/lists" element={<Lists/>}/>
                <Route path="/list/:id" element={<List/>}/>
            </Routes>
        </NextUIProvider>

    );
}

export default App;
