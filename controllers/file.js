const WebComponent = require('../models/web-component');
const Json = require('../models/json');
const { MIME_TYPE_MAP, JSON_LOWER_CASE, APPROACHES } = require('../utils/constants.js');
const fs = require('fs');

const verifyMimeType = (file, req) => {
    return new Promise((resolve, reject) => {
        const mimeTypeMapped = MIME_TYPE_MAP[ file.mimetype ];
        const isJson = mimeTypeMapped === JSON_LOWER_CASE;

        if ((isJson && req.body.approachToRegister !== APPROACHES.JSON) ||
          (!isJson && req.body.approachToRegister !== APPROACHES.WEB_COMPONENT)) {
            return reject({
                message: `Error, the approach to register does not match the mime type of the file.`
            });
        }
        resolve(true);
    });
};

const areJsonFilesValid = (files) => {
    return new Promise((resolve, reject) => {
        if (!files) {
            return reject({
                message: 'Json schemas are not present in the request.'
            });
        }
        if (files.length !== 2) {
            return reject({
                message: 'The Json approach requires 2 files. The schema.json and the uiSchema.json.'
            });
        }
        const filteredFiles = files.filter((f) => f.filename.includes('ui'));
        if (filteredFiles.length !== 1) {
            return reject({
                message: 'The uiSchema json is required and must be unique.'
            });
        }
        resolve();
    });
};

exports.addFile = (req, res) => {
    const schemaAdded = 'Web component';
    verifyMimeType(req.file, req)
      .then(() => {
          const schemaToAdd = new WebComponent({
              filePath: req.file.path,
              customTagName: req.body.customTagNameOfWebComponent,
              formName: req.body.formName
          });
          return schemaToAdd.save();
      }, (error) => {
          // Validation error
          return Promise.reject({
              ...error,
              code: 400
          });
      })
      .then((createdSchema) => {
          res.status(200).json({
              message: `${schemaAdded} added successfully`,
              schema: {
                  ...createdSchema._doc,
                  id: createdSchema._id
              }
          });
      }, (error) => {
          // Mongo error
          console.log(error);
          return Promise.reject({
              message: `Creating a ${schemaAdded} failed`,
              code: 500
          });
      })
      .catch(({ code, message }) => {
          res.status(code).json({ message });
      });
};

exports.addFiles = (req, res) => {
    const files = req.files;
    const schemaAdded = 'JSON';

    const validationPromises = files.map((file) => verifyMimeType(file, req));
    validationPromises.push(areJsonFilesValid(files));
    // Execute all verifications.
    Promise.all(validationPromises)
      .then(() => {
          const uiSchemaIdx = files.findIndex((f) => f.filename.includes('ui'));
          const jsonSchemaIdx = uiSchemaIdx === 0 ? 1 : 0;

          const schemaToAdd = new Json({
              uiSchemaFilePath: files[ uiSchemaIdx ].path,
              schemaFilePath: files[ jsonSchemaIdx ].path,
              formName: req.body.formName
          });
          return schemaToAdd.save();
      }, (error) => {
          // Verification error
          return Promise.reject({
              ...error,
              code: 400
          });
      })
      .then((createdSchema) => {
          res.status(200).json({
              message: `${schemaAdded} added successfully`,
              schema: {
                  ...createdSchema,
                  id: createdSchema._id
              }
          });
      }, (error) => {
          // Mongo error
          console.log(error);
          return Promise.reject({
              message: `Creating a ${schemaAdded} failed`,
              code: 500
          });
      })
      .catch(({ code, message }) => {
          res.status(code).json({ message });
      });
};

exports.getSchemas = async (req, res, next) => {
    try {
        const webComponents = await WebComponent.find();
        const maxWebComponents = await WebComponent.estimatedDocumentCount();

        const jsons = await Json.find();
        const maxJsons = await Json.estimatedDocumentCount();

        return res.status(200).json({
            message: 'web components and jsons fetched successfully!',
            webComponents,
            maxWebComponents,
            jsons,
            maxJsons
        });
    } catch (e) {
        console.error(e.error ? e.error : e);
        res.send(500).json({ message: 'Fetching web components failed' });
    }
};

exports.deleteFiles = async (req, res, next) => {
    const isWebComponent = req.params.type === APPROACHES.WEB_COMPONENT;
    const entity = isWebComponent ? WebComponent : Json;
    try {
        const foundEntity = await entity.findById(req.params.id);
        if (isWebComponent) {
            fs.unlinkSync(foundEntity.filePath);
        } else {
            fs.unlinkSync(foundEntity.uiSchemaFilePath);
            fs.unlinkSync(foundEntity.schemaFilePath);
        }
    } catch (error) {
        return res.sendStatus(500).json({ message: `Entity ${req.params.type} not found or file does not exists. Error: ${error.message}` });
    }
    entity.deleteOne({ _id: req.params.id })
      .then((result) => {
          if (result.n > 0) {
              return res.status(200).json({
                  message: `${req.params.type} deleted`
              });
          }
          res.status(401).json({
              message: 'User not authorized'
          });
      })
      .catch(err => res.send(500).json({ message: `Deleting ${req.params.type} failed` }));
};
