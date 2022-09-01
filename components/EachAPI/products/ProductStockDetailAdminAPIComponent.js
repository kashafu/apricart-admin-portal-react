import React, { useState } from "react";
import { productStockDetailAdminApi } from "../../../utils/ApiCalls";
import {
	checkStatus,
	getGeneralApiParams,
} from "../../../utils/GeneralVariables";
import Loading from "../../../utils/Loading";
import CustomButton from "../../Misc/CustomButton";
import CustomInput from "../../Misc/CustomInput";

const ProductStockDetailAdminAPIComponent = () => {
	const [inputs, setInputs] = useState({
		id: "APRA-BD02-01",
		city: "karachi",
	});
	const [loading, setLoading] = useState(false);
	const [detail, setDetail] = useState([]);
	const { id, city } = inputs;

	const handleId = (e) => {
		setInputs({ ...inputs, id: e.target.value });
	};
	const handleCity = (e) => {
		setInputs({ ...inputs, city: e.target.value });
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		const { baseUrl, headers } = getGeneralApiParams();
		await productStockDetailAdminApi(baseUrl, id, city, headers).then(
			(response) => {
				let status = checkStatus(response, "Product Stock Detail Fetched");
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
			<CustomButton onClick={handleSubmit} type={"submit"}>
				Submit Query
			</CustomButton>

			<section>
				{detail?.map((each) => {
					return (
						<div key={each.sku} className="flex p-2">
							<div>
								<div className="font-bold font-nunito py-1">Hayatabad:</div>
								<div className="font-bold font-nunito py-1">JoharCC:</div>
								<div className="font-bold font-nunito py-1">
									KorangiB2BDarkStore:
								</div>
								<div className="font-bold font-nunito py-1">
									KorangiDarkStore:
								</div>
								<div className="font-bold font-nunito py-1">
									North Nazimabad:
								</div>
								<div className="font-bold font-nunito py-1">SKU:</div>
								<div className="font-bold font-nunito py-1">Title:</div>
							</div>
							<div className="px-4">
								<div className="py-1"> {each.hayatabad}</div>
								<div className="py-1"> {each.joharCC}</div>
								<div className="py-1"> {each.korangiB2BDarkStore}</div>
								<div className="py-1"> {each.korangiDarkStore}</div>
								<div className="py-1"> {each.northNazimabad}</div>
								<div className="py-1"> {each.sku}</div>
								<div className="py-1"> {each.title}</div>
							</div>
						</div>
					);
				})}
			</section>
		</section>
	);
};

export default ProductStockDetailAdminAPIComponent;
