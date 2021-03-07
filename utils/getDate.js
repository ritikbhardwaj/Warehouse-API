module.exports = function getDate() {
	let d = new Date();
	let date = d.getDate() + '/' + d.getMonth() + '/' + d.getFullYear();
	return date;
};
