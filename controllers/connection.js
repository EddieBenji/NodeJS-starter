exports.checkConnection = (req, res, next) => {
    const valid = !!req.body?.serverIp;
    res.status(200).send({
        success: valid
    });
};
