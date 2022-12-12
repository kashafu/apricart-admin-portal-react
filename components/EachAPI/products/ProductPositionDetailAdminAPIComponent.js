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
	const [detail, setDetail] = useState([]);
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
			console.log(response);
			let status = checkStatus(response, "");
			status && handleResponse(response.data.data);
		});
	};

	const handleResponse = (response) => {
		console.log(response);
		response?.length > 0 ? setDetail(response) : emptyDetail();
		// getPagination(response.data.total, size);
		setLoading(false);
	};

	const emptyDetail = () => {
		setDetail([]);
		displayErrorToast("No Data Could be Found");
	};
	return (
		<section className="px-10 pt-6">
			<Loading loading={loading} />
			{/* <Heading>Product Position Detail</Heading> */}
			<CustomSelectInput
				position={"top"}
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
			<CustomSelectInput
				position={"bottom"}
				onChange={(e) => handleType(e)}
				heading={"Select Type"}
				values={["brand", "sku"]}
				options={["Brand", "SKU"]}
			/>
			<CustomButton onClick={handleSubmit} type={"submit"} width={"1/3"}>
				Search
			</CustomButton>

			<section>
				{detail.length > 0 &&
					detail?.map((each) => {
						return (
							<section
								key={each.id}
								className="flex w-full border-[1px] border-main-blue my-2"
							>
								<div className="w-1/3 px-2 font-nunito">
									<div className="font-bold py-1">Id:</div>
									<div className="font-bold py-1">Name</div>
									<div className="font-bold py-1">Position</div>
									<div className="font-bold py-1">Categories:</div>
									<div className="font-bold py-1">Product Type:</div>
									<div className="font-bold py-1">Order Type:</div>
									<div className="font-bold py-1">City:</div>
									<div className="font-bold py-1">Products:</div>
								</div>
								<div className="px-4 text-white bg-main-blue rounded-sm w-full font-nunito">
									<div className=" py-1"> {each.id || "-"}</div>
									<div className=" py-1"> {each.name || "-"}</div>
									<div className=" py-1"> {each.position || "-"}</div>
									<div className=" py-1"> {each.categories || "-"}</div>
									<div className=" py-1"> {each.prodType || "-"}</div>
									<div className=" py-1"> {each.orderType || "-"}</div>
									<div className=" py-1"> {each.cityInfo || "-"}</div>
									<div className=" py-1"> {each.products || "-"}</div>
								</div>
							</section>
						);
					})}
			</section>
		</section>
	);
};

export default ProductPositionDetailAdminAPIComponent;
