import React from "react"; // Asegúrate de que la ruta al archivo del logo es correcta

export default function Footer() {
    return (
        <footer className="bg-gray-800 text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div>
                    <h1 className="font-logo text-4xl">Movie<span className="text-primary">Hub</span></h1>
                    <p className="text-sm">Tu lugar para encontrar información sobre tus películas y series
                        favoritas</p>
                </div>
            </div>
        </footer>
    );
}