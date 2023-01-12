import { useState } from "react";

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
import SingleAPILayout from "../../Layouts/SingleAPILayout";

const OfferRemoveAPIComponent = () => {
	const [offerId, setOfferId] = useState("");
	const [loading, setLoading] = useState(false);
	const [input, setInput] = useState({
		price: "",
		buying: "",
		buyingCondition: "",
		expiry: "",
		products: "",
		categories: "",
		type: "products",
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
			setLoading(false);
			let status = checkStatus(response);
			status && setOfferId(response.data.data.id);
		});
	};

	return (
		<SingleAPILayout
			heading={"Remove Offer"}
			loading={loading}
			buttonOnClick={(e) => submitHandler(e)}
			buttonText={"Remove"}
			rowItems={
				<CustomInput
					value={price}
					heading={"Offer ID"}
					onChange={(e) => setInput({ ...input, price: e.target.value })}
					type="number"
					placeholder="Price eg. 320"
					position={"top"}
				/>
			}
		/>
	)

	return (
		<section className="px-10">
			<Loading loading={loading} />
			{/* <Heading>Save Offer</Heading> */}
			<form>
				<section className="grid grid-cols-2 pt-6">
					<CustomInput
						value={price}
						heading={"Offer ID"}
						onChange={(e) => setInput({ ...input, price: e.target.value })}
						type="number"
						placeholder="Price eg. 320"
						position={"top"}
					/>
					{/* <CustomInput
						value={buyingCondition}
						onChange={(e) =>
							setInput({ ...input, buyingCondition: e.target.value })
						}
						x
						type="text"
						placeholder="Buying Condition"
						heading={"Buying Condition"}
					/>
					<CustomInput
						value={expiry}
						onChange={(e) => setInput({ ...input, expiry: e.target.value })}
						type="date"
						placeholder="Expiry Date"
						heading={"Expiry date"}
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
							onChange={(e) => setInput({ ...input, products: e.target.value })}
							type="text"
							placeholder="Products"
							heading="Products"
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
							heading="Categories"
						/>
					)}

					<CustomInput
						value={buying}
						onChange={(e) => setInput({ ...input, buying: e.target.value })}
						type="text"
						placeholder="Buying"
						heading={"Buying"}
						position={"bottom"}
					/> */}
					<CustomButton width={"1/3"} onClick={() => { }}>
						Remove
					</CustomButton>
				</section>
			</form>

			{offerId && (
				<div className="inline-flex animate-dropdown justify-center items-center">
					{/* <Heading>Your Offer Id = </Heading> */}
					<h2 className="text-5xl font-bold font-nunito text-main-blue">
						{offerId}
					</h2>
				</div>
			)}
		</section>
	);
};

export default OfferRemoveAPIComponent;
