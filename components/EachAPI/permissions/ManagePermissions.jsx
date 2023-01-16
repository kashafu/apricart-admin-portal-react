import { useState, useEffect } from "react"

import { checkStatus, getGeneralApiParams } from "../../../utils/GeneralVariables"
import { createAndUpdatePermsissionApi, getAllPermissionsApi } from "../../../utils/ApiCalls"
import SingleTabLayout from "../../Layouts/SingleTabLayout"

const Table = ({ allPermissions, setIsLoading, reloadPermissionsList }) => {
    const [isEditId, setIsEditId] = useState(null)
    const [isAddNewPermission, setIsAddNewPermission] = useState(false)
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

    const headingStyle = "flex items-center w-full h-full border-b"
    const cellStyle = "flex items-center w-full h-full"
    const buttonStyle = "text-white font-semibold py-2 rounded-md w-full duration-200 hover:scale-105"

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
            {/* HEADINGS */}
            <div className="w-full grid grid-cols-12 py-2 items-center justify-center">
                <p className={headingStyle + [" col-span-2 ml-6"]}>
                    Name
                </p>
                <p className={headingStyle + [" col-span-4"]}>
                    API URL
                </p>
                <p className={headingStyle + [" col-span-2"]}>
                    Category
                </p>
                <p className={headingStyle + [" col-span-1"]}>
                    Active
                </p>
                <div className={cellStyle + [" col-span-3 pr-6"]}>
                    <button
                        className={buttonStyle + [" bg-main-blue-100"]}
                        onClick={(e) => {
                            callCreatePermissionAPI(e)
                        }}
                    >
                        ADD NEW PERMISSION
                    </button>
                </div>
            </div>

            {/* ADD NEW PERMISSION VIEW IF NEW PERMISSION BEING ADDED */}
            {isAddNewPermission && (
                <div className="w-full grid grid-cols-12 gap-x-2 font-nunito text-lg font-semibold p-2">
                    <input
                        className={cellStyle + [" col-span-2 pl-6"]}
                        value={newPermission.apiName}
                        onChange={(e) => {
                            setNewPermission({
                                ...newPermission,
                                apiName: e.target.value
                            })
                        }}
                    />
                    <input
                        className={cellStyle + [" col-span-4"]}
                        value={newPermission.apiURL}
                        onChange={(e) => {
                            setNewPermission({
                                ...newPermission,
                                apiURL: e.target.value
                            })
                        }}
                    />
                    <input
                        className={cellStyle + [" col-span-2"]}
                        value={newPermission.category}
                        onChange={(e) => {
                            setNewPermission({
                                ...newPermission,
                                category: e.target.value
                            })
                        }}
                    />
                    <input
                        type={"checkbox"}
                        className={cellStyle + [" col-span-1"]}
                        checked={newPermission.active === "Y" ? true : false}
                        onChange={(e) => {
                            setNewPermission({
                                ...newPermission,
                                active: e.target.checked ? "Y" : "N"
                            })
                        }}
                    />
                    <div className={cellStyle + [" space-x-4 col-span-3 pr-6"]}>
                        <button
                            className={buttonStyle + [" bg-green-400"]}
                            onClick={(e) => {
                                callUpdatePermissionAPI(e)
                            }}
                        >
                            Update
                        </button>
                        <button
                            className={buttonStyle + [" bg-red-500"]}
                            onClick={() => {
                                setIsEditId(null)
                            }}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}

            {/* LIST ALL PERMISSIONS */}
            {allPermissions.map((each) => {
                let { id, active, apiName, apiURL, catgeory } = each

                return (
                    <div
                        key={id}
                        className="w-full grid grid-cols-12 gap-x-2 font-nunito text-lg font-semibold even:bg-white odd:bg-gray-50 p-2"
                    >
                        {/* IF IS EDIT, SHOW INPUT FIELDS, OTHERWISE LIST NORMALLY */}
                        {isEditId === id ? (
                            <>
                                <input
                                    className={cellStyle + [" col-span-2 pl-6"]}
                                    value={updatedValue.apiName}
                                    onChange={(e) => {
                                        setUpdatedValue({
                                            ...updatedValue,
                                            apiName: e.target.value
                                        })
                                    }}
                                />
                                <input
                                    className={cellStyle + [" col-span-4"]}
                                    value={updatedValue.apiURL}
                                    onChange={(e) => {
                                        setUpdatedValue({
                                            ...updatedValue,
                                            apiURL: e.target.value
                                        })
                                    }}
                                />
                                <input
                                    className={cellStyle + [" col-span-2"]}
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
                                    className={cellStyle + [" col-span-1"]}
                                    checked={updatedValue.active === "Y" ? true : false}
                                    onChange={(e) => {
                                        setUpdatedValue({
                                            ...updatedValue,
                                            active: e.target.checked ? "Y" : "N"
                                        })
                                    }}
                                />
                                <div className={cellStyle + [" space-x-4 col-span-3 pr-6"]}>
                                    <button
                                        className={buttonStyle + [" bg-green-400"]}
                                        onClick={(e) => {
                                            callUpdatePermissionAPI(e)
                                        }}
                                    >
                                        Update
                                    </button>
                                    <button
                                        className={buttonStyle + [" bg-red-500"]}
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
                                <p className={cellStyle + [" col-span-2 pl-6"]}>
                                    {apiName}
                                </p>
                                <p className={cellStyle + [" col-span-4"]}>
                                    {apiURL}
                                </p>
                                <p className={cellStyle + [" col-span-2"]}>
                                    {catgeory}
                                </p>
                                <p className={cellStyle + [" col-span-1"]}>
                                    {active === "Y" && "True"}
                                    {active === "N" && "False"}
                                </p>
                                <div className={cellStyle + [" space-x-4 col-span-3 pr-6"]}>
                                    <button
                                        className={buttonStyle + [" bg-main-blue"]}
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
                                            className={buttonStyle + [" bg-red-500"]}
                                            onClick={(e) => {
                                                callDisablePermissionAPI(e, id, apiName, apiURL, catgeory)
                                            }}
                                        >
                                            Disable
                                        </button>
                                    )}
                                    {active === "N" && (
                                        <button
                                            className={buttonStyle + [" bg-green-400"]}
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