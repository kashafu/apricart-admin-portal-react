import { useEffect, useState } from "react"

import { assignRoleApi, getActiveRolesApi } from "../../../utils/ApiCalls"
import {
	checkStatus,
	getGeneralApiParams,
} from "../../../utils/GeneralVariables"
import SingleAPILayout from "../../Layouts/SingleAPILayout"
import CustomInput from "../../Misc/CustomInput"
import CustomSelectInput from "../../Misc/CustomSelectInput"

const AssignUserRoleAPIComponent = () => {
	const [loading, setLoading] = useState(false)
	const [roleArray, setRoleArray] = useState([
		{
			name: "Loading...",
		},
	])
	const [number, setNumber] = useState("")
	const [roleId, setRoleId] = useState(1)

	useEffect(() => {
		getAllRoles()
	}, [])

	const handleNumber = (e) => {
		setNumber(e.target.value)
	}

	const handleSubmit = async (e) => {
		setLoading(true)
		e.preventDefault()
		const { baseUrl, headers } = getGeneralApiParams()
		await assignRoleApi(baseUrl, number, roleId, headers).then(
			(response) => {
				checkStatus(response, "Role Linked with Number")
				setLoading(false)
			}
		)
	}

	const getAllRoles = async () => {
		const { baseUrl, headers } = getGeneralApiParams()
		await getActiveRolesApi(baseUrl, headers).then((response) => {
			let status = checkStatus(response, "")
			status && setRoleArray(response.data.data)
			setLoading(false)
		})
	}

	return (
		<SingleAPILayout
			heading={"Assign Role to User"}
			loading={loading}
			buttonOnClick={(e) => handleSubmit(e)}
			buttonText={"Assign Role"}
			gridItems={
				<>
					<CustomInput
						type={"number"}
						heading={"User Phone Number (eg. 3331234567)"}
						placeholder={"eg. 3331234567"}
						value={number}
						onChange={(e) => handleNumber(e)}
					/>
					<CustomSelectInput
						heading={"Role Name"}
						onChange={setRoleId}
						value={roleId}
						options={roleArray}
						optionText="name"
					/>
				</>
			}
		/>
	)
}

export default AssignUserRoleAPIComponent
