import {createContext, useContext, useMemo, useState} from "react";
import {Alert, Button, ButtonGroup, Card, CloseButton, Col, Row} from "react-bootstrap";
import {DataContext} from "./dataProvider.jsx";
import {UserContext} from "./userProvider.jsx";
import PropTypes from "prop-types";
import {useNavigate} from "react-router-dom";

function UserManagement(){
    const {users, setShoppingLists} = useContext(DataContext)
    const {cooperators, boardId} = useContext(ShoppingListContext)
    const {currentUser} = useContext(UserContext)

    const unassignedUsers = users.filter(user => !cooperators.includes(user.id) && user.id !== currentUser.id)
    const cooperatorUsers = users.filter(user => cooperators.includes(user.id))

    const [selectedBtn, setSelectedBtn] = useState( 0 )

    function leave(userId = currentUser.id){
        setShoppingLists((prev)=>{
            const editedList = prev.filter(item => item.id == boardId)[0]
            return [
                ...prev.filter(item => item.id != boardId),
                {
                    ...editedList,
                    cooperators: [
                        ...editedList.cooperators.filter(item => item != userId)
                    ]
                }
            ]
        })
    }
    function addCooperator(userId){
        setShoppingLists((prev)=>{
            const editedList = prev.filter(item => item.id == boardId)[0]
            return [
                ...prev.filter(item => item.id != boardId),
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

    return (
        <Card>
            <Card.Body>
                <Row>
                    <Col xs={5}>
                        {unassignedUsers.map(user=>{
                            return (<Button style={{width: "100%", marginTop: "5px"}}
                                            disabled={user.id === selectedBtn}
                                            onClick={ ()=>setSelectedBtn(user.id)}
                            >
                                {user.name}
                            </Button>)
                        })}
                    </Col>
                    <Col xs={2} style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                        <Button disabled={selectedBtn === 0}
                                onClick={ () => {
                                    if (cooperators.includes(selectedBtn)){
                                        leave(selectedBtn)
                                    } else {
                                        addCooperator(selectedBtn)
                                    }
                                }}
                        >
                            {cooperators.includes(selectedBtn) ? "<" : ">"}
                        </Button>
                    </Col>
                    <Col xs={5}>
                        {cooperatorUsers.map(user=>{
                            return (<Button style={{width: "100%", marginTop: "5px"}}
                                            disabled={user.id === selectedBtn}
                                            onClick={ ()=>setSelectedBtn(user.id)}
                            >
                                {user.name}
                            </Button>)
                        })}
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    )
}

function LeaveConfirmation(){
    const {setShoppingLists} = useContext(DataContext)
    const {currentUser} = useContext(UserContext)
    const {boardId} = useContext(ShoppingListContext)

    function leave(){
        setShoppingLists((prev)=>{
            const editedList = prev.filter(item => item.id == boardId)[0]
            return [
                ...prev.filter(item => item.id != boardId),
                {
                    ...editedList,
                    cooperators: [
                        ...editedList.cooperators.filter(item => item != currentUser.id)
                    ]
                }
            ]
        })
    }
    return (
        <>
            <Card.Body>
                Are you sure you want to leave this list?
            </Card.Body>
            <Card.Body>
                <Button variant={"danger"} style={{width: "100%"}} onClick={()=>{leave()}}>
                    Leave (cant be taken back)
                </Button>
            </Card.Body>
        </>
    )
}

function DeleteConfirmation({id}){
    const {setShoppingLists} = useContext(DataContext)
    function del() {
        setShoppingLists((prev)=>{
            return [
                ...prev.filter(item => item.id != id)
            ]
        })
    }
    const navigate = useNavigate()
    return (
        <>
            <Card.Body>
                Are you sure you want to leave DELETE list?
            </Card.Body>
            <Card.Body>
                <Button variant={"danger"} style={{width: "100%"}}
                        onClick={()=>{
                            del()
                            navigate('/')
                        }}>
                    DELETE (cant be taken back)
                </Button>
            </Card.Body>
        </>
    )
}

function ArchyvationConfirmation({id, close}){
    const {setShoppingLists} = useContext(DataContext)
    function archyve() {
        setShoppingLists((prev)=>{
            const edt = prev.filter(item => item.id == id)[0]
            return [
                ...prev.filter(item => item.id != id),
                {
                    ...edt,
                    archyved: true
                }
            ]
        })
    }
    const navigate = useNavigate()
    return (
        <>
            <Card.Body>
                Are you sure you want to leave Archyve list?
            </Card.Body>
            <Card.Body>
                <Button variant={"danger"} style={{width: "100%"}}
                        onClick={()=>{
                            archyve()
                            close()
                            navigate('/')
                        }}>
                    Archyve (cant be taken back)
                </Button>
            </Card.Body>
        </>
    )
}

function Management({shoppingListId, close}) {
    const {currentUser} = useContext(UserContext)
    const {shoppingLists} = useContext(DataContext)
    const [btnSelected, setBtnSelected] = useState(0)

    const curShoppingList = shoppingLists.filter(sl => sl.id == shoppingListId)[0]

    return (
        <Alert dismissible style={{position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 800, display: "flex", justifyContent: "center", alignItems: "center"}}>
            <Card style={{zIndex: 810}}>

                <Card.Header style={{paddingRight: "50px"}} >
                    Management of {shoppingListId}
                    <CloseButton style={{paddingTop: "5px"}}
                                 onClick={()=>{
                                    close()
                                 }}
                    />
                </Card.Header>
                <Card.Body>
                    <ButtonGroup style={{width: "100%"}}>
                        {currentUser.id == curShoppingList.owner &&
                            <Button disabled={btnSelected === 1}
                                    onClick={()=>setBtnSelected(1)}
                                    variant={"warning"}
                            >
                                Manage User
                            </Button>
                        }
                        <Button disabled={btnSelected === 2}
                                onClick={()=>setBtnSelected(2)}
                                variant={"danger"}
                        >{
                            currentUser.id === curShoppingList.owner ? "Delete" : "Leave"
                        }</Button>
                        {currentUser.id === curShoppingList.owner &&
                        <Button disabled={btnSelected === 3}
                                onClick={()=>setBtnSelected(3)}
                                variant={"danger"}>
                            Archyve
                        </Button>}
                    </ButtonGroup>
                </Card.Body>
                <Card.Body>
                    {btnSelected === 1 && <UserManagement/>}
                    {btnSelected === 2 && curShoppingList.owner !== currentUser.id && <LeaveConfirmation/>}
                    {btnSelected === 2 && curShoppingList.owner === currentUser.id && <DeleteConfirmation id={curShoppingList.id}/>}
                    {btnSelected === 3 && <ArchyvationConfirmation id={curShoppingList.id} close={()=>close()} />}
                </Card.Body>
            </Card>
        </Alert>
    )
}

export const ShoppingListContext = createContext({
    items: [0],
    name: "",
    boardId: 0,
    ownerId: 0,
    cooperators: [0],
    archyved: false,
    setName: (name) =>{return null},
    setManagementOpened: (state) => {return null},
    addTask: () => {return null}
})

function ShoppingListProvider({children, id}){
    const {shoppingLists, setShoppingLists} = useContext(DataContext)
    const {currentUser} = useContext(UserContext)

    const [list , err] = useMemo(()=>{
        if (!shoppingLists.map(item => item.id.toString()).includes(id.toString())) {
            console.log("Failed to load")
            return [new Array(), "Failed to load"]
        }
        const list = shoppingLists.filter(item=> item.id.toString() == id)[0]
        if (list.owner !== currentUser.id && !list.cooperators.includes(currentUser.id)){
            console.log("Access denied")
            return [new Array(), "Access denied"]
        }
        return [list, null]
    }, [shoppingLists, id, currentUser])


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
    function del() {
        setShoppingLists((prev)=>{
            return [
                ...prev.filter(item => item.id != id)
            ]
        })
    }

    const managementFunctions = {
        addTask:() => addTask(),
        setName: (name) => setName(name),
        del: () => del(),
    }

    const ownerId = list.owner
    const [managementOpened , setManagementOpened] = useState(false)
    const value = {
        items: list.tasks,
        name: list.name,
        boardId: id,
        ownerId: ownerId,
        cooperators: list.cooperators,
        archyved: list.archyved,
        setName: (name) => setName(name),
        setManagementOpened: (state) => setManagementOpened(state),
        addTask: () => addTask()
    }
    return (
        <ShoppingListContext.Provider value={value}>
            { managementOpened && <Management shoppingListId={id} close={()=>{setManagementOpened(false)}}/>}
            { err === null && children}
            { err !== null && <Alert key={'danger'} variant={'danger'}>UNABLE TO LOAD DATA FROM LIST WITH ID {id}</Alert>}
        </ShoppingListContext.Provider>
    )
}

ShoppingListProvider.propTypes = {
    children: PropTypes.node.isRequired,
    id: PropTypes.number.isRequired
};

export default ShoppingListProvider;