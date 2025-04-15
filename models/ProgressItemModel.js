const m = require('mongoose');
const ProgressItemSchema = require('@/schemas/ProgressItemSchema');

const ProgressItemModel = m.model('ProgressItem', ProgressItemSchema);

module.exports = ProgressItemModel;
