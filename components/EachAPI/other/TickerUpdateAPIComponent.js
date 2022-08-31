import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { updateTickerApi } from "../../../utils/ApiCalls";
import { getGeneralApiParams } from "../../../utils/GeneralVariables";

const TickerUpdateAPIComponent = () => {
	const [ticker, setTicker] = useState();

	const checkStatus = (res) => {
		console.log(res);
		if (res.status === 200) {
			toast.success(res.data.message, {
				position: "top-center",
				autoClose: 1500,
				hideProgressBar: false,
				closeOnClick: true,
				draggable: true,
				theme: "dark",
				toastId: "ren",
			});
		} else {
			toast.error(res.data.message, {
				position: "top-center",
				autoClose: 1500,
				hideProgressBar: false,
				closeOnClick: true,
				draggable: true,
				theme: "dark",
				toastId: "ren",
			});
		}
	};

	const submitHandler = async (e) => {
		e.preventDefault();
		const { baseUrl, headers } = getGeneralApiParams();
		await updateTickerApi(baseUrl, ticker, headers).then((response) => {
			checkStatus(response);
		});
	};
	return (
		<section>
			<form action="" method="POST">
				<textarea
					required
					onChange={(e) => setTicker(e.target.value)}
					name="ticker"
					cols="30"
					rows="10"
					className="bg-gray-200 w-96 h-56 p-1"
					value={ticker}
				/>
				<button
					type="submit"
					onClick={(e) => submitHandler(e)}
					className="group relative w-1/4 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-main-blue hover:bg-indigo-800 duration-300 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-main-blue"
				>
					Update Ticker
				</button>
			</form>
		</section>
	);
};

export default TickerUpdateAPIComponent;
