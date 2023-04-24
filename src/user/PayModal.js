import {useState} from 'react';
import {Button, Modal, Spinner} from 'react-bootstrap';
import {buy} from "../utils/api/Users";
import {toast} from "react-toastify";


function PayModal(props) {
    const [show, setShow] = useState(false);
    // const [totalPrice, setTotalPrice] = useState(0);
    const [discountCode, setDiscountCode] = useState("");
    const [loading, setLoading] = useState(false);

    // const handleOpenModal = () => {
    //     // Calculate total price based on items in buyList
    //     const totalPrice = props.buyList.reduce(
    //         (accumulator, item) => accumulator + item.price,
    //         0
    //     );
    //     setTotalPrice(totalPrice);
    //     setIsModalOpen(true);
    // };
    const handleClose = () => setShow(false);
    const handleOpen = () => setShow(true);

    const handleDiscountCodeChange = (event) => {
        setDiscountCode(event.target.value);
    };

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

    return (
        <div className="row d-flex justify-content-center">
            <div className="col text-center">
                <button className="btn pay" onClick={handleOpen}>Pay Now!</button>
            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>Are you sure?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Total price: {totalPrice} credits</p>
                    <label htmlFor="discountCode">Discount code:</label>
                    <input
                        type="text"
                        id="discountCode"
                        value={discountCode}
                        onChange={handleDiscountCodeChange}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-dark" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="success" onClick={handleBuy}>
                        {loading ? <Spinner as='span' size='sm-1' role='status' animation="border"/> : 'Buy'}
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default PayModal;
