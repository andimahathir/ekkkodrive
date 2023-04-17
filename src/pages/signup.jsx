import React from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import "flowbite";
import { Amplify } from "aws-amplify";
import awsExports from "../aws-exports";
Amplify.configure({ ...awsExports, ssr: true });
import { Auth } from "aws-amplify";
import { useRouter } from "next/router";

export default function Signup() {
    const { push } = useRouter();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [confirmationCode, setConfirmationCode] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [confirmationSession, setConfirmationSession] = useState(false);

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

    async function HandleSubmit(event) {
        event.preventDefault();
        try {
            await Auth.signUp({
                username,
                password,
                attributes: {
                    email,
                },
            });
            setConfirmationSession(true);
        } catch (error) {
            console.log("error signing up:", error);
        }
    }

    async function HandleConfirmationSubmit(event) {
        event.preventDefault();
        try {
            await Auth.confirmSignUp(username, confirmationCode);
            push("/login");
        } catch (error) {
            console.log("error confirming sign up", error);
        }
    }

    return isLoggedIn ? (
        <div className="flex items-center justify-center h-screen bg-gray-900">
            <div role="status">
                <svg
                    aria-hidden="true"
                    className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
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
                <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen md:h-screen lg:py-0">
                    <a
                        href="#"
                        class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
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
                                Create an account
                            </h1>
                            {confirmationSession ? (
                                <form
                                    class="space-y-4 md:space-y-6"
                                    onSubmit={HandleConfirmationSubmit}
                                >
                                    <div>
                                        <label
                                            for="username"
                                            className="block mb-2 text-sm font-medium text-white"
                                        >
                                            Username
                                        </label>
                                        <input
                                            type="text"
                                            name="username"
                                            id="username"
                                            class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="yourusername"
                                            required=""
                                            value={username}
                                            onChange={(e) =>
                                                setUsername(e.target.value)
                                            }
                                        />
                                    </div>
                                    <div>
                                        <label
                                            for="confirmationcode"
                                            className="block mb-2 text-sm font-medium text-white"
                                        >
                                            Confirmation Code
                                        </label>
                                        <input
                                            type="number"
                                            name="confirmationcode"
                                            id="confirmationcode"
                                            class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="Check your email for the code"
                                            required=""
                                            value={confirmationCode}
                                            onChange={(e) =>
                                                setConfirmationCode(
                                                    e.target.value,
                                                )
                                            }
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                    >
                                        Submit Code
                                    </button>
                                    <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                                        Already have an account?{" "}
                                        <Link href={"/login"}>
                                            <span
                                                class="font-medium
                                        text-primary-600 hover:underline
                                        dark:text-primary-500"
                                            >
                                                Login Here
                                            </span>
                                        </Link>
                                    </p>
                                </form>
                            ) : (
                                <form
                                    class="space-y-4 md:space-y-6"
                                    onSubmit={HandleSubmit}
                                >
                                    <div>
                                        <label
                                            for="username"
                                            className="block mb-2 text-sm font-medium text-white"
                                        >
                                            Username
                                        </label>
                                        <input
                                            type="text"
                                            name="username"
                                            id="username"
                                            className="border sm:text-sm rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="yourusername"
                                            required=""
                                            value={username}
                                            onChange={(e) =>
                                                setUsername(e.target.value)
                                            }
                                        />
                                    </div>
                                    <div>
                                        <label
                                            for="email"
                                            className="block mb-2 text-sm font-medium text-white"
                                        >
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            id="email"
                                            className="border sm:text-sm rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="your@email.com"
                                            required=""
                                            value={email}
                                            onChange={(e) =>
                                                setEmail(e.target.value)
                                            }
                                        />
                                    </div>
                                    <div>
                                        <label
                                            for="password"
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
                                    <div>
                                        <label
                                            for="confirm-password"
                                            className="block mb-2 text-sm font-medium text-white"
                                        >
                                            Confirm password
                                        </label>
                                        <input
                                            type="password"
                                            name="confirm-password"
                                            id="confirm-password"
                                            placeholder="••••••••"
                                            className="border sm:text-sm rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                                            required=""
                                            value={passwordConfirmation}
                                            onChange={(e) =>
                                                setPasswordConfirmation(
                                                    e.target.value,
                                                )
                                            }
                                        />
                                    </div>
                                    <div class="flex items-start">
                                        <div class="flex items-center h-5">
                                            <input
                                                id="terms"
                                                aria-describedby="terms"
                                                type="checkbox"
                                                className="w-4 h-4 border  rounded focus:ring-3 bg-gray-700 border-gray-600 focus:ring-primary-600 ring-offset-gray-800"
                                                required=""
                                            />
                                        </div>
                                        <div class="ml-3 text-sm">
                                            <label
                                                for="terms"
                                                class="font-light text-gray-500 dark:text-gray-300"
                                            >
                                                I accept the{" "}
                                                <a
                                                    class="font-medium text-primary-600 hover:underline dark:text-primary-500"
                                                    href="#"
                                                >
                                                    Terms and Conditions
                                                </a>
                                            </label>
                                        </div>
                                    </div>
                                    <button
                                        type="submit"
                                        className="w-full items-center p-2 ml-1 text-sm rounded-lg focus:outline-none focus:ring-2 text-gray-400 hover:bg-gray-700 focus:ring-gray-600"
                                    >
                                        Create an account
                                    </button>
                                    <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                                        Already have an account?{" "}
                                        <Link href={"/login"}>
                                            <span
                                                class="font-medium
                                        text-primary-600 hover:underline
                                        dark:text-primary-500"
                                            >
                                                Login Here
                                            </span>
                                        </Link>
                                    </p>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </section>
            )
        </>
    );
}
