import React, { useState } from "react";
import CustomButton from "../components/Misc/CustomButton";
import ProfileViewComponent from "../components/ProfileViewComponent";

const Dashboard = () => {
	const [profileDisplay, setProfileDisplay] = useState(false);
	const handleDisplay = () => {
		setProfileDisplay(!profileDisplay);
	};

	return (
		<div className="flex">
			<CustomButton onClick={handleDisplay} width={"1/4"}>
				Display Profile
			</CustomButton>
			<ProfileViewComponent
				profileDisplay={profileDisplay}
				setProfileDisplay={setProfileDisplay}
			/>
		</div>
	);
};

export default Dashboard;
