import Loading from "../../utils/Loading"

const SingleTabLayout = ({ loading, children, gridItems, rowItems }) => {
    return (
        <section className="relative pt-6 px-10">
            <Loading loading={loading} />
            <div className="grid grid-cols-2">
                {gridItems}
            </div>
            <div className="flex flex-col w-full">
                {rowItems}
            </div>
            {children}
        </section>
    )
}

export default SingleTabLayout
