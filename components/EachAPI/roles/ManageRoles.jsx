import { useState, useEffect } from "react"

import {
    checkStatus,
    getGeneralApiParams,
} from "../../../utils/GeneralVariables"
import {
    createAndUpdateRoleApi,
    getRolesApi,
} from "../../../utils/ApiCalls"
import SingleTabLayout from "../../Layouts/SingleTabLayout"

const Table = ({ allRoles, setIsLoading, reloadRolesList }) => {
    const [isEditId, setIsEditId] = useState(null)
    const [updatedValue, setUpdatedValue] = useState({
        id: "",
        name: "",
        active: "",
    })

    const headingStyle =
        "flex items-center w-full h-full border-b cursor-pointer"
    const cellStyle = "flex items-center w-full h-full"
    const inputStyle =
        "flex items-center w-full h-full border-gray-500 border-2 rounded-lg px-2"
    const buttonStyle =
        "text-white font-semibold py-2 rounded-md w-full duration-200 hover:scale-105"

    const callUpdateRoleAPI = async (e) => {
        setIsLoading(true)
        e.preventDefault()
        const { baseUrl, headers } = getGeneralApiParams()
        await createAndUpdateRoleApi(
            baseUrl,
            updatedValue.id,
            updatedValue.name,
            updatedValue.active,
            headers
        ).then((response) => {
            if (checkStatus(response, "Role Updated")) {
                setIsEditId(null)
                reloadRolesList()
            }
            setIsLoading(false)
        })
    }

    const callEnableRoleAPI = async (e, id, name) => {
        setIsLoading(true)
        e.preventDefault()
        const { baseUrl, headers } = getGeneralApiParams()
        await createAndUpdateRoleApi(baseUrl, id, name, "Y", headers).then(
            (response) => {
                checkStatus(response, "Role Enabled")
                setIsEditId(null)
                reloadRolesList()
                setIsLoading(false)
            }
        )
    }

    const callDisableRoleAPI = async (e, id, name) => {
        setIsLoading(true)
        e.preventDefault()
        const { baseUrl, headers } = getGeneralApiParams()
        await createAndUpdateRoleApi(baseUrl, id, name, "N", headers).then(
            (response) => {
                checkStatus(response, "Role Disabled")
                setIsEditId(null)
                reloadRolesList()
                setIsLoading(false)
            }
        )
    }

    return (
        <section className="w-full shadow-xl border-gray-200 border-2 rounded py-6">
            {/* HEADINGS */}
            <div className="w-full grid grid-cols-6 py-2 items-center justify-center">
                <p className={headingStyle + [" col-span-2 ml-6"]}>Role Name</p>
                <p className={headingStyle + [" col-span-1"]}>Active</p>
                <p className={headingStyle + [" w-auto col-span-3 mr-6"]} />
            </div>
            {/* LIST ALL ROLES */}
            {allRoles.map((each) => {
                let { id, active, name } = each

                return (
                    <div
                        key={id}
                        className="w-full grid grid-cols-6 gap-x-2 font-nunito text-lg font-semibold even:bg-white odd:bg-gray-50 p-2"
                    >
                        {/* IF IS EDIT, SHOW INPUT FIELDS, OTHERWISE LIST NORMALLY */}
                        {isEditId === id ? (
                            <>
                                <input
                                    className={
                                        inputStyle + [" col-span-2 pl-6"]
                                    }
                                    value={updatedValue.name}
                                    onChange={(e) => {
                                        setUpdatedValue({
                                            ...updatedValue,
                                            name: e.target.value,
                                        })
                                    }}
                                />
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
                                            callUpdateRoleAPI(e)
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
                                    {name}
                                </p>
                                <p className={cellStyle + [" col-span-1"]}>
                                    {active === "Y" && "Active"}
                                    {active === "N" && "Inactive"}
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
                                                name,
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
                                                callDisableRoleAPI(e, id, name)
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
                                                callEnableRoleAPI(e, id, name)
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

const ManageRoles = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [allRoles, setAllRoles] = useState([])

    useEffect(() => {
        callGetAllRolesApi()
    }, [])

    const callGetAllRolesApi = async () => {
        setIsLoading(true)

        const { baseUrl, headers } = getGeneralApiParams()
        await getRolesApi(baseUrl, headers).then((response) => {
            let status = checkStatus(response, "")
            status && setAllRoles(response.data.data)
            setIsLoading(false)
        })
    }

    return (
        <SingleTabLayout heading={"Manage Roles"} loading={isLoading}>
            <Table
                allRoles={allRoles}
                setIsLoading={setIsLoading}
                reloadRolesList={callGetAllRolesApi}
            />
        </SingleTabLayout>
    )
}

export default ManageRoles
