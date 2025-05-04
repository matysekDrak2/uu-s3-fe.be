import {Button, Col, Form, Row} from "react-bootstrap";
import {useState} from "react";

export default function RegistrationForm({setUser, setSession}) {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const register = async (password, email) => {
        const res = await fetch("http://localhost:8080/api/v1/users/", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: name,
                email: email,
                password: password
            })
        })
        if (!res.ok){
            alert(JSON.stringify((await res.json()).errors))
        } else {
            const data = await res.json()
            setUser({
                id: data.id,
                name: data.name,
                email: data.email
            })
            setSession(data.session)
        }
    }

    return (
        <Row>
            <Col style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
                <Form style={{ width: "300px" }}>
                    <Form.Text as='h1'>Register</Form.Text>
                    <Form.Group className="mb-3" controlId="formNameRegister">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="string" placeholder="Enter your name" onChange={(e) => setName(e.target.value)}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formEmailRegister">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formPasswordRegister">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
                    </Form.Group>
                    <Button variant="primary" type="submit" style={{ width: "100%" }}
                            onClick={(e)=>{
                                e.preventDefault()
                                register(password, email)
                            }}
                    >
                        Submit
                    </Button>
                </Form>
            </Col>
        </Row>
    )
}