import React, { useState } from "react";
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
			<OfferSaveAPIComponent />
		</div>
	);
};

export default Dashboard;
