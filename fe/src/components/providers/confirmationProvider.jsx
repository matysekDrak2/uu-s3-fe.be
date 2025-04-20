import {createContext, useState} from "react";
import {Alert, Button, ButtonGroup} from "react-bootstrap";
import PropTypes from "prop-types";

function ConfirmationWindow({message, confirmFunc, cancelFunc}) {
    return (
        <div style={{position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1000, display: "flex", justifyContent: "center", alignItems: "center"}}>
            <Alert variant="danger" onClose={cancelFunc} dismissible style={{zIndex: 1010}}>
                <Alert.Heading>Confirmation</Alert.Heading>
                <p>{message}</p>
                <hr />
                <ButtonGroup>
                    <Button variant={"danger"} onClick={confirmFunc} >Confirm</Button>
                    <Button variant={"primary"} onClick={cancelFunc} >Cancel</Button>
                </ButtonGroup>
            </Alert>
        </div>
    );
}
ConfirmationWindow.propTypes = {
    message: PropTypes.string.isRequired,
    confirmFunc: PropTypes.func.isRequired,
    cancelFunc: PropTypes.func.isRequired
};


export const ConfirmationDialogContext = createContext(null)

function ConfirmationDialogProvider({children}){

    const [shown, setShown] = useState(false);
    const show = () => {setShown(true)}

    const [confirmFunc, setConfirmFunc] = useState(()=>{});

    const value = {
        show: show,
        setFunc: (func) => setConfirmFunc(func)
    }
    return (
        <ConfirmationDialogContext.Provider value={value}>
            { shown && (
                <ConfirmationWindow
                    message={"Are you sure?"}
                    confirmFunc={() => {
                        confirmFunc()
                        setShown(false)
                    }}
                    cancelFunc={() => {
                        setConfirmFunc(()=>{})
                        setShown(false)
                    }}
                />
            )}
            {children}
        </ConfirmationDialogContext.Provider>
    )
}

ConfirmationDialogProvider.propTypes = {
    children: PropTypes.node.isRequired
};

export default ConfirmationDialogProvider;