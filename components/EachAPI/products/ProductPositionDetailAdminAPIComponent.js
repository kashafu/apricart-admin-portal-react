import React, { useState } from "react";

import { productPositionDetailApi } from "../../../utils/ApiCalls";
import {
	checkStatus,
	displayErrorToast,
	getGeneralApiParams,
} from "../../../utils/GeneralVariables";
import CustomButton from "../../Misc/CustomButton";
import Loading from "../../../utils/Loading";
import CustomSelectInput from "../../Misc/CustomSelectInput";
import Heading from "../../Misc/Heading";

const ProductPositionDetailAdminAPIComponent = () => {
	const [inputs, setInputs] = useState({
		prodType: "cus",
		orderType: "delivery",
		type: "Karachi",
	});
	const [loading, setLoading] = useState(false);
	const [detail, setDetail] = useState([{ id: "" }]);
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
		setLoading(true);
		const { baseUrl, headers } = getGeneralApiParams();

		await productPositionDetailApi(
			baseUrl,
			prodType,
			orderType,
			type,
			headers
		).then((response) => {
			let status = checkStatus(response, "Product Position Detail Fetched");
			status
				? setDetail(response.data.data)
				: displayErrorToast("No Data Found", 1800, "top-left");
			setLoading(false);
		});
	};
	return (
		<section className="px-10">
			<Loading loading={loading} />
			<Heading>Products Detail</Heading>
			<CustomSelectInput
				position={"top"}
				onChange={(e) => handleProdType(e)}
				heading={"Select Product Type"}
				values={["cus", "b2b"]}
				options={["Customer (cus)", "Bulk Buy (b2b)"]}
			/>
			<CustomSelectInput
				onChange={(e) => handleOrderType(e)}
				heading={"Select Order Type"}
				values={["delivery", "pickup"]}
				options={["Delivery", "Pick up"]}
			/>
			<CustomSelectInput
				position={"bottom"}
				onChange={(e) => handleType(e)}
				heading={"Select Type"}
				values={["brand", "sku"]}
				options={["Brand", "SKU"]}
			/>
			<CustomButton onClick={handleSubmit} type={"submit"} width={"1/3"}>
				Get Product Position Detail
			</CustomButton>

			<section>
				{detail.length > 0 ? (
					detail?.map((each) => {
						return (
							<div
								key={each.id}
								className="flex w-full p-1 border-2 border-main-blue rounded-xl my-2"
							>
								<div className="w-1/3">
									<div className="font-bold font-nunito py-1">Id:</div>
									<div className="font-bold font-nunito py-1">Name</div>
									<div className="font-bold font-nunito py-1">Position</div>
									<div className="font-bold font-nunito py-1">Categories:</div>
									<div className="font-bold font-nunito py-1">
										Product Type:
									</div>
									<div className="font-bold font-nunito py-1">Order Type:</div>
									<div className="font-bold font-nunito py-1">City:</div>
									<div className="font-bold font-nunito py-1">Products:</div>
								</div>
								<div className="px-4 text-white bg-main-blue rounded-xl w-full">
									<div className=" py-1"> {each.id || "-"}</div>
									<div className=" py-1"> {each.name || "-"}</div>
									<div className=" py-1"> {each.position || "-"}</div>
									<div className=" py-1"> {each.categories || "-"}</div>
									<div className=" py-1"> {each.prodType || "-"}</div>
									<div className=" py-1"> {each.orderType || "-"}</div>
									<div className=" py-1"> {each.cityInfo || "-"}</div>
									<div className=" py-1"> {each.products || "-"}</div>
								</div>
							</div>
						);
					})
				) : (
					<h1 className="font-nunito">No Data could be found</h1>
				)}
			</section>
		</section>
	);
};

export default ProductPositionDetailAdminAPIComponent;
