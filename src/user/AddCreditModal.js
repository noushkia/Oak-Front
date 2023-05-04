import {Fragment, useState} from 'react';
import {Button, Modal, Spinner} from 'react-bootstrap';
import {addCredit} from "../utils/api/Users";
import {toast} from "react-toastify";


function AddCreditModal(props) {
    const [show, setShow] = useState(false);
    const [creditToAdd, setCreditToAdd] = useState('');
    const [loading, setLoading] = useState(false);

    const handleClose = () => setShow(false);
    const handleOpen = () => setShow(true);

    const handleAddCredit = () => {
        setLoading(true);
        const body = {credit: parseInt(creditToAdd)};
        addCredit(body)
            .then(user => {
                props.setCurrUser(user);
                console.log('AddCredit: success!');
            }).catch(error => {
            if (error.response) {
                console.log(error.response.data);
                toast.error(error.response.data.error);
            } else {
                console.log('AddCredit: server down?');
                toast.error('Server not responding');
            }
        });
        setLoading(false);
        setCreditToAdd('');
        handleClose();
    };

    return (
        <Fragment>
            <div className="row">
                <input
                    type="text"
                    id="add-amount"
                    placeholder="$Amount"
                    value={creditToAdd}
                    onChange={(e) => setCreditToAdd(e.target.value)}
                />
            </div>

            <div className="row mt-2">
                <button className="btn" onClick={handleOpen}>
                    Add More Credit
                </button>
            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>Add Credit</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Are you sure you want to add {creditToAdd}$ to your account?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-dark" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="success" onClick={handleAddCredit}>
                        {loading ? <Spinner as='span' size='sm-1' role='status' animation="border"/> : 'Confirm!'}
                    </Button>
                </Modal.Footer>
            </Modal>
        </Fragment>
    );
}

export default AddCreditModal;
