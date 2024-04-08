import {
    Accordion,
    AccordionItem,
    Card,
    Image,
    Textarea,
    Button
} from "@nextui-org/react";

// eslint-disable-next-line react/prop-types
export default function SerieSeasons({seasons}) {
    return (
        <div className="sm:w-[90%] mx-auto flex flex-col items-center justify-center sm:items-start">
            <h1 className="text-2xl font-bold text-center mt-2">Temporadas</h1>
            <Accordion variant="light" className="shadow-none">
                {/* eslint-disable-next-line react/prop-types */}
                {seasons && seasons.map((season, index) => (
                    <AccordionItem key={index} title={season.name} className="shadow-none">
                        <Card className="flex flex-col sm:flex-row p-3 shadow-none items-center sm:items-start">
                            <div className="w-64 h-64 flex items-center justify-center">
                                <Image src={season.poster_path} className="h-64 object-cover"/>
                            </div>
                            <div className="w-[80%] sm:flex sm:flex-col items-center sm:items-start">
                                <p className="text-center">Episodios: {season.episode_count}</p>
                                <p className="text-center">Fecha de estreno: {season.air_date}</p>
                                <Textarea className="mt-2" isReadOnly value={season.overview}/>
                                <div className="flex justify-center w-full">
                                    <Button className="mt-2 w-1/2" auto>Ver episodios</Button>
                                </div>
                            </div>
                        </Card>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    );
}