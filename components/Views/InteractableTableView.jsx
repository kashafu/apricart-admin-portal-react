const InteractableTableView = ({ headings, data, dataKeys, key, buttons }) => {
    return (
        <table className="table-auto w-full rounded-md text-left shadow-xl">
            <thead>
                <tr>
                    {headings.map((each) => {
                        return (
                            <th
                                key={each}
                                className="py-2 border-b-2 first:pl-8 last:pr-8"
                            >
                                {each}
                            </th>
                        )
                    })}
                    {buttons && <th className="py-2 border-b-2 first:pl-8 last:pr-8" />}
                </tr>
            </thead>
            <tbody>
                {data.map((eachData) => {
                    return (
                        <tr key={eachData[key]} className="odd:bg-white even:bg-gray-100">
                            {dataKeys.map((eachKey) => {
                                return (
                                    <td key={eachKey} className="py-6 first:pl-8 last:pr-8">
                                        {eachData[eachKey]}
                                    </td>
                                )
                            })}
                            {buttons && (
                                <td className="py-6 first:pl-8 last:pr-8 space-x-6">
                                    {buttons.map((each) => {
                                        let { name, onClick } = each
                                        return (
                                            <button
                                                key={name}
                                                className="bg-main-blue text-white font-bold px-4 py-2"
                                                onClick={() => {
                                                    onClick(eachData)
                                                }}
                                            >
                                                {name}
                                            </button>
                                        )
                                    })}
                                </td>
                            )}
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}

export default InteractableTableView
