import Loading from "../../utils/Loading"
import CustomButton from "../Misc/CustomButton"
import Heading from "../Misc/Heading"

const SingleAPILayout = ({ gridItems, rowItems, loading, buttonOnClick, buttonText, heading, children }) => {
    return (
        <section className="relative pt-6 px-10">
            <Loading loading={loading} />
            {/* <Heading>
                {heading}
            </Heading> */}
            <form action="" method="POST" className="">
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
            <div className="pt-10">
                {children}
            </div>
        </section>
    )
}

export default SingleAPILayout