const { difficultyEnum } = require('@/constants');
const { progressItemTypeEnum } = require('@/constants/features/progress');
const m = require('mongoose');

const ProgressItemSchema = new m.Schema({
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
		default: null,
	},
	finishedAt: {
		type: Date,
		default: null,
	},
});

module.exports = ProgressItemSchema;
