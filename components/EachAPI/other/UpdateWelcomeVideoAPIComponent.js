import React, { useState } from "react";

import { updateWelcomeVideoApi } from "../../../utils/ApiCalls";
import {
	checkStatus,
	getGeneralApiParams,
} from "../../../utils/GeneralVariables";
import CustomButton from "../../Misc/CustomButton";
import CustomInput from "../../Misc/CustomInput";
import Heading from "../../Misc/Heading";

const UpdateWelcomeVideoAPIComponent = () => {
	const [link, setLink] = useState("");
	function handleLink(e) {
		setLink(e.target.value);
	}

	const handleSubmit = async (e) => {
		const { baseUrl, headers } = getGeneralApiParams();
		await updateWelcomeVideoApi(baseUrl, link, headers).then((response) =>
			checkStatus(response)
		);
	};

	return (
		<div>
			<Heading>Update Welcome Video</Heading>
			<CustomInput
				heading={"Enter Video URL"}
				placeholder={"eg. http://youtube.com/video-link"}
				value={link}
				onChange={(e) => {
					handleLink(e);
				}}
			/>
			<CustomButton width={"1/3"} onClick={handleSubmit}>
				Update Welcome Video
			</CustomButton>
		</div>
	);
};

export default UpdateWelcomeVideoAPIComponent;
