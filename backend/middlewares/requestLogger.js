const morgan = require('morgan')

const requestLogger = morgan((tokens, req, res) => {
    return [
        ` Method: ${tokens.method(req,res)} `,
        ` Url: ${tokens.url(req,res)} `,
        `Status: ${tokens.status(req,res)} `,
        `Response: ${tokens.res(req,res,'content-length')}`,'- ',
        ` Response-time: ${tokens['response-time'](req,res)}`,'ms ',
        `Body: ${JSON.stringify(req.body)}`
    ].join(' ')
})

module.exports = requestLogger