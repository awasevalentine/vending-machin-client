export interface ICart {
    totalItems: number,
    productDetails: IProductDetails[]
}

export interface IProductDetails {
    productName: string;
    cost: number;
    product_id: string;
    // sellerId: string;
    quantity: number,
    amountAvailable: number
}