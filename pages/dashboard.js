import React, { useState } from "react";
import GetAbundantCartReportsAPIComponent from "../components/EachAPI/downloads/GetAbundantCartReportsAPIComponent";
import GetOrdersReportsAPIComponent from "../components/EachAPI/downloads/GetOrdersReportsAPIComponent";
import GetProductReportsAPIComponent from "../components/EachAPI/downloads/GetProductReportsAPIComponent";
import GetUserReportsAPIComponent from "../components/EachAPI/downloads/GetUsersReportsAPIComponent";
import ImageUploadAPIComponent from "../components/EachAPI/ImageUploadAPIComponent";
import OfferSaveAPIComponent from "../components/EachAPI/OfferSaveAPIComponent";
import CustomImageInput from "../components/Misc/CustomImageInput";
import ProfileViewComponent from "../components/ProfileViewComponent";

const Dashboard = () => {
	const [profileDisplay, setProfileDisplay] = useState(false);
	return (
		<div>
			{/* <button onClick={()=>setProfileDisplay(!profileDisplay)}>XD</button> */}
			{/* <ProfileViewComponent profileDisplay={profileDisplay} setProfileDisplay={setProfileDisplay}/> */}
			{/* <ImageUploadAPIComponent/> */}
			{/* <OfferSaveAPIComponent /> */}
			{/* <GetUserReportsAPIComponent /> */}
			{/* <GetProductReportsAPIComponent /> */}
			{/* <GetOrdersReportsAPIComponent /> */}
			<GetAbundantCartReportsAPIComponent />
		</div>
	);
};

export default Dashboard;
