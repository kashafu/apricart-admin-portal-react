import { useState, useEffect } from "react"

import {
    checkStatus,
    getGeneralApiParams,
} from "../../../utils/GeneralVariables"
import {
    createAndUpdatePermsissionApi,
    getAllPermissionCategoriesApi,
    getAllPermissionsApi,
} from "../../../utils/ApiCalls"
import SingleTabLayout from "../../Layouts/SingleTabLayout"

const Table = ({ allPermissions, permissionCategories, setIsLoading, reloadPermissionsList }) => {
    const [permissions, setPermissions] = useState(allPermissions)
    const [isEditId, setIsEditId] = useState(null)
    const [isCustomCategory, setIsCustomCategory] = useState(false)
    const [updatedValue, setUpdatedValue] = useState({
        id: "",
        apiName: "",
        apiURL: "",
        category: "",
        active: "",
    })

    const headingStyle =
        "flex items-center w-full h-full border-b cursor-pointer"
    const cellStyle = "flex items-center w-full h-full"
    const inputStyle =
        "flex items-center w-full h-full border-gray-500 border-2 rounded-lg px-2"
    const buttonStyle =
        "text-white font-semibold py-2 rounded-md w-full duration-200 hover:scale-105"

    useEffect(() => {
        setPermissions(allPermissions)
    }, [allPermissions])

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
            if (checkStatus(response, "Permission Updated")) {
                setIsEditId(null)
                reloadPermissionsList()
            }
            setIsLoading(false)
        })
    }

    const callEnablePermissionAPI = async (
        e,
        id,
        apiName,
        apiURL,
        category
    ) => {
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

    const callDisablePermissionAPI = async (
        e,
        id,
        apiName,
        apiURL,
        category
    ) => {
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

    return (
        <section className="w-full shadow-xl border-gray-200 border-2 rounded py-6">
            {/* HEADINGS */}
            <div className="w-full grid grid-cols-8 py-2 items-center justify-center">
                <p
                    className={headingStyle + [" col-span-2 ml-6"]}
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
                <p
                    className={headingStyle + [" col-span-1"]}
                    onClick={() => {
                        const sortedArray = [...permissions]
                        sortedArray.sort((a, b) => {
                            if (a.active < b.active) {
                                return -1
                            }
                            if (a.active > b.active) {
                                return 1
                            }
                            return 0
                        })
                        setPermissions(sortedArray)
                    }}
                >
                    Active
                </p>
                <p className={headingStyle + [" w-auto col-span-3 mr-6"]} />
            </div>

            {/* LIST ALL PERMISSIONS */}
            {permissions.map((each) => {
                let { id, active, apiName, apiURL, category } = each

                return (
                    <div
                        key={id}
                        className="w-full grid grid-cols-8 gap-x-2 font-nunito text-lg font-semibold even:bg-white odd:bg-gray-50 p-2"
                    >
                        {/* IF IS EDIT, SHOW INPUT FIELDS, OTHERWISE LIST NORMALLY */}
                        {isEditId === id ? (
                            <>
                                <input
                                    className={
                                        inputStyle + [" col-span-2 pl-6"]
                                    }
                                    value={updatedValue.apiName}
                                    onChange={(e) => {
                                        setUpdatedValue({
                                            ...updatedValue,
                                            apiName: e.target.value,
                                        })
                                    }}
                                />
                                <select
                                    className={inputStyle + [isCustomCategory ? " col-span-1" : " col-span-2"]}
                                    value={updatedValue.category}
                                    onChange={(e) => {
                                        if (e.target.value === "custom category") {
                                            setIsCustomCategory(true)
                                        }
                                        else {
                                            setUpdatedValue({
                                                ...updatedValue,
                                                category: e.target.value,
                                            })
                                            setIsCustomCategory(false)
                                        }
                                    }}
                                >
                                    {permissionCategories.map((permission) => {
                                        return (
                                            <option
                                                key={permission}
                                                value={permission}
                                            >
                                                {permission}
                                            </option>
                                        )
                                    })}
                                    <option
                                        value={"custom category"}
                                    >
                                        New Category...
                                    </option>
                                </select>
                                {isCustomCategory && (
                                    <input
                                        className={
                                            inputStyle + [" col-span-1"]
                                        }
                                        value={updatedValue.category}
                                        onChange={(e) => {
                                            setUpdatedValue({
                                                ...updatedValue,
                                                category: e.target.value,
                                            })
                                        }}
                                    />
                                )}
                                <input
                                    type={"checkbox"}
                                    className={inputStyle + [" col-span-1"]}
                                    checked={
                                        updatedValue.active === "Y"
                                            ? true
                                            : false
                                    }
                                    onChange={(e) => {
                                        setUpdatedValue({
                                            ...updatedValue,
                                            active: e.target.checked
                                                ? "Y"
                                                : "N",
                                        })
                                    }}
                                />
                                <div
                                    className={
                                        cellStyle +
                                        [" space-x-4 col-span-3 pr-6"]
                                    }
                                >
                                    <button
                                        className={
                                            buttonStyle + [" bg-green-400"]
                                        }
                                        onClick={(e) => {
                                            callUpdatePermissionAPI(e)
                                        }}
                                    >
                                        Update
                                    </button>
                                    <button
                                        className={
                                            buttonStyle + [" bg-red-500"]
                                        }
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
                                <p className={cellStyle + [" col-span-2"]}>
                                    {category}
                                </p>
                                <p className={cellStyle + [" col-span-1"]}>
                                    {active === "Y" && "True"}
                                    {active === "N" && "False"}
                                </p>
                                <div
                                    className={
                                        cellStyle +
                                        [" space-x-4 col-span-3 pr-6"]
                                    }
                                >
                                    <button
                                        className={
                                            buttonStyle + [" bg-main-blue"]
                                        }
                                        onClick={() => {
                                            setIsEditId(id)
                                            setUpdatedValue({
                                                id,
                                                apiName,
                                                apiURL,
                                                category,
                                                active,
                                            })
                                        }}
                                    >
                                        Edit
                                    </button>
                                    {active === "Y" && (
                                        <button
                                            className={
                                                buttonStyle + [" bg-red-500"]
                                            }
                                            onClick={(e) => {
                                                callDisablePermissionAPI(
                                                    e,
                                                    id,
                                                    apiName,
                                                    apiURL,
                                                    category
                                                )
                                            }}
                                        >
                                            Disable
                                        </button>
                                    )}
                                    {active === "N" && (
                                        <button
                                            className={
                                                buttonStyle + [" bg-green-400"]
                                            }
                                            onClick={(e) => {
                                                callEnablePermissionAPI(
                                                    e,
                                                    id,
                                                    apiName,
                                                    apiURL,
                                                    category
                                                )
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
    const [permissionCategories, setPermissionCategories] = useState([])

    useEffect(() => {
        callGetAllPermissionsApi()
        callGetAllPermissionsCategoriesApi()
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

    const callGetAllPermissionsCategoriesApi = async () => {
        setIsLoading(true)

        const { baseUrl, headers } = getGeneralApiParams()
        await getAllPermissionCategoriesApi(baseUrl, headers).then((response) => {
            let status = checkStatus(response, "")
            status && setPermissionCategories(response.data.data)
            setIsLoading(false)
        })
    }

    return (
        <SingleTabLayout heading={"Manage Permissions"} loading={isLoading}>
            <Table
                allPermissions={allPermissions}
                setIsLoading={setIsLoading}
                reloadPermissionsList={callGetAllPermissionsApi}
                permissionCategories={permissionCategories}
            />
        </SingleTabLayout>
    )
}

export default ManagePermissions
