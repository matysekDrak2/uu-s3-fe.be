const fs = require('fs');
const path = require('path');

const listsFilePath = path.join(__dirname, '../../../data/lists.json');

module.exports = function get(req, res) {
    const userId = req.headers.userId

    // Read existing lists
    let lists = [];
    if (fs.existsSync(listsFilePath)) {
        const fileData = fs.readFileSync(listsFilePath, 'utf-8');
        lists = JSON.parse(fileData);
    }

    // Filter lists based on access rights
    const accessibleLists = lists.filter(list =>
        list.ownerId === userId || (list.cooperators && list.cooperators.includes(userId))
    );

    res.status(200).json(accessibleLists);
};