import HeaderIndex from "../components/HeaderIndex.jsx";
import {Button, Divider, Link} from "@nextui-org/react";

function Index() {
    return (
        <>
            <HeaderIndex/>
            <Divider/>
            <Button color="primary" variant="flat" as={Link} href="/home"
                    className="flex justify-center content-center">Home</Button>
        </>
    );
}

export default Index;