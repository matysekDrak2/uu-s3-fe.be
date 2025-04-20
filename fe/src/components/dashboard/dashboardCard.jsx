import {Button, Form, InputGroup} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {useContext, useMemo} from "react";
import {DataContext} from "../providers/dataProvider.jsx";
import {ShoppingListContext} from "../providers/shoppingListProvider.jsx";

function DashboardCard({id, isOwner}){
    const navigate = useNavigate()
    const { shoppingLists } = useContext(DataContext)
    const {setName, setManagementOpened} = useContext(ShoppingListContext)

    const list = useMemo(()=>{
        return shoppingLists.filter(item => item.id === id)[0];
    }, [shoppingLists, id])

    return (
        <InputGroup style={{margin: "10px"}}>
            <Form.Control defaultValue={list.name} disabled={!isOwner}
                onChange={(e)=>{
                    setName(e.target.value)
                }}
            />
            {!list.archyved && <Button variant={"warning"} onClick={()=>{setManagementOpened((prev)=> !prev)}}>MNG</Button>}
            <Button variant={"success"} onClick={()=>{navigate('/list/'+id)}}>OPEN</Button>
        </InputGroup>
    )
}

export default DashboardCard;