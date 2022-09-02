import React, { useState } from "react";

import { productPositionDetailApi } from "../../../utils/ApiCalls";
import {
	checkStatus,
	displayErrorToast,
	getGeneralApiParams,
} from "../../../utils/GeneralVariables";
import CustomButton from "../../Misc/CustomButton";
import Loading from "../../../utils/Loading";

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
			console.log(response);
			let status = checkStatus(response, "Product Position Detail Fetched");
			status
				? setDetail(response.data.data)
				: displayErrorToast("No Data Found", 1800, "top-left");
			setLoading(false);
		});
	};
	console.log(detail);
	return (
		<div>
			<Loading loading={loading} />
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
		</div>
	);
};

export default ProductPositionDetailAdminAPIComponent;
