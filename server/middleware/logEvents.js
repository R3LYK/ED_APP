import { format } from 'date-fns';
import { v4 as uuidv4 } from 'uuid';

import fs from 'fs';
import { promises as fsPromises } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const logEvents = async (message, logName) => {
  const dateTime = `${format(new Date(), 'yyyyMMdd/HH:mm:ss')}`;
  const logItem = `${dateTime}\t${uuidv4()}\t${message}\n`;

  try {
    const logsDir = path.join(__dirname, 'logs');
    if (!fs.existsSync(logsDir)) {
      await fsPromises.mkdir(logsDir);
    }
    await fsPromises.appendFile(path.join(logsDir, `${logName}.log`), logItem);
  } catch (err) {
    console.log(err);
  }
};

const logger = (req, res, next) => {
    const logMessage = `${req.method}\t${req.headers.origin}\t${req.url}`;
    console.log(logMessage); // Print the log message to the console for debugging
    logEvents(logMessage, 'reqLog');
    console.log(`${req.method} ${req.path}`);
    next();
  };

export { logEvents, logger };
