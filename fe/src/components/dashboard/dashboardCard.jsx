import {Button, Form, InputGroup} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {useContext, useMemo} from "react";
import {DataContext} from "../providers/dataProvider.jsx";
import {ListContext} from "../list/listProvider.jsx";

function DashboardCard({id, isOwner}){
    const navigate = useNavigate()
    const { lists } = useContext(DataContext)
    const {setName, setManagementOpened} = useContext(ListContext)

    const list = useMemo(()=>{
        if (!lists.ok) return {}
        return lists.data.filter(item => item.id === id)[0];
    }, [lists, id])

    return (
        <InputGroup style={{margin: "10px"}}>
            <Form.Control defaultValue={list.name} disabled={!isOwner}
                onChange={(e)=>{
                    setName(e.target.value)
                }}
            />
            {!list.archived && <Button variant={"warning"} onClick={()=>{setManagementOpened((prev)=> !prev)}}>MNG</Button>}
            <Button variant={"success"} onClick={()=>{navigate('/list/'+id)}}>OPEN</Button>
        </InputGroup>
    )
}

export default DashboardCard;