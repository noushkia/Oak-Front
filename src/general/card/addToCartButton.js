import {updateInCart} from "../../utils/api/Users";
import {toast} from "react-toastify";
import React, {Fragment} from "react";
import "./card.css";

function AddToCartButton(props) {
    const handleCartUpdate = (commodityId, quantity) => {
        updateInCart(commodityId, quantity)
            .then(commodity => {
                console.log(`CartUpdate: success! ${commodityId}`);
            }).catch(error => {
            if (error.response) {
                console.log(error.response.data);
                toast.error(error.response.data.error);
            } else {
                console.log('RemoveFromCart: server down?');
                toast.error('Server not responding');
            }
        });
    };

    return (
        <Fragment>
            {
                props.inCart ?
                    <div className="btn-group">
                        <button
                            className="btn"
                            type="button"
                            onClick={() => handleCartUpdate(props.id, -1)}
                        > todo: check if the button is updated when item is removed using -
                            -
                        </button>
                        <button className="btn" type="button" disabled>
                            {props.inCart}
                        </button>
                        <button
                            className="btn"
                            type="button"
                            onClick={() => handleCartUpdate(props.id, 1)}
                            disabled={props.inCart === props.inStock}
                        >
                            +
                        </button>
                    </div>
                    :
                    <button
                        className="btn"
                        type="button"
                        onClick={() => handleCartUpdate(props.id, 1)}
                        disabled={props.inStock === 0}
                    >
                        {props.inStock === 0 ? 'Sold Out' : 'Add to Cart'}
                    </button>
            }
        </Fragment>
    )
}

export default AddToCartButton;
