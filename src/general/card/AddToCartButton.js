import {addToBuyList, updateInCart} from "../../utils/api/Users";
import {toast} from "react-toastify";
import React, {Fragment} from "react";
import "./card.css";

function AddToCartButton(props) {
    const handleCartUpdate = (commodityId, quantity) => {
        const body = {
            commodityId: commodityId,
            quantity: quantity
        };
        updateInCart(body)
            .then(user => {
                props.setCurrUser(user);
                console.log(`CartUpdate: success!`);
            }).catch(error => {
            if (error.response) {
                console.log(error.response.data);
                toast.error(error.response.data.error);
            } else {
                console.log('CartUpdate: server down?');
                toast.error('Server not responding');
            }
        });
    };

    const handleAddToCart = (commodityId) => {
        const body = {commodityId: commodityId};
        addToBuyList(body)
            .then(user => {
                props.setCurrUser(user);
                console.log(`AddToCart: success!`);
            }).catch(error => {
            if (error.response) {
                console.log(error.response.data);
                toast.error(error.response.data.error);
            } else {
                console.log('AddToCart: server down?');
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
                            style={{borderRight: "none"}}
                        >
                            -
                        </button>
                        <button className="btn" type="button" disabled style={{borderRadius: "0", borderLeft: "none"}}>
                            {props.inCart}
                        </button>
                        <button
                            className="btn"
                            type="button"
                            onClick={() => handleCartUpdate(props.id, 1)}
                            disabled={props.inCart === props.inStock}
                            style={{borderBottomLeftRadius: "0", borderTopLeftRadius: "0", borderLeft: "none"}}
                        >
                            +
                        </button>
                    </div>
                    :
                    <button
                        className="btn"
                        type="button"
                        onClick={() => handleAddToCart(props.id)}
                        disabled={props.inStock === 0}
                    >
                        {props.inStock === 0 ? 'Sold Out' : 'Add to Cart'}
                    </button>
            }
        </Fragment>
    )
}

export default AddToCartButton;
