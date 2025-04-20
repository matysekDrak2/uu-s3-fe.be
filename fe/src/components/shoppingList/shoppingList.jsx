import {Button, ButtonGroup, Col, Container, Row} from "react-bootstrap";
import ShoppingListProvider, {ShoppingListContext} from "../providers/shoppingListProvider.jsx";
import {useNavigate, useParams} from "react-router-dom";
import {useContext, useMemo, useState} from "react";
import ShoppingListItem from "./shoppingListItem.jsx";
import {UserContext} from "../providers/userProvider.jsx";

function ShoppingListInner() {
    const {items, name, addTask, setManagementOpened, archyved} = useContext(ShoppingListContext)

    const navigate = useNavigate()

    const [filter, setFilter] = useState("none")

    const shownItems = useMemo(()=>{
        switch (filter) {
            case "none":
                return items;
            case "notdone":
                return items.filter(item=> item.checked === false)
            case "done":
                return items.filter(item=> item.checked === true)
        }
    }, [filter, items])



    return (
        <Container fluid style={{margin: "25px 0px 25px 0px"}}>
            <ButtonGroup>
                <Button variant={"primary"} onClick={()=>{navigate('/')}}>HOME</Button>
                <Button variant={"warning"} onClick={()=>{setManagementOpened(true)}}>MANAGE</Button>
            </ButtonGroup>

            <Row className="justify-content-center" style={{marginBottom: "20px"}}>
                <ButtonGroup>
                    <Button variant={"secondary"} disabled={true} >{name}</Button>
                </ButtonGroup>
            </Row>
            <Row>
                <ButtonGroup style={{marginBottom: "15px"}}>
                    {filter === "none" && <Button onClick={()=>setFilter("done")}>All</Button>}
                    {filter === "done" && <Button onClick={()=>setFilter("notdone")}>Done</Button>}
                    {filter === "notdone" && <Button onClick={()=>setFilter("none")}>Not Done</Button>}
                </ButtonGroup>
            </Row>
            <Row className="justify-content-center" >
                <Col xs={11} sm={8} md={6}>
                    {shownItems.sort((a,b)=> a.id - b.id).map((item)=> {
                        return (
                            <ShoppingListItem key={item.id} id={item.id} archyved={archyved} />
                        )
                    })}
                </Col>
            </Row>
            <Row className="justify-content-center" >
                <Col xs={11} sm={8} md={6}>
                    <Button className="mb-3" variant={"success"} onClick={()=>addTask()}>+</Button>
                </Col>
            </Row>
            {JSON.stringify()}
        </Container>
    )
}

function ShoppingList(){
    const params = useParams()
    return (
        <ShoppingListProvider id={params.id}>
            <ShoppingListInner/>
        </ShoppingListProvider>
    )
}



export default ShoppingList;