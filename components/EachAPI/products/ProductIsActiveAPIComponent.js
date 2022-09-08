import React, { useState } from "react";

import { productIsActiveApi } from "../../../utils/ApiCalls";
import {
	checkStatus,
	getGeneralApiParams,
} from "../../../utils/GeneralVariables";
import Loading from "../../../utils/Loading";
import CustomButton from "../../Misc/CustomButton";
import CustomInput from "../../Misc/CustomInput";

const ProductIsActiveAPIComponent = () => {
	const [inputs, setInputs] = useState({
		id: "APRA-OB05-01",
		state: "yes",
		warehouseId: "",
	});
	const [loading, setLoading] = useState(false);
	const { id, state, warehouseId } = inputs;
	const handleId = (e) => {
		setInputs({ ...inputs, id: e.target.value });
	};
	const handleState = (e) => {
		setInputs({ ...inputs, state: e.target.value });
	};
	const handleWarehouse = (e) => {
		setInputs({ ...inputs, warehouseId: e.target.value });
	};
	const handleSubmit = async (e) => {
		setLoading(true);
		const { baseUrl, headers } = getGeneralApiParams();
		await productIsActiveApi(baseUrl, id, state, warehouseId, headers).then(
			(response) => {
				console.log(response);
				checkStatus(response);
				setLoading(false);
			}
		);
	};

	return (
		<section>
			<h1>Product Active Inactive</h1>
			<Loading loading={loading} />
			<CustomInput
				position={"top"}
				type={"text"}
				value={id}
				onChange={handleId}
				required={true}
				placeholder={"Enter SKU"}
			/>
			<select
				value={state}
				className="appearance-none rounded-none relative block w-full px-3 py-2 border border-t-0 border-black text-gray-900  focus:outline-none focus:ring-main-blue focus:border-main-blue focus:z-10 sm:text-sm placeholder-txt-dark"
				placeholder="Product Type"
				onChange={(e) => handleState(e)}
			>
				<option value="true">Yes</option>
				<option value="false">No</option>
			</select>
			<CustomInput
				type={"number"}
				position={"bottom"}
				min={0}
				value={warehouseId}
				onChange={handleWarehouse}
				required={true}
				placeholder={"Warehouse Number"}
			/>
			<CustomButton onClick={handleSubmit} type={"submit"}>
				Submit Query
			</CustomButton>
		</section>
	);
};

export default ProductIsActiveAPIComponent;
