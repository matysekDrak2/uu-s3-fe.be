import {createContext, useContext, useEffect, useState} from "react";
import PropTypes from "prop-types";
import {MockContext} from "../providers/mockProvider.jsx";
import LoginForm from "./loginForm.jsx";
import {Col, Row} from "react-bootstrap";
import RegistrationForm from "./registrationForm.jsx";

export const UserContext = createContext({
    currentUser: {
        id: "",
        name: "",
        email: "",
        password: ""
    },
    session: {
        id: "",
        userId: "",
        createdAt: ""
    }
})

function UserProvider({children}){
    const {isMock, currentUserMock} = useContext(MockContext)

    const [currentUser, setCurrentUser] = useState(
        isMock ? currentUserMock : {}
    )
    const [session, setSession] = useState({})

    useEffect(()=>{
        console.log("UserProvider User updated to: ", currentUser)
    }, [currentUser])

    useEffect(()=>{
        if(isMock){
            console.log("UserProvider setting user to mock")
            setCurrentUser(currentUserMock)
        } else {
            console.log("UserProvider setting user to null")
            setCurrentUser(null)
        }
    }, [isMock, currentUserMock])


    const value = {
        currentUser,
        session
    }
    return (
        <UserContext.Provider value={value}>
            {currentUser && JSON.stringify(currentUser)}
            {session && JSON.stringify(session)}
            <p/>
            {!isMock && !currentUser && <Row>
                <Col>
                    <LoginForm setUser={setCurrentUser} setSession={setSession}/>
                </Col>
                <Col>
                    <RegistrationForm setUser={setCurrentUser} setSession={setSession}/>
                </Col>
            </Row>}
            {currentUser && children}
        </UserContext.Provider>
    )
}

UserProvider.propTypes = {
    children: PropTypes.node.isRequired
};

export default UserProvider;