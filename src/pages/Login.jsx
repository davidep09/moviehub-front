import {Input, Button, Spacer, Link} from '@nextui-org/react';
import {useAuth0} from '@auth0/auth0-react';

const Login = () => {
    const {loginWithRedirect} = useAuth0();
    const handleSubmit = () => {
        loginWithRedirect().then(r => console.log(r)).catch(e => console.error(e));
    };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 sm:h-screen overflow-hidden">
            <div className="bg-primary h-60 sm:h-full flex items-center justify-center">
                <div className="text-white text-center">
                    <h1 className="text-2xl">MovieHub</h1>
                    <p>¡Bienvenido de nuevo!</p>
                </div>
            </div>
            <div className="mx-auto sm:h-full w-[70%] mt-8 sm:my-80">
                <h2 className="text-2xl text-center">Iniciar sesión</h2>
                <Spacer y={2}/>
                <LoginForm onSubmit={handleSubmit}/>
                <Link href="/register" className="text-center block mt-4">Registrarse</Link>
            </div>
        </div>
    );
};

const LoginForm = ({onSubmit}) => (
    <form onSubmit={onSubmit}>
        <Input type="email" placeholder="Correo electrónico o nombre de usuario"/>
        <Spacer y={2}/>
        <Input type="password" placeholder="Contraseña"/>
        <Spacer y={3}/>
        <Button type="submit" color="primary">
            Iniciar sesión
        </Button>
    </form>
);

export default Login;