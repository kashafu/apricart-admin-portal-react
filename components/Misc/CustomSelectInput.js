import React from "react";

function CustomSelectInput({
	options,
	onChange,
	values,
	width,
	position,
	disabled,
	heading,
}) {
	// give parent width in 1/2 -> 1/6
	let className;
	// position types create rounded border based on the position of the input field
	width ? width : (width = "full");
	if (position === "bottom") {
		className =
			"appearance-none animate-dropdown rounded-none relative block w-full px-3 py-2 border border-black  text-gray-900 rounded-b-xl focus:outline-none focus:ring-main-blue focus:border-main-blue focus:z-10 sm:text-sm placeholder-txt-dark";
	} else if (position === "top") {
		className =
			"appearance-none animate-dropdown rounded-none relative block w-full px-3 py-2 border border-black text-gray-900 rounded-t-xl focus:outline-none focus:ring-main-blue focus:border-main-blue focus:z-10 sm:text-sm placeholder-txt-dark";
	} else {
		className =
			"appearance-none animate-dropdown rounded-none relative block w-full px-3 py-2 border  border-black text-gray-900 focus:outline-none focus:ring-main-blue focus:border-main-blue focus:z-10 sm:text-sm placeholder-txt-dark";
	}
	return (
		<div className="flex justify-center items-center my-1">
			<div className={`w-${width} grid grid-cols-5`}>
				<div>
					<p className="ml-2 font-nunito">{heading}</p>
				</div>
				<div className="col-span-1 lg:hidden" />
				<div className="col-span-3 relative pr-2">
					<select className={className} onChange={onChange}>
						{options.map((each, i) => (
							<option key={i} value={values[i]}>
								{each}
							</option>
						))}
					</select>
					<div className="absolute top-1 right-3">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="w-6 fill-main-blue animate-hideup"
							viewBox="0 0 512 512"
						>
							<path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
						</svg>
					</div>
				</div>
			</div>
		</div>
	);
}

export default CustomSelectInput;
