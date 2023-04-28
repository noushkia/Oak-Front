import React from "react";
import {useNavigate} from "react-router-dom";
import "./card.css";
import AddToCartButton from "./addToCartButton";

function Card(props) {
    const navigate = useNavigate();

    const handleCardClick = (commodityId) => {
        navigate(`/commodities/${commodityId}`);
    };

    return (
        <div className="col-lg-3 col-md-6 col-sm-12 card mx-2" key={props.index}>
            <h2 className="card-title">
                {props.card.name.charAt(0).toUpperCase() + props.card.name.slice(1)}
            </h2>
            <h6 className="in_stock">{props.card.inStock} left in stock</h6>
            <img
                className="card-img-top image"
                src="../../assets/images/svg/commodity/taha.jpg"
                alt="Card image cap"
                onClick={() => handleCardClick(props.card.id)}
                style={{cursor: "pointer"}}
            />
            <div className="card-body d-flex justify-content-between">
                <p className="card-text price">{props.card.price}$</p>
                <AddToCartButton inCart={props.inCart} id={props.card.id} inStock={props.card.inStock}/>
            </div>
        </div>
    )
}

export default Card;
