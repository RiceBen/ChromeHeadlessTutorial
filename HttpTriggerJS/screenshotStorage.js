module.exports = (function () {
    let storage = require('azure-storage');
    let path = require('path');

    let blobService = storage.createBlobService();
    let containerName = "chromeheadlessdemo";

    /**
     * * create Azure Storage container
     * */
    let createContainer = async function () {
        return new Promise((resolve, reject) => {
            blobService.createContainerIfNotExists(containerName, { publicAccessLevel: 'blob' }, err => {
                if (err) {
                    reject(err);
                } else {
                    resolve({ message: `Container '${containerName}' created` });
                }
            });
        });
    }

    /**
     * * list all Azure Storage container
     * */
    let listContainers = async function () {
        return new Promise((resolve, reject) => {
            blobService.listContainersSegmented(null, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve({ message: `${data.entries.length} containers`, containers: data.entries });
                }
            });
        });
    }

    /**
     * * upload file to Azure Storage
     * * 
     * * @param {string} filePath file path which will be upload to Azure Storage
     * */
    this.uploadLocalFile = async function (filePath) {
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
    }

    /**
     * * initionalize Azure Storage container
     * */
    this.initContainer = async function () {
        let response = await listContainers();
        response.containers.forEach((container) => console.log(` -  ${container.name}`));
        let containerDoesNotExist = response.containers.findIndex((container) => container.name === containerName) === -1;
        if (containerDoesNotExist) {
            await createContainer(containerName);
            console.log(`Container "${containerName}" is created`);
        }
    }
    return {
        /**
         * * initionalize Azure Storage container
         * */
        initContainer: initContainer,
        /**
         * * upload file to Azure Storage
         * * 
         * * @param {string} filePath file path which will be upload to Azure Storage
         * */
        uploadLocalFile: uploadLocalFile
    }
}());