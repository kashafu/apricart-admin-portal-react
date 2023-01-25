import { useState } from "react"

import { useCategoriesApi } from "../../../utils/ApiCalls"

import { FiChevronsRight } from "react-icons/fi"
import SingleTabLayout from "../../Layouts/SingleTabLayout"
import CustomSelectInput from "../../Misc/CustomSelectInput"

const ViewAllCategories = () => {
	const [selected, setSelected] = useState("")
	const [selectedOrderType, setSelectedOrderType] = useState({
		name: "Online Delivery",
		id: {
			"prodType": "b2b",
			"orderType": "delivery"
		}
	})

	const { categories, setCity, city, setOrderType, setProdType, isLoading } = useCategoriesApi()

	const handleCity = (e) => {
		setCity(e.target.value)
	}

	const handleOrderType = (e) => {
		let json = JSON.parse(e.target.value)
		setSelectedOrderType(json)

		setOrderType(json.id.orderType)
		setProdType(json.id.prodType)
	}

	return (
		<SingleTabLayout
			heading={"Manage Permissions"}
			loading={isLoading}
			gridItems={
				<>
					<CustomSelectInput
						heading={"Select City"}
						customOnChange={handleCity}
						value={city}
						options={[
							{
								name: "Karachi",
								id: "karachi"
							},
							{
								name: "Peshawar",
								id: "peshawar"
							}]
						}
						optionText="name"
					/>
					<CustomSelectInput
						heading={"Select Order Type"}
						customOnChange={handleOrderType}
						customValue
						value={selectedOrderType}
						options={[
							{
								name: "Online Delivery",
								id: {
									"prodType": "b2b",
									"orderType": "delivery"
								}
							}, {
								name: "Click n Collect",
								id: {
									"prodType": "cus",
									"orderType": "pickup"
								}
							}
						]}
						optionText="name"
					/>
				</>
			}
		>
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
							{categories?.map((each) => (
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
