exports.getForwarders = (req, res, next) => {
    res.status(200).send([
          {
              name: 'TCP'
          },
          {
              name: 'UDP'
          },
          {
              name: 'ULDP'
          }
      ]
    );
};