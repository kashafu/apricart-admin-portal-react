import React from "react";

function CustomButton({ type, onClick, value, width, children }) {
	// give parent width in 1/2 -> 1/6
	let className;
	// position types create rounded border based on the position of the input field
	width ? width : (width = "full");
	className =
		"my-2 w-full py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-main-blue hover:bg-indigo-800 duration-300 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-main-blue";

	return (
		<div className="w-full flex justify-center items-center">
			{/* <input
					required={required}
					min={min}
					max={max}
					type={type}
					className={className}
					onChange={onChange}
					value={value}
				/> */}
			<button
				type="submit"
				className={`my-2 w-${width} py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-main-blue hover:bg-indigo-800 duration-300 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-main-blue`}
				onClick={onClick}
			>
				{children}
			</button>
		</div>
	);
}

export default CustomButton;
