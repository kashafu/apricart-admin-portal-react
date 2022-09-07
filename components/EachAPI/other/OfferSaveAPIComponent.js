import React, { useState } from "react";

import {
	checkStatus,
	getGeneralApiParams,
} from "./../../../utils/GeneralVariables";
import { offerSaveApi } from "./../../../utils/ApiCalls";
import Loading from "./../../../utils/Loading";

const OfferSaveAPIComponent = () => {
	const [loading, setLoading] = useState(false);
	const [input, setInput] = useState({
		price: 0,
		buying: "Bolivia",
		buyingCondition: "Bolivia",
		expiry: "",
		products: "APRA-HSI09-01,APRA-HSI09-02,APRA-HSI10-02",
		categories: "",
		type: "categories",
	});
	const { price, buying, buyingCondition, expiry, products, categories } =
		input;
	let noDuplicate = {
		bad: "BadDuplicate",
		pw: "noPwDuplicate",
		success: "noSuccDuplicate",
		auth: "noAuthDuplicate",
	};
	const handleRadioButton = (e) => {
		setInput({ ...input, type: e.target.value });
	};

	const submitHandler = async (e) => {
		e.preventDefault();
		setLoading(true);
		let newInput = {};
		if (input.type === "categories") {
			newInput = {
				price,
				buying,
				buyingCondition,
				expiry,
				products: "",
				categories,
			};
		} else {
			newInput = {
				price,
				buying,
				buyingCondition,
				expiry,
				products,
				categories: "",
			};
		}
		const { baseUrl, headers } = getGeneralApiParams();
		await offerSaveApi(baseUrl, newInput, headers).then((response) => {
			setLoading(false), checkStatus(response);
		});
	};
	return (
		<div>
			<div>
				<section className="rounded-md -space-y-px">
					<form action="" method="POST">
						<Loading loading={loading} />
						<div>
							<input
								value={price}
								onChange={(e) => setInput({ ...input, price: e.target.value })}
								type="number"
								required
								className="appearance-none rounded-none relative block w-full px-3 py-2 border border-black text-gray-900 rounded-t-xl focus:outline-none focus:ring-main-blue focus:border-main-blue focus:z-10 sm:text-sm placeholder-txt-dark"
								placeholder="Price eg. 320"
							/>
						</div>
						<div>
							<input
								value={buyingCondition}
								onChange={(e) =>
									setInput({ ...input, buyingCondition: e.target.value })
								}
								type="text"
								required
								className="appearance-none rounded-none relative block w-full px-3 py-2 border border-black text-gray-900 focus:outline-none focus:ring-main-blue focus:border-main-blue focus:z-10 sm:text-sm placeholder-txt-dark"
								placeholder="Buying Condition"
							/>
						</div>
						<div>
							<input
								value={expiry}
								onFocus={(e) => (e.target.type = "date")}
								onChange={(e) => setInput({ ...input, expiry: e.target.value })}
								type="text"
								required
								className="appearance-none rounded-none relative block w-full px-3 py-2 border border-black text-gray-900 focus:outline-none focus:ring-main-blue focus:border-main-blue focus:z-10 sm:text-sm placeholder-txt-dark"
								placeholder="Expiry Date"
							/>
						</div>
						<div className="appearance-none rounded-none relative block w-full px-3 py-2 border border-black text-gray-900 focus:outline-none focus:ring-main-blue focus:border-main-blue focus:z-10 sm:text-sm placeholder-txt-dark">
							<input
								type="radio"
								name="type"
								value="categories"
								defaultChecked
								onChange={(e) => handleRadioButton(e)}
							/>
							<label className="pr-4 pl-1">Categories</label>
							<input
								type="radio"
								className="px-4"
								id="age1"
								name="type"
								value="products"
								onChange={(e) => handleRadioButton(e)}
							/>
							<label className="pr-4 pl-1">Products</label>
							<br />
						</div>
						{input.type === "products" && (
							<div>
								<input
									value={products}
									onChange={(e) =>
										setInput({ ...input, products: e.target.value })
									}
									type="text"
									required
									className="appearance-none rounded-none relative block w-full px-3 py-2 border border-black text-gray-900 focus:outline-none focus:ring-main-blue focus:border-main-blue focus:z-10 sm:text-sm placeholder-txt-dark"
									placeholder="Products"
								/>
							</div>
						)}
						{input.type === "categories" && (
							<div>
								<input
									value={categories}
									onChange={(e) =>
										setInput({ ...input, categories: e.target.value })
									}
									type="text"
									required
									className="appearance-none rounded-none relative block w-full px-3 py-2 border border-black text-gray-900 focus:outline-none focus:ring-main-blue focus:border-main-blue focus:z-10 sm:text-sm placeholder-txt-dark"
									placeholder="Categories"
								/>
							</div>
						)}
						<div>
							<input
								value={buying}
								onChange={(e) => setInput({ ...input, buying: e.target.value })}
								type="text"
								required
								className="appearance-none rounded-none relative block w-full px-3 py-2 border border-black text-gray-900 rounded-b-xl focus:outline-none focus:ring-main-blue focus:border-main-blue focus:z-10 sm:text-sm placeholder-txt-dark"
								placeholder="Buying"
							/>
						</div>
						<br />
						<button
							type="submit"
							onClick={(e) => submitHandler(e)}
							className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-main-blue hover:bg-indigo-800 duration-300 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-main-blue"
						>
							Save Offer
						</button>
					</form>
				</section>
			</div>
		</div>
	);
};

export default OfferSaveAPIComponent;
