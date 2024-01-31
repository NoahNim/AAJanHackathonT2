import { LogoutButton } from "../Auth/LogoutButton"
import { useSelector } from "react-redux";

export const Home = () => {
    const currentUser = useSelector((state) => state?.auth?.user)

    console.log(currentUser)

    return (
        <div>
            <p>homepage</p>
            {currentUser !== null ? <div><LogoutButton /></div> : <></>}
        </div>
    )
}