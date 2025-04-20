const fs = require('fs');
const path = require('path');
const Ajv = require('ajv');

const listsFilePath = path.join(__dirname, '../../../data/lists.json');

const ajv = new Ajv();
const schema = {
    type: 'string',
    minLength: 36,
    maxLength: 36
};
const validateId = ajv.compile(schema);

module.exports = function remove(req, res) {
    const userId = req.body.additionalData.userId;
    const listId = req.params.id;

    // Validate list ID
    const validId = validateId(listId);
    if (!validId) {
        return res.status(400).json(validateId.errors);
    }

    // Read existing lists
    let lists = [];
    if (fs.existsSync(listsFilePath)) {
        const fileData = fs.readFileSync(listsFilePath, 'utf-8');
        lists = JSON.parse(fileData);
    }

    // Find the list
    const listIndex = lists.findIndex(list => list.id === listId);
    if (listIndex === -1) {
        return res.status(404).json({ error: 'List not found' });
    }

    // Check ownership
    if (lists[listIndex].ownerId !== userId) {
        return res.status(403).json({ error: 'You do not have permission to delete this list' });
    }

    // Remove the list
    lists.splice(listIndex, 1);
    fs.writeFileSync(listsFilePath, JSON.stringify(lists, null, 2));

    res.status(200).send();
};