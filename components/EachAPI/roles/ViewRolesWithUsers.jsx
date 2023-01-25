import { useState, useEffect } from "react"

import {
    checkStatus,
    getGeneralApiParams,
} from "../../../utils/GeneralVariables"
import {
    getAllRolesWithUsersApi,
} from "../../../utils/ApiCalls"
import SingleTabLayout from "../../Layouts/SingleTabLayout"

const List = ({ allRolesWithUsers }) => {
    return (
        <div className="w-full space-y-4 p-2">
            {allRolesWithUsers.map((role) => {
                let { id, name, active, users } = role
                return (
                    <div key={id} className="w-full flex flex-col space-y-6 bg-gray-100 rounded p-2">
                        <div className="flex flex-col w-full items-center">
                            <p className="text-2xl font-nunito font-bold">
                                {name}
                            </p>
                            {active === "Y" ? (
                                <p className="text-xl font-nunito font-semibold text-green-400">
                                    Active
                                </p>
                            ) : (
                                <p className="text-xl font-nunito font-semibold text-red-500">
                                    Not Active
                                </p>
                            )}
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            {users ? (
                                <>
                                    {users?.map((user) => {
                                        let { name, email, phoneNumber } = user
                                        return (
                                            <div key={user} className="bg-violet-100 p-4 rounded-2xl shadow-sm">
                                                <p className="font-nunito text-lg font-bold pb-2">
                                                    {name}
                                                </p>
                                                <p className="font-nunito text-base font-medium">
                                                    {email}
                                                </p>
                                                <p className="font-nunito text-base font-medium">
                                                    {phoneNumber}
                                                </p>
                                            </div>
                                        )
                                    })}
                                </>
                            ) : (
                                <p className="col-span-2 text-center font-nunito text-lg font-bold">
                                    NO USERS LINKED
                                </p>
                            )}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

const ViewRolesWithUsers = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [allRolesWithUsers, setAllRolesWithUsers] = useState([])

    useEffect(() => {
        callGetAllRolesWithUsersAPI()
    }, [])

    const callGetAllRolesWithUsersAPI = async () => {
        setIsLoading(true)

        const { baseUrl, headers } = getGeneralApiParams()
        await getAllRolesWithUsersApi(baseUrl, headers).then((response) => {
            let status = checkStatus(response, "")
            status && setAllRolesWithUsers(response.data.data)
            setIsLoading(false)
        })
    }

    return (
        <SingleTabLayout heading={"Manage Roles Users"} loading={isLoading}>
            <List
                allRolesWithUsers={allRolesWithUsers}
            />
        </SingleTabLayout>
    )
}

export default ViewRolesWithUsers
