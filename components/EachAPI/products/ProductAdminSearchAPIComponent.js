import Image from "next/image";
import React, { useState } from "react";

import { productsAdminSearchApi } from "../../../utils/ApiCalls";
import { getGeneralApiParams } from "../../../utils/GeneralVariables";
import Loading from "../../../utils/Loading";
import CustomInput from "../../Misc/CustomInput";

const ProductAdminSearchAPIComponent = () => {
	const [inputs, setInputs] = useState({
		term: "",
		size: "20",
		page: "1",
		category: "",
		city: "karachi",
	});
	const [loading, setLoading] = useState(false);
	const [detail, setDetail] = useState([]);
	const { term, size, page, category, city } = inputs;

	const handleTerm = (e) => {
		setInputs({ ...inputs, term: e.target.value });
		if (e.target.value.length > 1) {
			searchProduct(e.target.value);
		} else if (e.target.value.length === 0) {
			setDetail([]);
		} else {
			setDetail([]);
		}
	};
	const handleSize = (e) => {
		setInputs({ ...inputs, size: e.target.value });
	};
	const handlePage = (e) => {
		setInputs({ ...inputs, page: e.target.value });
	};
	const handleCategory = (e) => {
		setInputs({ ...inputs, category: e.target.value });
	};
	const handleCity = (e) => {
		setInputs({ ...inputs, city: e.target.value });
	};
	const searchProduct = async (text) => {
		setLoading(true);
		const { baseUrl, userId, headers } = getGeneralApiParams();
		// let encodedOrderId = encodeURI(orderId);
		await productsAdminSearchApi(
			baseUrl,
			page,
			size,
			text,
			category,
			city,
			userId,
			headers
		).then((response) => {
			setDetail(response.data.data);
			setLoading(false);
		});
	};
	return (
		<section>
			<form action="" method="POST">
				<CustomInput
					position={"top"}
					placeholder={"Search Product Name or SKU"}
					required={true}
					value={term}
					onChange={handleTerm}
				/>
				<CustomInput
					placeholder={"Size"}
					value={size}
					onChange={handleSize}
					required={true}
				/>
				<CustomInput
					placeholder={"Page"}
					value={page}
					onChange={handlePage}
					required={true}
				/>
				<CustomInput
					placeholder={"Category"}
					required={true}
					value={category}
					onChange={handleCategory}
				/>
				<CustomInput
					position={"bottom"}
					placeholder={"City"}
					required={true}
					value={city}
					onChange={handleCity}
				/>
			</form>
			<div className="rounded-none my-2">
				{loading && <p className="text-black">Searching...</p>}
			</div>
			<section>
				{detail.length > 0 ? (
					detail?.map((each) => {
						return (
							<div
								key={each.id}
								className="flex w-full p-1 border-2 border-main-blue rounded-xl my-2"
							>
								<div className="p-2">
									<Image
										src={each.productImageUrl}
										alt={"Image Thumbnail"}
										width={"450px"}
										height={"450px"}
									/>
								</div>
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
									<div className="font-bold font-nunito py-1">
										Current Price:
									</div>
									<div className="font-bold font-nunito py-1">
										Product In Stock:
									</div>
								</div>
								<div className="px-4 text-white bg-main-blue rounded-xl w-full">
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
					})
				) : (
					<h3 className="font-nunito">No Data could be found</h3>
				)}
			</section>
		</section>
	);
};

export default ProductAdminSearchAPIComponent;
