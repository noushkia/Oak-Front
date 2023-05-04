import React, {Fragment} from "react";
import Card from "../card/Card";
import {getInCart} from "../../utils/Cart";

function Commodities(props) {
    const commodities = Array.isArray(props.commodities) ? props.commodities : Object.values(props.commodities);

    return (
        <Fragment>
            <div className="container home">
                <div className="row justify-content-center">
                    {
                        commodities.map((commodity, index) => (
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

export default Commodities;
