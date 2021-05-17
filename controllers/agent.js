exports.getAgents = (req, res, next) => {
    res.status(200).send([{
        name: 'agent1',
        dns: 'none',
        domain: 'domain1'
    },{
        name: 'agent2',
        dns: 'dns2',
        domain: 'domain2'
    },{
        name: 'agent3',
        dns: 'dns3',
        domain: 'domain2'
    }]);
};