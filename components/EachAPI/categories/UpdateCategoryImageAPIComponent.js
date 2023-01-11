import { useEffect, useState } from "react"
import FormData from "form-data"

import CustomInput from "../../Misc/CustomInput"
import CustomSingleImageInput from "../../Misc/CustomSingleImageInput"
import Heading from "../../Misc/Heading"
import {
	getAllCategoriesApi,
	updateCategoryImageApi,
} from "../../../utils/ApiCalls"
import {
	checkStatus,
	displayErrorToast,
	getGeneralApiParams,
	updateRen,
	validateImage,
} from "../../../utils/GeneralVariables"
import CustomSelectInput from "../../Misc/CustomSelectInput"
import SingleAPILayout from "../../Layouts/SingleAPILayout"

const UpdateCategoryImageAPIComponent = () => {
	var bannerData = new FormData()
	const [loading, setLoading] = useState(false)
	const [ren, setRen] = useState("")
	const [categories, setCategories] = useState([])
	const [input, setInput] = useState({
		bannerUrlApp: [],
		categoryId: "",
	})
	const { bannerUrlApp, categoryId } = input

	useEffect(() => {
		fetchCategoryIds()
	}, [])

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

	const fillFormData = () => {
		bannerData.append("app", bannerUrlApp)
		bannerData.append("category_id", categoryId)
	}

	const submitHandler = async (e) => {
		e.preventDefault()
		setLoading(true)
		const { baseUrl } = getGeneralApiParams()
		fillFormData()
		await updateCategoryImageApi(baseUrl, bannerData).then((response) => {
			setLoading(false)
			checkStatus(response)
		})
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

	return (
		<>
			<SingleAPILayout
				heading={"Update Category Image"}
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
							heading={"Upload New Category Image"}
							ren={ren}
							onChange={handleAppImage}
						/>
					</>
				}
			/>
		</>
	)
}

export default UpdateCategoryImageAPIComponent
