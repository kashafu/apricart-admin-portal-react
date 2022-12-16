import React, { useState } from "react";
import { productStockDetailAdminApi } from "../../../utils/ApiCalls";
import {
	checkStatus,
	getGeneralApiParams,
} from "../../../utils/GeneralVariables";
import Loading from "../../../utils/Loading";
import CustomButton from "../../Misc/CustomButton";
import CustomInput from "../../Misc/CustomInput";
import CustomSelectInput from "../../Misc/CustomSelectInput";
import Heading from "../../Misc/Heading";

const ProductStockDetailAdminAPIComponent = () => {
	const [inputs, setInputs] = useState({
		id: "",
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
		<section className="px-10 pt-6">
			<Loading loading={loading} />
			{/* <Heading>Product Stock Detail Admin</Heading> */}
			<CustomInput
				heading={"SKU"}
				position={"top"}
				type={"text"}
				value={id}
				onChange={handleId}
				required={true}
				placeholder={"eg. APRA-0000-00"}
			/>
			<CustomSelectInput
				position={"bottom"}
				onChange={(e) => handleCity(e)}
				heading={"Select City"}
				values={["karachi", "peshawar"]}
				options={["Karachi", "Peshawar"]}
			/>
			<CustomButton onClick={handleSubmit} width={"1/3"} type={"submit"}>
				Search
			</CustomButton>

			<section>
				{detail?.map((each) => {
					return (
						<div key={each.sku} className="flex p-2">
							<div>
								<div className="font-bold font-nunito py-1 border-[1px] border-b-0 border-black p-2">
									SKU:
								</div>
								<div className="font-bold font-nunito py-1 border-[1px] border-b-0 border-black p-2">
									Title:
								</div>
								<div className="font-bold font-nunito py-1 border-[1px] border-b-0 border-black p-2">
									Hayatabad:
								</div>
								<div className="font-bold font-nunito py-1 border-[1px] border-b-0 border-black p-2">
									Johar CC:
								</div>
								<div className="font-bold font-nunito py-1 border-[1px] border-b-0 border-black p-2">
									Korangi B2B Dark Store:
								</div>
								<div className="font-bold font-nunito py-1 border-[1px] border-b-0 border-black p-2">
									Korangi Dark Store:
								</div>
								<div className="font-bold font-nunito py-1 border-[1px] border-black p-2">
									North Nazimabad:
								</div>
							</div>
							<div className="border-l-0 font-nunito">
								<div className="py-1 border-black border-[1px] bg-main-blue text-white border-l-0 border-b-0 p-2">
									{each.sku}
								</div>
								<div className="py-1 border-black border-[1px] bg-main-blue text-white border-l-0 border-b-0 p-2">
									{each.title}
								</div>
								<div className="py-1 border-black border-[1px] bg-main-blue text-white border-l-0 border-b-0 p-2">
									{each.hayatabad}
								</div>
								<div className="py-1 border-black border-[1px] bg-main-blue text-white border-l-0 border-b-0 p-2">
									{each.joharCC}
								</div>
								<div className="py-1 border-black border-[1px] bg-main-blue text-white border-l-0 border-b-0 p-2">
									{each.korangiB2BDarkStore}
								</div>
								<div className="py-1 border-black border-[1px] bg-main-blue text-white border-l-0 border-b-0 p-2">
									{each.korangiDarkStore}
								</div>
								<div className="py-1 border-black border-[1px] bg-main-blue text-white border-l-0  p-2 ">
									{each.northNazimabad}
								</div>
							</div>
						</div>
					);
				})}
			</section>
		</section>
	);
};

export default ProductStockDetailAdminAPIComponent;
