import "./commodity.css"
import {Fragment, useEffect} from "react";
import CategoriesModal from "./CategoriesModal";
import React, {useState} from 'react';
import {toast} from "react-toastify";
import {addComment, addUserRating, getCommodity, voteComment} from "../utils/api/Commodities";
import Card from "../general/card/Card";
import {getInCart} from "../utils/Cart";
import {useParams} from "react-router-dom";
import {Spinner} from "react-bootstrap";
import AddToCartButton from "../general/card/AddToCartButton";
import {Carousel} from 'react-bootstrap';


function Rate() {
    const [rating, setRating] = useState(null);

    const handleRatingClick = (value) => {
        setRating(value);
    };

    const renderStars = () => {
        const stars = [];
        for (let i = 1; i <= 10; i++) {
            const filled = rating ? i <= rating : false;
            stars.push(
                <img
                    key={i}
                    src="../assets/images/svg/commodity/star.svg"
                    alt="star"
                    className={`star ${filled ? 'filled' : ''}`}
                    onClick={() => handleRatingClick(i)}
                />
            );
        }
        return stars;
    };

    const handleSubmit = () => {
        if (rating) {
            addUserRating(rating)
                .then(newRating => {
                    console.log(newRating);
                    console.log('addRating: success!');
                }).catch(error => {
                if (error.response) {
                    console.log(error.response.data);
                    toast.error(error.response.data.error);
                } else {
                    console.log('addRating: server down?');
                    toast.error('Server not responding');
                }
            });
        } else {
            toast.info('Please select a rating before submitting.');
        }
    };

    return (
        <div className="row rate">
            <div className="col-md-6 d-flex align-items-center">
                <div className="container">
                    <div className="row">
                        <p>Rate now:</p>
                        <div className="stars">{renderStars()}</div>
                    </div>
                </div>
            </div>
            <div className="col-md-6 d-flex align-items-center justify-content-end">
                <button className="btn" onClick={handleSubmit}>
                    Submit
                </button>
            </div>
        </div>
    );
}

function CommodityInfo(props) {
    function Categories(props) {
        return (
            <div className="category">
                <div className="row">
                    <p>by <a href="#">{props.providerId}</a></p> {/*todo: get provider name by id*/}
                </div>
                <div className="row">
                    <p>Categories</p>
                </div>
                <div className="row">
                    <ul className="list">
                        {props.categories.slice(0, 2).map((category, index) => (
                            <li key={index}>{category}</li>
                        ))}
                        {props.categories.length > 2 && <CategoriesModal categories={props.categories}/>}
                    </ul>
                </div>
            </div>
        )
    }

    return (
        <Fragment>
            <div className="row">
                <div className="col-lg-6 col-md-12">
                    <img className="image" src="../assets/images/svg/others/chestnut.svg" alt="commodity"/>
                </div>
                <div className="col-lg-6 col-md-12">
                    <div className="row">
                        <p className="title">{props.commodity.name}</p>
                    </div>
                    <div className="row justify-content-between">
                        <p className="in_stock align-self-center">{props.commodity.inStock} left in stock</p>
                        <div className="d-flex align-self-center align-items-center justify-content-end rating">
                            <img className="star" src="../assets/images/svg/commodity/star.svg" alt="Star"/>
                            <p className="mb-0 ml-2 text">
                                <span>{props.commodity.rating}</span>
                                <span>({props.commodity.ratings})</span>
                            </p>
                        </div>
                    </div>
                    <Categories providerId={props.commodity.providerId} categories={props.commodity.categories}/>
                    <div className="row buy d-flex align-items-center">
                        <div className="col-md-6">
                            <p className="text">{props.commodity.price}$</p>
                        </div>
                        <div className="col-md-6 d-flex justify-content-end">
                            <AddToCartButton
                                inCart={getInCart(props.commodity.id, props.itemsCount)}
                                id={props.commodity.id}
                                inStock={props.commodity.inStock}
                                setCurrUser={props.setCurrUser}
                            />
                        </div>
                    </div>
                    <Rate/>
                </div>
            </div>
        </Fragment>
    )
}

