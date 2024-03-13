export interface IProductDto {
    productName: "",
    cost: 5,
    sellerId?: "",
    amountAvailable: 0,
    product_id?: string
}


export interface ICart {
    product_id: string;
    productName: string;
    amountAvailable: number
    cost: number;
    createdAt: Date;
    updatedAt: Date
}