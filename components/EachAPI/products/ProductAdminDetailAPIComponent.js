import React, { useState } from "react";
import { productAdminDetailApi } from "../../../utils/ApiCalls";
import {
	checkStatus,
	getGeneralApiParams,
} from "../../../utils/GeneralVariables";
import Loading from "../../../utils/Loading";
import CustomButton from "../../Misc/CustomButton";
import CustomInput from "../../Misc/CustomInput";

const ProductAdminDetailAPIComponent = () => {
	const [inputs, setInputs] = useState({
		id: "APRA-OB05-01",
		city: "karachi",
		warehouseId: "",
	});
	const [loading, setLoading] = useState(false);
	const [detail, setDetail] = useState([]);
	const { id, city, warehouseId } = inputs;
	const handleId = (e) => {
		setInputs({ ...inputs, id: e.target.value });
	};
	const handleCity = (e) => {
		setInputs({ ...inputs, city: e.target.value });
	};
	const handleWarehouse = (e) => {
		setInputs({ ...inputs, warehouseId: e.target.value });
	};
	const handleSubmit = async (e) => {
		setLoading(true);
		const { baseUrl, headers } = getGeneralApiParams();
		await productAdminDetailApi(baseUrl, id, city, warehouseId, headers).then(
			(response) => {
				let status = checkStatus(response, "Product Detail Fetched");
				status ? setDetail([response.data.data[0]]) : setDetail();
				setLoading(false);
			}
		);
	};

	return (
		<section>
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
				value={city}
				className="appearance-none rounded-none relative block w-full px-3 py-2 border border-t-0 border-black text-gray-900  focus:outline-none focus:ring-main-blue focus:border-main-blue focus:z-10 sm:text-sm placeholder-txt-dark"
				placeholder="Product Type"
				onChange={(e) => handleCity(e)}
			>
				<option value="karachi">Karachi</option>
				<option value="peshawar">Peshawar</option>
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

			<section>
				{detail?.map((each) => {
					return (
						<div key={each.sku} className="flex w-full">
							<div className="w-1/3">
								<div className="font-bold font-nunito py-1">Id:</div>
								<div className="font-bold font-nunito py-1">SKU:</div>
								<div className="font-bold font-nunito py-1">Title:</div>
								<div className="font-bold font-nunito py-1">Brand:</div>
								<div className="font-bold font-nunito py-1">Description:</div>
								<div className="font-bold font-nunito py-1">Quantity:</div>
								<div className="font-bold font-nunito py-1">
									Category Id&apos;s:
								</div>
								<div className="font-bold font-nunito py-1">
									Category Leaf Name:
								</div>
								<div className="font-bold font-nunito py-1">Current Price:</div>
								<div className="font-bold font-nunito py-1">
									Product In Stock:
								</div>
							</div>
							<div className="px-4 bg-main-yellow w-full">
								<div className="py-1"> {each.id || "-"}</div>
								<div className="py-1"> {each.sku || "-"}</div>
								<div className="py-1"> {each.title || "-"}</div>
								<div className="py-1"> {each.brand || "-"}</div>
								<div className="py-1"> {each.description || "-"}</div>
								<div className="py-1"> {each.qty || "-"}</div>
								<div className="py-1"> {each.categoryIds || "-"}</div>
								<div className="py-1"> {each.categoryleafName || "-"}</div>
								<div className="py-1"> {each.currentPrice || "-"}</div>
								<div className="py-1"> {each.inStock ? "Yes" : "No"}</div>
							</div>
						</div>
					);
				})}
			</section>
		</section>
	);
};

export default ProductAdminDetailAPIComponent;
