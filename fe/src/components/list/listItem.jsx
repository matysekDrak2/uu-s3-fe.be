import {InputGroup, Form, Button} from "react-bootstrap";
import {useContext} from "react";
import {ListContext} from "./listProvider.jsx";
import {DataContext} from "../providers/dataProvider.jsx";

function ListItem({id, archived}){
    const {setShoppingLists} = useContext(DataContext)
    const {items, boardId} = useContext(ListContext)
    const item = items.filter((item)=> item.id == id)[0]

    function setChecked(value){
        setShoppingLists((prev)=>{
            const editedList = prev.filter(item => item.id == boardId)[0]
            return [
                ...prev.filter(item => item.id != boardId),
                {
                    ...editedList,
                    tasks: [
                        ...editedList.tasks.filter(item => item.id != id),
                        {
                            ...editedList.tasks.filter(item=> item.id == id)[0],
                            checked: value
                        }
                    ]
                }
            ]
        })
    }
    function setText(value){
        setShoppingLists((prev)=>{
            const editedList = prev.filter(item => item.id == boardId)[0]
            return [
                ...prev.filter(item => item.id != boardId),
                {
                    ...editedList,
                    tasks: [
                        ...editedList.tasks.filter(item => item.id != id),
                        {
                            ...editedList.tasks.filter(item=> item.id == id)[0],
                            text: value
                        }
                    ]
                }
            ]
        })
    }
    function removeSelf(){
        setShoppingLists((prev)=>{
            const editedList = prev.filter(item => item.id == boardId)[0]
            return [
                ...prev.filter(item => item.id != boardId),
                {
                    ...editedList,
                    tasks: [
                        ...editedList.tasks.filter(item => item.id != id),
                    ]
                }
            ]
        })
    }

    return (
        <InputGroup className="mb-3" style={{alignSelf: "center"}}>
            <InputGroup.Checkbox style={{alignSelf: "center"}}
                                 disabled={archived}
                                 defaultChecked={item.checked}
                                 onChange={(e) => {
                                     setChecked(e.target.checked)
                                 }}

            />
            <Form.Control aria-label="Text input with checkbox"
                          disabled={archived}
                          defaultValue={item.text}
                          onChange={(e)=>{
                              setText(e.target.value)
                          }}/>
            <Button variant={"danger"} onClick={()=>{removeSelf()}}>X</Button>
        </InputGroup>
    )

}

export default ListItem;