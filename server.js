	// Dependencies
	const express = require('express');
	const app = express();
	const port = process.env.PORT || 3000;
	
	// Middleware
	app.set('view engine', 'ejs');
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.static('public'));

    //Method Override
    const methodOverride = require('method-override');
    app.use(methodOverride('_method'));

	require('./routes')(app);
	
	app.listen(port, ()=> {
		console.log(`Vampires: I am listening on port: ${port}`);
	});
