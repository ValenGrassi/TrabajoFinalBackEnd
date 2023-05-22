export class DatosFuturoCarrito{
    constructor(products, totalPrice){
        if (products == undefined){
            this.products = []
        // } else{this.product = products._id}
        } else {
            this.products = products;
            this.totalPrice = totalPrice
        }
    }

    datos(){
        return{
            products: this.products,
        }
    }
}
