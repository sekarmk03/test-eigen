module.exports = {
    bad_request: (res, msg) => {
        return res.status(400).json({
            status: 'BAD REQUEST',
            message: msg,
            data: null
        });
    },
    not_found: (res, msg) => {
        return res.status(404).json({
            status: 'NOT FOUND',
            message: msg,
            data: null
        })
    },
    unauthorized: (res, msg) => {
        return res.status(401).json({
            status: 'UNAUTHORIZED',
            message: msg,
            data: null
        });
    },
    forbidden: (res, msg) => {
        return res.status(403).json({
            status: 'FORBIDDEN',
            message: msg,
            data: null
        });
    },
    conflict: (res, msg) => {
        return res.status(409).json({
            status: 'CONFLICT',
            message: msg,
            data: null
        });
    },
}