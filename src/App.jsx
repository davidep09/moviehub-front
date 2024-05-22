import {NextUIProvider, Spinner} from "@nextui-org/react";
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
import useAuth from "./assets/useAuth.jsx";
import {useAuth0} from "@auth0/auth0-react";

function App() {
    const navigate = useNavigate();
    const {isUserLoaded} = useAuth();
    const {isLoading} = useAuth0();

    if (!isUserLoaded && isLoading && window.location.pathname !== "/") {
        return <Spinner size="large" label="Cargando.." className="m-auto"/>;
    }

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
