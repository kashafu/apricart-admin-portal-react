import { useEffect, useState } from "react"
import { addCouponApi, getAllCategoriesApi } from "../../../utils/ApiCalls"
import {
	checkStatus,
	getGeneralApiParams,
} from "../../../utils/GeneralVariables"
import CustomInput from "../../Misc/CustomInput"
import CustomSelectInput from "../../Misc/CustomSelectInput"
import SingleAPILayout from "../../Layouts/SingleAPILayout"

const AddnUpdateCouponAPIComponent = () => {
	const [loading, setLoading] = useState(false)
	const [displayExpiry, setDisplayExpiry] = useState("")

	const [categories, setCategories] = useState([])
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
	})

	useEffect(() => {
		fetchCategoryIds()
	}, [])

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
	} = inputs

	const handleName = (e) => {
		setInputs({ ...inputs, name: e.target.value })
	}
	const handleDiscount = (e) => {
		setInputs({ ...inputs, discount: e.target.value })
	}
	const handleIsPercent = (e) => {
		setInputs({ ...inputs, isPercent: e.target.value })
	}
	const handleActive = (e) => {
		setInputs({ ...inputs, active: e.target.value })
	}
	const handleUsageLimit = (e) => {
		setInputs({ ...inputs, usageLimit: e.target.value })
	}
	const handleMinSubTotal = (e) => {
		setInputs({ ...inputs, minSubTotal: e.target.value })
	}
	const handleExpiry = (e) => {
		let newExp = e.target.value.concat("T00:00:00Z")
		setInputs({ ...inputs, expiry: newExp })
		setDisplayExpiry(e.target.value)
	}
	const handleProductSkus = (e) => {
		setInputs({ ...inputs, productSkus: e.target.value })
	}
	const handleCategory = (e) => {
		setInputs({ ...inputs, category: e.target.value })
	}
	const handleWhiteList = (e) => {
		setInputs({ ...inputs, whitelist: e.target.value })
	}
	const handlePhoneNumber = (e) => {
		setInputs({ ...inputs, phoneNumber: e.target.value })
	}
	const handleWhiteListPhoneNumber = (e) => {
		setInputs({ ...inputs, whitelistPhoneNumber: e.target.value })
	}
	const handleOncePhoneNumber = (e) => {
		setInputs({ ...inputs, oncePhoneNumber: e.target.value })
	}
	const handleDeliveryOnly = (e) => {
		setInputs({ ...inputs, deliveryOnly: e.target.value })
	}
	const handleProdType = (e) => {
		setInputs({ ...inputs, prodType: e.target.value })
	}
	const handleCityInfo = (e) => {
		setInputs({ ...inputs, cityInfo: e.target.value })
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		const { baseUrl, headers } = getGeneralApiParams()
		await addCouponApi(baseUrl, inputs, headers).then((response) => {
			checkStatus(response, "Coupon created successfully")
		})
	}

	const fetchCategoryIds = async () => {
		const { baseUrl } = getGeneralApiParams()
		await getAllCategoriesApi(baseUrl, {
			Accept: "application/json",
			"Content-Type": "application/json",
		}).then((response) => {
			setInputs({ ...inputs, category: response.data.data[0].id })

			let status = checkStatus(response, "")
			status && setCategories(response.data.data)
			setLoading(false)
		})
	}

	return (
		<SingleAPILayout
			heading={"Add and Update Coupons"}
			loading={loading}
			buttonOnClick={(e) => handleSubmit(e)}
			buttonText={"Save"}
			gridItems={
				<>
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
						heading={"Is Percent?"}
						customOnChange={handleIsPercent}
						value={inputs.isPercent}
						options={[
							{
								name: "True",
								id: true,
							},
							{
								name: "False",
								id: false,
							},
						]}
						optionText="name"
					/>
					<CustomSelectInput
						heading={"Is Active?"}
						customOnChange={handleActive}
						value={inputs.active}
						options={[
							{
								name: "True",
								id: true,
							},
							{
								name: "False",
								id: false,
							},
						]}
						optionText="name"
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
						heading={"Select Category"}
						placeholder="Select Category"
						customOnChange={handleCategory}
						value={inputs.category}
						options={categories}
						optionText="name"
					/>
					<CustomSelectInput
						heading={"White List"}
						customOnChange={handleWhiteList}
						value={inputs.active}
						options={[
							{
								name: "True",
								id: true,
							},
							{
								name: "False",
								id: false,
							},
						]}
						optionText="name"
					/>
					<CustomInput
						type={"text"}
						value={phoneNumber}
						onChange={(e) => handlePhoneNumber(e)}
						required={true}
						heading={"Phone Number"}
					/>
					<CustomSelectInput
						heading={"White List Phone Number"}
						customOnChange={handleWhiteListPhoneNumber}
						value={inputs.whitelistPhoneNumber}
						options={[
							{
								name: "True",
								id: true,
							},
							{
								name: "False",
								id: false,
							},
						]}
						optionText="name"
					/>
					<CustomSelectInput
						heading={"Phone Number Once?"}
						customOnChange={handleOncePhoneNumber}
						value={inputs.oncePhoneNumber}
						options={[
							{
								name: "True",
								id: true,
							},
							{
								name: "False",
								id: false,
							},
						]}
						optionText="name"
					/>
					<CustomSelectInput
						heading={"Delivery Only?"}
						customOnChange={handleDeliveryOnly}
						value={inputs.deliveryOnly}
						options={[
							{
								name: "True",
								id: true,
							},
							{
								name: "False",
								id: false,
							},
						]}
						optionText="name"
					/>
					<CustomSelectInput
						heading={"Select Product Type"}
						customOnChange={handleProdType}
						value={inputs.prodType}
						options={[
							{
								name: "Online Delivery",
								id: "b2b",
							},
							{
								name: "Customer",
								id: "cus",
							},
						]}
						optionText="name"
					/>
					<CustomSelectInput
						heading={"Select City"}
						customOnChange={handleCityInfo}
						value={inputs.cityInfo}
						options={[
							{
								name: "Karachi",
								id: 1,
							},
							{
								name: "Peshawar",
								id: 4,
							},
						]}
						optionText="name"
					/>
				</>
			}
		/>
	)
}

export default AddnUpdateCouponAPIComponent
