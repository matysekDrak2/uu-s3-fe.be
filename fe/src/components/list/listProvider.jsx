import {createContext, useContext, useEffect, useMemo, useState} from "react";
import {Alert, Button, ButtonGroup, Card, CloseButton, Col, Row} from "react-bootstrap";
import {DataContext} from "../providers/dataProvider.jsx";
import {UserContext} from "../user/userProvider.jsx";
import PropTypes, {func} from "prop-types";
import {useNavigate} from "react-router-dom";
import {MockContext} from "../providers/mockProvider.jsx";

function UserManagement(){
    const {users} = useContext(DataContext)
    const {cooperators, boardId, functions} = useContext(ListContext)
    const {session} = useContext(UserContext)

    const unassignedUsers = useMemo(()=>{
        if (!users.ok) return []
        return users.data.filter(user => !cooperators.includes(user.id) && user.id !== session.userId)
    }, [users, session, cooperators])
    const cooperatorUsers = useMemo(()=>{
        if (!users.ok) return []
        return users.data.filter(user => cooperators.includes(user.id))
    }, [users, cooperators])

    const [selectedBtn, setSelectedBtn] = useState( "" )
    useEffect(()=>{
        console.log("ListProvider - UserManagement selected user: ", selectedBtn)
    })
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
                        <Button disabled={selectedBtn === ""}
                                onClick={ () => {
                                    if (cooperators.includes(selectedBtn)){
                                        functions.leaveList(boardId, selectedBtn)
                                    } else {
                                        functions.addCooperator(boardId, selectedBtn)
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
                    archived: true
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

function Management({close}) {
    const {session} = useContext(UserContext)
    const {name, ownerId, boardId} = useContext(ListContext)
    const [btnSelected, setBtnSelected] = useState(0)

    return (
        <Alert dismissible style={{position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 800, display: "flex", justifyContent: "center", alignItems: "center"}}>
            <Card style={{zIndex: 810}}>
                <Card.Header style={{paddingRight: "50px"}} >
                    Management of {name}
                    <CloseButton style={{paddingTop: "5px"}}
                                 onClick={()=>{
                                    close()
                                 }}
                    />
                </Card.Header>
                <Card.Body>
                    <ButtonGroup style={{width: "100%"}}>
                        {session.userId === ownerId &&
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
                            session.userId === ownerId ? "Delete" : "Leave"
                        }</Button>
                        {session.userId === ownerId &&
                        <Button disabled={btnSelected === 3}
                                onClick={()=>setBtnSelected(3)}
                                variant={"danger"}>
                            Archyve
                        </Button>}
                    </ButtonGroup>
                </Card.Body>
                <Card.Body>
                    {btnSelected === 1 && <UserManagement/>}
                    {btnSelected === 2 && ownerId !== session.userId && <LeaveConfirmation/>}
                    {btnSelected === 2 && ownerId === session.userId && <DeleteConfirmation id={boardId}/>}
                    {btnSelected === 3 && <ArchyvationConfirmation id={boardId} close={()=>close()} />}
                </Card.Body>
            </Card>
        </Alert>
    )
}

export const ListContext = createContext({
    items: [""],
    name: "",
    boardId: "",
    ownerId: "",
    cooperators: [""],
    archived: false,
    functions: {
        leaveList: async (listId, userId) => {},
        addCooperator: async (listId, userId) => {},
    },
    setManagementOpened: () => {}
})

function ListProvider({children, id}) {
    const {isMock, createTaskMock, updateListMock, deleteListMock, leaveListMock} = useContext(MockContext)
    const {lists, apiReq} = useContext(DataContext)
    const {session} = useContext(UserContext)

    const [list , err] = useMemo(()=>{
        if (!lists.ok) return [[], "Dataprovider had not provided correct data yet"]
        if (!lists.data.map(item => item.id).includes(id)) {
            console.log("Failed to load")
            return [new Array(), "Failed to load"]
        }
        const list = lists.data.find(item => item.id === id)
        if (list.ownerId !== session.userId && !list.cooperators.includes(session.userId)){
            console.log("Access denied")
            return [new Array(), "Access denied"]
        }
        return [list, null]
    }, [lists, id, session])

    const [itemList, setItemList] = useState({})
    async function reloadList() {
        if (isMock) {
            setItemList(list)
            return
        }
        console.log("sending req to "+ "listItems/" + id)
        const res = await apiReq('listItems/' + id)
        setItemList(res)
    }
    useEffect(()=>{
        reloadList()
    }, [isMock, session, list])

    function addTask() {
        if (isMock) {
            createTaskMock(id, "")
            return
        }
    }
    function setName(name) {
        if (isMock) {
            updateListMock(id, name)
            return
        }
    }
    function del() {
        if (isMock) {
            deleteListMock(id)
            return
        }
    }
    console.log("List " + id.toString() + " loaded: ", list)

    const managementFunctions = {
        addTask: () => addTask(),
        setName: (name) => setName(name),
        del: () => del()
    }

    const functions ={
        leaveList: async (listId, userId = session.userId) => {
            if (isMock) {
                leaveListMock(listId, userId)
                return
            }
            await apiReq('lists/' + listId, "PUT", JSON.stringify({cooperators: [...list.cooperators.filter(item=> item !== userId)]}))
        },
        addCooperator: async (listId, userId) => {
            if (isMock) {
                leaveListMock(listId, userId)
                return
            }
            await apiReq('lists/' + listId, "PUT", JSON.stringify({cooperators: [...list.cooperators, userId]}))
            await reloadList()
        }
    }

    const ownerId = list.ownerId
    const [managementOpened , setManagementOpened] = useState(false)
    const value = {
        items: list.tasks,
        name: list.name,
        boardId: id,
        ownerId: ownerId,
        cooperators: list.cooperators,
        archived: list.archived,
        functions,
        setManagementOpened
    }
    return (
        <ListContext.Provider value={value}>
            { managementOpened && <Management listId={id} close={()=>{setManagementOpened(false)}}/>}
            { err === null && children}
            { err !== null && <Alert key={'danger'} variant={'danger'}>UNABLE TO LOAD DATA FROM LIST WITH ID {id}</Alert>}

        </ListContext.Provider>
    )
}

ListProvider.propTypes = {
    children: PropTypes.node.isRequired,
    id: PropTypes.string.isRequired
};

export default ListProvider;