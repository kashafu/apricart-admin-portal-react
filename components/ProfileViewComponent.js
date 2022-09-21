import Router, { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import {
	displaySuccessToast,
	logOutRemoveCookies,
} from "../utils/GeneralVariables";
import Loading from "../utils/Loading";
import CustomButton from "./Misc/CustomButton";

const ProfileViewComponent = ({ profileDisplay, setProfileDisplay }) => {
	const [loading, setLoading] = useState(false);
	const router = useRouter();
	const cookies = new Cookies();
	const [userData, setUserData] = useState({
		userName: "Loading",
		email: "Loading",
		phoneNumber: "Loading",
		userId: "Loading",
	});
	function getUserData() {
		cookies.get("cookies-token");
		setUserData({
			...userData,
			userId: cookies.get("cookies-userId"),
			email: cookies.get("cookies-email"),
			userName: cookies.get("cookies-name"),
			phoneNumber: cookies.get("cookies-phoneNumber"),
		});
	}
	const handleLogout = () => {
		setLoading(true);
		logOutRemoveCookies();
		displaySuccessToast("Logged Out");
		router.push("/login");
	};
	useEffect(() => {
		getUserData();
	}, []);

	return (
		<section className="fixed right-0 top-[3rem] h-[38rem] font-nunito z-50">
			<Loading loading={loading} />
			<div
				className={
					profileDisplay
						? "bg-main-blue-100 w-80 fixed animate-dropdown right-0 text-center h-screen rounded-tl-xl p-2 transition-all duration-250"
						: "fixed z-10 transition-all duration-300"
				}
			>
				<div>Account Id: {userData.userId}</div>
				<h2>{userData.userName}</h2>
				<div>{userData.email}</div>
				<div>+{userData.phoneNumber}</div>

				<div className="top-0 absolute">
					<button onClick={() => setProfileDisplay(!profileDisplay)}>
						<p className="text-[45px]">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="p-1 w-9 z-50 hover:scale-110 transition-all duration-300 fill-black mt-2 rounded-r-lg animate-swing"
								viewBox="0 0 448 512"
							>
								<path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
							</svg>
						</p>
					</button>
				</div>
				<CustomButton width={"1/3"} onClick={handleLogout}>
					Logout
				</CustomButton>
			</div>
			<div
				onClick={() => setProfileDisplay(false)}
				className={
					profileDisplay
						? "animate-dropdown right-[20rem] z-10 w-screen transition-all duration-300 fixed h-screen"
						: "transition-all duration-300 fixed -translate-x-[100rem]"
				}
			></div>
		</section>
	);
};

export default ProfileViewComponent;
