import React, { useState } from "react";
import CustomButton from "../components/Misc/CustomButton";
import ProfileViewComponent from "../components/ProfileViewComponent";
import SideBar from "../components/SideBarComponent";

const Dashboard = () => {
	const [profileDisplay, setProfileDisplay] = useState(false);
	const [apiList, setApiList] = useState(false);
	const handleDisplay = () => {
		setProfileDisplay(!profileDisplay);
	};
	const handleApiList = () => {
		setApiList(!apiList);
	};

	return (
		<div className="flex">
			<SideBar apiList={apiList} setApiList={setApiList} />
			<CustomButton onClick={handleApiList} width={"1/4"}>
				Display API List
			</CustomButton>
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
