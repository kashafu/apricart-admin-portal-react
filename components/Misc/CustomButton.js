import React from "react";

function CustomButton({ onClick, width, position, children, disabled }) {
	// give width in 1/2 -> 1/6 as string
	// no position prop means center
	width ? width : (width = "full");
	let placement = "center";
	position === "left" ? (placement = "start") : "";
	position === "right" ? (placement = "end") : "";

	return (
		<div className={`w-full flex justify-${placement} items-center`}>
			<button
				type="submit"
				className={
					disabled
						? `my-2 w-${width} py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-gray-300 duration-300 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-main-blue`
						: `my-2 w-${width} py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-main-blue hover:bg-indigo-800 duration-300 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-main-blue`
				}
				onClick={(e) => onClick(e)}
				disabled={disabled}
			>
				{children}
			</button>
		</div>
	);
}

export default CustomButton;
