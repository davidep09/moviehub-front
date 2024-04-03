import {Input, Button, Spacer, Link, Divider} from '@nextui-org/react';
import {useEffect} from "react";
import {MailIcon} from "../components/icons/MailIcon.jsx";
import UsernameIcon from "../components/icons/UsernameIcon.jsx";

const Register = () => {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = "https://www.google.com/recaptcha/api.js";
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        }
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Lógica de registro de usuario
    };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 sm:h-screen overflow-hidden">
            <div className="bg-primary h-60 sm:h-full flex items-center justify-center">
                <div className="text-white text-center">
                    <h1 className="text-2xl">MovieHub</h1>
                    <h2>¡Únete a la comunidad!</h2>
                </div>
            </div>
            <div className="mx-auto sm:h-full w-[70%] mt-8 sm:my-16">
                <h2 className="text-2xl text-center">Registro</h2>
                <Spacer y={2}/>
                <RegisterForm onSubmit={handleSubmit}/>
                <Link href="/login" className="text-center block mt-4">¿Ya tienes cuenta?</Link>
            </div>
        </div>
    );
};

const RegisterForm = ({onSubmit}) => (
    <form onSubmit={onSubmit}>
        <h3 className="text-xl text-center">Datos personales</h3>
        <Divider/>
        <Spacer y={2}/>
        <Input type="text" label="Nombre" placeholder="Pedro" isRequired/>
        <Spacer y={2}/>
        <Input type="text" label="Apellidos" placeholder="González Rodríguez"/>
        <Spacer y={2}/>
        <Input type="date" label="Fecha de nacimiento" isRequired/>
        <Spacer y={2}/>
        <h3 className="text-xl text-center">Datos del usuario</h3>
        <Divider/>
        <Spacer y={2}/>
        <Input type="email" label="Correo electrónico" placeholder="pedro@ejemplo.com" startContent={<MailIcon/>}
               isRequired/>
        <Spacer y={2}/>
        <Input type="text" label="Nombre de usuario" placeholder="pedrogonrod" startContent={<UsernameIcon/>}
               isRequired/>
        <Spacer y={2}/>
        <Input type="password" placeholder="Escriba su contraseña" isRequired/>
        <Spacer y={3}/>
        <Input type="password" placeholder="Repita su contraseña" isRequired/>
        <Spacer y={3}/>
        <Button type="submit" color="primary">
            Registrarse
        </Button>
    </form>
);

export default Register;