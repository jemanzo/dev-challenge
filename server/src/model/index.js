import path from 'path';
import FileDataset from './dataset.js';

const ROOT_DIR = path.resolve(path.join(__dirname, '../../data'));

// USERS CACHE
const users = new FileDataset(ROOT_DIR, 'users');
users.on('error', logError);
users.start();

// COMPANIES CACHE
const companies = new FileDataset(ROOT_DIR, 'companies');
companies.on('error', logError);
companies.start();

function logError(error, file) {
  // a logger like "winston" would be a better choice here
  console.log(`ERROR: file ignored ${file}`);
}

const filterEmployees = companyID => {
  companyID = companies.ensureID(companyID);
  const sorted = users.sorted;
  const results = [];
  for (let i = 0; i < sorted.length; i++) {
    const item = sorted[i];
    if (item[1].company === companyID) {
      results.push(item[1]);
    }
  }
  return results;
};

export { users, companies, filterEmployees };
