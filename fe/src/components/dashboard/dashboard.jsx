import {Alert, Col, Container, Row} from "react-bootstrap";
import ShoppingListProvider, {ShoppingListContext} from "../providers/shoppingListProvider.jsx";
import {useContext} from "react";
import {UserContext} from "../providers/user_provider.jsx";
import {DataContext} from "../providers/dataProvider.jsx";
import DashboardCard from "./dashboardCard.jsx";

function Dashboard(){
    const {user} = useContext(UserContext)
    const {shoppingLists} = useContext(DataContext)

    const ownedLists = shoppingLists.filter(list => list.owner === user.id);
    const invitedToLists = shoppingLists.filter(list => list.cooperators.includes(user.id))

    return (
        <Container fluid style={{paddingLeft: "25px", paddingRight: "25px"}}>
            <Alert variant={"success"}> Owned </Alert>
            <Row className="justify-content-center">
                {ownedLists.sort((a,b) => a.id-b.id).map(list=>{
                    return (
                        <ShoppingListProvider key={list.id} id={list.id}>
                            <DashboardCard id={list.id} isOwner={true} xs={4} sm={6} md={6} />
                        </ShoppingListProvider>
                    )
                })}
            </Row>
            <Alert style={{marginTop: "20px"}}> Invited to </Alert>
            <Row className="justify-content-center">
                {invitedToLists.sort((a,b) => a.id-b.id).map((list)=>{
                    return (
                        <ShoppingListProvider key={list.id} id={list.id}>
                            <DashboardCard key={list.id} id={list.id} isOwner={false} xs={4} sm={6} md={6} />
                        </ShoppingListProvider>
                    )
                })}
            </Row>
        </Container>
    )
}



export default Dashboard;