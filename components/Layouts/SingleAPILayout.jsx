import Loading from "../../utils/Loading"
import CustomButton from "../Misc/CustomButton"

const SingleAPILayout = ({ children, loading, buttonOnClick, buttonText }) => {
    return (
        <section>
            <Loading loading={loading} />
            <form action="" method="POST" className="relative grid grid-cols-2 pt-6 px-10">
                {children}
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