const CustomizedProducts = () => {
    return (
        <div className="flex flex-col gap-6">
            <h4 className="font-medium">Choose a color</h4>
            <ul className="flex items-center gap-3">
                <li className="w-6 h-6 rounded-full ring-1 ring-gray-300 relative cursor-pointer bg-red">
                    <div className="absolute w-8 h-8 rounded-full ring-2 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                </li>
                <li className="w-6 h-6 rounded-full ring-1 ring-gray-300 relative cursor-pointer bg-blue-500"></li>
                <li className="w-6 h-6 rounded-full ring-1 ring-gray-300 relative cursor-not-allowed">
                    <div className="absolute w-8 h-[2px] bg-red rotate-45 rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                </li>
            </ul>
        </div>
    )
}

export default CustomizedProducts