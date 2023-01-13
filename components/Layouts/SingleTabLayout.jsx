import Loading from "../../utils/Loading"

const SingleTabLayout = ({ loading, children }) => {
    return (
        <section className="relative pt-6 px-10">
            <Loading loading={loading} />
            {children}
        </section>
    )
}

export default SingleTabLayout
