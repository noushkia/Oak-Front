import "./user.css"
import {Fragment, useEffect, useState} from "react";
import PayModal from "./PayModal";
import {addCredit} from "../utils/api/Users";
import {saveUsername} from "../utils/Session";
import {toast} from "react-toastify";

function Profile(props) {
  const [creditToAdd, setCreditToAdd] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAddCredit = () => {
      setLoading(true);
      const credit = parseInt(creditToAdd);
      addCredit(credit)
          .then(newCredit => {
              console.log(newCredit);
              console.log('AddCredit: success!');
          }).catch(error => {
          if (error.response) {
              console.log(error.response.data);
              toast.error(error.response.data.error);
          } else {
              console.log('AddCredit: server down?');
              toast.error('Server not responding');
          }
          setLoading(false);
      });
    setCreditToAdd('');
  };

  return (
    <div className="container user">
      <div className="row d-flex">
        <div className="col-lg-6 col-md-12">
          <div className="row">
            <img src="../public/assets/images/svg/user/user.svg" alt="user" />
            <p>{props.user.username}</p>
          </div>
          <div className="row">
            <img src="../public/assets/images/svg/user/mail.svg" alt="mail" />
            <p>{props.user.email}</p>
          </div>
          <div className="row">
            <img src="../public/assets/images/svg/user/calendar.svg" alt="calendar" />
            <p>{props.user.birthDate}</p>
          </div>
          <div className="row">
            <img src="../public/assets/images/svg/user/location.svg" alt="location" />
            <p>{props.user.address}</p>
          </div>
        </div>
        <div className="col-lg-6 col-md-12 credit">
          <div className="row">
            <p className="amount">{props.user.credit}</p>
          </div>
          <div className="row">
            <input
              type="text"
              id="add-amount"
              placeholder="$Amount"
              value={creditToAdd}
              onChange={(e) => setCreditToAdd(e.target.value)}
            />
          </div>
          <div className="row mt-2">
            <button className="btn" onClick={handleAddCredit}>
              Add More Credit
                {/*todo: use modal*/}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function CommodityRow({item, showCart}) {
    const {image, name, categories, price, providerId, rating, inStock} = item;

    return (
        <tr>
            <td>
                <img src={image} alt={name}/>
            </td>
            <td>{name}</td>
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
                    <img src="../public/assets/images/svg/user/cart.svg" alt="cart"/>
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

                <PayModal/>
            </div>
        </Fragment>
    )
}

function History(props) {
    return (
        <Fragment>
            <div className="container history" id="history">
                <div className="row title align-items-center">
                    <img src="../public/assets/images/svg/user/history.svg" alt="history"/>
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
                <Cart cart={props.user.buylist}/>{/* todo: check with back */}
                <History history={props.user.purchasedList}/>{/* todo: check with back */}
        </Fragment>
    )
}

export default User;
