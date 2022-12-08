import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";

import { loginApi, resetPasswordApi, sendOtpApi } from "../utils/ApiCalls";
import Loading from "../utils/Loading";
import {
	displayErrorToast,
	displaySuccessToast,
	getGeneralApiParams,
} from "../utils/GeneralVariables";

import logoFile from "../public/logo.png";
// import backgroundVideo from "../public/warehouseVideo.mp4"
import backgroundImage from "../public/forklift-loop.gif"

const Login = () => {
	var numberToSend;
	const router = useRouter();

	const [phoneNumber, setPhoneNumber] = useState("");
	const [password, setPassword] = useState("");
	const [OTP, setOTP] = useState("");
	const [newPW, setNewPW] = useState("");
	const [loading, setLoading] = useState(false);
	const [viewState, setViewState] = useState('login')

	const { baseUrl, city, userId, headers } = getGeneralApiParams();

	const submitLogin = async (e) => {
		setLoading(true);
		e.preventDefault();
		await loginApi(
			baseUrl,
			city,
			userId,
			phoneNumber,
			password,
			router,
			headers
		).then((response) => {
			setLoading(false);
			if (response.data.status === 2) {
				displayErrorToast(response.data.message, 1800);
			} else if (response.status === 200) {
				response.data.status === 0 &&
					displayErrorToast(response.data.message, 1800);
				response.data.status === 1 &&
					displaySuccessToast("Login Successful", 1500);
			} else {
				displayErrorToast(response?.data?.err?.response?.data?.message, 1800);
			}
		});
	};
	const callOTPApi = async () => {
		numberToSend = prompt("Please Enter Your phone number", "eg. 3030000151");
		await sendOtpApi(baseUrl, numberToSend, headers);
	};
	const resetPasswordFunc = () => {
		callOTPApi();
	};
	const submitResetPassword = async () => {
		resetPasswordApi(baseUrl, numberToSend, newPW, OTP, headers);
	};

	return (
		<>
			<Loading loading={loading} />

			{/* MAIN DIV */}
			<div className="w-full h-full flex flex-row-reverse">
				{/* LOGIN AND RESET PASSWORD DIV */}
				<div className="w-full lg:w-1/3 h-full flex flex-col items-center justify-center bg-gray-50">
					<div className="w-3/4">
						{/* LOGIN */}
						{viewState === 'login' && (
							<div className="animate-dropdown w-full flex flex-col justify-center items-center space-y-8">
								<p className="text-2xl font-nunito font-extrabold text-center text-gray-900">
									WELCOME TO APRICART ADMIN PORTAL
								</p>
								<div className="w-1/2">
									<Image
										src={logoFile}
										alt={"apricart logo"}
										layout="responsive"
									/>
								</div>
								<form className="space-y-4 w-full flex flex-col" action="#" method="submit">
									<div className="rounded-md -space-y-px">
										<input
											value={phoneNumber}
											onChange={(e) => setPhoneNumber(e.target.value)}
											type="number"
											required
											className="appearance-none rounded-none relative block w-full px-3 py-2 border border-black text-gray-900 rounded-t-xl focus:outline-none focus:ring-main-blue focus:border-main-blue focus:z-10 sm:text-sm placeholder-txt-dark"
											placeholder="Phone Number eg. 3030110220"
										/>
										<input
											value={password}
											onChange={(e) => setPassword(e.target.value)}
											type="password"
											required
											className="appearance-none rounded-none relative block w-full px-3 py-2 border border-black text-gray-900 rounded-b-xl focus:outline-none focus:ring-main-blue focus:border-main-blue focus:z-10 sm:text-sm placeholder-txt-dark"
											placeholder="Password"
										/>
									</div>
									<button
										type="submit"
										onClick={(e) => submitLogin(e)}
										className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-main-blue hover:bg-indigo-800 duration-300 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-main-blue"
									>
										Sign in
									</button>
									<div className="w-full text-right">
										<button
											className="font-medium text-sm text-main-blue hover:text-main-blue"
											onClick={() => {
												resetPasswordFunc()
												setViewState('forgot')
											}}
										>
											Reset your password
										</button>
									</div>
								</form>
							</div>
						)}
						{/* RESET PASSWORD */}
						{viewState === 'forgot' && (
							<div className="animate-dropdown w-full flex flex-col justify-center items-center space-y-8">
								<div className="w-1/2">
									<Image
										src={logoFile}
										alt={"apricart logo"}
										layout="responsive"
									/>
								</div>
								<p className="text-2xl font-nunito font-extrabold text-center text-gray-900">
									RESET PASSWORD
								</p>
								<form className="space-y-6 flex flex-col w-full" action="#">
									<div className="rounded-md -space-y-px">
										<input
											value={OTP}
											onChange={(e) => setOTP(e.target.value)}
											type="number"
											required
											className="appearance-none rounded-none relative block w-full px-3 py-2 border border-black text-gray-900 rounded-t-xl focus:outline-none focus:ring-main-blue focus:border-main-blue focus:z-10 sm:text-sm placeholder-txt-dark"
											placeholder="OTP"
										/>
										<input
											value={newPW}
											onChange={(e) => setNewPW(e.target.value)}
											type="password"
											required
											className="appearance-none rounded-none relative block w-full px-3 py-2 border border-black text-gray-900 rounded-b-xl focus:outline-none focus:ring-main-blue focus:border-main-blue focus:z-10 sm:text-sm placeholder-txt-dark"
											placeholder="New Password"
										/>
									</div>
									<div className="w-full text-right">
										<button
											className="font-medium text-sm text-main-blue hover:text-main-blue"
											onClick={() => {
												setViewState('login')
											}}
										>
											Go back to login
										</button>
									</div>
									<button
										type="submit"
										onClick={(e) => submitResetPassword(e)}
										className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-main-blue hover:bg-indigo-800 duration-300 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-main-blue"
									>
										Reset Password
									</button>
								</form>
							</div>
						)}
					</div>
				</div>
				{/* IMAGE DIV */}
				<div className="hidden lg:flex lg:w-2/3 h-full relative bg-blue-400">
					<Image
						alt="background image"
						src={backgroundImage}
						layout='fill'
						objectFit="cover"
					/>
				</div>
			</div>
		</>
	);

};

export default Login;
