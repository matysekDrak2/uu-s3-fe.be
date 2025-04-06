import {createContext, useContext, useState} from "react";
import {Col, Container, Form, FormSelect, Navbar, NavbarText, Row} from 'react-bootstrap'
import {DataContext} from "./dataProvider.jsx";

export const UserContext = createContext(null)

function UserProvider({children}){
    const { users } = useContext(DataContext);

    const [currentUser, setCurrentUser] = useState(
        users.filter((item)=>item.id === 1)[0]
    )



    const value = {
        user: currentUser
    }
    return (
        <UserContext.Provider value={value}>
            <Row sx={1} sm={2} style={{margin: "0px"}}>
                <Col sx={6} sm={6}>
                    <NavbarText>
                        User: {currentUser.name}
                    </NavbarText>
                </Col>
                <Col style={{paddingRight: "0px"}}>
                    <Form.Select onChange={(e)=>{
                                     setCurrentUser(users.filter(item => item.email === e.target.value)[0])
                                 }}
                    >
                        {users.map((user) => {
                            return (
                                <option key={user.id} id={user.id}>
                                    {user.email}
                                </option>
                            )
                        })}
                    </Form.Select>
                </Col>
            </Row>

            {children}

        </UserContext.Provider>
    )
}

export default UserProvider;