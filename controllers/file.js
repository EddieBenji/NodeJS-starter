const WebComponent = require('../models/web-component');
const Json = require('../models/json');
const { MIME_TYPE_MAP, JSON_LOWER_CASE, APPROACHES } = require('../utils/constants.js');

exports.addFile = (req, res, next) => {
    const mimeTypeMapped = MIME_TYPE_MAP[ req.file.mimetype ];
    const isJson = mimeTypeMapped === JSON_LOWER_CASE;

    if ((isJson && req.body.approachToRegister !== APPROACHES.JSON) ||
      (!isJson && req.body.approachToRegister !== APPROACHES.WEB_COMPONENT)) {
        return res.status(400).json({
            message: `Error, the approach to register does not match the mime type of the file.`
        });
    }

    const fullPath = req.file.path;

    let schemaToAdd;
    if (isJson) {
        schemaToAdd = new Json({
            uiSchemaFilePath: fullPath,
            schemaFilePath: fullPath
        });
    } else {
        schemaToAdd = new WebComponent({
            filePath: fullPath,
            customTagName: req.body.customTagNameOfWebComponent
        });
    }

    const schemaAdded = isJson ? 'Json' : 'Web component';

    schemaToAdd.save()
      .then((createdSchema) => {
          res.status(200).json({
              message: `${schemaAdded} added successfully`,
              schema: {
                  ...createdSchema,
                  id: createdSchema._id
              }
          });
      })
      .catch((error) => {
          console.error(error);
          res.status(500).json({
              message: `Creating a ${schemaAdded} failed`
          });
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