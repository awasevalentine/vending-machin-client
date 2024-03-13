import { IProductDetails } from "../../interfaces/redux.interface"

type Props ={
    items: IProductDetails
}
const CartItem = ({items}: Props) =>{


    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-row justify-between items-center">
                <span className="text-[17px] font-bold">Product Name:</span>
                <span className="">{items.productName}</span>
            </div>
            <div className="flex flex-row justify-between items-center">
                <span className="text font-semibold">Cost:</span>
                <span className="">{items.cost}</span>
            </div>
            <div className="flex flex-row justify-between items-center">
                <span className="text font-semibold">Quantity:</span>
                <span className="">{items.quantity}</span>
            </div>
        </div>
    )
}

export default CartItem