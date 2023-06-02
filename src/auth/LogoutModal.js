import {useState} from 'react';
import {Button, Modal} from 'react-bootstrap';
import {removeJWT} from "../utils/Session";

function LogoutModal(props) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleOpen = (event) => {
        event.preventDefault();
        setShow(true);
    };

    const handleLogout = () => {
        removeJWT();
        handleClose();
        props.setLoggedIn(false);
    };

    return (
        <>
            <button className="btn" onClick={handleOpen}>logout</button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>Are you sure?</Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                    <Button variant="outline-dark" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="success" onClick={handleLogout}>
                        logout
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default LogoutModal;
