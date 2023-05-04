import "./user.css"
import {Fragment, useEffect} from "react";
import PayModal from "./PayModal";
import {useNavigate} from "react-router-dom";
import AddCreditModal from "./AddCreditModal";
import LogoutModal from "../auth/LogoutModal";
import AddToCartButton from "../general/card/AddToCartButton";
import {getInCart} from "../utils/Cart";

function Profile(props) {
    return (
        <div className="container user">
            <div className="row d-flex">
                <div className="col-lg-6 col-md-12">
                    <div className="row align-items-center mb-2">
                        <div className="d-flex align-items-center">
                            <img src="../assets/images/svg/user/user.svg" alt="user"/>
                            <p className="m-0">{props.currUser.username}</p>
                        </div>
                    </div>
                    <div className="row align-items-center mb-2">
                        <div className="d-flex align-items-center">
                            <img src="../assets/images/svg/user/mail.svg" alt="mail"/>
                            <p className="m-0">{props.currUser.email}</p>
                        </div>
                    </div>
                    <div className="row align-items-center mb-2">
                        <div className="d-flex align-items-center">
                            <img src="../assets/images/svg/user/calendar.svg" alt="calendar"/>
                            <p className="m-0">{props.currUser.birthDate}</p>
                        </div>
                    </div>
                    <div className="row align-items-center mb-2">
                        <div className="d-flex align-items-center">
                            <img src="../assets/images/svg/user/location.svg" alt="location"/>
                            <p className="m-0">{props.currUser.address}</p>
                        </div>
                    </div>
                    <LogoutModal setLoggedIn={props.setLoggedIn}/>
                </div>
                <div className="col-lg-6 col-md-12 credit">
                    <div className="row">
                        <p className="amount">{props.currUser.credit}</p>
                    </div>
                    <AddCreditModal setCurrUser={props.setCurrUser}/>
                </div>
            </div>
        </div>
    );
}

function CommodityRow(props) {
    const {id, image, name, categories, price, providerId, rating, inStock} = props.item;

    const navigate = useNavigate();

    const handleCardClick = (commodityId) => {
        navigate(`/commodities/${commodityId}`);
    };

    return (
        <tr>
            <td>
                <img
                    src={image}
                    alt={name}
                    onClick={() => handleCardClick(id)}
                    style={{cursor: "pointer"}}
                />
            </td>
            <td>{name}</td>
            <td>{categories.join(", ")}</td>
            <td>{price}</td>
            <td>{providerId}</td>
            <td>{rating}</td>
            <td>{inStock}</td>
            <td>
                {
                    props.showCart ? (
                        <AddToCartButton
                            inCart={props.inCart}
                            id={id}
                            inStock={inStock}
                            setCurrUser={props.setCurrUser}
                        />
                    ) : (props.quantity)
                }
            </td>
        </tr>
    );
}

function Cart(props) {
    const cartItems = Array.isArray(props.buyList.items) ? props.buyList.items : Object.values(props.buyList.items);

    return (
        <Fragment>
            <div className="container cart" id="cart">
                <div className="row title align-items-center">
                    <div className="d-flex align-items-center">
                        <img src="../assets/images/svg/user/cart.svg" alt="cart"/>
                        <span>&nbsp; Cart</span>
                    </div>
                </div>

                <div className="row">
                    <table className="table table-hover">
                        <thead className="table-head">
                        <tr>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Categories</th>
                            <th>Price</th>
                            <th>Provider ID</th>
                            <th>Rating</th>
                            <th>In Stock</th>
                            <th>In Cart</th>
                        </tr>
                        </thead>
                        <tbody className="table-body">
                        {cartItems.map((item) => (
                            <CommodityRow
                                key={item.id}
                                item={item}
                                showCart={true}
                                inCart={getInCart(item.id, props.buyList.itemsCount)}
                                setCurrUser={props.setCurrUser}
                            />
                        ))}
                        </tbody>
                    </table>
                </div>

                <PayModal buyList={props.buyList} setCurrUser={props.setCurrUser}/>
            </div>
        </Fragment>
    )
}

function History(props) {
    const historyItems = Array.isArray(props.purchasedList.items) ? props.purchasedList.items : Object.values(props.purchasedList.items);

    return (
        <Fragment>
            <div className="container history" id="history">
                <div className="row title align-items-center">
                    <div className="d-flex align-items-center">
                        <img src="../assets/images/svg/user/history.svg" alt="history"/>
                        <span>&nbsp; History</span>
                    </div>
                </div>

                <div className="row">
                    <table className="table table-hover">
                        <thead className="table-head">
                        <tr>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Categories</th>
                            <th>Price</th>
                            <th>Provider ID</th>
                            <th>Rating</th>
                            <th>In Stock</th>
                            <th>Quantity</th>
                        </tr>
                        </thead>
                        <tbody className="table-body">
                        {historyItems.map((item) => (
                            <CommodityRow
                                key={item.id}
                                item={item}
                                showCart={false}
                                quantity={getInCart(item.id, props.purchasedList.itemsCount)}
                            />
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </Fragment>
    )
}

function User(props) {
    useEffect(() => {
        document.title = props.currUser.username.toString();
        return () => {
        };
    }, [props.currUser.username]);

    return (
        <Fragment>
            <Profile currUser={props.currUser} setLoggedIn={props.setLoggedIn} setCurrUser={props.setCurrUser}/>
            <Cart buyList={props.currUser.buyList} setCurrUser={props.setCurrUser}/>
            <History purchasedList={props.currUser.purchasedList}/>
        </Fragment>
    )
}

export default User;
