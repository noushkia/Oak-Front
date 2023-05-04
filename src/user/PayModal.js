import {Fragment, useState} from 'react';
import {Button, Modal, Spinner} from 'react-bootstrap';
import {addDiscount, buy} from "../utils/api/Users";
import {toast} from "react-toastify";
import {getInCart} from "../utils/Cart";
import "./pay_modal.css"


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

                <Modal show={show} onHide={handleClose} className={"pay"}>
                    <Modal.Header>
                        <Modal.Title className={"title"}>Your cart</Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{padding: "30px"}}>
                        <ul>
                            {buyListItems.map(({id, name, price}) => {
                                const itemCount = getInCart(id, props.buyList.itemsCount)
                                const itemTotal = price * itemCount
                                return (
                                    <li key={id}>
                                        <span>{name} x{itemCount}</span>
                                        <span>{itemTotal}$</span>
                                    </li>
                                )
                            })}
                        </ul>
                        <div className={'discount-input'}>
                            <input
                                type="text"
                                id="discountCode"
                                value={discountCode}
                                onChange={handleDiscountCodeChange}
                            />
                            <Button variant="dark" onClick={handleAddDiscount}
                                    className={discountAdded ? 'submitted-btn' : ''}
                                    disabled={discountAdded}
                            >
                                {discountLoading ?
                                    <Spinner as='span' size='sm-1' role='status' animation="border"/>
                                    : discountAdded ? 'submitted'
                                        : 'submit'}
                            </Button>
                        </div>
                        <br/>
                        {
                            discountAdded ?
                                <>
                                    <p className={"total discount"}><span>total</span>
                                        <span>{props.buyList.total}$</span></p>
                                    <p className={"final"}><span>with discount</span>
                                        <span>{props.buyList.final}$</span></p>
                                </>
                                :
                                <p className={"total no-discount"}><span>total</span>
                                    <span>{props.buyList.total}$</span></p>
                        }
                    </Modal.Body>
                    <Modal.Footer>
                        <Button className={"close-btn"} onClick={handleClose}>
                            Close
                        </Button>
                        <Button className={"buy-btn"} onClick={handleBuy}>
                            {loading ? <Spinner as='span' size='sm-1' role='status' animation="border"/> : 'Buy!'}
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </Fragment>
    );
}

export default PayModal;
