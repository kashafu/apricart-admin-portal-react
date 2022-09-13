import React, { useState } from "react";
import { updateWelcomeVideoApi } from "../../../utils/ApiCalls";
import {
	checkStatus,
	getGeneralApiParams,
} from "../../../utils/GeneralVariables";
import CustomButton from "../../Misc/CustomButton";
import CustomInput from "../../Misc/CustomInput";

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
			<h2 className="font-nunito py-2">Update Welcome Video</h2>
			<CustomInput
				placeholder={"Enter Video URL"}
				position={"top"}
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
