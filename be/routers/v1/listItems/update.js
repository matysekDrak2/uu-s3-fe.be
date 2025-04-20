const fs = require('fs');
const path = require('path');
const Ajv = require('ajv');

const listsFilePath = path.join(__dirname, '../../../data/lists.json');
const itemsFilePath = path.join(__dirname, '../../../data/item.json');

const ajv = new Ajv();
const schema = {
    type: 'object',
    properties: {
        text: { type: 'string', maxLength: 200 },
        completed: { type: 'boolean' }
    },
    additionalProperties: false
};
const validateUpdate = ajv.compile(schema);

module.exports = function update(req, res) {
    const itemId = req.params.id;
    const { additionalData, ...body } = req.body;
    const userId = additionalData.userId;

    // Validate update data
    const validUpdate = validateUpdate(body);
    if (!validUpdate) {
        return res.status(400).json(validateUpdate.errors);
    }

    // Read existing items
    let items = [];
    if (fs.existsSync(itemsFilePath)) {
        const fileData = fs.readFileSync(itemsFilePath, 'utf-8');
        items = JSON.parse(fileData);
    }

    // Find the item
    const itemIndex = items.findIndex(item => item.id === itemId);
    if (itemIndex === -1) {
        return res.status(404).json({ error: 'Item not found' });
    }

    const item = items[itemIndex];

    // Read existing lists
    let lists = [];
    if (fs.existsSync(listsFilePath)) {
        const fileData = fs.readFileSync(listsFilePath, 'utf-8');
        lists = JSON.parse(fileData);
    }

    // Find the list
    const list = lists.find(list => list.id === item.listId);
    if (!list) {
        return res.status(404).json({ error: 'List not found' });
    }

    // Check ownership or cooperator access
    if (list.ownerId !== userId && !(list.cooperators && list.cooperators.includes(userId))) {
        return res.status(403).json({ error: 'You do not have permission to update items in this list' });
    }
    if (list.archived) {
        return res.status(403).json({ error: 'This list is archived' });
    }

    // Update the item
    if (body.text !== undefined) {
        item.text = body.text;
    }
    if (body.completed !== undefined) {
        item.completed = body.completed;
    }

    // Save updated items
    items[itemIndex] = item;
    fs.writeFileSync(itemsFilePath, JSON.stringify(items, null, 2));

    res.status(200).json(item);
};