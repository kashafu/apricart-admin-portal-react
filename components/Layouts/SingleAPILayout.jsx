import Loading from "../../utils/Loading"
import CustomButton from "../Misc/CustomButton"
import Heading from "../Misc/Heading"

const SingleAPILayout = ({ gridItems, rowItems, loading, buttonOnClick, buttonText, heading }) => {
    return (
        <section>
            <Loading loading={loading} />
            {/* <Heading>
                {heading}
            </Heading> */}
            <form action="" method="POST" className="relative pt-6 px-10">
                <div className="grid grid-cols-2">
                    {gridItems}
                </div>
                <div className="flex flex-col w-full">
                    {rowItems}
                </div>
            </form>
            <div>
                <CustomButton width={"1/3"} onClick={(e) => buttonOnClick(e)}>
                    {buttonText}
                </CustomButton>
            </div>
        </section>
    )
}

export default SingleAPILayout