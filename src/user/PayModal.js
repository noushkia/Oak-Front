import {Fragment, useState} from 'react';
import {Button, Modal, Spinner} from 'react-bootstrap';
import {addDiscount, buy} from "../utils/api/Users";
import {toast} from "react-toastify";
import {getInCart} from "../utils/Cart";


function PayModal(props) {
    const [show, setShow] = useState(false);
    const [discountCode, setDiscountCode] = useState("");
    const [loading, setLoading] = useState(false);
    const [discountLoading, setDiscountLoading] = useState(false);
    const [discountAdded, setDiscountAdded] = useState(false);

    const handleClose = () => setShow(false);
    const handleOpen = () => setShow(true);

    const handleDiscountCodeChange = (event) => {
        setDiscountCode(event.target.value);
    };

    const handleAddDiscount = () => {
        setDiscountLoading(true);
        const body = {code: discountCode};
        addDiscount(body)
            .then(user => {
                props.setCurrUser(user);
                setDiscountAdded(true);
                console.log('AddDiscount: success!');
            }).catch(error => {
            if (error.response) {
                console.log(error.response.data);
                toast.error(error.response.data.error);
            } else {
                console.log('AddDiscount: server down?');
                toast.error('Server not responding');
            }
        });
        setDiscountLoading(false);
    }

    const handleBuy = () => {
        setLoading(true);
        buy()
            .then(user => {
                props.setCurrUser(user);
                console.log('Buy: success!');
            }).catch(error => {
            if (error.response) {
                console.log(error.response.data);
                toast.error(error.response.data.error);
            } else {
                console.log('Buy: server down?');
                toast.error('Server not responding');
            }
        });
        setLoading(false);
        handleClose();
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
                    <Modal.Body style={{padding: "30px"}}>
                        <ul>
                            <ul>
                                {buyListItems.map(({id, name, price}) => {
                                    const itemCount = getInCart(id, props.buyList.itemsCount)
                                    const itemTotal = price * itemCount

                                    return (
                                        <li key={name} style={{display: 'flex', justifyContent: 'space-between'}}>
                                            <span>{name} x{itemCount}</span>
                                            <span>{itemTotal}$</span>
                                        </li>
                                    )
                                })}
                            </ul>
                        </ul>
                        <input
                            type="text"
                            id="discountCode"
                            value={discountCode}
                            onChange={handleDiscountCodeChange}
                        />
                        <Button variant="dark" onClick={handleAddDiscount}>
                            {discountLoading ?
                                <Spinner as='span' size='sm-1' role='status' animation="border"/> : 'submit'}
                        </Button>
                        {
                            discountAdded ?
                                <>
                                    <p style={{textDecoration: "line-through"}}>total: {props.buyList.total}$</p>
                                    <p>with discount: {props.buyList.final}$</p>
                                </>
                                :
                                <p>total: {props.buyList.total}$</p>
                        }
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
