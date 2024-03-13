import useAuthHelper from "./auth/authHelper"

const SellerWrapper = ({children}: {children: React.ReactNode}) =>{
  const {getUserDetails} = useAuthHelper()

    return (
        <>
        {
            getUserDetails()?.role ==="SELLER" && (
                <>{children}</>
            )
        }
        </>
    )
}

export default SellerWrapper