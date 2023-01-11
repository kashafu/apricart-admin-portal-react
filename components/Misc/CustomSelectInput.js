const CustomSelectInput = ({ options, optionText, customOnChange, onChange, value, customValue, width, position, disabled, heading, placeholder }) => {
	return (
		<div className="relative m-2">
			<select
				className="z-20 block px-2.5 pb-2.5 pt-2 w-full text-sm text-gray-900 bg-transparent rounded-md border-[1.5px] appearance-none border-slate-300 focus:outline-none focus:ring-0 focus:border-main-blue peer"
				disabled={disabled}
				onChange={(e) => {
					console.log(e.target.value)
					if (customOnChange) {
						customOnChange(e)
					}
					else {
						onChange(e.target.value)
					}
				}}
				value={typeof value === 'object' ? JSON.stringify(value) : value}
			>
				{placeholder && (
					<option
						value={''}
						disabled
						selected
					>
						{placeholder}
					</option>
				)}
				{options?.map((option) => {
					return (
						<option
							key={option[optionText]}
							// value={typeof option === 'object' ? JSON.stringify(option) : option}
							value={customValue ? (
								JSON.stringify(option)
							) : (
								option.id
							)}
						>
							{option[optionText]}
						</option>
					)
				})}
			</select>
			<label className="select-none flex absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-main-blue peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">
				{heading}
				<div className="mx-2">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="w-4 fill-slate-900 animate-hideup"
						viewBox="0 0 512 512"
					>
						<path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
					</svg>
				</div>
			</label>
		</div>
	)
}

export default CustomSelectInput
