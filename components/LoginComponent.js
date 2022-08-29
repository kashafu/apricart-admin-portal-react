import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import logoFile from "../public/logo.png";
import { loginApi, resetPasswordApi, sendOtpApi } from "../utils/ApiCalls";
import { getGeneralApiParams } from "../utils/GeneralVariables";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
	let noDuplicate = {
		num: "noNumDuplicate",
		pw: "noPwDuplicate",
		success: "noSuccDuplicate",
		auth: "noAuthDuplicate",
	};
	var numberToSend;
	const [phoneNumber, setPhoneNumber] = useState("");
	const [password, setPassword] = useState("");
	const [resetPw, setResetPw] = useState(false);
	const [OTP, setOTP] = useState("");
	const [newPW, setNewPW] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	const router = useRouter();

	const { baseUrl, city, userId, headers } = getGeneralApiParams();

	const submitLogin = async (e) => {
		e.preventDefault();
		await loginApi(
			baseUrl,
			city,
			userId,
			phoneNumber,
			password,
			setErrorMessage,
			router,
			headers
		).then((response) => {
			if (response.data.status === 2) {
				toast.error(response.data.message, {
					position: "top-center",
					autoClose: 1800,
					hideProgressBar: false,
					closeOnClick: true,
					draggable: true,
					theme: "dark",
					toastId: noDuplicate.auth,
				});
			} else if (response.status === 200) {
				response.data.status === 0 &&
					toast.error(response.data.message, {
						position: "top-center",
						autoClose: 1800,
						hideProgressBar: false,
						closeOnClick: true,
						draggable: true,
						theme: "dark",
						toastId: noDuplicate.auth,
					});
				response.data.status === 1 &&
					toast.success("Login Successful", {
						position: "top-center",
						autoClose: 600,
						hideProgressBar: false,
						closeOnClick: true,
						draggable: true,
						theme: "dark",
						toastId: noDuplicate.succ,
					});
			} else {
				toast.error(response?.data?.err?.response?.data?.message, {
					position: "top-center",
					autoClose: 1800,
					hideProgressBar: false,
					closeOnClick: true,
					draggable: true,
					theme: "dark",
					toastId: noDuplicate.auth,
				});
			}
		});
	};
	const callOTPApi = async () => {
		numberToSend = prompt("Please Enter Your phone number", "3030000151");
		await sendOtpApi(baseUrl, numberToSend, headers);
	};
	const resetPasswordFunc = () => {
		setResetPw(true);
		callOTPApi();
	};
	const submitResetPassword = async () => {
		resetPasswordApi(baseUrl, numberToSend, newPW, OTP, headers);
	};

	return (
		<>
			{/* MODAL RESET PASSWORD */}
			<div
				className={
					resetPw ? " top-0 animate-dropdown transition-all" : "hidden"
				}
			>
				<div
					className={
						resetPw
							? "translate-x-[33%] translate-y-[10%] block overflow-y-auto overflow-x-hidden z-50 w-full md:inset-0"
							: "hidden"
					}
				>
					<div className="relative p-4 w-full max-w-md h-full md:h-auto">
						<div className="relative bg-white rounded-lg  dark:bg-gray-700">
							<button
								type="button"
								className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
								onClick={() => setResetPw(false)}
							>
								<svg
									className="w-6"
									fill="currentColor"
									viewBox="0 0 20 20"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"></path>
								</svg>
								{/* <span className="sr-only">Close modal</span> */}
							</button>
							<div className="py-6 px-6 lg:px-8">
								<h2 className="mb-6 text-center text-3xl font-extrabold text-gray-900">
									Reset your Password
								</h2>
								<form className="space-y-6" action="#">
									<div className="rounded-md -space-y-px">
										<div>
											<input
												value={OTP}
												onChange={(e) => setOTP(e.target.value)}
												type="number"
												required
												className="appearance-none rounded-none relative block w-full px-3 py-2 border border-black text-gray-900 rounded-t-xl focus:outline-none focus:ring-main-blue focus:border-main-blue focus:z-10 sm:text-sm placeholder-txt-dark"
												placeholder="OTP"
											/>
										</div>
										<div>
											<input
												value={newPW}
												onChange={(e) => setNewPW(e.target.value)}
												type="password"
												required
												className="appearance-none rounded-none relative block w-full px-3 py-2 border border-black text-gray-900 rounded-b-xl focus:outline-none focus:ring-main-blue focus:border-main-blue focus:z-10 sm:text-sm placeholder-txt-dark"
												placeholder="New Password"
											/>
										</div>
									</div>
									<div className="flex justify-between">
										<div className="flex items-start"></div>
									</div>
									<div>
										<button
											type="submit"
											onClick={(e) => submitResetPassword(e)}
											className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-main-blue hover:bg-indigo-800 duration-300 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-main-blue"
										>
											Reset Password
										</button>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Login Component */}

			<div
				className={
					resetPw
						? "animate-hideup hidden"
						: "animate-dropdown transition-all min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
				}
			>
				<div className="max-w-md w-full space-y-8">
					<div>
						<div className="flex justify-center items-center">
							<div className="w-44">
								<Image
									src={logoFile}
									alt={"apricart logo"}
									layout="responsive"
								/>
							</div>
						</div>
						<h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
							Sign in to your account
						</h2>
						<p className="mt-2 text-center text-sm text-gray-600"></p>
					</div>
					<form className="mt-8 space-y-6" action="#" method="submit">
						<div className="rounded-md -space-y-px">
							<div>
								<input
									value={phoneNumber}
									onChange={(e) => setPhoneNumber(e.target.value)}
									type="number"
									required
									className="appearance-none rounded-none relative block w-full px-3 py-2 border border-black text-gray-900 rounded-t-xl focus:outline-none focus:ring-main-blue focus:border-main-blue focus:z-10 sm:text-sm placeholder-txt-dark"
									placeholder="Phone Number eg. 3030110220"
								/>
							</div>
							<div>
								<input
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									type="password"
									required
									className="appearance-none rounded-none relative block w-full px-3 py-2 border border-black text-gray-900 rounded-b-xl focus:outline-none focus:ring-main-blue focus:border-main-blue focus:z-10 sm:text-sm placeholder-txt-dark"
									placeholder="Password"
								/>
							</div>
						</div>

						<div className="flex items-center justify-between">
							<div className=""></div>
							<div className="text-sm">
								<a
									href="#"
									className="font-medium text-main-blue hover:text-main-blue"
									onClick={resetPasswordFunc}
								>
									Reset your password
								</a>
							</div>
						</div>
						<div>
							<button
								type="submit"
								onClick={(e) => submitLogin(e)}
								className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-main-blue hover:bg-indigo-800 duration-300 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-main-blue"
							>
								Sign in
							</button>
						</div>
					</form>
				</div>
			</div>
		</>
	);
};

export default Login;
