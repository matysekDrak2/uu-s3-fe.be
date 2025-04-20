const fs = require('fs');
const path = require('path');
const Ajv = require('ajv');
const { v4: uuidv4 } = require('uuid');

const listsFilePath = path.join(__dirname, '../../../data/lists.json');
const itemsFilePath = path.join(__dirname, '../../../data/item.json');

const ajv = new Ajv();

// Schema for validating item data
const itemSchema = {
    type: 'object',
    properties: {
        text: {type: 'string', maxLength: 200}
    },
    required: ['text'],
    additionalProperties: false
};
const validateItem = ajv.compile(itemSchema);

module.exports = function create(req, res) {
    const listId = req.params.id;
    const {additionalData, ...body} = req.body;
    const userId = additionalData.userId;

    // Validate item data
    const validItem = validateItem(body);
    if (!validItem) {
        return res.status(400).json(validateItem.errors);
    }
    const text = body.text;

    // Read existing lists
    let lists = [];
    if (fs.existsSync(listsFilePath)) {
        const fileData = fs.readFileSync(listsFilePath, 'utf-8');
        lists = JSON.parse(fileData);
    }

    // Find the list
    const list = lists.find(list => list.id === listId);
    if (!list) {
        return res.status(404).json({ error: 'List not found' });
    }

    // Check ownership or cooperator access
    if (list.ownerId !== userId &&
        !(list.cooperators && list.cooperators.includes(userId))
    ) {
        return res.status(403).json({ error: 'You do not have permission to add items to this list' });
    }
    if (list.archived){
        return res.status(403).json({ error: 'This list is archived' });
    }

    // Read existing items
    let items = [];
    if (fs.existsSync(itemsFilePath)) {
        const fileData = fs.readFileSync(itemsFilePath, 'utf-8');
        items = JSON.parse(fileData);
    }

    // Create new item
    const newItem = {
        id: uuidv4(),
        listId: listId,
        text: text,
        completed: false
    };

    items.push(newItem);

    // Save updated items
    fs.writeFileSync(itemsFilePath, JSON.stringify(items, null, 2));

    res.status(200).json(newItem);
};