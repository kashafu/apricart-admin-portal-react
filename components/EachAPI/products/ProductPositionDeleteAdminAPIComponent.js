import React, { useState } from "react";
import { productPositionDeleteAdminApi } from "../../utils/ApiCalls";
import { getGeneralApiParams } from "../../utils/GeneralVariables";
import CustomButton from "../Misc/CustomButton";
import CustomInput from "../Misc/CustomInput";

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
	console.log(inputs);

	const handleSubmit = async (e) => {
		const { baseUrl, headers } = getGeneralApiParams();

		await productPositionDeleteAdminApi(
			baseUrl,
			id,
			prodType,
			orderType,
			headers
		).then((response) => console.log(response));
	};
	return (
		<div>
			<CustomInput
				position={"top"}
				type={"number"}
				min={0}
				value={id}
				onChange={handleId}
				required={true}
			/>
			<select
				className="appearance-none rounded-none relative block w-full px-3 py-2 border border-t-0 border-black text-gray-900  focus:outline-none focus:ring-main-blue focus:border-main-blue focus:z-10 sm:text-sm placeholder-txt-dark"
				placeholder="Product Type"
				onChange={(e) => handleProdType(e)}
			>
				<option disabled>Product Type</option>
				<option value="cus">Customer (cus)</option>
				<option value="b2b">Bulk Buy (b2b)</option>
			</select>

			<select
				className="appearance-none rounded-none relative block w-full px-3 py-2 border border-t-0 border-black text-gray-900  focus:outline-none focus:ring-main-blue focus:border-main-blue focus:z-10 sm:text-sm placeholder-txt-dark"
				placeholder="Product Type"
				onChange={(e) => handleOrderType(e)}
			>
				<option disabled defaultChecked>
					Order Type
				</option>
				<option value="delivery">Delivery</option>
				<option value="pickup">Pick up</option>
			</select>

			<CustomButton onClick={handleSubmit} type={"submit"}>
				Submit Message
			</CustomButton>
		</div>
	);
};

export default ProductPositionDeleteAdminAPIComponent;
