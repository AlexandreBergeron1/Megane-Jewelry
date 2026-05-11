"use client"

import { useState } from "react";
import { useEffect } from "react";
import { useWixClient } from "@/context/wixContext";
import { usePathname } from "next/navigation";
import { LoginState } from "@wix/sdk";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

enum MODE {
    LOGIN="LOGIN",
    REGISTER="REGISTER",
    RESET_PASSWORD="RESET_PASSWORD",
    EMAIL_VERIFICATION="EMAIL_VERIFICATION"
}
const LoginPage = () => {

    const wixClient = useWixClient(); // guaranteed to be non-null
    const router = useRouter(); // add at top with other hooks
    const isLoggedIn = wixClient.auth.loggedIn();

    if (isLoggedIn) {
        router.push("/");
    }

    const [mode, setMode] = useState(MODE.LOGIN);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailCode, setEmailCode] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    const formTitle = mode===MODE.LOGIN ? "Log in" : mode===MODE.REGISTER ? "Register" : mode===MODE.RESET_PASSWORD ? "Reset Your Password" : "Verify your email"
    const buttonTitle = mode===MODE.LOGIN ? "Log in" : mode===MODE.REGISTER ? "Register" : mode===MODE.RESET_PASSWORD ? "Reset" : "Verify"


    const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
        let response;

        switch (mode) {
            case MODE.LOGIN:
                response = await wixClient.auth.login({ email, password });
                break;
            case MODE.REGISTER:
                response = await wixClient.auth.register({
                    email,
                    password,
                    profile: { nickname: username },
                });
                break;
            case MODE.RESET_PASSWORD:
                await wixClient.auth.sendPasswordResetEmail(email, window.location.href);
                setMessage("Password reset email sent. Please check your inbox.");
                setIsLoading(false);
                return;
            case MODE.EMAIL_VERIFICATION:
                response = await wixClient.auth.processVerification({
                    verificationCode: emailCode,
                });
                break;
            default:
                break;
        }

        switch (response?.loginState) {
            case LoginState.SUCCESS:
                setMessage("Succesful! You are being redirected.");
                console.log("sessionToken:", response.data.sessionToken);
                const tokens = await wixClient.auth.getMemberTokensForDirectLogin(response.data.sessionToken!);
                console.log(tokens);
                Cookies.set("refreshToken", JSON.stringify(tokens.refreshToken),{
                    expires:2
                })
                router.push("/");
                break;
            case LoginState.FAILURE:
                if (response.errorCode === "invalid" || response.errorCode === "invalidPassword"){
                    setError("Invalid email or password.");
                } else if (response.errorCode === "emailAlreadyExists") {
                    setError("Email already exists.");
                } else if (response.errorCode === "resetPassword"){
                    setError("You need to reset your password");
                } else {
                    setError("Something went wrong");
                }
                break;
            case LoginState.EMAIL_VERIFICATION_REQUIRED:
                setMode(MODE.EMAIL_VERIFICATION);
                break;
            case LoginState.OWNER_APPROVAL_REQUIRED:
                setMessage("Your account is pending approval");
            default:
                break;
        }
    } catch (err) {
        console.log(err);
        setError("Something went wrong!");
    } finally {
        setIsLoading(false);
    }
};

    return (
        <div className="my-12 px-4 md:px-8 lg:px-16 xl:32 2xl:px-64 flex items-center justify-right">
            <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
                <h1 className="text-2xl font-semibold">{formTitle}</h1>
                {mode===MODE.REGISTER ? (
                    <div className="flex flex-col gap-2">
                        <label className="text-sm text-black">Username</label>
                        <input type="text" name="username" placeholder="Your username" className="ring-1 ring-gray-500 rounded-md bg-transparent px-4 py-2" onChange={e=>setUsername(e.target.value)}/>
                    </div>
                ) : null}
                {mode !== MODE.EMAIL_VERIFICATION ? (
                    <div className="flex flex-col gap-2">
                        <label className="text-sm text-black">Email</label>
                        <input type="email" name="email" placeholder="youremail@gmail.com" className="ring-1 ring-gray-500 rounded-md bg-transparent px-4 py-2" onChange={e=>setEmail(e.target.value)}/>
                    </div>
                ) : (
                    <div className="flex flex-col gap-2">
                        <label className="text-sm text-black">Verification code</label>
                        <input type="text" name="email_code" placeholder="Code" className="ring-1 ring-gray-500 rounded-md bg-transparent px-4 py-2" onChange={e=>setEmailCode(e.target.value)}/>
                    </div>
                )}
                {mode === MODE.LOGIN || mode === MODE.REGISTER ? (
                    <div className="flex flex-col gap-2">
                        <label className="text-sm text-black">Password</label>
                        <input type="password" name="password" placeholder="Enter your password" className="ring-1 ring-gray-500 rounded-md bg-transparent px-4 py-2" onChange={e=>setPassword(e.target.value)}/>
                    </div>
                ) : null}
                {mode===MODE.LOGIN && <div className="text-sm underline cursor-pointer" onClick={() => setMode(MODE.RESET_PASSWORD)}>Forgot Password?</div>}
                <button className="bg-black text-white p-2 rounded-md disabled:bg-gray-400 disabled:cursor-not-allowed">
                    {isLoading ? "Loading..." : buttonTitle}
                </button>
                {error && <div className="txt-red-600">{error}</div>}
                {mode===MODE.LOGIN && (
                    <div className="text-sm underline cursor-pointer" onClick={() => setMode(MODE.REGISTER)}>{"Don't"} have an account?</div>
                )}
                {mode===MODE.REGISTER && (
                    <div className="text-sm underline cursor-pointer" onClick={() => setMode(MODE.LOGIN)}>Have an account?</div>
                )}
                {mode===MODE.RESET_PASSWORD && (
                    <div className="text-sm underline cursor-pointer" onClick={() => setMode(MODE.LOGIN)}>Go back to login</div>
                )}
                {message && <div className="text-green-600 text-sm">{message}</div>}
            </form>
        </div>
    )
} 

export default LoginPage