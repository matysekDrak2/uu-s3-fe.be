const fs = require('fs');
const path = require('path');

const listsFilePath = path.join(__dirname, '../../../data/lists.json');
const itemsFilePath = path.join(__dirname, '../../../data/item.json');

module.exports = function getAll(req, res) {
    const listId = req.params.id;
    const userId = req.body.additionalData.userId;

    // Read existing lists
    let lists = [];
    if (fs.existsSync(listsFilePath)) {
        const fileData = fs.readFileSync(listsFilePath, 'utf-8');
        lists = JSON.parse(fileData);
    }

    // Filter lists based on id
    const list = lists.filter(list => list.id === listId)[0];

    if (list.ownerId !== userId && !(list.cooperators && list.cooperators.includes(userId))) {
        return res.status(404).json({ error: 'No accessible lists found' });
    }

    // Read existing items
    let items = [];
    if (fs.existsSync(itemsFilePath)) {
        const fileData = fs.readFileSync(itemsFilePath, 'utf-8');
        items = JSON.parse(fileData);
    }

    // Filter items belonging to accessible lists
    const accessibleItems = items.filter(item => item.listId === list.id );

    if (accessibleItems.length === 0) {
        return res.status(404).json({ error: 'No items found for accessible lists' });
    }

    res.status(200).json(accessibleItems);
};