function CommentSection(props) {
    const [newComment, setNewComment] = useState('');

    const handleVoteComment = (username, commentId, vote) => {
        voteComment(username, commentId, vote).then(r => {
        });
        console.log(`Voted comment: `);
    };

    const handleCommentChange = (event) => {
        setNewComment(event.target.value);
    };

    const handleCommentSubmit = (event) => {
        event.preventDefault();
        if (newComment) {
            addComment(newComment).then(r => {
            });
            console.log(`Submitted comment: ${newComment}`);
            setNewComment('');
        } else {
            alert('Please enter a comment before submitting.');
        }
    };

    const renderComments = () => {
        return props.comments.map((comment, index) => (
            <div className="col-md-12" key={index}>
                <p className="text">{comment.text}</p>
                <p className="info">
                    <span>{comment.date}</span>
                    <span className="bullet">&#8226;</span>
                    <span>#{comment.author}</span>
                </p>
                <div className="d-flex justify-content-end vote">
                    <p>Was this comment helpful?</p>
                    <p>
                        &nbsp;&nbsp; {comment.likes}{' '}
                        <img
                            src="../assets/images/svg/commodity/like.svg"
                            alt="like"
                            onClick={() => handleVoteComment(props.username, comment.id, 1)}
                        />{' '}
                        &nbsp;&nbsp;
                        {comment.dislikes}{' '}
                        <img
                            src="../assets/images/svg/commodity/dislike.svg"
                            alt="dislike"
                            onClick={() => handleVoteComment(props.username, comment.id, -1)}
                        />
                    </p>
                </div>
            </div>
        ));
    };

    return (
        <>
            <div className="row mt-3 comment">
                <div className="col-md-12 d-flex align-self-start title">
                    <span>Comments </span>
                    <span>({props.comments.length})</span>
                </div>
                {renderComments()}
            </div>

            <div className="row mt-3 comment">
                <div className="col-md-12 submit">
                    <label htmlFor="comment">Submit your opinion</label>
                    <form onSubmit={handleCommentSubmit}>
                        <div className="row">
                            <div className="col-lg-11 col-md-10 col-sm-8">
                                <textarea
                                    className="form-control new-comment"
                                    id="comment"
                                    rows="3"
                                    cols="100%"
                                    value={newComment}
                                    onChange={handleCommentChange}
                                ></textarea>
                            </div>
                            <div className="col-lg-1 col-md-2 col-sm-4 align-self-end">
                                <button type="submit" className="btn btn-primary btn-block">
                                    Post
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}


function Suggestions(props) {
    return (
        <Fragment>
            <div className="container suggestions">
                <p className="title">You might also like...</p>
                <div className="row my-4 no-gutters no-wrap-row justify-content-center">
                    {props.suggestions.map((suggestion, index) => (
                        <Card card={suggestion} index={index} key={suggestion.id}
                              inCart={getInCart(suggestion.id, props.itemsCount)}
                              setCurrUser={props.setCurrUser}
                        />
                    ))}
                </div>
            </div>
        </Fragment>
    );
}

function Commodity(props) {
    const {commodityId} = useParams();
    const [commodity, setCommodity] = useState({commodity: {}, suggestions: []});
    const [init, setInit] = useState(false);

    useEffect(() => {
        if (commodityId) {
            getCommodity(commodityId).then(currCommodity => {
                setCommodity(currCommodity);
                setInit(true);
            })
        }
    }, [commodityId]);

    if (!init)
        return (
            <Fragment>
                <div className='text-center'><Spinner animation="border" variant='warning'/></div>
            </Fragment>
        )
    else {
        return (
            <Fragment>
                <div className="container commodity">
                    <CommodityInfo commodity={commodity.commodity} setCurrUser={props.setCurrUser}
                                   itemsCount={props.buyList.itemsCount}/>
                    <CommentSection comments={commodity.commodity.comments}/>
                    <Suggestions suggestions={commodity.suggestions} setCurrUser={props.setCurrUser}
                                 itemsCount={props.buyList.itemsCount}/>
                </div>
            </Fragment>
        )
    }
}

export default Commodity;
