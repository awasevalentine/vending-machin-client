const Card = ({children}: {children: React.ReactNode})=>{


    return (
        <div className="w-full h-[300px] rounded-lg  p-3">
            {children}
        </div>
    )
}

export default Card