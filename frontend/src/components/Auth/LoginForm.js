import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../redux/app/services/api";
import { setUser } from "../../redux/features/auth/userSlice";

export const LoginForm = () => {
    const dispatch = useDispatch();
    const [credential, setCredential] = useState("");
    const [password, setPassword] = useState("")
    const [login] = useLoginMutation();
    const [credentialError, setCredentialError] = useState(null);
    const [passwordError, setPasswordError] = useState(null);
    const navigate = useNavigate();

    const usernameChangeHandler = (e) => {
        e.preventDefault();

        setCredential(e.target.value)
    }

    const passwordChangeHandler = (e) => {
        e.preventDefault();

        setPassword(e.target.value)
    }

    const loginSubmitFunction = async (e) => {
        e.preventDefault();

        // console.log(formState)

        const formState = {
            credential,
            password
        }

        try {
            const res = await login(formState);
            await dispatch(setUser({ user: res?.data.user, token: res?.data.token }));
            await setCredentialError(null);
            await setPasswordError(null);
            await navigate("/")
        } catch (error) {
            const data = await error?.data?.errors
            console.log(error)
            if (data) {
                data?.forEach((error) => {
                    switch (error) {
                        case "The provided credentials were invalid.":
                            setCredentialError(error);
                            setPasswordError(error);
                            break;
                        case "Please provide a valid username.":
                            setCredentialError(error);
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
                    credentialError ? <>{credentialError}</> : null
                }</h2>
                <label>
                    Username
                </label>
                <input
                    type="text"
                    value={credential}
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