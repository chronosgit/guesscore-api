# Guesscore API

This is backend application for **Guesscore** project.

Frontend part: [repository](https://github.com/chronosgit/guesscore).

# How to run this application locally?

1. Download [MongoDB.](https://www.mongodb.com/try/download/community)

2. Download **Node.js**.

3. Clone or pull repository.

4. Download **mongosh** _(optional)_.

5. Run `npm install` in root directory of the project.

6. Setup **.env** file. There is `.env example` file for guiding this process.

7. Create `/uploads` folder in the root of the project. Used for multer's uploads

8. Run `npm run dev` or `npm run prod` for development or production local hosting.

# Images

Images are stored on the server, while the references to them are stored in the MongoDB. You can access images as static resources on the server.

# Routes

## Authentication

### POST /api/v1/auth/register

**Register in the application**

**Request body (JSON)**

```json
{
	"username": "string",
	"password": "string"
}
```

**Response 201 (JSON)**

```json
{
	"accessToken": "string"
}
```

It also returns a refresh token in a secured cookie.

### POST /api/v1/auth/login

**Login in the existing account**

**Request body (JSON)**

```json
{
	"username": "string",
	"password": "string"
}
```

**Response 200 (JSON)**

```json
{
	"accessToken": "string"
}
```

It also returns a refresh token in a secured cookie.

### POST /api/v1/auth/refresh

**Refreshing access token**

Refresh cookie must be sent in the request

**Response 200 (JSON)**

```json
{
	"accessToken": "string"
}
```

### POST /api/v1/auth/logout

**Refreshing access token**

Refresh cookie must be sent in the request

**Response 200**

## Progress

### GET /api/v1/progress/items

**Get your progress items**

An access token must be sent as a bearer token in the Authorization header.

**Optional query params**

```
name, author, type, difficulty, startedAt, finishedAt, curPage, sort
```

`sort` is field with (or without) a minus prefix for DESC. For example, `name` and `-name`. You can combine several queries into one (eg, `name -author`).

**Sample response 200 (JSON)**

```json
{
	"meta": {
		"totalItems": 2,
		"curPage": "1",
		"maxPage": 1,
		"hasNextPage": false,
		"hasPrevPage": false
	},
	"items": [
		{
			"labels": [],
			"_id": "67ff9cdf80463b9f0bfdaf18",
			"userId": "67fe86f4a02fd426bd9d52cd",
			"name": "Waterfall Manual v3",
			"description": "Temporary placeholder",
			"link": "https://www.youtube2.com",
			"type": "PIECE",
			"difficulty": "BREEZE",
			"image": "http://localhost:3001/uploads/1744805755581&WhatsApp_Image_2025-04-07_at_1.09.51_PM.jpeg",
			"startedAt": "2025-04-10T19:00:00.000Z",
			"__v": 0,
			"finishedAt": "2025-04-19T19:00:00.000Z"
		}
	]
}
```

### GET /api/v1/progress/items/:id

**Get your progress item by its ID**

An access token must be sent as a bearer token in the Authorization header.

**Sample response 200 (JSON)**

```json
{
	"labels": [],
	"_id": "67ff9cdf80463b9f0bfdaf18",
	"userId": "67fe86f4a02fd426bd9d52cd",
	"name": "Waterfall Manual v3",
	"description": "Temporary placeholder",
	"link": "https://www.youtube2.com",
	"type": "PIECE",
	"difficulty": "BREEZE",
	"image": "http://localhost:3001/uploads/1744805755581&WhatsApp_Image_2025-04-07_at_1.09.51_PM.jpeg",
	"startedAt": "2025-04-10T19:00:00.000Z",
	"__v": 0,
	"finishedAt": "2025-04-19T19:00:00.000Z"
}
```

### POST /api/v1/progress/items

**Get your progress items**

An access token must be sent as a bearer token in the Authorization header.

**Request body (formdata)**

```json
{
	"name": "required string",
	"description": "required description",
	"author": "optional string",
	"labels": ["this is optional array", "of string labels"],
	"link": "optional url link (string)",
	"type": "required item type (PIECE, BOOK)",
	"difficulty": "required difficulty type (BREEZE, VERY_EASY, EASY, MEDIUM, SLIGHTLY_HARD, HARD, INSANE)",
	"image": "optional File (only .png, .jpg, .jpeg)",
	"startedAt": "optional Date",
	"finishedAt": "optional Date"
}
```

**Sample response 201 (JSON)**

```json
{
	"userId": "67fe86f4a02fd426bd9d52cd",
	"name": "Piecekoteka",
	"description": "The mock progress item for testing purposes",
	"author": "Scriabin",
	"labels": ["label#1", "label#1"],
	"link": "https://www.youtube.com/watch?v=V4CADbgC1yI",
	"type": "PIECE",
	"difficulty": "INSANE",
	"image": "http://localhost:3001/uploads/1744807367472&2025-04-08_19-23.png",
	"startedAt": "2025-04-09T19:00:00.000Z",
	"finishedAt": "2025-04-11T19:00:00.000Z",
	"_id": "67ffa5c7de03d6ea307734d9",
	"__v": 0
}
```

### PUT /api/v1/progress/items/:id

**Update your progress item**

An access token must be sent as a bearer token in the Authorization header.

**Request body (formdata)**

```json
{
	"name": "required string",
	"description": "required description",
	"author": "optional string",
	"labels": ["this is optional array", "of string labels"],
	"link": "optional url link (string)",
	"type": "required item type (PIECE, BOOK)",
	"difficulty": "required difficulty type (BREEZE, VERY_EASY, EASY, MEDIUM, SLIGHTLY_HARD, HARD, INSANE)",
	"image": "optional File (only .png, .jpg, .jpeg)",
	"startedAt": "optional Date",
	"finishedAt": "optional Date"
}
```

**Sample response 201 (JSON)**

```json
{
	"labels": ["newlabel"],
	"_id": "67ff9cdf80463b9f0bfdaf18",
	"userId": "67fe86f4a02fd426bd9d52cd",
	"name": "Waterfall Manual v3",
	"description": "Temporary placeholder",
	"link": "https://www.youtube2.com",
	"type": "PIECE",
	"difficulty": "BREEZE",
	"image": null,
	"startedAt": "2025-04-10T19:00:00.000Z",
	"__v": 1,
	"finishedAt": "2025-04-19T19:00:00.000Z",
	"author": "Bunin"
}
```

### DELETE /api/v1/progress/items/:id

**Delete your progress item by its ID**

An access token must be sent as a bearer token in the Authorization header.

**Response 204**
