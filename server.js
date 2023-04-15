const express = require("express");
const path = require("path");
const app = express();
//View Engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
//Send Styles
app.use(express.static(path.join(__dirname, "/views")));
//Date Middleware
app.use(
	(addActiveTime = (req, res, next) => {
		let requestAt = new Date().getHours();
		let day = new Date().getDay();

		if ((requestAt <= 9 || requestAt >= 17) && (day <= 1 || day >= 5)) {
			res.render("NoAcces");
		} else {
			next();
		}
	})
);
//Server Routes
app.get("/", (req, res) => {
	res.render("Home");
});
app.get("/Services", (req, res) => {
	res.render("Services");
});
app.get("/Contact", (req, res) => {
	res.render("Contact");
});
app.get("*", (req, res) => {
	res.render("404");
});
//Server listen
app.listen(8000, () => {
	console.log("Server Running on http://localhost:8000");
});