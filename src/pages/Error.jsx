import {Button} from "@nextui-org/react";
import {useNavigate} from "react-router-dom";

function Error() {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-4xl font-logo text-center">Movie<span className="text-primary">Hub</span></h1>
            <h1 className="text-4xl font-bold text-center">404</h1>
            <p className="text-center">La página que buscas no existe</p>
            <Button size="sm" color="primary" className="mt-4" onPress={() => navigate("/")}>Volver al inicio</Button>
        </div>
    );
}

export default Error;