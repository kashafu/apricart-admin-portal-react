import React, { useState } from "react";
import { productAdminDetailApi } from "../../utils/ApiCalls";
import { getGeneralApiParams } from "../../utils/GeneralVariables";
import Loading from "../../utils/Loading";
import CustomButton from "../Misc/CustomButton";
import CustomInput from "../Misc/CustomInput";

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
				// setDetail([response.data.data[0]]);
				console.log(response);
				setLoading(false);
			}
		);
	};
	// console.log(detail);
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
					console.log(each);
					return (
						<div key={each.sku} className="flex ">
							<div>
								<div>Hayatabad:</div>
								<div>JoharCC:</div>
								<div>KorangiB2BDarkStore:</div>
								<div>KorangiDarkStore:</div>
								<div>North Nazimabad:</div>
								<div>SKU:</div>
								<div>Title:</div>
							</div>
							{/* <div className="px-4">
								<div> {each.hayatabad}</div>
								<div> {each.joharCC}</div>
								<div> {each.korangiB2BDarkStore}</div>
								<div> {each.korangiDarkStore}</div>
								<div> {each.northNazimabad}</div>
								<div> {each.sku}</div>
								<div> {each.title}</div>
							</div> */}
						</div>
					);
				})}
			</section>
		</section>
	);
};

export default ProductAdminDetailAPIComponent;
