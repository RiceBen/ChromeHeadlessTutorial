# Chromeheadless Screenshot Feature Demo

## Development Envirement

* OS: Windows 10
* NodeJS v8.10.0
* npm 6.1.0
* VSCode extension
    * Azure Account
    * Azure Function
* Azure Account
    * free account is fine

## Package Dependency

* azure-storage
* dotenv
* locate-path
* path
* path-exists
* puppeteer

> git clone this repo, then run the command below at cmd
> > npm install

> after execution, node_modules dir will be created and the dependency package will download.

## Azure && Project Setting

This toturial will create a Azure Storage and save image in a specific container.

**\*please new a file named ".env" with AZURE_STORAGE_CONNECTION_STRING key (this name cannot change since default will retrieve this key)**