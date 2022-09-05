import React from "react";

const Paginate = ({ size, page, totalItems }) => {
	let arr = [];
	for (let index = size; index <= totalItems + size; index = index + size) {
		arr.push(
			<button
				key={index}
				onClick={() => {
					handlePage(index / size);
				}}
				className={
					index / size === page
						? "border-main-blue border-1 bg-main-blue p-2 text-white font-bold rounded-lg"
						: "border-main-blue border-1 p-2 text-main-blue font-bold rounded-lg duration-200 hover:bg-main-blue hover:text-white"
				}
			>
				{index / size}
			</button>
		);
	}

	return (
		<div className="flex w-full space-x-6 items-center">
			<p className="">
				Showing items {(page - 1) * size} -{" "}
				{(page - 1) * size + size > totalItems
					? totalItems
					: (page - 1) * size + size}{" "}
				of {totalItems}
			</p>
			<div className="space-x-2">{arr}</div>
		</div>
	);
};

export default Paginate;
