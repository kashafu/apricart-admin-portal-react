import React, { useState } from "react";

import {
	checkStatus,
	getGeneralApiParams,
} from "../../../utils/GeneralVariables";
import { offerSaveApi } from "../../../utils/ApiCalls";
import Loading from "../../../utils/Loading";
import Heading from "../../Misc/Heading";
import CustomInput from "../../Misc/CustomInput";
import CustomButton from "../../Misc/CustomButton";
import CustomRadioInput from "../../Misc/CustomRadioInput";

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
	console.log(input);
	return (
		<div>
			<div>
				<section className="rounded-md -space-y-px">
					<Heading>Save Offer</Heading>
					<form action="" method="POST">
						<Loading loading={loading} />
						<CustomInput
							value={price}
							heading={"Enter Price"}
							onChange={(e) => setInput({ ...input, price: e.target.value })}
							type="number"
							placeholder="Price eg. 320"
							position={"top"}
						/>
						<CustomInput
							value={buyingCondition}
							onChange={(e) =>
								setInput({ ...input, buyingCondition: e.target.value })
							}
							x
							type="text"
							placeholder="Buying Condition"
							heading={"Enter Buying Condition"}
						/>
						<CustomInput
							value={expiry}
							onChange={(e) => setInput({ ...input, expiry: e.target.value })}
							type="date"
							placeholder="Expiry Date"
							heading={"Enter Expiry date"}
						/>
						<CustomRadioInput
							inputs={["Products", "Categories"]}
							values={["products", "categories"]}
							name="type"
							heading={"Select Type"}
							onChange={(e) => handleRadioButton(e)}
						/>
						{input.type === "products" && (
							<CustomInput
								value={products}
								onChange={(e) =>
									setInput({ ...input, products: e.target.value })
								}
								type="text"
								placeholder="Products"
								heading="Enter Products"
							/>
						)}
						{input.type === "categories" && (
							<CustomInput
								value={categories}
								onChange={(e) =>
									setInput({ ...input, categories: e.target.value })
								}
								type="text"
								placeholder="Categories"
								heading="Enter Categories"
							/>
						)}

						<CustomInput
							value={buying}
							onChange={(e) => setInput({ ...input, buying: e.target.value })}
							type="text"
							placeholder="Buying"
							heading={"Enter Buying"}
							position={"bottom"}
						/>

						<br />
						<CustomButton width={"1/3"} onClick={(e) => submitHandler(e)}>
							Save Offer
						</CustomButton>
					</form>
				</section>
			</div>
		</div>
	);
};

export default OfferSaveAPIComponent;
