const request = require('request');
const PixivApi = require('pixiv-api-client');
const pixiv = new PixivApi();
const fs = require('fs');

// CONFIG
const 
pixiv_email = require('./login.json').pixiv_email,                                              // pixiv email
pixiv_password = require('./login.json').pixiv_password,                                        // pixiv password
discord_webhook = require('./login.json').discord_webhook,                                      // discord webhook url
search = '射命丸文',                                                                            // search request
avatar_url = 'https://pbs.twimg.com/profile_images/846488696958451712/MJjGGlwD_400x400.jpg',    // bot avatar url
bot_username = 'Pixiv Aya';                                                                     // bot username

function postToDiscord(image_url){
    
    request.post({
        url: discord_webhook,
        headers: {
            "Content-Type": "application/json",
        },
        body: `{
            "username": "` + bot_username +`",
            "avatar_url": "` + avatar_url + `",
            "content": "` + image_url + `"
        }`
    }, (err, res, body)=>{
        console.log('body', body);
    });
}

pixiv.login(pixiv_email, pixiv_password).then(()=>{
    return pixiv.searchIllust(search).then(json=>{

        let image_uri = json.illusts[0].image_urls.medium.replace('540x540_70', '240x240');

        postToDiscord(image_uri);
        
        return;
    });
});