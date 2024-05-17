import PropTypes from "prop-types";
import {Button, Modal, Textarea, ModalContent, ModalHeader, ModalBody} from "@nextui-org/react";
import PlusIcon from "./icons/PlusIcon.jsx";
import {useEffect, useState} from "react";
import {useAuth0} from "@auth0/auth0-react";

function SerieComments({datosSerie}) {
    const {user} = useAuth0();
    const [isOpen, setIsOpen] = useState(false);

    const [comments, setComments] = useState(datosSerie.comments);
    const fetchCommentsData = () => {
        const requestOptions = {
            method: "GET",
            redirect: "follow"
        };

        fetch(`https://moviehub-back.onrender.com:8080/comments/tv/${datosSerie.id}`, requestOptions)
            .then(response => response.json()
                .then(data => setComments(data))
                .catch(error => console.error(error)));
    };

    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);

    const handleCommentSubmit = (evt) => {
        evt.preventDefault();
        const usuario = user.sub.replace("|", "-");

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "userId": usuario,
            "movieId": datosSerie.id,
            "type": "tv",
            "comment": evt.target[0].value
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        fetch("https://moviehub-back.onrender.com:8080/comments", requestOptions)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.text();
            })
            .then(() => {
                setIsOpen(false);
                fetchCommentsData();
            })
            .catch((error) => console.error('Error:', error));
    };

    useEffect(() => {
        fetchCommentsData();
    }, []);

    return (
        <div>
            <h2 className="text-2xl font-bold text-center my-4">Comentarios</h2>
            <div className="flex justify-center items-center">
                <Button className="mx-auto justify-center" isIconOnly onClick={handleOpen}>
                    <PlusIcon/>
                </Button>
            </div>
            {comments && comments.length > 0 ? (
                <div className="grid grid-cols-4 gap-4 items-stretch mx-2">
                    {comments.map((comment, index) => (
                        <Textarea key={index} className="m-4 w-full h-full"
                                  value={comment.comment}>
                        </Textarea>
                    ))}
                </div>
            ) : (
                <p className="text-center my-4">Sé el primero en comentar.</p>
            )}
            <Modal size={'lg'} isOpen={isOpen} onClose={handleClose}>
                <ModalContent>
                    <ModalHeader className="flex flex-col gap-1">Añadir un comentario</ModalHeader>
                    <ModalBody>
                        <form onSubmit={handleCommentSubmit}>
                            <Textarea
                                placeholder="Escribe tu comentario"/>
                            <Button className="my-2" type="submit" color="primary" variant="flat">Enviar</Button>
                        </form>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </div>
    );
}

SerieComments.propTypes = {
    datosSerie: PropTypes.object.isRequired
};

export default SerieComments;