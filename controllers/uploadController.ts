const uploadControllers = {
	createUpload: async (req: any, res: any) => {
		if (req.files === null) {
			res.status(200).json({ msg: 'No file uploaded' });
		}

		const file = req.files.file;
		const newFile = `${Date.now()}_${file.name}`;

		file.mv(`${__dirname}/client/public/uploads/${newFile}`, (err: any) => {
			if (err) {
				console.log(err);
				return res.status(500).send(err);
			}
			res.json({ fileName: newFile, filePath: `/uploads/${newFile}` });
		});
	},
};

module.exports = uploadControllers;
