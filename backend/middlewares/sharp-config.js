const sharp = require('sharp');
const fs = require('fs');


module.exports =  (req, res, next) => {
        if (!req.file) {
          return next();
          // return res.status(400).json({error: "file doesn't exist"});
        }
      
        const { destination, filename ,path: filePath} = req.file;
     
    
        try {
           sharp(filePath)
            .resize(370, 468)
            .jpeg({ quality: 75 })
            .toFile(`${destination}/optimized${filename}`)
            .then(() => {
              console.log('Image processed successfully.');
              fs.unlinkSync(filePath);
            })
            .catch(error => {
              console.error('Image processing error:', error);
              return res.status(400).json({ error: 'Image processing error' });
            });

       

        } catch (error) {
          return res.status(400).json({error});
        }

        next();
      };
  
  