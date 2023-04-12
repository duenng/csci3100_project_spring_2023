import path from "path";
import formidable from "formidable";

export const config = {
    api: {
      bodyParser: false,
    },
  };
  
  const readFile = (req,saveLocally) => {
    const options = {};
    if (saveLocally) {
      options.uploadDir = path.join(process.cwd(), "/public/video");
      options.filename = (name, ext, path, form) => {
        return Date.now().toString() + "_" + path.originalFilename;
      };
    }
    options.maxFileSize = 4000 * 1024 * 1024;

    const form = formidable(options);
    return new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        //console.log(fields,files)
        if (err) reject(err);
        resolve({ fields, files });
      });
    });
  };
  
  const handler = async (req, res) => {
    let output = await readFile(req, true);
    res.json({ done: "ok" , data:output.files});
  };
  
  export default handler;