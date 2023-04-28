import {Fragment, useState} from 'react';
import {Button, Modal, Spinner} from 'react-bootstrap';
import {addDiscount, buy} from "../utils/api/Users";
import {toast} from "react-toastify";


function PayModal(props) {
    const [show, setShow] = useState(false);
    const [discountCode, setDiscountCode] = useState("");
    const [loading, setLoading] = useState(false);

    const handleClose = () => setShow(false);
    const handleOpen = () => setShow(true);

    const handleDiscountCodeChange = (event) => {
        setDiscountCode(event.target.value);
    };

    const handleAddDiscount = () => {
        setLoading(true);
        addDiscount(discountCode)
            .then(credit => {
                console.log('AddDiscount: success!');
            }).catch(error => {
            if (error.response) {
                console.log(error.response.data);
                toast.error(error.response.data.error);
            } else {
                console.log('AddDiscount: server down?');
                toast.error('Server not responding');
            }
            setLoading(false);
        });
    }

    const handleBuy = () => {
        setLoading(true);
        buy()
            .then(credit => {
                console.log('Buy: success!');
            }).catch(error => {
            if (error.response) {
                console.log(error.response.data);
                toast.error(error.response.data.error);
            } else {
                console.log('Buy: server down?');
                toast.error('Server not responding');
            }
            setLoading(false);
        });
    };

    const buyListItems = Array.isArray(props.buyList.items) ? props.buyList.items : Object.values(props.buyList.items);

    return (
        <Fragment>
            <div className="row d-flex justify-content-center">
                <div className="col text-center">
                    <button className="btn pay" onClick={handleOpen}>Pay Now!</button>
                </div>

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header>
                        <Modal.Title>Your cart</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <ul>
                            {buyListItems.map((item) => (
                                <li>{item.name} {item.price}$</li>
                            ))}
                        </ul>
                        <input
                            type="text"
                            id="discountCode"
                            value={discountCode}
                            onChange={handleDiscountCodeChange}
                        />
                        <Button variant="dark" onClick={handleAddDiscount}>
                            {loading ? <Spinner as='span' size='sm-1' role='status' animation="border"/> : 'submit'}
                        </Button>
                        <p>total: {props.buyList.total}$</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="outline-dark" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="success" onClick={handleBuy}>
                            {loading ? <Spinner as='span' size='sm-1' role='status' animation="border"/> : 'Buy!'}
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </Fragment>
    );
}

export default PayModal;
