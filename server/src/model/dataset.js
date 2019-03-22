import fs from 'fs';
import path from 'path';
import util from 'util';
import chokidar from 'chokidar';
import base62 from 'uuid-base62';
import { EventEmitter } from 'events';

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

class FileDataset extends EventEmitter {
  constructor(rootDir, dataset) {
    super();
    this.rootDir = rootDir;
    this.dataset = dataset;
    this.watcher = null;
    this.cache = new Map();
    this.sorted = [];
  }
  start() {
    this.watcher = chokidar
      .watch(path.join(this.fullPath(), '*.json'))
      .on('add', loadFile.bind(this))
      .on('change', loadFile.bind(this))
      .on('unlink', unloadFile.bind(this));
    this.emit('started');
  }
  stop() {
    this.watcher.close();
    this.watcher = null;
    this.cache.clear();
    this.emit('stopped');
  }
  fullPath() {
    return path.join(this.rootDir, this.dataset);
  }
  get(keyOrID) {
    const key = this.ensureKey(keyOrID);
    const item = key && this.cache.get(key);
    return item && { ...item, id: key };
  }
  filter(filter) {
    return this.sorted.filter(item => {
      // each sorted item is equal to [key, value]
      if (!filter || filter(item[1])) {
        return true
      } else { return false }
    })
  }
  update(item) {
    item.id = this.ensureID(item.id);
    const key = this.ensureKey(item.id);
    if (!key || key.length !== 22) {
      throw new Error('unable to update. Invalid ID!');
    }
    const oldItem = this.cache.get(key);
    if (!oldItem) {
      throw new Error('unable to update. ID not found!');
    }
    item = { ...oldItem, ...item };
    let file = path.join(this.fullPath(), `${item.id}.json`);
    return saveFile(file, item);
  }
  ensureID(keyOrID) {
    if (typeof keyOrID === 'string') {
      switch (keyOrID.length) {
        case 22:
          return base62.decode(keyOrID);
        case 36:
          return keyOrID;
        default:
          return null;
      }
    }
    return null;
  }
  ensureKey(keyOrID) {
    if (typeof keyOrID === 'string') {
      switch (keyOrID.length) {
        case 22:
          return keyOrID;
        case 36:
          return base62.encode(keyOrID);
        default:
          return null;
      }
    }
    return null;
  }
  filenameToID(file) {
    const id = file.match(/.*\/(.*)\.json$/);
    if (id) {
      return id[1];
    }
    return null;
  }
  sort() {
    const sorted = [];
    const list = this.cache.entries();
    let elem = list.next();
    while (!elem.done) {
      sorted.push(elem.value);
      elem = list.next();
    }
    sorted.sort((a, b) => {
      // Sort items by name ASC
      if (a[1].name > b[1].name) {
        return 1;
      }
      if (a[1].name < b[1].name) {
        return -1;
      }
      return 0;
    });
    this.sorted = sorted;
  }
}

function loadFile(file) {
  const dts = this;
  const id = dts.filenameToID(file);
  if (!id) {
    return;
  }
  return readFile(file)
    .then(data => {
      data = JSON.parse(data);
      if (id !== data.id) {
        throw new Error('data.id does not match the file name.');
      }
      dts.cache.set(dts.ensureKey(data.id), data);
      dts.sort();
    })
    .catch(error => {
      dts.emit('error', error, file);
    });
}

function unloadFile(file) {
  const dts = this;
  let id = dts.filenameToID(file);
  if (!id) {
    return;
  }
  dts.cache.delete(dts.ensureKey(id));
  dts.sort();
}

function saveFile(file, data) {
  if (typeof data !== 'string') {
    data = JSON.stringify(data);
  }
  return writeFile(file, data);
}

module.exports = FileDataset;
