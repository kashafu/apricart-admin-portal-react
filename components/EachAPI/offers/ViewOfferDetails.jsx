import { useEffect, useState } from "react"

import {
    getAllOffersApi, useGetOfferDetailsApi,
} from "../../../utils/ApiCalls"
import {
    checkStatus,
    getGeneralApiParams,
} from "../../../utils/GeneralVariables"
import SingleTabLayout from "../../Layouts/SingleTabLayout"
import CustomSelectInput from "../../Misc/CustomSelectInput"

const OfferDetails = ({ details }) => {
    return (
        <p>
            {JSON.stringify(details)}
        </p>
    )
}

const LinkRoleAndPermissionsAPIComponent = () => {
    const [loading, setLoading] = useState(false)
    const [allOffers, setAllOffers] = useState([])
    const [selectedOffer, setSelectedOffer] = useState("")

    const { details, isLoading, setOfferId } = useGetOfferDetailsApi()

    useEffect(() => {
        callAllOffersApi()
    }, [])

    const callAllOffersApi = async () => {
        setLoading(true)
        const { baseUrl, headers } = getGeneralApiParams()
        await getAllOffersApi(baseUrl, headers).then((response) => {
            setLoading(false)
            let status = checkStatus(response)
            status && setAllOffers(response.data.data)
            status && setSelectedOffer(response.data.data[0].id)
        })
    }

    return (
        <SingleTabLayout
            heading={"Assign Permissions to Role"}
            loading={loading || isLoading}
            rowItems={
                <CustomSelectInput
                    heading={"Offer ID"}
                    customOnChange={(e) => {
                        setSelectedOffer(e.target.value)
                        setOfferId(e.target.value)
                    }}
                    value={selectedOffer}
                    options={allOffers}
                    optionText="id"
                />
            }
        >
            <OfferDetails
                details={details}
            />
        </SingleTabLayout>
    )
}

export default LinkRoleAndPermissionsAPIComponent
