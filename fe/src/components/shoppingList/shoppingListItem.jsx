import {InputGroup, Form, Button} from "react-bootstrap";
import {useContext} from "react";
import {ShoppingListContext} from "../providers/shoppingListProvider.jsx";
import {DataContext} from "../providers/dataProvider.jsx";

function ShoppingListItem({id, archyved}){
    const {setShoppingLists} = useContext(DataContext)
    const {items, boardId} = useContext(ShoppingListContext)
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
                                 disabled={archyved}
                                 defaultChecked={item.checked}
                                 onChange={(e) => {
                                     setChecked(e.target.checked)
                                 }}

            />
            <Form.Control aria-label="Text input with checkbox"
                          disabled={archyved}
                          defaultValue={item.text}
                          onChange={(e)=>{
                              setText(e.target.value)
                          }}/>
            <Button variant={"danger"} onClick={()=>{removeSelf()}}>X</Button>
        </InputGroup>
    )

}

export default ShoppingListItem;