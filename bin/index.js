const app = require('../app'),
	db = require('../database'),
	PORT = 3000;

app.listen(process.env.PORT || PORT, () => {
	console.log('[+]Express listening on port:', PORT);
});
