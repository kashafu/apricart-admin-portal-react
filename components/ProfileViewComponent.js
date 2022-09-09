import React, { useState, useEffect } from "react";
import Cookies from "universal-cookie";

const ProfileViewComponent = ({ profileDisplay, setProfileDisplay }) => {
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

	useEffect(() => {
		getUserData();
	}, []);

	return (
		<div className="fixed right-0">
			<div
				className={
					profileDisplay
						? "bg-gray-100 w-80 relative text-center h-screen rounded-tl-xl p-2"
						: "hidden"
				}
			>
				<div>{userData.userId}</div>
				<h2>{userData.userName}</h2>
				<div>{userData.email}</div>
				<div>+{userData.phoneNumber}</div>
				<div className="top-0 absolute">
					<button onClick={() => setProfileDisplay(!profileDisplay)}>
						<p className="text-[45px]">&gt;</p>
					</button>
				</div>
			</div>
		</div>
	);
};

export default ProfileViewComponent;
