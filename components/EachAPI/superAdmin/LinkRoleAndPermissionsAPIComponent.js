import { useEffect, useState } from "react"

import {
	getActivePermissionsApi,
	getAllRolesApi,
	getPermissionByRoleApi,
	linkRoleAndPermissionApi,
} from "../../../utils/ApiCalls"
import {
	checkStatus,
	getGeneralApiParams,
} from "../../../utils/GeneralVariables"
import SingleTabLayout from "../../Layouts/SingleTabLayout"
import CustomSelectInput from "../../Misc/CustomSelectInput"

const Table = ({ allPermissions, allPermissionsByRole, setIsLoading, reloadPermissionsList, roleId }) => {
	const [permissions, setPermissions] = useState(allPermissions)

	const headingStyle =
		"flex items-center w-full h-full border-b cursor-pointer"
	const cellStyle = "flex items-center w-full h-full"
	const buttonStyle =
		"text-white font-semibold py-2 rounded-md w-full duration-200 hover:scale-105"

	useEffect(() => {
		setPermissions(allPermissions)
	}, [allPermissions])

	const link = (id) => {
		let temp = []
		allPermissionsByRole.forEach(element => {
			temp.push(element.permission.id)
		})
		temp.push(id)
		callLinkRoleWithPermissionsApi(temp)
	}

	const remove = (id) => {
		let temp = []
		allPermissionsByRole.forEach(element => {
			if (element.permission.id !== id) {
				temp.push(element.permission.id)
			}
		})
		callLinkRoleWithPermissionsApi(temp)
	}

	const callLinkRoleWithPermissionsApi = async (ids) => {
		setIsLoading(true)
		const { baseUrl, headers } = getGeneralApiParams()
		await linkRoleAndPermissionApi(baseUrl, roleId, ids, headers).then(
			(response) => {
				checkStatus(response, "Permissions Updated Successfully")
				setIsLoading(false)
				reloadPermissionsList()
			}
		)
	}

	return (
		<section className="w-full shadow-xl border-gray-200 border-2 rounded py-6">
			{/* HEADINGS */}
			<div className="w-full grid grid-cols-8 py-2 items-center justify-center">
				<p
					className={headingStyle + [" col-span-3 ml-6"]}
					onClick={() => {
						const sortedArray = [...permissions]
						sortedArray.sort((a, b) => {
							if (a.apiName < b.apiName) {
								return -1
							}
							if (a.apiName > b.apiName) {
								return 1
							}
							return 0
						})
						setPermissions(sortedArray)
					}}
				>
					Permission Name
				</p>
				<p
					className={headingStyle + [" col-span-2"]}
					onClick={() => {
						const sortedArray = [...permissions]
						sortedArray.sort((a, b) => {
							if (a.category < b.category) {
								return -1
							}
							if (a.category > b.category) {
								return 1
							}
							return 0
						})
						setPermissions(sortedArray)
					}}
				>
					Category
				</p>
				<p className={headingStyle + [" col-span-1"]}>
					Status
				</p>
				<p className={headingStyle + [" w-auto col-span-2 mr-6"]} />
			</div>

			{/* LIST ALL PERMISSIONS */}
			{permissions.map((each) => {
				let { id, apiName, category } = each

				return (
					<div
						key={id}
						className="w-full grid grid-cols-8 gap-x-2 font-nunito text-lg font-semibold even:bg-white odd:bg-gray-50 p-2"
					>
						<p className={cellStyle + [" col-span-3 pl-6"]}>
							{apiName}
						</p>
						<p className={cellStyle + [" col-span-2"]}>
							{category}
						</p>
						<p className={cellStyle + [" col-span-1"]}>
							{allPermissionsByRole.some((a) => {
								return id === a.permission.id
							}) ? "Linked" : "Not Linked"}
						</p>
						<div
							className={
								cellStyle +
								[" space-x-4 col-span-2 pr-6"]
							}
						>
							{allPermissionsByRole.some((a) => {
								return id === a.permission.id
							}) ? (
								<button
									className={
										buttonStyle + [" bg-red-500"]
									}
									onClick={() => {
										remove(id)
									}}
								>
									Remove
								</button>
							) : (
								<button
									className={
										buttonStyle + [" bg-green-400"]
									}
									onClick={() => {
										link(id)
									}}
								>
									Link
								</button>
							)}
						</div>
					</div>
				)
			})}
		</section>
	)
}

const LinkRoleAndPermissionsAPIComponent = () => {
	const [loading, setLoading] = useState(false)
	const [roleArray, setRoleArray] = useState([
		{
			name: "Loading...",
		},
	])
	const [allPermissions, setAllPermissions] = useState([])
	const [allPermissionsByRole, setAllPermissionsByRole] = useState([])
	const [roleId, setRoleId] = useState("")
	const [isRefreshApis, setIsRefreshApis] = useState(false)

	useEffect(() => {
		getAllRoles()
		getAllPermissions()
	}, [])

	useEffect(() => {
		if (isRefreshApis) {
			getAllPermissionsByRole(roleId)
			setIsRefreshApis(false)
		}
	}, [isRefreshApis])

	const reloadApis = () => {
		setIsRefreshApis(true)
	}

	const handleRoleId = (e) => {
		getAllPermissionsByRole(e.target.value)
		setRoleId(e.target.value)
	}

	const getAllPermissions = async () => {
		const { baseUrl, headers } = getGeneralApiParams()
		setLoading(true)
		await getActivePermissionsApi(baseUrl, headers).then((response) => {
			let status = checkStatus(response, "")
			if (status) {
				const sortedArray = [...response.data.data]
				sortedArray.sort((a, b) => {
					if (a.category < b.category) {
						return -1
					}
					if (a.category > b.category) {
						return 1
					}
					return 0
				})
				setAllPermissions(sortedArray)
			}
			setLoading(false)
		})
	}

	const getAllRoles = async () => {
		const { baseUrl, headers } = getGeneralApiParams()
		setLoading(true)
		await getAllRolesApi(baseUrl, headers).then((response) => {
			let status = checkStatus(response, "")
			status && setRoleArray(response.data.data)
			setRoleId(response.data.data[0].id)
			getAllPermissionsByRole(response.data.data[0].id)
			setLoading(false)
		})
	}

	const getAllPermissionsByRole = async (id) => {
		const { baseUrl, headers } = getGeneralApiParams()
		setLoading(true)
		await getPermissionByRoleApi(baseUrl, id, headers).then((response) => {
			let status = checkStatus(response, "")
			status && setAllPermissionsByRole(response.data.data)
			setLoading(false)
		})
	}

	return (
		<SingleTabLayout
			heading={"Assign Permissions to Role"}
			loading={loading}
			rowItems={
				<CustomSelectInput
					heading={"Role Name"}
					customOnChange={(e) => handleRoleId(e)}
					value={roleId}
					options={roleArray}
					optionText="name"
				/>
			}
		>
			<Table
				allPermissions={allPermissions}
				allPermissionsByRole={allPermissionsByRole}
				setIsLoading={setLoading}
				roleId={roleId}
				reloadPermissionsList={reloadApis}
			/>
		</SingleTabLayout>
	)
}

export default LinkRoleAndPermissionsAPIComponent
