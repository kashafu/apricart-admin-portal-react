import Image from "next/image";
import { useState } from "react";

import { productAdminDetailApi } from "../../../utils/ApiCalls";
import {
	checkStatus,
	getGeneralApiParams,
} from "../../../utils/GeneralVariables";
import Loading from "../../../utils/Loading";
import CustomButton from "../../Misc/CustomButton";
import CustomInput from "../../Misc/CustomInput";
import CustomSelectInput from "../../Misc/CustomSelectInput";

const ProductAdminDetailAPIComponent = () => {
	const [inputs, setInputs] = useState({
		id: "",
		city: "karachi",
		warehouseId: "",
	});
	const [loading, setLoading] = useState(false);
	const [detail, setDetail] = useState([]);
	const [warehouses, setWarehouses] = useState([]);
	const { id, city, warehouseId } = inputs;

	const handleId = (e) => {
		setInputs({ ...inputs, id: e.target.value });
	};

	const handleCity = (e) => {
		setInputs({ ...inputs, city: e.target.value });
	};

	const handleSubmit = async (e) => {
		setLoading(true);
		const { baseUrl, headers } = getGeneralApiParams();
		await productAdminDetailApi(baseUrl, id, city, warehouseId, headers).then(
			(response) => {
				let status = checkStatus(response, "Product Detail Fetched");
				status ? setDetail([response.data.data]) : setDetail();
				if (status) {
					setDetail([response.data.data]);
					setWarehouses(response.data.data.warehouses);
				} else setWarehouses();
				setLoading(false);
			}
		);
	};

	return (
		<section className="px-10 pt-6">
			<Loading loading={loading} />
			<CustomInput
				position={"top"}
				type={"text"}
				value={id}
				onChange={handleId}
				required={true}
				placeholder={"eg. APR-0000-10"}
				heading={"SKU"}
			/>
			<CustomSelectInput
				onChange={(e) => handleCity(e)}
				heading={"Select City"}
				values={["karachi", "peshawar"]}
				options={["Karachi", "Peshawar"]}
			/>
			<CustomButton onClick={handleSubmit} type={"submit"} width={"1/3"}>
				Search
			</CustomButton>
			{/* WareHouse Render */}
			<section className="mx-2">
				<section className="my-2">
					{detail?.length > 0 &&
						detail?.map((each) => {
							return (
								<div
									key={each.sku}
									className="w-full grid grid-cols-2 items-center bg-slate-50 p-2 rounded-lg"
								>
									<div className="w-full flex">
										<div className="w-1/3">
											<div className="font-bold font-nunito py-1">Barcode:</div>
											<div className="font-bold font-nunito py-1">SKU:</div>
											<div className="font-bold font-nunito py-1">Title:</div>
											<div className="font-bold font-nunito py-1">Brand:</div>
										</div>
										<div className="px-4 w-full font-nunito">
											<div className="py-1"> {each.barcode || "-"}</div>
											<div className="py-1"> {each.sku || "-"}</div>
											<div className="py-1"> {each.title || "-"}</div>
											<div className="py-1"> {each.brand || "-"}</div>
										</div>
									</div>
									<div className="relative w-1/3 aspect-square justify-center place-self-center">
										<Image
											src={each.productImageUrl}
											width={100}
											height={100}
											layout={"fill"}
											alt="Product image"
										/>
									</div>
								</div>
							);
						})}
				</section>

				<section className="py-2 space-y-1">
					{warehouses?.map((each, i) => {
						return (
							<section key={i} className="p-2 bg-slate-50 rounded-md">
								<h3 className="text-center">
									Warehouse number : {each.warehouseInfo}
								</h3>
								<h3 className="text-center">{each.wareHouseName}</h3>
								<div key={each.sku} className="flex w-full">
									<div className="w-1/3">
										<div className="font-bold font-nunito py-1">Active:</div>
										<div className="font-bold font-nunito py-1">
											Category Id&apos;s:
										</div>
										<div className="font-bold font-nunito py-1">
											Category Leaf Name:
										</div>
										<div className="font-bold font-nunito py-1">
											Description:
										</div>
										<div className="font-bold font-nunito py-1">Quantity:</div>
										<div className="font-bold font-nunito py-1">
											Current Price:
										</div>
										<div className="font-bold font-nunito py-1">
											Special Price:
										</div>
										<div className="font-bold font-nunito py-1">
											Maximum Quantity
										</div>
										<div className="font-bold font-nunito py-1">
											Minimum Quantity
										</div>
										<div className="font-bold font-nunito py-1">
											Product In Stock:
										</div>
									</div>
									<div className="px-4 w-full bg-main-blue text-white font-nunito rounded-md">
										<div className="py-1"> {each.active ? "Yes" : "No"}</div>
										<div className="py-1"> {each.categoryIds || "-"}</div>
										<div className="py-1"> {each.categoryleafName || "-"}</div>
										<div className="py-1"> {each.description || "-"}</div>
										<div className="py-1"> {each.qty || 0}</div>
										<div className="py-1"> {each.currentPrice || "-"}</div>
										<div className="py-1"> {each.specialPrice || "-"}</div>
										<div className="py-1"> {each.maxQty || "-"}</div>
										<div className="py-1"> {each.minQty || "-"}</div>
										<div className="py-1"> {each.inStock ? "Yes" : "No"}</div>
									</div>
								</div>
							</section>
						);
					})}
				</section>
			</section>
		</section>
	);
};

export default ProductAdminDetailAPIComponent;
