import React, { useState } from "react";
import CustomButton from "../../Misc/CustomButton";
import CustomInput from "../../Misc/CustomInput";
import { productPositionDeleteAdminApi } from "../../../utils/ApiCalls";
import {
	checkStatus,
	getGeneralApiParams,
} from "../../../utils/GeneralVariables";
import CustomSelectInput from "../../Misc/CustomSelectInput";
import Heading from "../../Misc/Heading";

const ProductPositionDeleteAdminAPIComponent = () => {
	const [inputs, setInputs] = useState({
		id: 0,
		prodType: "cus",
		orderType: "delivery",
	});
	const { prodType, orderType, id } = inputs;

	const handleId = (e) => {
		setInputs({ ...inputs, id: e.target.value });
	};
	const handleProdType = (e) => {
		setInputs({ ...inputs, prodType: e.target.value });
	};
	const handleOrderType = (e) => {
		setInputs({ ...inputs, orderType: e.target.value });
	};

	const handleSubmit = async (e) => {
		const { baseUrl, headers } = getGeneralApiParams();

		await productPositionDeleteAdminApi(
			baseUrl,
			id,
			prodType,
			orderType,
			headers
		).then((response) => {
			checkStatus(response);
		});
	};
	return (
		<div>
			<form action="" method="submit">
				{/* <Heading>Product Position Delete</Heading> */}
				<CustomInput
					heading={"Enter Id"}
					placeholder={"Id"}
					position={"top"}
					type={"number"}
					min={0}
					value={id}
					onChange={handleId}
					required={true}
				/>
				<CustomSelectInput
					onChange={(e) => handleProdType(e)}
					heading={"Select Product Type"}
					values={["cus", "b2b"]}
					options={["Customer", "Bulk Buy"]}
				/>
				<CustomSelectInput
					onChange={(e) => handleOrderType(e)}
					heading={"Select Order Type"}
					values={["delivery", "pickup"]}
					options={["Delivery", "Pick up"]}
				/>

				<CustomButton onClick={handleSubmit} type={"submit"}>
					Save
				</CustomButton>
			</form>
		</div>
	);
};

export default ProductPositionDeleteAdminAPIComponent;
