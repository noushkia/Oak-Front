import {useState} from 'react';
import {Button, Modal} from 'react-bootstrap';
import {Link} from 'react-router-dom';

function CommodityModal(props) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleOpen = () => setShow(false);

    return (
        <>
            <div className="row">
                <Link onClick={handleOpen} to='#'>Show more...</Link>
            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>Categories</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ul>
                        {props.categories.map((category, index) => (
                            <li key={index}>{category}</li>
                        ))}
                    </ul>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default CommodityModal;
