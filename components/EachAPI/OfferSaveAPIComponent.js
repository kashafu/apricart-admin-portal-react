import React, { useState } from "react";
import { ClimbingBoxLoader } from "react-spinners";
import { offerSaveApi } from "../../utils/ApiCalls";
import { getGeneralApiParams } from "../../utils/GeneralVariables";

const OfferSaveAPIComponent = () => {
	const [loading, setLoading] = useState(false);
	const [input, setInput] = useState({
		price: 0,
		buying: "",
		buyingCondition: "",
		expiry: "",
		products: "",
		categories: "",
		type: "categories",
	});
	const { price, buying, buyingCondition, expiry, products, categories } =
		input;

	const handleRadioButton = (e) => {
		console.log(e.target.value);
		setInput({ ...input, type: e.target.value });
	};
	const submitHandler = async (e) => {
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
		console.log(headers);
		await offerSaveApi(baseUrl, newInput, headers).then(
			(response) => console.log(response),
			setLoading(false)
		);
	};
	return (
		<div>
			{loading && (
				<>
					<div className="bg-main-blue bg-opacity-80 w-screen h-screen fixed z-10">
						<ClimbingBoxLoader
							className="absolute top-[45%] m-auto animate-pulse"
							color="#FFD54C"
							size={50}
							speedMultiplier={2}
						/>
						<h1 className="z-20 text-white">Sending...</h1>
					</div>
				</>
			)}
			<div>
				<section className="rounded-md -space-y-px">
					<form action="" method="POST">
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
						<div>
							<input
								type="radio"
								name="type"
								value="categories"
								onChange={(e) => handleRadioButton(e)}
							/>
							<label>Categories</label>
							<input
								type="radio"
								id="age1"
								name="type"
								value="products"
								onChange={(e) => handleRadioButton(e)}
							/>
							<label>Products</label>
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
							Submit Images
						</button>
					</form>
				</section>
			</div>
		</div>
	);
};

export default OfferSaveAPIComponent;
