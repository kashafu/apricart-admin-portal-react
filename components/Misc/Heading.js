import React from "react";

const Heading = ({ children, color }) => {
	return (
		<h1
			className={
				color === undefined
					? ` pl-2 pt-4 font-medium font-nunito text-txt-dark border-black`
					: "pl-2 pt-4 font-medium font-nunito text-txt-light border-black"
			}
		>
			{children}
		</h1>
	);
};

export default Heading;
