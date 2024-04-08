import React, {useState} from "react";
import {
    Accordion,
    AccordionItem,
    Card,
    Image,
    Textarea,
    Modal,
    ModalHeader,
    ModalContent,
    Button, useDisclosure
} from "@nextui-org/react";

export default function SerieSeasons({seasons}) {
    return (
        <div className="sm:w-[90%] mx-auto">
            <h1 className="text-2xl font-bold text-center mt-2">Temporadas</h1>
            <Accordion variant="light" className="shadow-none">
                {seasons && seasons.map((season, index) => (
                    <AccordionItem key={index} title={season.name} className="shadow-none">
                        <Card className="flex flex-row p-3 shadow-none">
                            <div className="w-64 h-64">
                                <Image src={season.poster_path} className="h-64 object-cover"/>
                            </div>
                            <div className="w-[80%]">
                                <p className="mt-4 ml-2">Episodios: {season.episode_count}</p>
                                <p className="ml-2">Fecha de estreno: {season.air_date}</p>
                                <Textarea className="mt-2" isReadOnly value={season.overview}/>
                            </div>
                        </Card>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    );
}