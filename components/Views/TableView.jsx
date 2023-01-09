const TableView = ({ headings, data, dataKeys }) => {

    return (
        <table className="table-auto w-full rounded-lg overflow-hidden">
            <thead className="bg-slate-200 border-2 border-gray-800 rounded-lg">
                <tr>
                    {headings.map((each) => {
                        return (
                            <th
                                key={each}
                                className="text-left p-4"
                            >
                                {each}
                            </th>
                        )
                    })}
                </tr>
            </thead>
            <tbody>
                {data.map((eachData) => {
                    return (
                        <tr
                            key={eachData}
                            className="h-11"
                        >
                            {dataKeys.map((eachKey) => {
                                return (
                                    <td
                                        key={eachKey}
                                        className="text-left p-4"
                                    >
                                        {eachData[eachKey]}
                                    </td>
                                )
                            })}
                        </tr>
                    )
                })}
            </tbody>
        </table >
    )
}

export default TableView