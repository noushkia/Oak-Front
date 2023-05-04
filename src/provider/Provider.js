import React, {Fragment, useEffect, useState} from "react";
import Commodities from "../general/commodities/Commodities";
import {useParams} from "react-router-dom";
import {Spinner} from "react-bootstrap";
import {getProvider} from "../utils/api/Providers";

function Provider(props) {
    const {providerId} = useParams();
    const [provider, setProvider] = useState({});
    const [init, setInit] = useState(false);

    useEffect(() => {
        if (providerId) {
            getProvider(providerId).then(currProvider => {
                document.title = currProvider.name;
                setProvider(currProvider);
                setInit(true);
            })
        }
    }, [providerId]);

    if (!init)
        return (
            <Fragment>
                <div className='text-center'><Spinner animation="border" variant='warning'/></div>
            </Fragment>
        )
    return (
        <Fragment>
            <div
                className="container"
                id="provider"
                style={{width: "40%"}}
            >
                <div className="row d-flex justify-content-center">
                    <img
                        src={provider.image}
                        alt={provider.name}
                    />
                </div>
                <div className="row text-end" style={{color: "#593C1C"}}>
                    <h6>since {new Date(provider.registryDate).getFullYear()}</h6>
                </div>
                <div className="row">
                    <h3>{provider.name}</h3>
                </div>
            </div>
            <div className="container" id="provided">
                <div className="row title align-items-center">
                    <h4>&nbsp; All provided commodities</h4>
                </div>
                <Commodities
                    commodities={provider.commodities}
                    itemsCount={props.buyList.itemsCount}
                    setCurrUser={props.setCurrUser}
                />
            </div>
        </Fragment>
    )
}

export default Provider;
