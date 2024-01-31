import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSignupMutation } from "../../redux/app/services/api";
import { setUser } from "../../redux/features/auth/userSlice";

export const SignupForm = () => {
    const dispatch = useDispatch();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [bio, setBio] = useState("");
    const [profilePicture, setProfilePicture] = useState("")
    const [signup] = useSignupMutation();
    const [usernameError, setUsernameError] = useState(null);
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

    const emailChangeHandler = (e) => {
        e.preventDefault();

        setEmail(e.target.value)
    }

    const firstNameChangeHandler = (e) => {
        e.preventDefault();

        setFirstName(e.target.value)
    }

    const lastNameChangeHandler = (e) => {
        e.preventDefault();

        setLastName(e.target.value)
    }

    const bioChangeHandler = (e) => {
        e.preventDefault();

        setBio(e.target.value)
    }

    const profilePictureChangeHandler = (e) => {
        e.preventDefault();

        setProfilePicture(e.target.value)
    }

    const signupSubmitFunction = async (e) => {
        e.preventDefault();

        const formState = {
            username,
            password,
            email,
            firstName,
            lastName,
            bio,
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
                            setUsernameError(error);
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
            <form onSubmit={signupSubmitFunction}>
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
                <label>
                    Email
                </label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => emailChangeHandler(e)}
                    required
                />
                <label>
                    First Name
                </label>
                <input
                    type="text"
                    value={firstName}
                    onChange={(e) => firstNameChangeHandler(e)}
                />
                <label>
                    Last Name
                </label>
                <input
                    type="text"
                    value={lastName}
                    onChange={(e) => lastNameChangeHandler(e)}
                />
                <label>
                    Bio
                </label>
                <input
                    type="text"
                    value={bio}
                    onChange={(e) => bioChangeHandler(e)}
                />
                <button type="submit">Register</button>
            </form>
        </div>
    )
}