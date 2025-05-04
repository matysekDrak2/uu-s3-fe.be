import {Button, Col, Form, Row} from "react-bootstrap";
import {useState} from "react";

export default function LoginForm({setUser, setSession}) {

    const [email, setEmail] = useState("testuser@test.co");
    const [password, setPassword] = useState("testtest");

    const login = async (password, email) => {
        const res = await fetch("http://localhost:8080/api/v1/users/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
        if (!res.ok){
            alert(JSON.stringify((await res.json()).errors))
        } else {
            const data = await res.json()
            console.log("Login form setting user: ", data)

            setUser(data.user)
            setSession(data.session)
        }
    }

    return (
        <Row>
            <Col style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
                <Form style={{ width: "300px" }}>
                    <Form.Text as='h1'>LOGIN</Form.Text>
                    <Form.Group className="mb-3" controlId="formEmailLogin">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formPasswordLogin">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
                    </Form.Group>
                    <Button variant="primary" type="submit" style={{ width: "100%" }}
                        onClick={(e)=>{
                            e.preventDefault()
                            login(password, email)
                        }}
                    >
                        Submit
                    </Button>
                </Form>
            </Col>
        </Row>
    )
}