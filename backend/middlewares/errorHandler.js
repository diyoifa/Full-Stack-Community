const ERROR_HANDLERS={
    CastError:res=>res.status(400).send({error:'id used is malformed'}),
    ValidationError:(res,{message})=>res.status(409).send({error:message}),
    JsonWebTokenError:res=>res.status(401).json({error:'token missing or invalid'}),
    TokenExpiredError:res=>res.status(401).json({error:'token expired'}),
    // TypeError: res=> res.status(401).json({error: 'Wrong credentials' }),
    // WrongPassword: res=> res.status(401).json({error: "Wrong credentials"}),
    defaultError:res=>res.status(500).end()
}

const handleError=(error, request, response, next)=>{
    console.log(error)
    const handler = ERROR_HANDLERS[error.name] || ERROR_HANDLERS.defaultError
    handler(response,error)
    next(error)
}
module.exports = handleError