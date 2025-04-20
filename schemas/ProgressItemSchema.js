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
		trim: true,
	},
	description: {
		type: String,
		required: true,
		trim: true,
	},
	author: {
		type: String,
		trim: true,
		default: '',
	},
	labels: {
		type: [String],
		default: [],
	},
	link: {
		type: String,
		trim: true,
		default: '',
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
		default: '',
	},
	startedAt: {
		type: Date,
		required: true,
	},
	finishedAt: {
		type: Date,
		default: '',
	},
});

module.exports = ProgressItemSchema;
