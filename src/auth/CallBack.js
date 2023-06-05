import {callBack, saveJWT} from "../utils/Session";
import {useNavigate} from "react-router-dom";

export default function Callback({loggedIn, setLoading}) {
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get('code');
    const navigate = useNavigate();

    if (!loggedIn) {
        callBack(code).then(jwt => {
            saveJWT(jwt);
            setLoading(true);
            navigate("/home");
        });
    }


    return (
        <></>
    );
}
