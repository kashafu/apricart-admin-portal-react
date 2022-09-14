import Router, { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import {
	displaySuccessToast,
	logOutRemoveCookies,
} from "../utils/GeneralVariables";
import CustomButton from "./Misc/CustomButton";

const ProfileViewComponent = ({ profileDisplay, setProfileDisplay }) => {
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
		logOutRemoveCookies();
		displaySuccessToast("Logged Out");
		router.push("/login");
	};
	useEffect(() => {
		getUserData();
	}, []);

	return (
		<section className="fixed right-0 top-[3.05rem] font-nunito z-50">
			<div
				className={
					profileDisplay
						? "bg-main-blue-100 w-80 fixed animate-dropdown right-0 text-center h-screen rounded-tl-xl p-2 transition-all duration-250"
						: "fixed z-10 transition-all duration-300"
				}
			>
				<div>{userData.userId}</div>
				<h2>{userData.userName}</h2>
				<div>{userData.email}</div>
				<div>+{userData.phoneNumber}</div>

				<div className="top-0 absolute">
					<CustomButton onClick={() => setProfileDisplay(!profileDisplay)}>
						<p className="text-[45px]">&gt;</p>
					</CustomButton>
				</div>
				<CustomButton width={"1/3"} onClick={handleLogout}>
					Logout
				</CustomButton>
			</div>
		</section>
	);
};

export default ProfileViewComponent;
