import { useState, useEffect } from "react"

import { checkStatus, getGeneralApiParams } from "../../../utils/GeneralVariables"
import { createAndUpdatePermsissionApi, getAllPermissionsApi } from "../../../utils/ApiCalls"
import SingleTabLayout from "../../Layouts/SingleTabLayout"

const Table = ({ allPermissions, setIsLoading, reloadPermissionsList }) => {
    const [isEditId, setIsEditId] = useState(null)
    const [updatedValue, setUpdatedValue] = useState({
        "id": "",
        "apiName": "",
        "apiURL": "",
        "category": "",
        "active": ""
    })
    const [newPermission, setNewPermission] = useState({
        "apiName": "",
        "apiURL": "",
        "category": "",
        "active": ""
    })

    const callUpdatePermissionAPI = async (e) => {
        setIsLoading(true)
        e.preventDefault()
        const { baseUrl, headers } = getGeneralApiParams()
        await createAndUpdatePermsissionApi(
            baseUrl,
            updatedValue.id,
            updatedValue.apiName,
            updatedValue.apiURL,
            updatedValue.category,
            updatedValue.active,
            headers
        ).then((response) => {
            checkStatus(response, "Permission Updated")
            setIsEditId(null)
            reloadPermissionsList()
            setIsLoading(false)
        })
    }

    const callEnablePermissionAPI = async (e, id, apiName, apiURL, category) => {
        setIsLoading(true)
        e.preventDefault()
        const { baseUrl, headers } = getGeneralApiParams()
        await createAndUpdatePermsissionApi(
            baseUrl,
            id,
            apiName,
            apiURL,
            category,
            "Y",
            headers
        ).then((response) => {
            checkStatus(response, "Permission Enabled")
            setIsEditId(null)
            reloadPermissionsList()
            setIsLoading(false)
        })
    }

    const callDisablePermissionAPI = async (e, id, apiName, apiURL, category) => {
        setIsLoading(true)
        e.preventDefault()
        const { baseUrl, headers } = getGeneralApiParams()
        await createAndUpdatePermsissionApi(
            baseUrl,
            id,
            apiName,
            apiURL,
            category,
            "N",
            headers
        ).then((response) => {
            checkStatus(response, "Permission Disabled")
            setIsEditId(null)
            reloadPermissionsList()
            setIsLoading(false)
        })
    }

    const callCreatePermissionAPI = async (e) => {
        setIsLoading(true)
        e.preventDefault()
        const { baseUrl, headers } = getGeneralApiParams()
        await createAndUpdatePermsissionApi(
            baseUrl,
            "",
            updatedValue.apiName,
            updatedValue.apiURL,
            updatedValue.category,
            updatedValue.active,
            headers
        ).then((response) => {
            checkStatus(response, "New Permission Created")
            reloadPermissionsList()
            setIsLoading(false)
        })
    }

    return (
        <section className="w-full shadow-xl border-gray-200 border-2 rounded py-6">
            <div className="w-full grid grid-cols-12 py-2 items-center justify-center">
                <p className="col-span-2 w-full h-full border-b ml-6">
                    Name
                </p>
                <p className="col-span-4 w-full h-full border-b">
                    API URL
                </p>
                <p className="col-span-2 w-full h-full border-b">
                    Category
                </p>
                <p className="col-span-1 w-full h-full border-b">
                    Active
                </p>
                <p className="col-span-3 h-full border-b mr-6" />
            </div>
            {allPermissions.map((each) => {
                let { id, active, apiName, apiURL, catgeory } = each

                return (
                    <div
                        key={id}
                        className="w-full grid grid-cols-12 gap-x-2 font-nunito text-lg font-semibold even:bg-white odd:bg-gray-50 p-2"
                    >
                        {isEditId === id ? (
                            <>
                                <input
                                    className="col-span-2 pl-6 w-full h-full"
                                    value={updatedValue.apiName}
                                    onChange={(e) => {
                                        setUpdatedValue({
                                            ...updatedValue,
                                            apiName: e.target.value
                                        })
                                    }}
                                />
                                <input
                                    className="col-span-4 w-full h-full"
                                    value={updatedValue.apiURL}
                                    onChange={(e) => {
                                        setUpdatedValue({
                                            ...updatedValue,
                                            apiURL: e.target.value
                                        })
                                    }}
                                />
                                <input
                                    className="col-span-2 w-full h-full"
                                    value={updatedValue.category}
                                    onChange={(e) => {
                                        setUpdatedValue({
                                            ...updatedValue,
                                            category: e.target.value
                                        })
                                    }}
                                />
                                <input
                                    type={"checkbox"}
                                    className="col-span-1 w-full h-full"
                                    checked={updatedValue.active === "Y" ? true : false}
                                    onChange={(e) => {
                                        setUpdatedValue({
                                            ...updatedValue,
                                            active: e.target.checked ? "Y" : "N"
                                        })
                                    }}
                                />
                                <div className="flex w-full h-full space-x-4 col-span-3 pr-6">
                                    <button
                                        className="bg-green-400 text-white font-semibold py-2 rounded-md w-full duration-200"
                                        onClick={(e) => {
                                            callUpdatePermissionAPI(e)
                                        }}
                                    >
                                        Update
                                    </button>
                                    <button
                                        className="bg-red-500 text-white font-semibold py-2 rounded-md w-full duration-200"
                                        onClick={() => {
                                            setIsEditId(null)
                                        }}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                <p className="col-span-2 pl-6 w-full h-full">
                                    {apiName}
                                </p>
                                <p className="col-span-4 w-full h-full">
                                    {apiURL}
                                </p>
                                <p className="col-span-2 w-full h-full">
                                    {catgeory}
                                </p>
                                <p className="col-span-1 w-full h-full">
                                    {active === "Y" && "True"}
                                    {active === "N" && "False"}
                                </p>
                                <div className="flex w-full h-full space-x-4 col-span-3 pr-6">
                                    <button
                                        className="bg-main-blue text-white font-semibold py-2 rounded-md w-full duration-200"
                                        onClick={() => {
                                            setIsEditId(id)
                                            setUpdatedValue({
                                                id,
                                                apiName,
                                                apiURL,
                                                "category": catgeory,
                                                active
                                            })
                                        }}
                                    >
                                        Edit
                                    </button>
                                    {active === "Y" && (
                                        <button
                                            className="bg-red-500 text-white font-semibold py-2 rounded-md w-full duration-200"
                                            onClick={(e) => {
                                                callDisablePermissionAPI(e, id, apiName, apiURL, catgeory)
                                            }}
                                        >
                                            Disable
                                        </button>
                                    )}
                                    {active === "N" && (
                                        <button
                                            className="bg-green-400 text-white font-semibold py-2 rounded-md w-full duration-200"
                                            onClick={(e) => {
                                                callEnablePermissionAPI(e, id, apiName, apiURL, catgeory)
                                            }}
                                        >
                                            Enable
                                        </button>
                                    )}
                                </div>
                            </>
                        )}
                    </div>
                )
            })}
        </section>
    )
}

const ManagePermissions = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [allPermissions, setAllPermissions] = useState([])

    useEffect(() => {
        callGetAllPermissionsApi()
    }, [])

    const callGetAllPermissionsApi = async () => {
        setIsLoading(true)

        const { baseUrl, headers } = getGeneralApiParams()
        await getAllPermissionsApi(baseUrl, headers).then((response) => {
            let status = checkStatus(response, "")
            status && setAllPermissions(response.data.data)
            setIsLoading(false)
        })
    }

    return (
        <SingleTabLayout
            heading={"Manage Permissions"}
            loading={isLoading}
        >
            <Table
                allPermissions={allPermissions}
                setIsLoading={setIsLoading}
                reloadPermissionsList={callGetAllPermissionsApi}
            />
        </SingleTabLayout>
    )
}

export default ManagePermissions