import {Alert, Button, ButtonGroup, Container, Row} from "react-bootstrap";
import ShoppingListProvider from "../providers/shoppingListProvider.jsx";
import {useContext, useMemo, useState} from "react";
import {UserContext} from "../providers/userProvider.jsx";
import {DataContext} from "../providers/dataProvider.jsx";
import DashboardCard from "./dashboardCard.jsx";

function Dashboard(){
    const {currentUser} = useContext(UserContext)
    const {shoppingLists, setShoppingLists} = useContext(DataContext)

    const ownedLists = shoppingLists.filter(list => list.owner === currentUser.id);
    const invitedToLists = shoppingLists.filter(list => list.cooperators.includes(currentUser.id))

    const [filter, setFilter] = useState(0)

    const shownOwnedLists = useMemo(() => {
        switch (filter) {
            case 0:
                return ownedLists;
            case 1:
                return ownedLists.filter(list => list.archyved);
            default:
                return ownedLists.filter(list => !list.archyved);
        }
    }, [ownedLists, filter])
    const shownInvitedLists = useMemo(() => {
        switch (filter) {
            case 0:
                return invitedToLists;
            case 1:
                return invitedToLists.filter(list => list.archyved);
            default:
                return invitedToLists.filter(list => !list.archyved);
        }
    }, [invitedToLists, filter])

    function addTaskList() {
        setShoppingLists((prev) =>{
            const nextId = Math.max(...prev.map(taskList => taskList.id)) + 1
            return [
                ...prev,
                {
                    id: nextId,
                    owner: currentUser.id,
                    cooperators: [],
                    name: "",
                    tasks: []
                }
            ]
        })
    }



    return (
        <Container fluid style={{paddingLeft: "25px", paddingRight: "25px"}}>
            <Row>
                <Alert variant={"success"} className="d-flex justify-content-between align-items-center" style={{ zIndex: 1, position: "relative"}} > Owned
                    <ButtonGroup className="ms-auto" style={{ height: "40px", zIndex: 2 }}>
                        <Button variant={"primary"}
                                onClick={()=> {
                                    setFilter(prev => (prev + 1) % 3)
                                    console.log(filter)
                                }}
                        >Filter: {
                            filter === 0 ? "All" : filter === 1 ? "Archived" : "Active"
                        }</Button>
                        <Button variant={"success"}
                                onClick={ () => addTaskList() }
                        >+</Button>
                    </ButtonGroup>
                </Alert>
            </Row>
            <Row className="justify-content-center">
                {shownOwnedLists.sort((a,b) => a.id-b.id).map(list=>{
                    return (
                        <ShoppingListProvider key={list.id} id={list.id}>
                            <DashboardCard id={list.id} isOwner={true} xs={4} sm={6} md={6} />
                        </ShoppingListProvider>
                    )
                })}
            </Row>


            <Alert style={{marginTop: "20px"}}> Invited to </Alert>
            <Row className="justify-content-center">
                {shownInvitedLists.sort((a,b) => a.id-b.id).map((list)=>{
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