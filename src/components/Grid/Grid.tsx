const Grid = ({children}:{children: React.ReactNode})=>{


    return (
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 
        lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-3 lg:gap-4 p-6
        "
        >
            {children}
        </div>
    )
}

export default Grid