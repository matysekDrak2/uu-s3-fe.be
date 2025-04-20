const fs = require('fs');
const path = require('path');

const listsFilePath = path.join(__dirname, '../../../data/lists.json');

const Ajv = require('ajv');
const ajv = new Ajv();

const schema = {
    type: 'string',
    minLength: 36,
    maxLength: 36
}
const validate = ajv.compile(schema);

module.exports = function get(req, res) {
    const userId = req.body.additionalData.userId
    const listId = req.params.id

    const valid = validate(listId);
    if (!valid) {
        return res.status(400).json({ error: 'Invalid list ID format' });
    }

    // Read existing lists
    let lists = [];
    if (fs.existsSync(listsFilePath)) {
        const fileData = fs.readFileSync(listsFilePath, 'utf-8');
        lists = JSON.parse(fileData);
    }

    const list = lists.filter(list => list.id === listId)[0];

    if (list.ownerId !== userId && !list.cooperators.includes(userId)) {
        return res.status(404).json({ error: 'No accessible lists found' });
    }

    res.status(200).json(list);
};