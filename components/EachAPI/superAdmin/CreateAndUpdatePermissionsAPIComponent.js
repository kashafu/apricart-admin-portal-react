import { useState } from "react"

import { createAndUpdatePermsissionApi } from "../../../utils/ApiCalls"
import {
	checkStatus,
	getGeneralApiParams,
} from "../../../utils/GeneralVariables"
import SingleAPILayout from "../../Layouts/SingleAPILayout"
import CustomInput from "../../Misc/CustomInput"
import CustomSelectInput from "../../Misc/CustomSelectInput"

const CreateAndUpdatePermissionsAPIComponent = () => {
	const [loading, setLoading] = useState(false)
	const [name, setName] = useState("")
	const [url, setUrl] = useState("")
	const [active, setActive] = useState("Y")

	const handleName = (e) => {
		setName(e.target.value)
	}
	const handleUrl = (e) => {
		setUrl(e.target.value)
	}

	const handleSubmit = async (e) => {
		setLoading(true)
		e.preventDefault()
		const { baseUrl, headers } = getGeneralApiParams()
		await createAndUpdatePermsissionApi(
			baseUrl,
			"",
			name,
			url,
			active,
			headers
		).then((response) => {
			checkStatus(response, "New Permission Created")
			setLoading(false)
		})
	}

	return (
		<SingleAPILayout
			heading={"Create New or Update Permission"}
			loading={loading}
			buttonOnClick={(e) => handleSubmit(e)}
			buttonText={"Create New Permission"}
			rowItems={
				<>
					<CustomInput
						heading={"Name"}
						placeholder={"Enter Permission Name"}
						value={name}
						onChange={(e) => handleName(e)}
					/>
					<CustomInput
						heading={"URL"}
						placeholder={"Enter API Url"}
						value={url}
						onChange={(e) => handleUrl(e)}
					/>
					<CustomSelectInput
						heading={"Active/Inactive"}
						customOnChange={(e) => setActive(e.target.value)}
						value={active}
						options={[
							{
								name: "Yes",
								id: "Y"
							},
							{
								name: "No",
								id: "N"
							}]
						}
						optionText="name"
					/>
				</>
			}
		/>
	)
}

export default CreateAndUpdatePermissionsAPIComponent
