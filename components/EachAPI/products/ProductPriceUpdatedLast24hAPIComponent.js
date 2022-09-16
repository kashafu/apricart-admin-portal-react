import React, { useState } from "react";

import { productPriceUpdatedLast24HoursApi } from "../../../utils/ApiCalls";
import {
	displayInfoToast,
	getGeneralApiParams,
} from "../../../utils/GeneralVariables";
import Loading from "../../../utils/Loading";
import CustomButton from "../../Misc/CustomButton";
import CustomInput from "../../Misc/CustomInput";
import Heading from "../../Misc/Heading";

const ProductPriceUpdatedLast24hAPIComponent = () => {
	const [time, setTime] = useState(24);
	const [disabler, setDisabler] = useState(false);
	const [loading, setLoading] = useState(false);

	const handleTime = (e) => {
		setTime(e.target.value);
	};

	const handleSubmit = () => {
		const { baseUrl, headers } = getGeneralApiParams();
		productPriceUpdatedLast24HoursApi(baseUrl, time, headers).then(() => {
			setDisabler(true);
			displayInfoToast(
				"File will begin downloading shortly, you may click the Download button again in a couple seconds if it does not start",
				5000
			);
			setLoading(false);
			setTimeout(() => {
				setDisabler(false);
			}, 8000);
		});
	};
	return (
		<section>
			<Loading loading={loading} />
			<Heading>Product Prices updated in the last {time} hours</Heading>
			<form action="" method="submit"></form>
			<CustomInput
				heading={"Time in hours"}
				value={time}
				onChange={(e) => handleTime(e)}
			/>
			<CustomButton onClick={handleSubmit} width={"1/3"} disabled={disabler}>
				Fetch Product List
			</CustomButton>
		</section>
	);
};

export default ProductPriceUpdatedLast24hAPIComponent;
