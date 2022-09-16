import React from "react";

const CustomSingleImageInput = ({
	heading,
	name,
	onChange,
	ren,
	width,
	position,
}) => {
	let className;
	// position types create rounded border based on the position of the input field
	width ? width : (width = "full");
	if (position === "bottom") {
		className =
			"appearance-none rounded-none relative block w-full px-3 py-2 border border-black  text-gray-900 rounded-b-xl focus:outline-none focus:ring-main-blue focus:border-main-blue focus:z-10 sm:text-sm placeholder-txt-dark";
	} else if (position === "top") {
		className =
			"appearance-none rounded-none relative block w-full px-3 py-2 border border-black text-gray-900 rounded-t-xl focus:outline-none focus:ring-main-blue focus:border-main-blue focus:z-10 sm:text-sm placeholder-txt-dark";
	} else {
		className =
			"appearance-none rounded-none relative block w-full px-3 py-2 border  border-black text-gray-900 focus:outline-none focus:ring-main-blue focus:border-main-blue focus:z-10 sm:text-sm placeholder-txt-dark";
	}

	return (
		<div className=" flex justify-center items-center my-1">
			<div className={`w-${width} grid grid-cols-5`}>
				<div>
					<p className="col-span-1 ml-2 font-nunito">{heading}</p>
				</div>
				<div className="col-span-3 pr-2">
					<input
						placeholder="Category Image"
						name={name}
						type={"file"}
						required
						className={className}
						accept="image/png, image/gif, image/jpeg, image/jpg"
						onChange={onChange}
						key={ren}
					/>
				</div>
			</div>
		</div>
	);
};

export default CustomSingleImageInput;
