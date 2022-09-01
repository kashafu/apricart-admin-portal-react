import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { productPriceUpdatedLast24HoursApi } from "../../../utils/ApiCalls";
import { getGeneralApiParams } from "../../../utils/GeneralVariables";
import Loading from "../../../utils/Loading";
import CustomButton from "../../Misc/CustomButton";
import CustomInput from "../../Misc/CustomInput";

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
			toast.info(
				"File will begin downloading shortly, you may click the Download button again in a couple seconds if it does not start",
				{
					position: "top-center",
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					draggable: true,
					theme: "dark",
					toastId: "XD",
				}
			);
			setLoading(false);
			setTimeout(() => {
				setDisabler(false);
			}, 8000);
		});
	};
	return (
		<div>
			<Loading loading={loading} />
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
			<CustomButton onClick={handleSubmit} width={"1/3"} disabled={disabler}>
				Fetch Product List
			</CustomButton>
		</div>
	);
};

export default ProductPriceUpdatedLast24hAPIComponent;
