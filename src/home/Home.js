import React, {Fragment, useEffect, useState} from "react";
import "./home.css";
import Card from "../general/card/Card";
import {getInCart} from "../utils/Cart";
import {getCommodities} from "../utils/api/Commodities";
import {useLocation} from "react-router-dom";


function FilterBar(props) {
    const [showAvailableCommodities, setShowAvailableCommodities] = useState(false);
    const [sortingAttribute, setSortingAttribute] = useState("");
    const handleFilterToggle = () => {
        props.setShowAvailableCommodities(!showAvailableCommodities);
        setShowAvailableCommodities(!showAvailableCommodities);
    };

    const handleSortBy = (attribute) => {
        props.setSortingAttribute(attribute);
        setSortingAttribute(attribute);
    };

    return (
        <div className="row justify-content-center">
            <div className="col-lg-8 col-md-10 col-sm-12">
                <div className="bg-lightbrown filter">
                    <div className="row">
                        <div className="col-6 d-flex align-items-center">
                            <p className="m-0">Available commodities</p>
                            <label className="switch ml-4">
                                <input type="checkbox" onChange={handleFilterToggle}
                                       checked={showAvailableCommodities}/>
                                <span className="slider round"></span>
                            </label>
                        </div>
                        <div className="col-6 d-flex align-items-center justify-content-end">
                            <p className="mr-2 mt-3">sort by:</p>
                            <button type="button" className={`btn ${sortingAttribute === 'name' ? 'active' : ''}`}
                                    onClick={() => handleSortBy('name')}>
                                name
                            </button>
                            <button type="button" className={`btn ${sortingAttribute === 'price' ? 'active' : ''}`}
                                    onClick={() => handleSortBy('price')}>
                                price
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


function Commodities(props) {
    return (
        <Fragment>
            <div className="container home">
                <div className="row my-4 no-gutters no-wrap-row justify-content-center">
                    {props.commodities.map((commodity, index) => (
                        <Card card={commodity} index={index}
                              inCart={getInCart(commodity.id, props.buyList.itemsCount)}/>
                    ))}
                </div>
            </div>
        </Fragment>
    )
}

function Home(props) {
    const location = useLocation();
    const [searchQuery, setSearchQuery] = useState({type: '', query: ''});
    const [showAvailableCommodities, setShowAvailableCommodities] = useState(false);
    const [sortingAttribute, setSortingAttribute] = useState("");

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const type = params.get("type") || "";
        const query = params.get("query") || "";
        setSearchQuery({type, query});
    }, [location.search])

    return (
        <Fragment>
            <FilterBar setShowAvailableCommodities={setShowAvailableCommodities}
                       setSortingAttribute={setSortingAttribute}/>
            <Commodities commodities={getCommodities(showAvailableCommodities, sortingAttribute, searchQuery)}
                         buyList={props.buyList}/>
        </Fragment>
    )
}

export default Home;
