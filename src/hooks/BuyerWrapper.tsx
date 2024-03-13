import useAuthHelper from "./auth/authHelper"

const BuyerWrapper = ({children}: {children: React.ReactNode}) =>{
  const {getUserDetails} = useAuthHelper()

    return (
        <>
        {
            getUserDetails()?.role !=="SELLER"  && (
                <>{children}</>
            )
        }
        </>
    )
}

export default BuyerWrapper