const fs = require('fs');
const path = require('path');
const Ajv = require('ajv');

const listsFilePath = path.join(__dirname, '../../../data/lists.json');
const itemsFilePath = path.join(__dirname, '../../../data/item.json');

const ajv = new Ajv();
const schema = {
    type: 'string',
    minLength: 36,
    maxLength: 36
};
const validateId = ajv.compile(schema);

module.exports = function remove(req, res) {
    const userId = req.body.additionalData.userId;
    const itemId = req.params.id;

    // Validate item ID
    const validId = validateId(itemId);
    if (!validId) {
        return res.status(400).json(validateId.errors);
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
        return res.status(403).json({ error: 'You do not have permission to delete items from this list' });
    }
    if (list.archived) {
        return res.status(403).json({ error: 'This list is archived' });
    }

    // Remove the item
    items.splice(itemIndex, 1);
    fs.writeFileSync(itemsFilePath, JSON.stringify(items, null, 2));

    res.status(200).json();
};