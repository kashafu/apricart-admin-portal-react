import axios from "axios";
import FormData from "form-data";
import React, { useState } from "react";
import { saveBannersApi } from "../../../utils/ApiCalls";
import { getGeneralApiParams } from "../../../utils/GeneralVariables";
import Loading from "../../../utils/Loading";
import CustomImageInput from "../../Misc/CustomImageInput";

const SaveBannersAPIComponent = () => {
	var bannerData = new FormData();
	const [loading, setLoading] = useState(false);
	const [input, setInput] = useState({
		bannerUrlApp: [],
		bannerUrlWeb: [],
		prodType: "",
		type: "",
		offerId: 0,
		level: 0,
		city: "",
	});
	const { bannerUrlApp, bannerUrlWeb, prodType, type, offerId, level, city } =
		input;

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
		bannerData.append("type", type);
		bannerData.append("offer_id", offerId);
		bannerData.append("level", level);
		bannerData.append("city", city);
		bannerData.append("lang", "en");
	};

	const submitHandler = async (e) => {
		e.preventDefault();
		const { baseUrl, headers } = getGeneralApiParams();
		await fillFormData();
		await saveBannersApi(baseUrl, bannerData, headers).then((response) =>
			console.log(response)
		);
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
					value={offerId}
					onChange={(e) => setInput({ ...input, offerId: e.target.value })}
					type="number"
					required
					className="appearance-none rounded-none relative block w-full px-3 py-2 border border-black text-gray-900 focus:outline-none focus:ring-main-blue focus:border-main-blue focus:z-10 sm:text-sm placeholder-txt-dark "
					placeholder="Offer ID"
				/>
				<input
					value={level}
					onChange={(e) => setInput({ ...input, level: e.target.value })}
					type="number"
					required
					className="appearance-none rounded-none relative block w-full px-3 py-2 border border-black text-gray-900 focus:outline-none focus:ring-main-blue focus:border-main-blue focus:z-10 sm:text-sm placeholder-txt-dark "
					placeholder="Level"
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
					<button
						type="submit"
						onClick={(e) => submitHandler(e)}
						className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-main-blue hover:bg-indigo-800 duration-300 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-main-blue"
					>
						Submit
					</button>
				</div>
			</form>
		</section>
	);
};

export default SaveBannersAPIComponent;
