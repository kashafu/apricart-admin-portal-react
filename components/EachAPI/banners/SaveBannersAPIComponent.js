import React, { useState } from "react";

import Heading from "../../Misc/Heading";
import FormData from "form-data";
import { saveBannersApi } from "../../../utils/ApiCalls";
import {
	checkStatus,
	displayErrorToast,
	getGeneralApiParams,
	updateRen,
	validateImage,
} from "../../../utils/GeneralVariables";
import Loading from "../../../utils/Loading";
import CustomButton from "../../Misc/CustomButton";
import CustomSelectInput from "../../Misc/CustomSelectInput";
import CustomInput from "../../Misc/CustomInput";
import CustomSingleImageInput from "../../Misc/CustomSingleImageInput";

export async function getServerSideProps({ params, req }) {
	const post = await githubCms.getPost(params.slug);
	const referer = req.headers.referer || null;

	console.log("referer");
	return {
		props: {
			post,
			referer,
		},
	};
}

const SaveBannersAPIComponent = () => {
	var bannerData = new FormData();
	const [loading, setLoading] = useState(false);
	const [ren, setRen] = useState("");
	const [input, setInput] = useState({
		bannerUrlApp: [],
		bannerUrlWeb: [],
		prodType: "cus",
		type: "offer",
		offerId: 0,
		level: 0,
		city: "karachi",
	});
	const { bannerUrlApp, bannerUrlWeb, prodType, type, offerId, level, city } =
		input;

	const handleWebImage = (e) => {
		let verify = e.target.files[0];
		// validateImage comes from generalVariables and returns true if it is a valid image file and false otherwise
		let status = validateImage(verify);
		if (status) {
			setInput({ ...input, bannerUrlWeb: verify });
		} else {
			setInput({ ...input, bannerUrlWeb: "" });
			updateRen(setRen);
			displayErrorToast("Upload a valid Image file", 1500, "top-left");
		}
	};

	const handleAppImage = (e) => {
		let verify = e.target.files[0];
		// validateImage comes from generalVariables and returns true if it is a valid image file and false otherwise
		let status = validateImage(verify);
		if (status) {
			setInput({ ...input, bannerUrlApp: verify });
		} else {
			setInput({ ...input, bannerUrlApp: "" });
			updateRen(setRen);
			displayErrorToast("Upload a valid Image file", 1500, "top-left");
		}
	};

	const handleProdType = (e) => {
		setInputs({ ...inputs, prodType: e.target.value });
	};
	const handleCity = (e) => {
		setInputs({ ...inputs, city: e.target.value });
	};

	const fillFormData = () => {
		bannerData.append("app", bannerUrlApp);
		bannerData.append("web", bannerUrlWeb);
		bannerData.append("prod_type", prodType);
		bannerData.append("type", type);
		bannerData.append("offer_id", offerId);
		bannerData.append("level", level);
		bannerData.append("city", city);
		bannerData.append("lang", "en");
	};

	const submitHandler = async (e) => {
		e.preventDefault();
		setLoading(true);
		const { baseUrl, headers } = getGeneralApiParams();
		await fillFormData();
		await saveBannersApi(baseUrl, bannerData, headers).then((response) => {
			setLoading(false);
			checkStatus(response);
		});
	};

	return (
		<section className="relative pl-10">
			<Loading loading={loading} />
			<Heading>Add New Banner</Heading>
			<form action="" method="POST">
				<CustomSelectInput
					position={"top"}
					onChange={(e) => handleProdType(e)}
					heading={"Select Product Type"}
					values={["cus", "b2b"]}
					options={["Customer (cus)", "Bulk Buy (b2b)"]}
				/>
				<CustomInput
					value={type}
					onChange={(e) => setInput({ ...input, type: e.target.value })}
					type="text"
					placeholder="Type"
					heading="Enter Type"
				/>
				<CustomInput
					value={offerId}
					onChange={(e) => setInput({ ...input, offerId: e.target.value })}
					type="text"
					placeholder="Offer Id"
					heading="Enter Offer Id"
				/>
				<CustomSelectInput
					onChange={(e) => setInput({ ...input, level: e.target.value })}
					heading={"Select Level"}
					values={[0, 1, 2, 3, 4, 5]}
					options={[0, 1, 2, 3, 4, 5]}
				/>
				<CustomSelectInput
					onChange={(e) => handleCity(e)}
					heading={"Select City"}
					values={["karachi", "peshawar"]}
					options={["Karachi", "Peshawar"]}
				/>
				<CustomSingleImageInput
					heading={"Upload Web Banner"}
					ren={ren}
					onChange={handleWebImage}
				/>
				<CustomSingleImageInput
					position={"bottom"}
					heading={"Upload App Banner"}
					ren={ren}
					onChange={handleAppImage}
				/>
				<div>
					<CustomButton onClick={(e) => submitHandler(e)} width={"1/3"}>
						Submit New Banner
					</CustomButton>
				</div>
			</form>
		</section>
	);
};

export default SaveBannersAPIComponent;
