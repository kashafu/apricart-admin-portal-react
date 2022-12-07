import React from "react";

const CustomSingleImageInput = ({ heading, name, onChange, ren, accept }) => {
	return (
		<div className="relative m-2">
			<input
				id="hide"
				placeholder="Category Image"
				name={name}
				type={"file"}
				required
				className="z-20 block px-2.5 pb-2.5 pt-2 w-full text-sm text-gray-900 bg-transparent rounded-md border-[1.5px] appearance-none border-slate-300 focus:outline-none focus:ring-0 focus:border-main-blue peer"
				accept={accept || "image/png, image/gif, image/jpeg, image/jpg"}
				onChange={onChange}
				key={ren}
			/>
			<label className="select-none absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-main-blue peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">
				{heading}
			</label>
		</div>
	);
};

export default CustomSingleImageInput;
