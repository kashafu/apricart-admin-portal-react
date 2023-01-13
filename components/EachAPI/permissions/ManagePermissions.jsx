import { useState, useEffect } from "react"

import { checkStatus, getGeneralApiParams } from "../../../utils/GeneralVariables"
import { getAllPermissionsApi } from "../../../utils/ApiCalls"
import SingleTabLayout from "../../Layouts/SingleTabLayout"
import InteractableTableView from "../../Views/InteractableTableView"

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

    const click = (each) => {
        console.log(each)
    }

    return (
        <SingleTabLayout
            heading={"Manage Permissions"}
            loading={isLoading}
        >
            <InteractableTableView
                headings={["Name", "API URL", "Category", "Active"]}
                data={allPermissions}
                dataKeys={["apiName", "apiURL", "catgeory", "active",]}
                key="id"
                buttons={[
                    {
                        name: "hemlo",
                        onClick: click
                    },
                    {
                        name: "not henlo",
                        onClick: click
                    }
                ]}
            />
        </SingleTabLayout>
    )
}

export default ManagePermissions