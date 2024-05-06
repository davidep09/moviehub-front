import {Card, CardBody, Link} from "@nextui-org/react";
import PropTypes from "prop-types";

function ListCard({list}) {
    return (
        <Card className="w-40 my-2" as={Link} href={`/list/${list.id}`}>
            <CardBody className="font-bold">
                {list.name}
            </CardBody>
        </Card>
    );
}

ListCard.propTypes = {
    list: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired
    }).isRequired
};

export default ListCard;