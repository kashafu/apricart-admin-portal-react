import React, { useState } from "react";

import { productIsActiveApi } from "../../../utils/ApiCalls";
import {
	checkStatus,
	getGeneralApiParams,
} from "../../../utils/GeneralVariables";
import Loading from "../../../utils/Loading";
import Heading from "../../Misc/Heading";
import CustomButton from "../../Misc/CustomButton";
import CustomInput from "../../Misc/CustomInput";
import CustomSelectInput from "../../Misc/CustomSelectInput";

const ProductIsActiveAPIComponent = () => {
	const [inputs, setInputs] = useState({
		id: "APRA-OB05-01",
		state: "yes",
		warehouseId: "9",
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
				checkStatus(response);
				setLoading(false);
			}
		);
	};

	return (
		<section className="pl-10">
			<Loading loading={loading} />
			{/* <Heading>Product Enable or Disable</Heading> */}
			<CustomInput
				position={"top"}
				type={"text"}
				value={id}
				onChange={(e) => handleId(e)}
				required={true}
				placeholder={"eg. APRA-0000-00"}
				heading={"Enter SKU"}
			/>
			<CustomSelectInput
				options={["Yes", "No"]}
				values={["true", "false"]}
				heading={"Select Status"}
				onChange={(e) => handleState(e)}
			/>
			<CustomInput
				type={"number"}
				position={"bottom"}
				min={0}
				value={warehouseId}
				onChange={(e) => handleWarehouse(e)}
				required={true}
				placeholder={"eg. 9"}
				heading={"Warehouse Number"}
			/>
			<CustomButton onClick={handleSubmit} type={"submit"} width={"1/3"}>
				Submit
			</CustomButton>
		</section>
	);
};

export default ProductIsActiveAPIComponent;
