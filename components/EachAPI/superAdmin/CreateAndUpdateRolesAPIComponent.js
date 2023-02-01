import { useState } from "react"

import { createAndUpdateRoleApi } from "../../../utils/ApiCalls"
import { checkStatus, getGeneralApiParams } from "../../../utils/GeneralVariables"
import SingleAPILayout from "../../Layouts/SingleAPILayout"
import CustomInput from "../../Misc/CustomInput"
import CustomSelectInput from "../../Misc/CustomSelectInput"

const CreateAndUpdateRolesAPIComponent = () => {
	const [loading, setLoading] = useState(false)
	const [name, setName] = useState("")
	const [active, setActive] = useState("Y")

	const handleName = (e) => {
		setName(e.target.value)
	}

	const handleSubmit = async (e) => {
		setLoading(true)
		e.preventDefault()
		const { baseUrl, headers } = getGeneralApiParams()
		await createAndUpdateRoleApi(baseUrl, "", name, active, headers).then(
			(response) => {
				setLoading(false)
				checkStatus(response, "New role made")
			}
		)
	}

	return (
		<SingleAPILayout
			heading={"Create a Role"}
			loading={loading}
			buttonOnClick={(e) => handleSubmit(e)}
			buttonText={"Create Role"}
			rowItems={
				<>
					<CustomInput
						heading={"Name"}
						placeholder={"Enter Role Name"}
						value={name}
						onChange={(e) => handleName(e)}
					/>

					<CustomSelectInput
						heading={"Active/Inactive"}
						customOnChange={(e) => setActive(e.target.value)}
						value={active}
						options={[
							{
								name: "Yes",
								id: "Y",
							},
							{
								name: "No",
								id: "N",
							},
						]}
						optionText="name"
					/>
				</>
			}
		/>
	)
}

export default CreateAndUpdateRolesAPIComponent
