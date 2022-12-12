import React, { useState } from "react";

import { updateWelcomeVideoApi } from "../../../utils/ApiCalls";
import {
	checkStatus,
	getGeneralApiParams,
} from "../../../utils/GeneralVariables";
import Loading from "../../../utils/Loading";
import CustomButton from "../../Misc/CustomButton";
import CustomInput from "../../Misc/CustomInput";
import Heading from "../../Misc/Heading";

const UpdateWelcomeVideoAPIComponent = () => {
	const [link, setLink] = useState("");
	const [loading, setLoading] = useState(false);
	function handleLink(e) {
		setLink(e.target.value);
	}

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		const { baseUrl, headers } = getGeneralApiParams();
		await updateWelcomeVideoApi(baseUrl, link, headers).then((response) => {
			setLoading(false);
			checkStatus(response);
		});
	};

	return (
		<section className="px-10">
			<Loading loading={loading} />
			{/* <Heading>Welcome Video Update</Heading> */}
			<form className="grid grid-cols-2 pt-6">
				<CustomInput
					heading={"Enter Video URL"}
					placeholder={"eg. http://youtube.com/video-link"}
					value={link}
					onChange={(e) => {
						handleLink(e);
					}}
				/>
				<div className="truncate">
					<CustomButton width={"1/3"} onClick={handleSubmit}>
						Update
					</CustomButton>
				</div>
			</form>
		</section>
	);
};

export default UpdateWelcomeVideoAPIComponent;
