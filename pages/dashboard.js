import React, { useEffect, useState } from "react";
import CustomButton from "../components/Misc/CustomButton";
import ProfileViewComponent from "../components/ProfileViewComponent";
import SideBar from "../components/SideBarComponent";
import { getAllAPIsApi } from "../utils/ApiCalls";
import { checkStatus, getGeneralApiParams } from "../utils/GeneralVariables";

const Dashboard = () => {
	const [profileDisplay, setProfileDisplay] = useState(false);
	const [apiList, setApiList] = useState(false);
	const [allApis, setAllApis] = useState([]);
	const handleDisplay = () => {
		setProfileDisplay(!profileDisplay);
	};
	const handleApiList = () => {
		setApiList(!apiList);
	};

	const getSidebarItems = async () => {
		const { baseUrl, headers } = getGeneralApiParams();
		await getAllAPIsApi(baseUrl, headers).then((response) => {
			let status = checkStatus(response, "");
			status && console.log(response);
			status && setAllApis(response.data.data.apis);
		});
	};

	useEffect(() => {
		getSidebarItems();
	}, []);

	return (
		<div className="flex">
			<SideBar apiList={apiList} setApiList={setApiList} allApis={allApis} />
			<CustomButton onClick={handleApiList} width={"1/3"}>
				Display API List
			</CustomButton>
			<CustomButton onClick={handleDisplay} width={"1/3"}>
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
