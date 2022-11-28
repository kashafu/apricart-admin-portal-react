import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import {
	displaySuccessToast,
	logOutRemoveCookies,
} from "../utils/GeneralVariables";
import CustomButton from "./Misc/CustomButton";

const ProfileViewNewComponent = ({ profileDisplay, setProfileDisplay }) => {
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

	const { userId, email, userName, phoneNumber } = userData;

	return (
		<section
			onClick={() => setProfileDisplay(false)}
			className={
				profileDisplay
					? "fixed w-screen h-screen bg-transparent -z-10 top-12 -right-48"
					: "hidden"
			}
		>
			<aside className="fixed w-60 h-48 bg-slate-200 shadow-xl right-6 top-16 rounded-sm p-2 font-nunito text-center text-txt-dark">
				<div className="font-lato border-b-[1px] border-black p-0 bg-gray-900 text-txt-light">
					Account Information
				</div>
				<div className="relative">
					<div>{userName}</div>
					<div>{email}</div>
					<div className="grid grid-cols-3 grid-rows-4">
						<div></div>
						<div></div>
						<div></div>
						<div></div>
						<div>
							<CustomButton onClick={handleLogout}>Logout</CustomButton>
						</div>
					</div>
				</div>
			</aside>
		</section>
	);
};

export default ProfileViewNewComponent;
