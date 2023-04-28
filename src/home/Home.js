import React, {Fragment, useEffect, useState} from "react";
import "./home.css";
import "./filter.css";
import "./pagination.css";
import Card from "../general/card/Card";
import {getInCart} from "../utils/Cart";
import {getCommodities} from "../utils/api/Commodities";
import {useLocation} from "react-router-dom";
import {toast} from "react-toastify";
import ReactPaginate from 'react-paginate';


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
                <div className="row justify-content-center">
                    {
                        props.commodities.map((commodity, index) => (
                            <Card
                                card={commodity} index={index} key={commodity.id}
                                inCart={getInCart(commodity.id, props.itemsCount)}
                                setCurrUser={props.setCurrUser}
                            />
                        ))
                    }
                </div>
            </div>
        </Fragment>
    )
}

function Home(props) {
    const location = useLocation();
    const [totalPage, setTotalPage] = useState(0);
    const [page, setPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState({type: '', query: ''});
    const [showAvailableCommodities, setShowAvailableCommodities] = useState(false);
    const [sortingAttribute, setSortingAttribute] = useState("");
    const [commodities, setCommodities] = useState([]);

    const handlePageChange = (event) => {
        const selectedPage = event.selected;
        setPage(selectedPage + 1);
    };

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const typeValue = params.get("type") || "";
        const queryValue = params.get("query") || "";
        setSearchQuery({type: typeValue, query: queryValue});
    }, [location.search]);

    useEffect(() => {
        document.title = 'Home';

        getCommodities({page}, showAvailableCommodities, sortingAttribute, searchQuery)
            .then(response => {
                setCommodities(response.commodities);
                setTotalPage(response.pages);
            }).catch(error => {
            if (error.response) {
                console.log(error.response.data);
                toast.error(error.response.data.error);
            } else {
                console.log('Home: server down?');
                toast.error('Server not responding');
            }
        });
    }, [page, showAvailableCommodities, sortingAttribute, searchQuery]);

    return (
        <Fragment>
            <FilterBar
                setShowAvailableCommodities={setShowAvailableCommodities}
                setSortingAttribute={setSortingAttribute}
            />
            <Commodities
                commodities={commodities}
                itemsCount={props.buyList.itemsCount}
                setCurrUser={props.setCurrUser}
            />
            {totalPage < 2 ? null : (
                <div className="pagination-container">
                    <ReactPaginate
                        previousLabel={"<"}
                        nextLabel={">"}
                        breakLabel={"..."}
                        breakClassName={"break-me"}
                        pageCount={totalPage}
                        marginPagesDisplayed={1}
                        pageRangeDisplayed={5}
                        onPageChange={handlePageChange}
                        containerClassName={"pagination"}
                        subContainerClassName={"pages pagination"}
                        activeClassName={"active"}/>
                </div>
            )}
        </Fragment>
    )
}

export default Home;
