export function currentGetController(req, res, next) {
    try {
       const {name,email,age,rol} = req.session.user
       res.send({name,email,age})
    }
    catch (error) {
        next(error);
    }}
