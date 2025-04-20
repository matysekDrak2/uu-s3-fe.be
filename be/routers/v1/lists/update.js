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

const listUpdateSchema ={
    type: 'object',
    properties: {
        name: { type: 'string', maxLength: 200 },
        archived: { type: 'boolean' },
        cooperators: {
            type: 'array',
            items: { type: 'string', minLength: 36, maxLength: 36 }
        },
    },
    required: [],
    additionalProperties: false
}
const validateListUpdate = ajv.compile(listUpdateSchema);

module.exports = function update(req, res) {
    const {additionalData, ...body } = req.body;
    const userId = additionalData.userId;
    const listId = req.params.id;

    // Validate list ID
    const validId = validateId(listId);
    if (!validId) {
        return res.status(400).json(validateId.errors);
    }

    const validUl = validateListUpdate(body);
    if (!validUl) {
        return res.status(400).json(validateListUpdate.errors);
    }

    const { name, archived, cooperators } = body;

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

    const list = lists[listIndex];

    // Check ownership and archived status
    if (list.ownerId !== userId) {
        return res.status(403).json({ error: 'You do not have permission to update this list' });
    }
    if (list.archived){
        return res.status(403).json({ error: 'This list is archived' });
    }

    // Update list properties
    if (name) {
        list.name = name;
    }
    if (archived) {
        list.archived = archived;
    }
    if (cooperators) {
        list.cooperators = cooperators;
    }

    // Save updated lists
    lists[listIndex] = list;
    fs.writeFileSync(listsFilePath, JSON.stringify(lists, null, 2));

    res.status(200).json(list);
};