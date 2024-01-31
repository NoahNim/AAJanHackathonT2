import { useDispatch } from "react-redux";
import { useLogoutMutation } from "../../redux/app/services/api";
import { removeUser } from "../../redux/features/auth/userSlice";

export const LogoutButton = () => {
    const dispatch = useDispatch();
    const [logout] = useLogoutMutation();

    const logoutHandler = async (event) => {
        event.preventDefault();

        const res = await logout().unwrap();

        if (res.message === 'success') {
            dispatch(removeUser());
        }
    }

    return <button onClick={logoutHandler}>Logout</button>
}