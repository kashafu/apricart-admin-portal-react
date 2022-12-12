import React, { useState } from "react";

import { csrOrderCancelApi } from "../../../utils/ApiCalls";
import {
	checkStatus,
	getGeneralApiParams,
} from "../../../utils/GeneralVariables";
import Loading from "../../../utils/Loading";
import CustomButton from "../../Misc/CustomButton";
import CustomInput from "../../Misc/CustomInput";

const CsrOrderCompleteAPIComponent = () => {
	const [inputs, setInputs] = useState({
		apiToken: "a45fj5k3hnfj5989jnh",
		orderId: "0022324152646275,0092231818484895",
	});
	const [loading, setLoading] = useState(false);
	const { apiToken, orderId } = inputs;
	const handleOrderId = (e) => {
		setInputs({ ...inputs, orderId: e.target.value });
	};
	const handleApiToken = (e) => {
		setInputs({ ...inputs, apiToken: e.target.value });
	};
	const handleSubmit = async (e) => {
		setLoading(true);
		const { baseUrl, headers } = getGeneralApiParams();
		let encodedOrderId = encodeURI(orderId);
		await csrOrderCancelApi(baseUrl, apiToken, encodedOrderId, headers).then(
			(response) => {
				// setDetail([response.data.data[0]]);
				checkStatus(response);
				setLoading(false);
			}
		);
	};
	return (
		<div>
			<Loading loading={loading} />
			<CustomInput
				type={"text"}
				placeholder={"API Token"}
				position={"top"}
				value={apiToken}
				onChange={handleApiToken}
			/>
			<CustomInput
				type={"text"}
				placeholder={"Order Id"}
				position={"bottom"}
				value={orderId}
				onChange={handleOrderId}
			/>
			<CustomButton width={"1/3"} onClick={handleSubmit}>
				Submit
			</CustomButton>
		</div>
	);
};

export default CsrOrderCompleteAPIComponent;
