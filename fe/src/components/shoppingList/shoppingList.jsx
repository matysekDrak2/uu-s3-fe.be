import {Button, ButtonGroup, Col, Container, Row} from "react-bootstrap";
import ShoppingListProvider, {ShoppingListContext} from "../providers/shoppingListProvider.jsx";
import {useNavigate, useParams} from "react-router-dom";
import {useContext, useMemo, useState} from "react";
import ShoppingListItem from "./shoppingListItem.jsx";
import {DataContext} from "../providers/dataProvider.jsx";
import {UserContext} from "../providers/user_provider.jsx";

function ShoppingListInner(){
    const {items, name, ownerId, leave, addTask} = useContext(ShoppingListContext)
    const {user} = useContext(UserContext)
    const navigate = useNavigate()


    const isOwner = user.id === ownerId

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
            <Row className="justify-content-center" style={{marginBottom: "20px"}}>
                <ButtonGroup>
                    <Button variant={"primary"} onClick={()=>{navigate('/')}}>HOME</Button>
                    <Button disabled={true} variant={"secondary"} >{name}</Button>
                    <Button variant={"danger"} disabled={isOwner} onClick={()=>{
                        leave()
                        navigate('/')
                    }}>Leave</Button>
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
                            <ShoppingListItem key={item.id} id={item.id} />
                        )
                    })}
                </Col>
            </Row>
            <Row className="justify-content-center" >
                <Col xs={11} sm={8} md={6}>
                    <Button className="mb-3" variant={"success"} onClick={()=>addTask()}>+</Button>
                </Col>
            </Row>
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