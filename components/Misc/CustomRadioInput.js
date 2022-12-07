import React from "react";

function CustomRadioInput({
	inputs,
	onChange,
	values,
	width,
	position,
	heading,
	name,
}) {
	let className =
		"z-20 flex px-2.5 pb-2.5 pt-2 w-full text-sm text-gray-900 bg-transparent rounded-md border-[1.5px] appearance-none border-slate-300 focus:outline-none focus:ring-0 focus:border-main-blue peer";
	return (
		<section className="relative m-2">
			<div onChange={onChange}>
				<div className={className}>
					{inputs.map((each, i) => (
						<div key={values[i]} className="flex">
							<input
								type="radio"
								name={name}
								value={values[i]}
								defaultChecked
							/>
							<p className="font-nunito pr-4 pl-1">{each}</p>
						</div>
					))}
				</div>
			</div>
			<label className="select-none flex absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-main-blue peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">
				{heading}
			</label>
		</section>
	);
}

export default CustomRadioInput;
