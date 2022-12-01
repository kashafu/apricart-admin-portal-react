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
					? "fixed w-screen h-screen bg-transparent -z-10 top-12 left-0"
					: "hidden"
			}
		>
			<aside className="fixed w-60 min-h-min bg-white shadow-xl right-6 top-16 rounded-sm p-2 font-nunito text-left text-txt-dark">
				<div className="font-nunito border-black px-2 text-txt-dark font-semibold">
					<h4 className="text-base">ACCOUNT</h4>
				</div>
				<div className="relative">
					<div className="p-2">
						<p className="text-base">{userName}</p>
					</div>

					<div
						onClick={handleLogout}
						className="border-t-[1px] border-gray-300 hover:bg-gray-300 cursor-pointer"
					>
						<div className="text-txt-dark w-full p-2">
							{/* <CustomButton onClick={handleLogout}>Logout</CustomButton> */}
							<button className="text-base">Sign Out</button>
						</div>
					</div>
				</div>
			</aside>
		</section>
	);
};

export default ProfileViewNewComponent;
