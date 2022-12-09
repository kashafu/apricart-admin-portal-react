import Image from "next/image";
import React, { useState } from "react";
import ReactPaginate from "react-paginate";

import { productsAdminSearchApi } from "../../../utils/ApiCalls";
import {
	checkStatus,
	getGeneralApiParams,
} from "../../../utils/GeneralVariables";
import CustomInput from "../../Misc/CustomInput";
import CustomSelectInput from "../../Misc/CustomSelectInput";
import Heading from "../../Misc/Heading";

const ProductAdminSearchAPIComponent = () => {
	const [inputs, setInputs] = useState({
		term: "",
		size: "",
		page: "",
		category: "",
		city: "karachi",
	});
	const [loading, setLoading] = useState(false);
	const [totalPages, setTotalPages] = useState(0);
	const [detail, setDetail] = useState([]);

	const { term, size, page, category, city } = inputs;

	const handleTerm = (e) => {
		setInputs({ ...inputs, term: e.target.value });
		if (e.target.value.length > 2) {
			searchProduct(e.target.value);
		} else if (e.target.value.length === 0) {
			setDetail([]);
		} else {
			setDetail([]);
		}
	};
	const handleSize = (e) => {
		setInputs({ ...inputs, size: e.target.value });
		searchProduct(term, page, e.target.value, category);
	};
	const handlePage = (newPage) => {
		setInputs({ ...inputs, page: newPage });
	};
	const handleCategory = (e) => {
		setInputs({ ...inputs, category: e.target.value });
		searchProduct(term, 1, size, e.target.value);
	};
	const handleCity = (e) => {
		setInputs({ ...inputs, city: e.target.value });
	};

	const handleResponse = (response) => {
		console.log(response);
		setDetail(response.data.data);
		getPagination(response.data.total, size);
		setLoading(false);
	};
	const getPagination = (items, perPage) => {
		let calc = +items / +perPage;
		let tot = Math.ceil(calc);
		setTotalPages(tot);
	};
	const searchProduct = async (text, newPage, newSize, newCategory) => {
		setLoading(true);
		const { baseUrl, userId, headers } = getGeneralApiParams();

		await productsAdminSearchApi(
			baseUrl,
			(page = newPage || 1),
			(size = newSize || size),
			text,
			(category = newCategory || category),
			city,
			userId,
			headers
		).then((response) => {
			let status = checkStatus(response, "");
			status && handleResponse(response, text);
		});
	};

	const handlePageClick = (event) => {
		handlePage(event.selected + 1);
		searchProduct(term, event.selected + 1);
	};

	return (
		<section className="px-10">
			{/* <Heading>Products Search</Heading> */}
			<form action="" method="POST">
				<section className="grid grid-cols-2 pt-6">
					<CustomInput
						position={"top"}
						heading={"Search Product Name/SKU"}
						placeholder={"eg. Oil"}
						required={true}
						value={term}
						onChange={handleTerm}
					/>
					<CustomInput
						heading={"Enter Size"}
						placeholder={"Number of items on one page"}
						value={size}
						onChange={handleSize}
						required={true}
					/>

					<CustomInput
						heading={"Enter Category"}
						placeholder={"eg. Spices"}
						required={true}
						value={category}
						onChange={handleCategory}
					/>
					<CustomSelectInput
						position={"bottom"}
						onChange={(e) => handleCity(e)}
						heading={"Select City"}
						values={["karachi", "peshawar"]}
						options={["Karachi", "Peshawar"]}
					/>
				</section>
			</form>
			<div className="rounded-none my-2">
				{loading && <h2 className="text-black">Searching...</h2>}
			</div>
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
								<div className="p-2">
									<Image
										src={each.productImageUrl}
										alt={"Image Thumbnail"}
										width={"450px"}
										height={"450px"}
									/>
								</div>
							</div>
						);
					})
				) : (
					<h3 className="font-nunito">No Data could be found</h3>
				)}
				<ReactPaginate
					breakLabel="o o o"
					nextLabel="Next ->"
					onPageChange={handlePageClick}
					pageRangeDisplayed={5}
					pageCount={totalPages}
					previousLabel="<- Previous"
					renderOnZeroPageCount={null}
					pageClassName=""
					pageLinkClassName="border-[1px] p-1 mx-1 active:bg-main-blue active:text-white border-main-blue rounded-md px-3"
					previousClassName="mr-8 font-nunito font-bold"
					nextClassName="ml-8 font-nunito font-bold"
					breakClassName=""
					breakLinkClassName="text-lato"
					containerClassName="p-4 flex justify-center items-center"
					activeClassName="bg-main-blue text-white rounded-xl py-1 border-0"
				/>
			</section>
		</section>
	);
};

export default ProductAdminSearchAPIComponent;
