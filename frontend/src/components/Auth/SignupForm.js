import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSignupMutation } from "../../redux/app/services/api";
import { setUser } from "../../redux/features/auth/userSlice";

export const LoginForm = () => {
    const dispatch = useDispatch();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [bio, setBio] = useState("");
    const [profilePicture, setProfilePicture] = useState("")
    const [signup] = useSignupMutation();
    const [usernameError, setusernameError] = useState(null);
    const [passwordError, setPasswordError] = useState(null);
    const navigate = useNavigate();

    const usernameChangeHandler = (e) => {
        e.preventDefault();

        setUsername(e.target.value)
    }

    const passwordChangeHandler = (e) => {
        e.preventDefault();

        setPassword(e.target.value)
    }

    const signupSubmitFunction = async (e) => {
        e.preventDefault();

        // console.log(formState)

        const formState = {
            username,
            password
        }

        try {
            const res = await signup(formState);
            await dispatch(setUser({ user: res?.data.user, token: res?.data.token }));
            await setUsernameError(null);
            await setPasswordError(null);
            await navigate("/")
        } catch (error) {
            const data = await error?.data?.errors
            console.log(error)
            if (data) {
                data?.forEach((error) => {
                    switch (error) {
                        case "The provided usernames were invalid.":
                            setUsernameError(error);
                            setPasswordError(error);
                            break;
                        case "Please provide a valid username.":
                            setusernameError(error);
                            break;
                        case "Please provide a valid password.":
                            setPasswordError(error)
                            break;
                        default:
                            break;
                    }
                })
            }
        }
    }

    return (
        <div>
            <form onSubmit={loginSubmitFunction}>
                <h2>{
                    usernameError ? <>{usernameError}</> : null
                }</h2>
                <label>
                    Username
                </label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => usernameChangeHandler(e)}
                    required
                />
                <h2> {
                    passwordError ? <>{passwordError}</> : null
                }</h2>
                <label>
                    Password
                </label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => passwordChangeHandler(e)}
                    required
                />
                <button type="submit">Log In</button>
            </form>
        </div>
    )
}