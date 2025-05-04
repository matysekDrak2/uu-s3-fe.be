import {Alert, Button, ButtonGroup, Container, Row} from "react-bootstrap";
import ListProvider from "../list/listProvider.jsx";
import {useContext, useMemo, useState} from "react";
import {UserContext} from "../user/userProvider.jsx";
import {DataContext} from "../providers/dataProvider.jsx";
import DashboardCard from "./dashboardCard.jsx";

function Dashboard(){
    const {session} = useContext(UserContext)
    const {lists, addList} = useContext(DataContext)

    const [filter, setFilter] = useState(0)

    const shownOwnedLists = useMemo(() => {
        if (!lists.ok) return []
        const ownedLists = lists.data.filter(list => list.ownerId === session.userId);
        switch (filter) {
            case 0:
                return ownedLists;
            case 1:
                return ownedLists.filter(list => list.archived);
            default:
                return ownedLists.filter(list => !list.archived);
        }
    }, [lists, filter, session])
    const shownInvitedLists = useMemo(() => {
        if (!lists.ok) return []
        const invitedToLists = lists.data.filter(list => list.cooperators.includes(session.userId))
        switch (filter) {
            case 0:
                return invitedToLists;
            case 1:
                return invitedToLists.filter(list => list.archived);
            default:
                return invitedToLists.filter(list => !list.archived);
        }
    }, [lists, filter, session])

    return (
        <Container fluid style={{paddingLeft: "25px", paddingRight: "25px"}}>
            <Row>
                <Alert variant={"success"} className="d-flex justify-content-between align-items-center" style={{ zIndex: 1, position: "relative"}} > Owned
                    <ButtonGroup className="ms-auto" style={{ height: "40px", zIndex: 2 }}>
                        <Button variant={"primary"}
                                onClick={()=> {
                                    setFilter(prev => (prev + 1) % 3)
                                    console.log("Dashboard setting filter to: ", filter)
                                }}
                        >Filter: {
                            filter === 0 ? "All" : filter === 1 ? "Archived" : "Active"
                        }</Button>
                        <Button variant={"success"}
                                onClick={ () => addList("") }
                        >+</Button>
                    </ButtonGroup>
                </Alert>
            </Row>

            {/** Owned Lists*/}
            <Row className="justify-content-center">
                {shownOwnedLists.sort((a,b) => a.id-b.id).map(list=>{
                    return (
                        <ListProvider key={list.id} id={list.id}>
                            <DashboardCard id={list.id} isOwner={true} xs={4} sm={6} md={6} />
                        </ListProvider>
                    )
                })}
            </Row>


            <Alert style={{marginTop: "20px"}}> Invited to </Alert>
            {/** Invited to Lists*/}
            <Row className="justify-content-center">
                {shownInvitedLists.sort((a,b) => a.id-b.id).map((list)=>{
                    return (
                        <ListProvider key={list.id} id={list.id}>
                            <DashboardCard key={list.id} id={list.id} isOwner={false} xs={4} sm={6} md={6} />
                        </ListProvider>
                    )
                })}
            </Row>
        </Container>
    )
}



export default Dashboard;