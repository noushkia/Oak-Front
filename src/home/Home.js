import React from "react";
import "./home.css";

function Commodity({ title, stock, image, price }) {
    return (
        <div className="col-lg-3 col-md-6 col-sm-12 card mx-2">
            <h2 className="card-title">{title}</h2>
            <h6 className="in_stock">{stock} left in stock</h6>
            <img className="card-img-top image" src={image} alt="Card image cap" />
            <div className="card-body d-flex justify-content-between">
                <p className="card-text price">{price}</p>
                <button className="btn" type="button">
                    add to cart
                </button>
            </div>
        </div>
    );
}

function CommodityWithQuantity({ title, stock, image, price }) {
    return (
        <div className="col-lg-3 col-md-6 col-sm-12 card mx-2">
            <h2 className="card-title">{title}</h2>
            <h6 className="in_stock">{stock} left in stock</h6>
            <img className="card-img-top image" src={image} alt="Card image cap" />
            <div className="card-body d-flex justify-content-between">
                <p className="card-text price">{price}</p>
                <div className="btn-group">
                    <button className="btn" type="button">
                        -
                    </button>
                    <button className="btn" type="button" disabled>
                        1
                    </button>
                    <button className="btn" type="button">
                        +
                    </button>
                </div>
            </div>
        </div>
    );
}

function CommodityList() {
    return (
        <div className="container home">
            <div className="row my-4 no-gutters no-wrap-row justify-content-center">
                <Commodity
                    title="Taha"
                    stock={2}
                    image="../../public/assets/images/svg/commodity/taha.jpg"
                    price="300$"
                />
                <Commodity
                    title="Taha"
                    stock={2}
                    image="../../public/assets/images/svg/commodity/taha.jpg"
                    price="300$"
                    disabled
                />
                <Commodity
                    title="Taha"
                    stock={2}
                    image="../../public/assets/images/svg/commodity/taha.jpg"
                    price="300$"
                />
                <CommodityWithQuantity
                    title="Taha"
                    stock={2}
                    image="../../public/assets/images/svg/commodity/taha.jpg"
                    price="300$"
                    disabled
                />
            </div>
        </div>
    )
}
