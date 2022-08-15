import React, { useState, useEffect } from "react";
import Cookies from "universal-cookie";

const ProfileViewComponent = ({profileDisplay, setProfileDisplay}) => {
	const cookies = new Cookies();
	const [userData, setUserData] = useState({
		userName: "Loading",
		email: "Loading",
		phoneNumber: "Loading",
		userId: "Loading",
	});
	function getUserData() {
		console.log("Funct called");
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
			
		<div className={profileDisplay ? "bg-yellow-500 w-80 relative text-center h-screen rounded-tl-xl p-2" : "hidden"}>
			<div>{userData.userId}</div>
			<h2>{userData.userName}</h2>
			<div>{userData.email}</div>
			<div>+{userData.phoneNumber}</div>
			<div className="bg-red-300 absolute">
				<button onClick={()=>setProfileDisplay(!profileDisplay)}>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" className="w-8"><path d="M224 480c-8.188 0-16.38-3.125-22.62-9.375l-192-192c-12.5-12.5-12.5-32.75 0-45.25l192-192c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L77.25 256l169.4 169.4c12.5 12.5 12.5 32.75 0 45.25C240.4 476.9 232.2 480 224 480z"/></svg>
				</button>
			</div>
		</div>
		</div>
	);
};

export default ProfileViewComponent;
