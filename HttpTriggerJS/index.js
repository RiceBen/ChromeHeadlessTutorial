module.exports = async function (context, req) {
    if (process.env.NODE_ENV !== 'production') {
        require('dotenv').load();
    }

    const puppeteer = require('puppeteer');
    const screenshotStorage = require('./screenshotStorage.js');
    
    const fs = require('fs');
    
    await screenshotStorage.initContainer();
    
    let salePage = req.body.salepage_url;
    let shoppingcarId = req.body.shoppingcar_id;
    let fileName = shoppingcarId + '.png';

    (async () => {
        let browser = await puppeteer.launch();
        let page = await browser.newPage();
        page.setUserAgent("Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1");

        await page.goto(salePage);
        await page.screenshot({
            type: 'png',
            path: fileName,
            fullPage: true
        }).then(() => {
            console.log('screenshot finish ready upload to storage');
            screenshotStorage.uploadLocalFile(fileName).then(() => {
                console.log('upload finish ready to delete file');
                fs.unlink(fileName, (err) => {
                    console.log(err);
                });
            });
        });

        await browser.close();
    })();
};