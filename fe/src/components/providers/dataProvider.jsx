import {createContext, useContext, useEffect, useMemo, useState} from "react";
import PropTypes from "prop-types";
import {UserContext} from "../user/userProvider.jsx";
import {MockContext} from "./mockProvider.jsx";


export const DataContext = createContext({
    lists: {
        ok: false,
        data: [{
            id: "",
            owner: "",
            cooperators: ["","",""],
            name: "",
            archived: false
        }]
    },
    users: {
        ok: false,
        data: [{
            id: "",
            name: "",
            email: ""
        }]
    },
    updateList: (id, object) => {},
    addList: (name) => {},
    removeList: (id) => {},
    apiReq: (path, method, body) => {}
})

function DataProvider({children}){
    const {isMock, accessibleLists, updateListMock, createListMock, deleteListMock, usersMock} = useContext(MockContext)
    const {currentUser, session} = useContext(UserContext)

    const defData = useMemo(() => {
        return Array.from({ length: 8 }, (_, index) => ({
                id: `list-${index + 1}`,
                owner: `${currentUser.id}`,
                cooperators: [],
                name: ` List ${index + 1}`,
                archived: true
            }))
    }, [currentUser])

    const [lists, setLists] = useState([])
    async function reloadLists() {
        console.log("reloaging Data")
        if (isMock) {
            setLists(() => {return {ok: true, data: accessibleLists}})
            return
        }
        setLists({ok: false, data: []})

        const res = await apiReq('lists')

        setLists({ok: true, data: res})
    }
    useEffect(() => {
        reloadLists()
    }, [currentUser, accessibleLists, session, isMock])

    async function updateList(id, object) {
        if (isMock) {
            updateListMock(id, object)
            return
        }
        await apiReq('lists/' + id, "PUT", JSON.stringify(object))
        await reloadLists()
    }
    async function addList(name) {
        if (isMock) {
            createListMock(name)
            return
        }
        await apiReq('lists', "POST", JSON.stringify({"name": name }))
        await reloadLists()
    }
    async function removeList(id) {
        if (isMock) {
            deleteListMock(id, {archived: true})
            return
        }
        await apiReq('lists/' + id, "DELETE")
        await reloadLists()
    }


    const [users, setUsers] = useState({ok: false, data: []})
    async function reloadUsers() {
        if (isMock) {
            setUsers(() => {return {ok: true, data: usersMock}})
            return
        }
        setUsers({ok: false, data: []})

        const res = await apiReq('users')

        setUsers({ok: true, data: res})
    }
    useEffect(() => {
        reloadUsers()
    }, [isMock, usersMock])

    async function apiReq(path, method = "GET", body = null) {
        const headers = {
            "Session": session.sessionId
        }
        if (method !== "GET"){
            headers["Content-Type"] = "application/json"
        }
        const response = await fetch("http://localhost:8080/api/v1/" + path, {
            method: method,
            headers: headers,
            body: body
        })
        const content = response.headers.get("Content-Length") === "0" ? null : await response.json();
        if (!response.ok){
            console.log(response)
            console.log(content)
            throw new Error(content.error)
        }
        return content
    }

    const value = {
        lists,
        users,
        updateList,
        addList,
        removeList,
        apiReq
    }
    return (
        <DataContext.Provider value={value}>
            {JSON.stringify(lists)}
            {children}
        </DataContext.Provider>
    )
}

DataProvider.propTypes = {
    children: PropTypes.node.isRequired
};

export default DataProvider;