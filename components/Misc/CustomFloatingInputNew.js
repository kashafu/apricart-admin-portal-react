import React from "react";

const CustomFloatingInputNew = ({
	children,
	name,
	type,
	disabled,
	required,
	min,
	max,
	onChange,
	value,
}) => {
	return (
		<div className="relative">
			<input
				disabled={disabled}
				// placeholder={placeholder}
				required={required}
				min={min}
				max={max}
				type={type}
				onChange={onChange}
				value={value}
				name={name}
				id="floating_outlined"
				className="z-20 block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-[1.5px] appearance-none border-slate-300 focus:outline-none focus:ring-0 focus:border-main-blue peer"
				placeholder=" "
			/>
			<label className="select-none absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-main-blue peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">
				{children}
			</label>
		</div>
	);
};

export default CustomFloatingInputNew;
