const m = require('mongoose');
const { difficultyEnum } = require('@/constants');
const { progressItemTypeEnum } = require('@/constants/progress');

const ProgressItemSchema = new m.Schema({
	userId: {
		type: m.Types.ObjectId,
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	author: {
		type: String,
	},
	labels: {
		type: [String],
	},
	link: {
		type: String,
	},
	type: {
		type: String,
		enum: progressItemTypeEnum,
		required: true,
	},
	difficulty: {
		type: String,
		enum: difficultyEnum,
		required: true,
	},
	image: {
		type: String,
	},
	startedAt: {
		type: Date,
		required: true,
	},
	finishedAt: {
		type: Date,
	},
});

module.exports = ProgressItemSchema;
