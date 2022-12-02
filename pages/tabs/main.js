import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ProductStockDetailAdminAPIComponent from "../../components/EachAPI/products/ProductStockDetailAdminAPIComponent";

const MainTabComponent = () => {
	const tabs = useSelector((state) => state.recent.tabs);
	const each = useSelector((state) => state.recent.recents);
	const [allTabs, setAllTabs] = useState(tabs);
	const [selected, setSelected] = useState(each[0]?.name);
	console.log(typeof selected);

	return (
		<section>
			<div className="m-4">
				<h1>Products Category Management</h1>
			</div>
			<section className="flex cursor-pointer border-b-slate-300 border-b-[1px]">
				{allTabs.map((each) => (
					<div
						key={each.endpoint}
						className={
							selected === each.name
								? "p-2 mx-2 border-b-main-blue border-b-[1px] text-main-blue shadow-inner duration-200 rounded-t-2xl"
								: "p-2 mx-2 duration-200 rounded-t-2xl"
						}
						onClick={() => setSelected(each.name)}
					>
						{each.name}
					</div>
				))}
			</section>
			<section>
				{/* {selected === "Product Stock Detail" && (
					)} */}
				<ProductStockDetailAdminAPIComponent />
			</section>
		</section>
	);
};

export default MainTabComponent;
