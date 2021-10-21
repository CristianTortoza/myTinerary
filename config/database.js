const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODATABASE, {
	useUnifiedTopology: true,
	useCreateIndex: true,
	useNewUrlParser: true,
	useFindAndModify: false,
})
.then(() => console.log('dataBase Connected'))
.catch(error => console.log(error))