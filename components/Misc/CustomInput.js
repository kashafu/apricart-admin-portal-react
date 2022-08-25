import React from "react";

function CustomInput({
	type,
	onChange,
	value,
	width,
	position,
	min,
	max,
	required,
	placeholder,
	name,
	accept,
	disabled,
}) {
	// give parent width in 1/2 -> 1/6
	let className;
	// position types create rounded border based on the position of the input field
	width ? width : (width = "full");
	if (position === "bottom") {
		className =
			"appearance-none rounded-none relative block w-full px-3 py-2 border border-black border-t-0 text-gray-900 rounded-b-xl focus:outline-none focus:ring-main-blue focus:border-main-blue focus:z-10 sm:text-sm placeholder-txt-dark";
	} else if (position === "top") {
		className =
			"appearance-none rounded-none relative block w-full px-3 py-2 border border-black text-gray-900 rounded-t-xl focus:outline-none focus:ring-main-blue focus:border-main-blue focus:z-10 sm:text-sm placeholder-txt-dark";
	} else {
		className =
			"appearance-none rounded-none relative block w-full px-3 py-2 border border-t-0 border-black text-gray-900  focus:outline-none focus:ring-main-blue focus:border-main-blue focus:z-10 sm:text-sm placeholder-txt-dark";
	}

	return (
		<div className="w-full flex justify-center items-center">
			<div className={`w-${width}`}>
				<input
					disabled={disabled}
					placeholder={placeholder}
					required={required}
					min={min}
					max={max}
					type={type}
					className={className}
					onChange={onChange}
					value={value}
					name={name}
				/>
			</div>
		</div>
	);
}

export default CustomInput;
