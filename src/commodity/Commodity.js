import "./commodity.css"
import { Fragment, useEffect } from "react";
import CommodityModal from "./CategoriesModal";
import React, { useState } from 'react';
import { toast} from "react-toastify";
import { addComment, addUserRating } from "../utils/api/Commodities";
import { useNavigate } from "react-router-dom";
import { addToBuyList } from "../utils/api/Users";

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
                    src="../../public/assets/images/svg/commodity/star.svg"
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
                    <p>by <a href="#">{props.providerId}</a></p> todo: get provider name by id
                </div>
                <div className="row">
                    <p>Categories</p>
                </div>
                <div className="row">
                    <ul className="list">
                        {props.categories.map((category, index) => (
                            <li key={index}>{category}</li>
                        ))}
                    </ul>
                </div>
                <CommodityModal categories={props.categories}/>
            </div>
        )
    }

    return (
        <Fragment>
            <div className="row">
                <div className="col-lg-6 col-md-12">
                    <img className="image" src={props.commodity.img} alt="commodity"/>
                </div>
                <div className="col-lg-6 col-md-12">
                    <div className="row">
                        <p className="title">{props.commodity.name}</p>
                    </div>
                    <div className="row justify-content-between">
                        <p className="in_stock align-self-center">{props.commodity.inStock} left in stock</p>
                        <div className="d-flex align-self-center align-items-center justify-content-end rating">
                            <img className="star" src="../../public/assets/images/svg/commodity/star.svg" alt="Star"/>
                            <p className="mb-0 ml-2 text">
                                <span>{props.commodity.rating}</span>
                                <span>({props.commodity.count})</span> todo: get the number of ratings
                            </p>
                        </div>
                    </div>
                    <Categories providerId={props.commodity.providerId} categories={props.commodity.categories}/>
                    {/*todo: get categories*/}
                    <div className="row buy d-flex align-items-center">
                        <div className="col-md-6">
                            <p className="text">{props.commodity.price}</p>
                        </div>
                        <div className="col-md-6 d-flex justify-content-end">
                            <button className="btn" type="button">add to cart</button>
                            {/*    todo: Handle*/}
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

    const handleCommentChange = (event) => {
        setNewComment(event.target.value);
    };

    const handleCommentSubmit = (event) => {
        event.preventDefault();
        if (newComment) {
            addComment(newComment); // todo: what to do with the promise?
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
                            src="../../public/assets/images/svg/commodity/like.svg"
                            alt="like"
                        />{' '}
                        &nbsp;&nbsp;
                        {comment.dislikes}{' '}
                        <img
                            src="../../public/assets/images/svg/commodity/dislike.svg"
                            alt="dislike"
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
    const navigate = useNavigate();

    const handleAddToCart = (commodityId) => {
        addToBuyList(commodityId)
            .then(commodity => {
                console.log(`AddToCart: success! ${commodity.id}`);
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

    const handleCardClick = (commodityId) => {
        navigate(`/commodities/${commodityId}`);
    };

    return (
        <Fragment>
            <div className="container suggestions">
                <p className="title">You might also like...</p>
                <div className="row my-4 no-gutters no-wrap-row justify-content-center">
                    {props.suggestions.map((suggestion, index) => (
                        <div className="col-lg-3 col-md-6 col-sm-12 card mx-2" key={index}>
                            <h2 className="card-title" onClick={() => handleCardClick(suggestion.id)}>
                                {suggestion.title}
                            </h2>
                            <h6 className="in_stock">{suggestion.stock} left in stock</h6>
                            <img
                                className="card-img-top image"
                                src={suggestion.imageSrc}
                                alt="Card image cap"
                                onClick={() => handleCardClick(suggestion.id)}
                            />
                            <div className="card-body d-flex justify-content-between">
                                <p className="card-text price">{suggestion.price}$</p>
                                <button
                                    className="btn"
                                    type="button"
                                    onClick={() => handleAddToCart(suggestion.title)}
                                    disabled={suggestion.stock === 0}
                                >
                                    {suggestion.stock === 0 ? 'Sold Out' : 'Add to Cart'}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Fragment>
    );
}

function Commodity(props) {
    useEffect(() => {
        document.title = props.commodity.name;
        return () => {
        };
    }, []);

    return (
        <Fragment>
            <div className="container commodity">
                <CommodityInfo commodity={props.commodity}/>
                <CommentSection comments={props.commodity.comments}/> todo: get comments
                <Suggestions suggestions={props.commodity.suggestions}/> todo: get suggestions
            </div>
        </Fragment>
    )
}

export default Commodity;
