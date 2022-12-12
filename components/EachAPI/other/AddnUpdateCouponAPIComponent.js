import React, { useState } from "react";
import CustomInput from "../../Misc/CustomInput";
import CustomSelectInput from "../../Misc/CustomSelectInput";

const AddnUpdateCouponAPIComponent = () => {
	const [inputs, setInputs] = useState({
		name: "APR-75",
		discount: 75,
		isPercent: false,
		active: true,
		usageLimit: 1000,
		minSubTotal: 750,
		expiry: "2022-08-31T18:00:00Z",
		productSkus: "",
		category: "1166",
		whitelist: false,
		phoneNumber: "",
		whitelistPhoneNumber: false,
		oncePhoneNumber: true,
		deliveryOnly: true,
		prodType: "cus",
		cityInfo: 1,
	});
	const {
		name,
		discount,
		isPercent,
		active,
		usageLimit,
		minSubTotal,
		expiry,
		productSkus,
		category,
		whitelist,
		phoneNumber,
		whitelistPhoneNumber,
		oncePhoneNumber,
		deliveryOnly,
		prodType,
		cityInfo,
	} = inputs;

	const handleName = (e) => {
		setInputs({ ...inputs, name: e.target.value });
	};
	const handleDiscount = (e) => {
		setInputs({ ...inputs, discount: e.target.value });
	};
	const handleIsPercent = (e) => {
		setInputs({ ...inputs, isPercent: e.target.value });
	};
	const handleActive = (e) => {
		setInputs({ ...inputs, active: e.target.value });
	};
	const handleUsageLimit = (e) => {
		setInputs({ ...inputs, usageLimit: e.target.value });
	};
	const handleMinSubTotal = (e) => {
		setInputs({ ...inputs, minSubTotal: e.target.value });
	};
	const handleExpiry = (e) => {
		setInputs({ ...inputs, expiry: e.target.value });
	};
	const handleProductSkus = (e) => {
		setInputs({ ...inputs, productSkus: e.target.value });
	};
	const handleCategory = (e) => {
		setInputs({ ...inputs, category: e.target.value });
	};
	const handleWhiteList = (e) => {
		setInputs({ ...inputs, whitelist: e.target.value });
	};
	const handlePhoneNumber = (e) => {
		setInputs({ ...inputs, phoneNumber: e.target.value });
	};
	const handleWhiteListPhoneNumber = (e) => {
		setInputs({ ...inputs, whitelistPhoneNumber: e.target.value });
	};
	const handleOncePhoneNumber = (e) => {
		setInputs({ ...inputs, oncePhoneNumber: e.target.value });
	};
	const handleDeliveryOnly = (e) => {
		setInputs({ ...inputs, deliveryOnly: e.target.value });
	};
	const handleProdType = (e) => {
		setInputs({ ...inputs, prodType: e.target.value });
	};
	const handleCityInfo = (e) => {
		setInputs({ ...inputs, cityInfo: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const { baseUrl, headers } = getGeneralApiParams();
		var encodedType = encodeURI(type);
		var encodedMessage = encodeURI(message);
		await sendNotificationApi(
			baseUrl,
			type,
			value,
			encodedType,
			encodedMessage,
			city,
			to,
			headers
		).then((response) => {
			checkStatus(response, "Notification Sent Successfully");
		});
	};
	return (
		<section className="px-10">
			<section className="pt-6 grid grid-cols-2">
				<CustomInput
					position={"top"}
					type={"text"}
					value={name}
					onChange={handleName}
					required={true}
					heading={"Name"}
				/>
				<CustomInput
					type={"number"}
					value={discount}
					onChange={handleDiscount}
					required={true}
					heading={"Discount"}
				/>
				<CustomSelectInput
					onChange={(e) => handleIsPercent(e)}
					heading={"Is Percent?"}
					values={["yes", "no"]}
					options={["Yes", "No"]}
				/>
				<CustomSelectInput
					onChange={(e) => handleActive(e)}
					heading={"Active"}
					values={["yes", "no"]}
					options={["Yes", "No"]}
				/>
				<CustomInput
					type={"number"}
					value={usageLimit}
					onChange={handleUsageLimit}
					required={true}
					heading={"Usage Limit"}
				/>
				<CustomInput
					type={"number"}
					value={minSubTotal}
					onChange={handleMinSubTotal}
					required={true}
					heading={"Minimum Subtotal"}
				/>
				{/* <div>
					<input
						value={expiry}
						onFocus={(e) => (e.target.type = "date")}
						onChange={(e) => handleExpiry}
						type="text"
						required
						className="appearance-none rounded-none relative block w-full px-3 py-2 border border-black text-gray-900 focus:outline-none focus:ring-main-blue focus:border-main-blue focus:z-10 sm:text-sm heading-txt-dark"
						heading="Expiry Date"
					/>
				</div> */}
				<CustomInput
					value={expiry}
					onChange={(e) => handleExpiry}
					type="date"
					// placeholder="Expiry Date"
					heading={"Expiry date"}
				/>
				{/* <CustomSelectInput
					onChange={(e) => handleTo(e)}
					heading={"Recipient"}
					values={["alldev", ""]}
					options={["All Devices", "Individual"]}
				/> */}
				{/* <select
					className="appearance-none rounded-none relative block w-full px-3 py-2 border border-t-0 border-black text-gray-900  focus:outline-none focus:ring-main-blue focus:border-main-blue focus:z-10 sm:text-sm heading-txt-dark"
					onChange={(e) => handleTo(e)}
					required={true}
				>
					<option value="alldev">All Devices</option>
					<option value="">Individual</option>
				</select> */}
			</section>
		</section>
	);
};

export default AddnUpdateCouponAPIComponent;
