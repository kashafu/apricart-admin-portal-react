import { useEffect, useState } from "react"

import {
	checkStatus,
	getGeneralApiParams,
} from "../../../utils/GeneralVariables"
import { getAllCategoriesApi } from "../../../utils/ApiCalls"
import SingleTabLayout from "../../Layouts/SingleTabLayout"

import { FiChevronsRight } from "react-icons/fi"

const ViewAllCategories = () => {
	const [loading, setLoading] = useState(false)
	const [categories, setCategories] = useState([])
	const [selected, setSelected] = useState("")

	useEffect(() => {
		getCategories()
	}, [])

	const getCategories = async () => {
		setLoading(true)
		const { baseUrl } = getGeneralApiParams()

		await getAllCategoriesApi(baseUrl, {
			Accept: "application/json",
			"Content-Type": "application/json",
		}).then((response) => {
			let status = checkStatus(response, "")
			status && setCategories(response.data.data)
			setLoading(false)
		})
	}

	return (
		<SingleTabLayout heading={"Manage Permissions"} loading={loading}>
			<aside className="overflow-hidden grid grid-cols-2 bg-white shadow-xl border-slate-100 border mx-2">
				<section className="col-span-1">
					<h3 className="p-[2.35rem] font-nunito font-bold text-lg border-b-[1px] text-txt-dark">
						Categories
					</h3>
					<div>
						<div className="grid grid-cols-8 items-center w-full bg-slate-100">
							<p className="col-span-4 text-left py-4 px-6">
								Name
							</p>
							<p className="col-span-3 py-4 px-6">Position</p>
						</div>
						<div className="overflow-y-auto scroller-mini h-96">
							{categories.map((each) => (
								<section
									key={each.index}
									className=" justify-center items-center "
								>
									<div
										className={
											each === selected
												? "hover:bg-main-blue-100 bg-gray-300 cursor-pointer duration-200 ease-in grid items-center grid-cols-8"
												: "hover:bg-gray-300 cursor-pointer duration-200 ease-in grid items-center grid-cols-8"
										}
										onClick={() => setSelected(each)}
									>
										<div className="col-span-4 overflow-y-auto py-4 px-6 duration-300">
											<p>{each.name}</p>
										</div>
										<div className="col-span-3 overflow-y-auto py-4 px-6 duration-300 ">
											<p>{each.position}</p>
										</div>
										<div className="cursor-pointer  relative">
											<FiChevronsRight
												size={24}
												className=""
											/>
										</div>
									</div>
								</section>
							))}
						</div>
					</div>
				</section>
				<section className=" duration-300 transition-all">
					<h3 className="p-[2.35rem] font-nunito font-bold text-lg border-b-[1px] text-txt-dark">
						Sub Categories
					</h3>
					<div>
						<div className="grid grid-cols-7 items-center w-full bg-slate-100">
							<p className="col-span-4 py-4 px-6">Name</p>
							<p className="col-span-3 py-4 px-6">Position</p>
						</div>
						<div className="overflow-y-auto scroller-mini h-96">
							{selected.childrenData?.map((each) => (
								<section
									key={each.endpoint}
									className="justify-center items-center animate-dropdown"
								>
									<div className="hover:bg-gray-300 cursor-pointer duration-200 ease-in  grid items-center grid-cols-7">
										<div className="col-span-4 overflow-x-hidden py-4 px-6 duration-300 ">
											<p>{each.name}</p>
										</div>
										<div className="col-span-3 overflow-y-auto py-4 px-6 duration-300 ">
											<p>{each.position}</p>
										</div>
									</div>
								</section>
							))}
						</div>
					</div>
				</section>
			</aside>
		</SingleTabLayout>
	)
}

export default ViewAllCategories
