const CustomDownloadButton = ({ text, onClick, className }) => {
	return (
		<button
			className={
				className +
				" rounded-lg py-2 px-4 bg-[#3832A0] font-nunito text-white font-black"
			}
			onClick={onClick}
		>
			{text}
		</button>
	);
};

export default CustomDownloadButton;
