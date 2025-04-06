import {createContext, useContext, useMemo} from "react";
import {Alert} from "react-bootstrap";
import {DataContext} from "./dataProvider.jsx";
import {UserContext} from "./user_provider.jsx";

export const ShoppingListContext = createContext(null)

function ShoppingListProvider({children, id}){
    const {shoppingLists, setShoppingLists} = useContext(DataContext)
    const {user} = useContext(UserContext)

    const [list , err] = useMemo(()=>{
        if (!shoppingLists.map(item => item.id.toString()).includes(id.toString())) {
            console.log("Failed to load")
            return [new Array(), "Failed to load"]
        }
        const list = shoppingLists.filter(item=> item.id.toString() == id)[0]
        if (list.owner !== user.id && !list.cooperators.includes(user.id)){
            console.log("Access denied")
            return [new Array(), "Access denied"]
        }
        return [list, null]
    }, [shoppingLists, id, user])


    function leave(userId = user.id){
        setShoppingLists((prev)=>{
            console.log("data leaving "+ userId)
            const editedList = prev.filter(item => item.id == id)[0]
            return [
                ...prev.filter(item => item.id != id),
                {
                    ...editedList,
                    cooperators: [
                        ...editedList.cooperators.filter(item => item != userId)
                    ]
                }
            ]
        })
    }
    function addTask(){
        setShoppingLists((prev)=>{
            const editedList = prev.filter(item => item.id == id)[0]
            const newId = Math.max(Math.max(...editedList.tasks.map(item=>item.id)), -1) + 1
            console.log(newId)
            return [
                ...prev.filter(item => item.id != id),
                {
                    ...editedList,
                    tasks: [
                        ...editedList.tasks,
                        {id: newId, text: "", checked: false}
                    ]
                }
            ]
        })
    }
    function addCooperator(userId){
        setShoppingLists((prev)=>{
            const editedList = prev.filter(item => item.id == id)[0]
            return [
                ...prev.filter(item => item.id != id),
                {
                    ...editedList,
                    cooperators: [
                        ...editedList.cooperators,
                        Number(userId)
                    ]
                }
            ]
        })
    }
    function setName(name){
        setShoppingLists((prev)=>{
            const editedList = prev.filter(item => item.id == id)[0]
            const newId = Math.max(Math.max(...editedList.tasks.map(item=>item.id)), -1) + 1
            console.log(newId)
            return [
                ...prev.filter(item => item.id != id),
                {
                    ...editedList,
                    name: name
                }
            ]
        })
    }

    const ownerId = list.owner
    const value = {
        items: list.tasks,
        name: list.name,
        boardId: id,
        ownerId: ownerId,
        cooperators: list.cooperators,
        leave:  (userId) => leave(userId),
        addCooperator:  (userId) => addCooperator(userId),
        addTask:() => addTask(),
        setName: (name) => setName(name)
    }
    return (
        <ShoppingListContext.Provider value={value}>
            { err === null && children}
            { err !== null && <Alert key={'danger'} variant={'danger'}>UNABLE TO LOAD DATA FROM LIST WITH ID {id}</Alert>}
        </ShoppingListContext.Provider>
    )
}

export default ShoppingListProvider;