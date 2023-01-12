import { useState } from "react"

import { updateWelcomeVideoApi } from "../../../utils/ApiCalls"
import {
	checkStatus,
	getGeneralApiParams,
} from "../../../utils/GeneralVariables"
import SingleAPILayout from "../../Layouts/SingleAPILayout"
import CustomInput from "../../Misc/CustomInput"

const UpdateWelcomeVideoAPIComponent = () => {
	const [link, setLink] = useState("")
	const [loading, setLoading] = useState(false)
	function handleLink(e) {
		setLink(e.target.value)
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		setLoading(true)
		const { baseUrl, headers } = getGeneralApiParams()
		await updateWelcomeVideoApi(baseUrl, link, headers).then((response) => {
			setLoading(false)
			checkStatus(response)
		})
	}

	return (
		<SingleAPILayout
			heading={"Welcome Video Update"}
			loading={loading}
			buttonOnClick={(e) => handleSubmit(e)}
			buttonText={"Update"}
			rowItems={
				<CustomInput
					heading={"Enter Video ID"}
					placeholder={"eg. http://youtube.com/video-link"}
					value={link}
					onChange={(e) => {
						handleLink(e)
					}}
				/>
			}
		/>
	)
}

export default UpdateWelcomeVideoAPIComponent
