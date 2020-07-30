	// 'Database'
	const Vampires = require('./app.js');
	module.exports = {
	    search: (req, res) => {
        res.send(Vampires);
	//         res.render('search.ejs',
	//             {
	//                 Vampires
	//             });
	    }
	};
