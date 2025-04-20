const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const Ajv = require('ajv');

const ajv = new Ajv();

const schema = {
    type: 'object',
    properties: {
        owner: { type: 'string', minLength: 36, maxLength: 36 },
        name: { type: 'string', maxLength: 200 }
    },
    required: ['owner', 'name'],
    additionalProperties: false
};
const validator = ajv.compile(schema);

const listsFilePath = path.join(__dirname, '../../../data/lists.json');

module.exports = function create(req, res) {
    const { name, additionalData } = req.body;

    const data = {
        name: name,
        owner: additionalData.userId
    }
    const valid = validator(data)
    // Validate input
    if (!valid) {
        return res.status(400).json(validator.errors);
    }

    // Read existing lists
    let lists = [];
    if (fs.existsSync(listsFilePath)) {
        const fileData = fs.readFileSync(listsFilePath, 'utf-8');
        lists = JSON.parse(fileData);
    }

    // Create new list
    const newList = {
        id: uuidv4(),
        name: name,
        ownerId: data.owner,
        cooperators: [],
        archived: false
    };

    // Add new list and save to file
    lists.push(newList);
    fs.writeFileSync(listsFilePath, JSON.stringify(lists, null, 2));

    res.status(201).json(newList);
}