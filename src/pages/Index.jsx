import HeaderIndex from "../components/HeaderIndex.jsx";
import {Button, Divider, Link} from "@nextui-org/react";

function Index() {
    return (
        <>
            <HeaderIndex/>
            <Divider/>
            <Link color="primary" href="/home"><Button>Home</Button></Link>
        </>
    );
}

export default Index;