import { useState } from "react"

import { updateProductImageApi } from "../../../utils/ApiCalls"
import {
	checkStatus,
	displayErrorToast,
	getGeneralApiParams,
	updateRen,
	validateImage,
} from "../../../utils/GeneralVariables"
import CustomSingleImageInput from "../../Misc/CustomSingleImageInput"
import SingleAPILayout from "../../Layouts/SingleAPILayout"

const UploadProductImageAPIComponent = () => {
	const [loading, setLoading] = useState(false)
	const [ren, setRen] = useState("")
	const [input, setInput] = useState({
		image: "",
	})
	let data = new FormData()

	const handleImage = (e) => {
		let verify = e.target.files[0]
		// validateImage comes from generalVariables and returns true if it is a valid image file and false otherwise
		let status = validateImage(verify)
		if (status) {
			setInput({ ...input, image: verify })
		} else {
			setInput({ ...input, image: "" })
			updateRen(setRen)
			displayErrorToast("Upload a valid Image file", 1500, "top-left")
		}
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		data.append("image", input.image)
		setLoading(true)
		const { baseUrl } = getGeneralApiParams()
		await updateProductImageApi(baseUrl, data).then((response) => {
			checkStatus(response, "Image Updated Successfully")
			setLoading(false)
		})
	}

	return (
		<SingleAPILayout
			heading={"Update Category Image"}
			loading={loading}
			buttonOnClick={(e) => handleSubmit(e)}
			buttonText={"Update"}
			gridItems={
				<>
					<div className="flex items-center">
						<p className="pb-2 font-nunito text-lg">
							Make sure file name of image is same as the SKU of
							the product
						</p>
					</div>
					<CustomSingleImageInput
						heading={"Update New Image"}
						ren={ren}
						onChange={handleImage}
					/>
				</>
			}
		/>
	)
}

export default UploadProductImageAPIComponent
