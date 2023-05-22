export async function cartGetController(req,res,next){
    try {
        const carritos = await cartManager.encontrar()
        res.status(201).json(carritos)
    } catch (error) {
        next(error)
    }
}