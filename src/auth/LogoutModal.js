import {useState} from 'react';
import {Button, Modal} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {removeUsername} from "../utils/Session";

function LogoutModal(props) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleOpen = (event) => {
        event.preventDefault();
        setShow(true);
    };

    const handleLogout = () => {
        removeUsername();
        handleClose();
        props.setLoggedIn(false);
    };

    return (
        <>
            {/*todo: <i className="flaticon-log-out"></i>*/}
            <Link onClick={handleOpen} to='#'>Exit<i className="flaticon-log-out"></i></Link>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>Are you sure?</Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                    <Button variant="outline-dark" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="success" onClick={handleLogout}>
                        Exit
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default LogoutModal;