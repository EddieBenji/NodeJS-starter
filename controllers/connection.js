exports.checkConnection = (req, res, next) => {
    const valid = !!req.body?.serverIp;
    res.status(valid ? 200 : 404).send({
        success: valid
    });
};