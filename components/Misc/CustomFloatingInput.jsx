import { useEffect, useState } from "react"

const FloatingLabelInput = ({ type, name, label, onChange, value }) => {
    const [active, setActive] = useState(false)

    useEffect(() => {
        if (value.length > 0) {
            setActive(true)
        }
    }, [])

    const handleOnChange = (e) => {
        setActive(!!e.target.value)
        onChange(e.target.value)
    }

    return (
        <div className="relative border w-full rounded-lg mb-2 bg-white text-black border-black border-opacity-25">
            <input
                className={[
                    "outline-none w-full rounded bg-transparent text-sm transition-all duration-200 ease-in-out p-2",
                    active ? "pt-6" : ""
                ].join(" ")}
                id={name}
                name={name}
                type={type}
                value={value}
                onChange={handleOnChange}
            />
            <label
                className={[
                    "absolute top-0 left-0 flex items-center text-black text-opacity-50 p-2 transition-all duration-200 ease-in-out",
                    active ? "text-xs" : "text-sm"
                ].join(" ")}
                htmlFor={name}
            >
                {label}
            </label>
        </div>
    )
}

export default FloatingLabelInput