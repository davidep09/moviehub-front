import React from 'react';
import {Input, Button, Image} from '@nextui-org/react';

export default function FormProfile({usuario}) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-primary-50">
            <h1 className="text-2xl mb-4">Perfil</h1>
            <Image src="https://via.placeholder.com/250" alt="Foto de perfil" radius="full" className="mb-8 max-w-40"/>
            <form className="w-full max-w-sm">
                <Input id="name" name="name" label="Nombre" defaultValue="Pedro"
                       className="mb-4"/>
                <Input id="lastName" name="lastName" label="Apellidos" defaultValue="Pérez González"
                       className="mb-4"/>
                <Input id="email" name="email" label="Email" defaultValue="pedro@gmail.com"
                       className="mb-4"/>
                <Input id="username" name="username" label="Nombre de usuario" defaultValue="pedro123"
                       className="mb-4"/>
                <Button type="button" color="primary" variant="flat" className="font-semibold mt-2">Guardar
                    cambios</Button>
            </form>
        </div>
    );
}