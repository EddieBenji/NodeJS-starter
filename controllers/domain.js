exports.getDomains = (req, res, next) => {
    res.status(200).send([ {
        name: 'domain1',
        isRunning: true,
        agents: [
            {
                name: 'agent1',
                dns: 'none',
                domain: 'domain1'
            }
        ]
    }, {
        name: 'domain2',
        isRunning: false,
        agents: [
            {
                name: 'agent2',
                dns: 'dns',
                domain: 'domain2'
            }
        ]
    } ]);
};