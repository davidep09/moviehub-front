import {Input, Button, Image} from '@nextui-org/react';
import PropTypes from "prop-types";

function FormProfile({usuario}) {

    return (
        usuario && <div className="flex flex-col items-center justify-center min-h-screen bg-primary-50">
            <h1 className="text-2xl mb-4">Perfil</h1>
            <Image src={usuario.picture ? usuario.picture : ""} alt="Foto de perfil" radius="full"
                   className="mb-8 max-w-40"/>
            <form className="w-full max-w-sm">
                <Input id="name" name="name" label="Nombre"
                       defaultValue={usuario.given_name ? usuario.given_name : usuario.name}
                       className="mb-4"/>
                <Input id="lastName" name="lastName" label="Apellidos"
                       defaultValue={usuario.family_name ? usuario.family_name : ""}
                       className="mb-4"/>
                <Input id="email" name="email" label="Email" defaultValue={usuario.email}
                       className="mb-4"/>
                <Input id="username" name="username" label="Nombre de usuario" defaultValue={usuario.nickname}
                       className="mb-4"/>
                <Button type="button" color="primary" variant="flat" className="font-semibold mt-2">Guardar
                    cambios</Button>
            </form>
        </div>
    );
}

FormProfile.propTypes = {
    usuario: PropTypes.shape({
        picture: PropTypes.string,
        given_name: PropTypes.string,
        name: PropTypes.string,
        family_name: PropTypes.string,
        email: PropTypes.string,
        nickname: PropTypes.string
    })
}

export default FormProfile;