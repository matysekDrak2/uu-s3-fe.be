import {Button, ButtonGroup, Card, Col, Form, FormControl, InputGroup, Row} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {useContext, useMemo, useState} from "react";
import {DataContext} from "../providers/dataProvider.jsx";
import {ShoppingListContext} from "../providers/shoppingListProvider.jsx";

function DashboardCard({id, isOwner}){
    const navigate = useNavigate()
    const { shoppingLists, users } = useContext(DataContext)
    const {leave, cooperators, ownerId, addCooperator, setName} = useContext(ShoppingListContext)

    const list = useMemo(()=>{
        return shoppingLists.filter(item => item.id === id)[0];
    }, [shoppingLists, id])


    const addedUsersIds = useMemo(()=>{
        return [...cooperators, ownerId]
    }, [ownerId, cooperators])

    const possibleUsersToAdd = useMemo(()=>{
        return users.filter(user => !addedUsersIds.includes(user.id))
    }, [users, addedUsersIds])

    const [managed, setManaged] = useState(false)
    const [adding, setAdding] = useState(false)

    const [selectedUserId, setSelectedUserId] = useState(null)

    return (
        <>
            <InputGroup style={{margin: "10px"}}>
                <Form.Control defaultValue={list.name} disabled={!isOwner}
                    onChange={(e)=>{
                        setName(e.target.value)
                    }}
                />
                {isOwner && <Button variant={"warning"} onClick={()=>{setManaged((prev)=> !prev)}}>MNG</Button>}
                {!isOwner && <Button variant={"danger"} onClick={()=>{leave()}}>LEAVE</Button>}
                <Button variant={"success"} onClick={()=>{navigate('/list/'+id)}}>OPEN</Button>
            </InputGroup>
            {managed && <>
                <ButtonGroup style={{marginBottom: "5px"}}>
                    {adding && <Button variant={"success"} onClick={()=>setAdding(prevState => !prevState)} >Add</Button>}
                    {!adding && <Button variant={"danger"} onClick={()=>setAdding(prevState => !prevState)}  >Remove</Button>}
                </ButtonGroup>
                {adding && <InputGroup >
                    <Form.Select onChange={(e)=>{
                        setSelectedUserId(e.target.value !== "None" ? e.target.value : null)
                    }}>
                        <option value={null}>None</option>
                        {possibleUsersToAdd.map(user=>{
                            return (
                                <option key={user.id} value={user.id}>{user.name}</option>
                            )
                        })}
                    </Form.Select>
                    <Button disabled={selectedUserId === null} enabled={selectedUserId !== null} onClick={()=> {
                        addCooperator(selectedUserId)
                        setSelectedUserId(null)
                    }} >Add</Button>
                </InputGroup>}
                {!adding && <InputGroup >
                    <Form.Select onChange={(e)=>{
                        setSelectedUserId(e.target.value !== "None" ? e.target.value : null)
                    }}>
                        <option value={null}>None</option>
                        {users.filter(user=> addedUsersIds.includes(user.id) && user.id !== ownerId).map(user=>{
                            return (
                                <option key={user.id} value={user.id}>{user.name}</option>
                            )
                        })}
                    </Form.Select>
                    <Button disabled={selectedUserId === null} enabled={selectedUserId !== null} onClick={()=> {
                        leave(selectedUserId)
                        setSelectedUserId(null)
                    }}>Remove</Button>
                </InputGroup>}
            </>}
        </>
    )
}

export default DashboardCard;