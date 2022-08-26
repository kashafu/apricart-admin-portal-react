import React, { useState } from "react";
import { productPositionDetailApi } from "../../utils/ApiCalls";
import { getGeneralApiParams } from "../../utils/GeneralVariables";
import CustomButton from "../Misc/CustomButton";
import CustomInput from "../Misc/CustomInput";

const ProductPositionDetailAdminAPIComponent = () => {
	const [inputs, setInputs] = useState({
		prodType: "cus",
		orderType: "delivery",
		type: "Karachi",
	});
	const { text, prodType, orderType, type } = inputs;

	const handleText = (e) => {
		setInputs({ ...inputs, text: e.target.value });
	};
	const handleProdType = (e) => {
		setInputs({ ...inputs, prodType: e.target.value });
	};
	const handleOrderType = (e) => {
		setInputs({ ...inputs, orderType: e.target.value });
	};
	const handleType = (e) => {
		setInputs({ ...inputs, type: e.target.value });
	};

	const handleSubmit = async (e) => {
		const { baseUrl, headers } = getGeneralApiParams();

		await productPositionDetailApi(
			baseUrl,
			prodType,
			orderType,
			type,
			headers
		).then((response) => console.log(response));
	};
	return (
		<div>
			<select
				className="appearance-none rounded-none relative block w-full px-3 py-2 border border-t-[1px] rounded-t-xl border-black text-gray-900  focus:outline-none focus:ring-main-blue focus:border-main-blue focus:z-10 sm:text-sm placeholder-txt-dark"
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

			<select
				className="appearance-none rounded-none relative block w-full px-3 py-2 rounded-b-xl border border-t-0 border-black text-gray-900  focus:outline-none focus:ring-main-blue focus:border-main-blue focus:z-10 sm:text-sm placeholder-txt-dark"
				placeholder="Product Type"
				onChange={(e) => handleType(e)}
			>
				<option value="brand">Brand</option>
				<option value="sku">SKU</option>
			</select>
			<CustomButton onClick={handleSubmit} type={"submit"}>
				Submit Message
			</CustomButton>
		</div>
	);
};

export default ProductPositionDetailAdminAPIComponent;
