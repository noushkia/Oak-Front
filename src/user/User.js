import "./user.css"
import {Fragment, useEffect} from "react";
import PayModal from "./PayModal";
import {useNavigate} from "react-router-dom";
import AddCreditModal from "./AddCreditModal";

function Profile(props) {
    return (
        <div className="container user">
            <div className="row d-flex">
                <div className="col-lg-6 col-md-12">
                    <div className="row">
                        <img src="../assets/images/svg/user/user.svg" alt="user"/>
                        <p>{props.user.username}</p>
                    </div>
                    <div className="row">
                        <img src="../assets/images/svg/user/mail.svg" alt="mail"/>
                        <p>{props.user.email}</p>
                    </div>
                    <div className="row">
                        <img src="../assets/images/svg/user/calendar.svg" alt="calendar"/>
                        <p>{props.user.birthDate}</p>
                    </div>
                    <div className="row">
                        <img src="../assets/images/svg/user/location.svg" alt="location"/>
                        <p>{props.user.address}</p>
                    </div>
                </div>
                <div className="col-lg-6 col-md-12 credit">
                    <div className="row">
                        <p className="amount">{props.user.credit}</p>
                    </div>
                    <AddCreditModal/>
                </div>
            </div>
        </div>
    );
}

function CommodityRow({item, showCart}) {
    console.log(`Commodity item: ${item}`);
    const {id, image, name, categories, price, providerId, rating, inStock} = item;

    const navigate = useNavigate();

    const handleCardClick = (commodityId) => {
        navigate(`/commodities/${commodityId}`);
    };

    return (
        <tr>
            <td>
                <img src={image} alt={name} onClick={() => handleCardClick(id)}/>
            </td>
            <td><span onClick={() => handleCardClick(id)}>{name}</span></td>
            <td>{categories.join(", ")}</td>
            <td>{price}</td>
            <td>{providerId}</td>
            <td>{rating}</td>
            <td>{inStock}</td>
            <td>
                {
                    showCart ? (
                        <div className="btn-group">
                            <button className="btn" type="button">-</button>
                            <button className="btn" type="button" disabled>
                                {item.inCart}
                            </button>
                            <button className="btn" type="button">+</button>
                        </div>
                    ) : (item.quantity)
                }
            </td>
        </tr>
    );
}

function Cart(props) {
    return (
        <Fragment>
            <div className="container cart" id="cart">
                <div className="row title align-items-center">
                    <img src="../assets/images/svg/user/cart.svg" alt="cart"/>
                    <span>&nbsp; Cart</span>
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
                        {props.cart.map((item) => (
                            <CommodityRow key={item.id} item={item} showCart={true}/>
                        ))}
                        </tbody>
                    </table>
                </div>

                <PayModal buyList={props.buyList}/>
            </div>
        </Fragment>
    )
}

function History(props) {
    return (
        <Fragment>
            <div className="container history" id="history">
                <div className="row title align-items-center">
                    <img src="../assets/images/svg/user/history.svg" alt="history"/>
                    <span>&nbsp; History</span>
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
                        {props.history.map((item) => (
                            <CommodityRow key={item.id} item={item} showCart={false}/>
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
        document.title = 'profile';
        return () => {
        };
    }, []);

    return (
        <Fragment>
            <Profile user={props.user}/>
            <Cart cart={props.user.buyList}/>
            <History history={props.user.purchasedList}/>
        </Fragment>
    )
}

export default User;
