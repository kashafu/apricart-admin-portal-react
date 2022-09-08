import React, { useState } from "react";

import FormData from "form-data";
import Loading from "../../../utils/Loading";
import {
	checkStatus,
	getGeneralApiParams,
} from "../../../utils/GeneralVariables";
import { popupRedirectionUpdateApi } from "../../../utils/ApiCalls";
import CustomButton from "../../Misc/CustomButton";

const PopupRedirectionUpdateAPIComponent = () => {
	var bannerData = new FormData();
	const [loading, setLoading] = useState(false);
	const [input, setInput] = useState({
		bannerUrlApp: [],
		bannerUrlWeb: [],
		prodType: "cus",
		city: "karachi",
		type: "offer",
		value: 0,
	});
	const { bannerUrlApp, bannerUrlWeb, prodType, type, value, city } = input;

	const handleWebImage = (e) => {
		const { files } = e.target;
		setInput({ ...input, bannerUrlWeb: [files[0]] });
	};

	const handleAppImage = (e) => {
		const { files } = e.target;
		setInput({ ...input, bannerUrlApp: [files[0]] });
	};

	const fillFormData = () => {
		bannerData.append("app", bannerUrlApp[0]);
		bannerData.append("web", bannerUrlWeb[0]);
		bannerData.append("prod_type", prodType);
		bannerData.append("city", city);
		bannerData.append("type", type);
		bannerData.append("value", value);
	};

	const submitHandler = async (e) => {
		setLoading(true);
		e.preventDefault();
		const { baseUrl } = getGeneralApiParams();
		await fillFormData();
		await popupRedirectionUpdateApi(baseUrl, bannerData).then((response) => {
			checkStatus(response);
			setLoading(false);
		});
	};
	return (
		<section>
			{<Loading loading={loading} />}
			<form action="" method="POST">
				<select
					onChange={(e) => {
						setInput({ ...input, prodType: e.target.value });
					}}
					className="appearance-none rounded-none relative block w-full px-3 py-2 border border-black text-gray-900 focus:outline-none focus:ring-main-blue focus:border-main-blue focus:z-10 sm:text-sm placeholder-txt-dark rounded-t-lg"
				>
					<option value="cus">cus</option>
					<option value="b2b">b2b</option>
				</select>
				<input
					value={type}
					onChange={(e) => setInput({ ...input, type: e.target.value })}
					type="text"
					required
					className="appearance-none rounded-none relative block w-full px-3 py-2 border border-black text-gray-900 focus:outline-none focus:ring-main-blue focus:border-main-blue focus:z-10 sm:text-sm placeholder-txt-dark "
					placeholder="Type"
				/>

				<input
					value={value}
					onChange={(e) => setInput({ ...input, value: e.target.value })}
					type="number"
					required
					className="appearance-none rounded-none relative block w-full px-3 py-2 border border-black text-gray-900 focus:outline-none focus:ring-main-blue focus:border-main-blue focus:z-10 sm:text-sm placeholder-txt-dark "
					placeholder="Value"
				/>
				<select
					onChange={(e) => {
						setInput({ ...input, city: e.target.value });
					}}
					className="appearance-none rounded-none relative block w-full px-3 py-2 border border-black text-gray-900 focus:outline-none focus:ring-main-blue focus:border-main-blue focus:z-10 sm:text-sm placeholder-txt-dark rounded-b-lg"
				>
					<option value="karachi">Karachi</option>
					<option value="peshawar">Peshawar</option>
				</select>
				<div>
					<label htmlFor="img" className="m-4">
						Upload Web Banner
					</label>
					<input
						name="img"
						type={"file"}
						required
						accept="image/png, image/gif, image/jpeg, image/jpg"
						onChange={(e) => handleWebImage(e)}
					/>
				</div>
				<div>
					<label htmlFor="img" className="m-4">
						Upload App Banner
					</label>
					<input
						name="img"
						type={"file"}
						required
						accept="image/png, image/gif, image/jpeg, image/jpg"
						onChange={(e) => handleAppImage(e)}
					/>
				</div>
				<div>
					<CustomButton width={"1/3"} onClick={(e) => submitHandler(e)}>
						Update Popup Redirection
					</CustomButton>
				</div>
			</form>
		</section>
	);
};

export default PopupRedirectionUpdateAPIComponent;
