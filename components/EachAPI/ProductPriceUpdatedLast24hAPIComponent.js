import React, { useState } from "react";
import { productPriceUpdatedLast24HoursApi } from "../../utils/ApiCalls";
import { getGeneralApiParams } from "../../utils/GeneralVariables";
import CustomButton from "../Misc/CustomButton";
import CustomInput from "../Misc/CustomInput";

const ProductPriceUpdatedLast24hAPIComponent = () => {
	const [time, setTime] = useState(24);

	const handleTime = (e) => {
		setTime(e.target.value);
	};

	const handleSubmit = () => {
		const { baseUrl, headers } = getGeneralApiParams();
		productPriceUpdatedLast24HoursApi(baseUrl, time, headers);
	};
	return (
		<div>
			<form action="" method="submit"></form>
			<CustomInput
				value={time}
				onChange={(e) => handleTime(e)}
				position={"top"}
			/>
			<CustomInput
				value={`Products Updated in the last ${time} hours`}
				disabled={true}
				position={"bottom"}
			/>
			<CustomButton onClick={handleSubmit}>Fetch Product List</CustomButton>
		</div>
	);
};

export default ProductPriceUpdatedLast24hAPIComponent;
