require('dotenv').config({ path: './config/.env' });
const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');

const connectingDB = require('./config/db');

const app = express();
connectingDB();

app.use(express.json());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cors());
app.use(fileUpload())

// app.use('/', (req: any, res: any) => {
//   res.send('Hello from Note3Sixty')
// })

app.post('/api/upload', (req:any, res:any) => {
	if (req.files === null) {
		res.status(200).json({ msg: 'No file uploaded' });
	}

	const file = req.files.file;
	const newFile = `${Date.now()}_${file.name}`;

	file.mv(`${__dirname}/client/public/uploads/${newFile}`, (err:any) => {
		if (err) {
			console.error(err);
			return res.status(500).send(err);
		}

		res.json({ fileName: newFile, filePath: `/uploads/${newFile}` });
	});
});



app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/posts', require('./routes/postRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server up and running on port ${PORT}`);
})
