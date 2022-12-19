import React, { useEffect, useState } from "react";
import { addCoupon, getAllCategoriesApi } from "../../../utils/ApiCalls";
import {
	checkStatus,
	getGeneralApiParams,
} from "../../../utils/GeneralVariables";
import Loading from "../../../utils/Loading";
import CustomButton from "../../Misc/CustomButton";
import CustomInput from "../../Misc/CustomInput";
import CustomSelectInput from "../../Misc/CustomSelectInput";

const AddnUpdateCouponAPIComponent = () => {
	const [loading, setLoading] = useState(false);
	const [displayExpiry, setDisplayExpiry] = useState("");

	const [categories, setCategories] = useState([]);
	const [inputs, setInputs] = useState({
		name: "",
		discount: "",
		isPercent: true,
		active: true,
		usageLimit: "",
		minSubTotal: "",
		expiry: "",
		productSkus: "",
		category: "",
		whitelist: true,
		phoneNumber: "",
		whitelistPhoneNumber: true,
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
		let newExp = e.target.value.concat("T00:00:00Z");
		setInputs({ ...inputs, expiry: newExp });
		setDisplayExpiry(e.target.value);
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
		await addCoupon(baseUrl, inputs, headers).then((response) => {
			console.log(response);
			checkStatus(response, "Coupon created successfully");
		});
	};

	const fetchCategoryIds = async () => {
		const { baseUrl } = getGeneralApiParams();
		await getAllCategoriesApi(baseUrl, {
			Accept: "application/json",
			"Content-Type": "application/json",
		}).then((response) => {
			setInputs({ ...inputs, category: response.data.data[0].id });

			let status = checkStatus(response, "");
			status && setCategories(response.data.data);
			setLoading(false);
		});
	};

	useEffect(() => {
		fetchCategoryIds();
	}, []);

	console.log(inputs);
	return (
		<section className="px-10">
			<Loading loading={loading} />
			<section className="pt-6 grid grid-cols-2">
				<CustomInput
					type={"text"}
					value={name}
					onChange={(e) => handleName(e)}
					required={true}
					heading={"Name"}
				/>
				<CustomInput
					type={"number"}
					value={discount}
					onChange={(e) => handleDiscount(e)}
					required={true}
					heading={"Discount"}
				/>
				<CustomSelectInput
					onChange={(e) => handleIsPercent(e)}
					heading={"Is Percent?"}
					values={["true", "false"]}
					options={["True", "False"]}
				/>
				<CustomSelectInput
					onChange={(e) => handleActive(e)}
					heading={"Active"}
					values={["true", "false"]}
					options={["True", "False"]}
				/>
				<CustomInput
					type={"number"}
					value={usageLimit}
					onChange={(e) => handleUsageLimit(e)}
					required={true}
					heading={"Usage Limit"}
				/>
				<CustomInput
					type={"number"}
					value={minSubTotal}
					onChange={(e) => handleMinSubTotal(e)}
					required={true}
					heading={"Minimum Subtotal"}
				/>
				<CustomInput
					value={displayExpiry}
					onChange={(e) => handleExpiry(e)}
					type="date"
					heading={"Expiry date"}
				/>
				<CustomInput
					type={"text"}
					value={productSkus}
					onChange={(e) => handleProductSkus(e)}
					required={true}
					heading={"Product SKUs"}
				/>
				<CustomSelectInput
					onChange={(e) => handleCategory(e)}
					heading={"Category"}
					values={categories.map((each) => each.id)}
					options={categories.map((each) => each.name)}
				/>
				<CustomSelectInput
					onChange={(e) => handleWhiteList(e)}
					heading={"White List"}
					values={["true", "false"]}
					options={["True", "False"]}
				/>
				<CustomInput
					type={"text"}
					value={phoneNumber}
					onChange={(e) => handlePhoneNumber(e)}
					required={true}
					heading={"Phone Number"}
				/>
				<CustomSelectInput
					onChange={(e) => handleWhiteListPhoneNumber(e)}
					heading={"White List Phone Number"}
					values={["true", "false"]}
					options={["True", "False"]}
				/>
				<CustomSelectInput
					onChange={(e) => handleOncePhoneNumber(e)}
					heading={"Phone Number Once?"}
					values={["true", "false"]}
					options={["True", "False"]}
				/>
				<CustomSelectInput
					onChange={(e) => handleDeliveryOnly(e)}
					heading={"Delivery Only?"}
					values={["true", "false"]}
					options={["True", "False"]}
				/>
				<CustomSelectInput
					onChange={(e) => handleProdType(e)}
					heading={"Select Product Type"}
					values={["cus", "b2b"]}
					options={["Customer", "Bulk Buy"]}
				/>
				<CustomSelectInput
					onChange={(e) => handleCityInfo(e)}
					options={["Karachi", "Peshawar"]}
					values={["1", "4"]}
					heading={"Select City"}
				/>
			</section>
			<CustomButton onClick={(e) => handleSubmit(e)} width={"1/3"}>
				Save
			</CustomButton>
		</section>
	);
};

export default AddnUpdateCouponAPIComponent;
