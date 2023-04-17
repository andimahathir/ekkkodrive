import { useState, useEffect } from "react";
import Link from "next/link";
import "flowbite";
import { Amplify } from "aws-amplify";
import awsExports from "../aws-exports";
Amplify.configure({ ...awsExports, ssr: true });
import { Auth } from "aws-amplify";
import { useRouter } from "next/navigation";

export default function Login() {
    const { push } = useRouter();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [signInDisabled, setSignInDisabled] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        GetCurrentUser();
    }, []);

    async function GetCurrentUser() {
        try {
            const currentUser = await Auth.currentAuthenticatedUser();
            // setUser(currentUser);
            push("/");
        } catch (error) {
            console.log("Error getting current user: ", error);
            setIsLoggedIn(false);
        }
    }

    async function HandleSubmit(e) {
        e.preventDefault();
        try {
            setSignInDisabled(true);
            const user = await Auth.signIn(username, password);
            console.log("user", user);
            push("/");
        } catch (error) {
            setErrorMessage(error.message);
            setSignInDisabled(false);
        }
    }

    return isLoggedIn ? (
        <div className="flex items-center justify-center h-screen bg-gray-900">
            <div role="status">
                <svg
                    aria-hidden="true"
                    className="w-8 h-8 mr-2 animate-spin text-gray-600 fill-blue-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                    />
                    <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                    />
                </svg>
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    ) : (
        <>
            <section className="bg-gray-900">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen md:h-screen lg:py-0">
                    <a
                        href="#"
                        className="flex items-center mb-6 text-2xl font-semibold text-white"
                    >
                        <img
                            src="https://ekkko.com/html/images/logo/logo_over.png"
                            className="h-8 mr-3"
                            alt="Ekkko Logo"
                        />
                    </a>
                    <div className="w-full rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-white">
                                Sign in to your account
                            </h1>
                            {errorMessage && (
                                <div
                                    class="flex p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                                    role="alert"
                                >
                                    <svg
                                        aria-hidden="true"
                                        class="flex-shrink-0 inline w-5 h-5 mr-3"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fill-rule="evenodd"
                                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                                            clip-rule="evenodd"
                                        ></path>
                                    </svg>
                                    <div>
                                        <span class="font-medium">
                                            {errorMessage}
                                        </span>
                                    </div>
                                </div>
                            )}

                            <form
                                className="space-y-4 md:space-y-6"
                                onSubmit={HandleSubmit}
                            >
                                <div>
                                    <label
                                        htmlFor="username"
                                        className="block mb-2 text-sm font-medium text-white"
                                    >
                                        Username
                                    </label>
                                    <input
                                        type="username"
                                        name="username"
                                        id="username"
                                        className="border sm:text-sm rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="youusername"
                                        required=""
                                        value={username}
                                        onChange={(e) =>
                                            setUsername(e.target.value)
                                        }
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="password"
                                        className="block mb-2 text-sm font-medium text-white"
                                    >
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        name="password"
                                        id="password"
                                        placeholder="••••••••"
                                        className="border sm:text-sm rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                                        required=""
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                    />
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-start">
                                        <div className="flex items-center h-5">
                                            <input
                                                id="remember"
                                                aria-describedby="remember"
                                                type="checkbox"
                                                className="w-4 h-4 border  rounded focus:ring-3 bg-gray-700 border-gray-600 focus:ring-primary-600 ring-offset-gray-800"
                                                required=""
                                            />
                                        </div>
                                        <div className="ml-3 text-sm">
                                            <label
                                                htmlFor="remember"
                                                className="text-gray-300"
                                            >
                                                Remember me
                                            </label>
                                        </div>
                                    </div>
                                    {/* <a
                                        href="#"
                                        className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                                    >
                                        Forgot password?
                                    </a> */}
                                </div>
                                <button
                                    type="submit"
                                    disabled={signInDisabled}
                                    className="w-full items-center p-2 ml-1 text-sm rounded-lg focus:outline-none focus:ring-2 text-gray-400 hover:bg-gray-700 focus:ring-gray-600"
                                >
                                    Sign in
                                </button>
                                <p className="text-sm font-light text-gray-400">
                                    Don’t have an account yet?{" "}
                                    <Link href={"/signup"}>
                                        <span
                                            className="font-medium
                                        text-primary-500 hover:underline"
                                        >
                                            Sign up
                                        </span>
                                    </Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
