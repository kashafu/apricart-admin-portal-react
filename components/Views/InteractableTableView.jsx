const InteractableTableView = ({ headings, data, dataKeys, key, buttons }) => {
    return (
        <table className="table-auto w-full rounded text-left shadow-xl">
            <thead>
                <tr>
                    {headings.map((each) => {
                        return (
                            <th
                                key={each}
                                className="px-4 py-2 border-b-2 first:pl-4"
                            >
                                {each}
                            </th>
                        )
                    })}
                    {buttons && <th className="px-4 py-2" />}
                </tr>
            </thead>
            <tbody>
                {data.map((eachData) => {
                    return (
                        <tr key={eachData[key]} className="h-11">
                            {dataKeys.map((eachKey) => {
                                return (
                                    <td key={eachKey} className="text-left p-4">
                                        {eachData[eachKey]}
                                    </td>
                                )
                            })}
                            {buttons && (
                                <td>
                                    {buttons.map((each) => {
                                        let { name, onClick } = each
                                        return (
                                            <button
                                                key={name}
                                                className=""
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
