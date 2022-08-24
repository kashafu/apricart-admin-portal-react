import React, { useState } from "react";
import { productsAdminSearchApi } from "../../utils/ApiCalls";
import CustomButton from "../Misc/CustomButton";
import CustomInput from "../Misc/CustomInput";

const ProductAdminSearchAPIComponent = () => {
	const [inputs, setInputs] = useState({
		term: "",
		size: "",
		page: "",
		category: "",
		city: "",
		userid: "",
	});
	const [loading, setLoading] = useState(false);
	const { term, size, page, category, city, userid } = inputs;

	const handleTerm = (e) => {
		setInputs({ ...inputs, term: e.target.value });

		if (term.length > 2) {
			searchProduct();
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
	const searchProduct = async () => {
		setLoading(true);
		const { baseUrl, userId, headers } = getGeneralApiParams();
		// let encodedOrderId = encodeURI(orderId);
		await productsAdminSearchApi(
			baseUrl,
			page,
			size,
			term,
			category,
			city,
			userId,
			headers
		).then((response) => {
			// setDetail([response.data.data[0]]);
			console.log(response);
			setLoading(false);
		});
	};
	return (
		<section>
			<form action="" method="POST">
				<CustomInput
					position={"top"}
					placeholder={"Search"}
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
		</section>
	);
};

export default ProductAdminSearchAPIComponent;
