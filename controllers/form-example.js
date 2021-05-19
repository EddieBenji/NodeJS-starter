const FormExample = require('../models/form-example');

exports.addFormExample = (req, res, next) => {
    const formExampleToAdd = new FormExample({
        ...req.body
    });

    formExampleToAdd.save()
      .then((createdSchema) => {
          const { _id, __v, ...schemaAdded } = createdSchema._doc;
          res.status(200).json({
              message: `Form example added successfully`,
              schema: {
                  ...schemaAdded,
                  id: createdSchema._id
              }
          });
      })
      .catch((error) => {
          console.error(error);
          res.status(500).json({
              message: `Creating a form example failed: ${error.message || error}`
          });
      });
};

exports.getFormExamples = async (req, res, next) => {
    try {
        const formExamplesRetrieved = await FormExample.find();
        const maxFormExamples = await FormExample.estimatedDocumentCount();

        const formExamples = formExamplesRetrieved.map(({ forwarders, _id, email, password, serverIp }) => ({
            forwarders,
            id: _id,
            email,
            password,
            serverIp
        }));

        return res.status(200).json({
            message: 'Form examples fetched successfully!',
            formExamples,
            maxFormExamples
        });
    } catch (e) {
        console.error(e.error ? e.error : e);
        res.send(500).json({ message: 'Fetching form examples failed: ' + (e.message || e) });
    }
};

exports.updateFormExample = (req, res, next) => {
    const formExample = new FormExample({
        _id: req.params.id,
        email: req.body.email,
        password: req.body.password,
        forwarders: req.body.forwarders,
        serverIp: req.body.serverIp
    });

    FormExample.updateOne({ _id: req.params.id }, formExample)
      .then(result => {
          if (result.n > 0) {
              return res.status(200).json({
                  message: 'Form example updated successfully'
              });
          }
          res.status(401).json({
              message: 'User not authorized'
          });
      })
      .catch(error => {
          res.send(500).json({
              message: 'Could not update formExample: ' + (error.message || error)
          });
      });
};

exports.deleteForExample = async (req, res, next) => {
    FormExample.deleteOne({ _id: req.params.id })
      .then((result) => {
          if (result.n > 0) {
              return res.status(200).json({
                  message: `Form Example deleted`
              });
          }
          res.status(401).json({
              message: 'User not authorized'
          });
      })
      .catch(err => res.send(500).json({ message: `Deleting Form example (${req.params.id}) failed` }));
};


