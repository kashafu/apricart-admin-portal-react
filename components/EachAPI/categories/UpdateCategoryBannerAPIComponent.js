import { useEffect, useState } from "react"
import FormData from "form-data"

import CustomSingleImageInput from "../../Misc/CustomSingleImageInput"
import {
	getAllCategoriesApi,
	updateCategoryBannerApi,
} from "../../../utils/ApiCalls"
import {
	checkStatus,
	displayErrorToast,
	getGeneralApiParams,
	updateRen,
	validateImage,
} from "../../../utils/GeneralVariables"
import SingleAPILayout from "../../Layouts/SingleAPILayout"
import CustomSelectInput from "../../Misc/CustomSelectInput"

const UpdateCategoryBannerAPIComponent = () => {
	var bannerData = new FormData()
	const [loading, setLoading] = useState(false)
	const [ren, setRen] = useState(false)
	const [input, setInput] = useState({
		bannerUrlApp: "",
		bannerUrlWeb: "",
		categoryId: "",
	})
	const [categories, setCategories] = useState([])
	const { bannerUrlApp, bannerUrlWeb, categoryId } = input

	useEffect(() => {
		fetchCategoryIds()
	}, [])

	const handleWebImage = (e) => {
		let verify = e.target.files[0]
		// validateImage comes from generalVariables and returns true if it is a valid image file and false otherwise
		let status = validateImage(verify)
		if (status) {
			setInput({ ...input, bannerUrlWeb: verify })
		} else {
			setInput({ ...input, bannerUrlWeb: "" })
			updateRen(setRen)
			displayErrorToast("Upload a valid Image file", 1500, "top-left")
		}
	}

	const handleAppImage = (e) => {
		let verify = e.target.files[0]
		// validateImage comes from generalVariables and returns true if it is a valid image file and false otherwise
		let status = validateImage(verify)
		if (status) {
			setInput({ ...input, bannerUrlApp: verify })
		} else {
			setInput({ ...input, bannerUrlApp: "" })
			updateRen(setRen)
			displayErrorToast("Upload a valid Image file", 1500, "top-left")
		}
	}

	const handleCategoryId = (e) => {
		setInput({ ...input, categoryId: e.target.value })
	}

	const fetchCategoryIds = async () => {
		const { baseUrl } = getGeneralApiParams()
		await getAllCategoriesApi(baseUrl, {
			Accept: "application/json",
			"Content-Type": "application/json",
		}).then((response) => {
			setInput({ ...input, categoryId: response.data.data[0].id })
			let status = checkStatus(response, "")
			status && setCategories(response.data.data)
			setLoading(false)
		})
	}

	const fillFormData = () => {
		bannerData.append("app", bannerUrlApp)
		bannerData.append("web", bannerUrlWeb)
		bannerData.append("category_id", categoryId)
	}

	const submitHandler = async (e) => {
		e.preventDefault()
		setLoading(true)
		const { baseUrl } = getGeneralApiParams()
		fillFormData()
		await updateCategoryBannerApi(baseUrl, bannerData).then((response) => {
			setLoading(false)
			checkStatus(response)
		})
	}

	return (
		<>
			<SingleAPILayout
				heading={"Category Banner Update"}
				loading={loading}
				buttonOnClick={(e) => submitHandler(e)}
				buttonText={"Update"}
				gridItems={
					<>
						<CustomSelectInput
							onChange={(e) => handleCategoryId(e)}
							heading={"Select Category"}
							values={categories.map((each) => each.id)}
							options={categories.map((each) => each.name)}
						/>
						<CustomSingleImageInput
							heading={"Upload Web Banner"}
							onChange={(e) => handleWebImage(e)}
							ren={ren}
						/>
						<CustomSingleImageInput
							heading={"Upload App Banner"}
							onChange={(e) => handleAppImage(e)}
							position={"bottom"}
							ren={ren}
						/>
					</>
				}
			/>
		</>
	)
}

export default UpdateCategoryBannerAPIComponent
