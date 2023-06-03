import {callBack, saveJWT} from "../utils/Session";

export default function Callback({loggedIn}) {
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get('code');

    if (!loggedIn) {
        callBack(code).then(jwt => {
            console.log(jwt)
            saveJWT(jwt);
        });
    }


    return (
        <></>
    );
}
