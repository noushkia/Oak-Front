import {Fragment, useState} from 'react';
import {Button, Modal} from 'react-bootstrap';
import {Link} from 'react-router-dom';

function CategoriesModal(props) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleOpen = () => setShow(true);

    return (
        <Fragment>
            <div className="col-md-6 mt-2">
                <button className="btn" onClick={handleOpen}>Show more...</button>
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
        </Fragment>
    );
}

export default CategoriesModal;
