import {Fragment, useEffect} from "react";

function Provider(props) {
    useEffect(() => {
        document.title = props.provider.toString();
        return () => {
        };
    }, [props.currUser.username]);

    return (
        <Fragment>
        </Fragment>
    )
}

export default Provider;