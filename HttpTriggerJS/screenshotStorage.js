const storage = require('azure-storage');
const path = require('path');

const blobService = storage.createBlobService();
const containerName = "chromeheadlessdemo";

/**
 * create Azure Storage container
*/
async function createContainer() {
    return new Promise((resolve, reject) => {
        blobService.createContainerIfNotExists(containerName, { publicAccessLevel: 'blob' }, err => {
            if (err) {
                reject(err);
            } else {
                resolve({ message: `Container '${containerName}' created` });
            }
        });
    });
};

/**
 * list all Azure Storage container
*/
async function listContainers() {
    return new Promise((resolve, reject) => {
        blobService.listContainersSegmented(null, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve({ message: `${data.entries.length} containers`, containers: data.entries });
            }
        });
    });
};

/**
 * upload file to Azure Storage
 * 
 * @param {string} filePath file path which will be upload to Azure Storage
*/
exports.uploadLocalFile = async function (filePath) {
    return new Promise((resolve, reject) => {
        const fullPath = path.resolve(filePath);
        const blobName = path.basename(filePath);
        blobService.createBlockBlobFromLocalFile(containerName, blobName, fullPath, err => {
            if (err) {
                reject(err);
            } else {
                resolve({ message: `Local file "${filePath}" is uploaded` });
            }
        });
    });
};

/**
 * initionalize Azure Storage container
*/
exports.initContainer = async function () {
    let response = await listContainers();
    response.containers.forEach((container) => console.log(` -  ${container.name}`));
    let containerDoesNotExist = response.containers.findIndex((container) => container.name === containerName) === -1;
    if (containerDoesNotExist) {
        await createContainer(containerName);
        console.log(`Container "${containerName}" is created`);
    }
};