const request = require('request');
const PixivApi = require('pixiv-api-client');
const pixiv = new PixivApi();

// CONFIG
const 
pixiv_email = require('./login.json').pixiv_email,                                              // pixiv email
pixiv_password = require('./login.json').pixiv_password,                                        // pixiv password
discord_webhook = require('./login.json').discord_webhook,                                      // discord webhook url
search = '射命丸文',                                                                            // search request
avatar_url = 'https://pbs.twimg.com/profile_images/846488696958451712/MJjGGlwD_400x400.jpg',    // bot avatar url
bot_username = 'Ayaya';                                                                         // bot username

function postToDiscord(picture, filename, username){ // Post the picture to discord
    
    var formData = {
        content: "New picture from " + username + " !",
        username: bot_username,
        avatar_url: avatar_url,
        embeds: [{
            value: picture,
            options: {
                filename:  filename,
                contentType: 'image/jpeg'
            }
        }]
    };
    request.post({url: discord_webhook, formData: formData}, (err, res, body)=>{
        console.log('DONE');
    });
}

function downloadPicture(uri, filename, username, callback){ // Download the picture from pixiv
    request.head(uri, (err, res, body)=>{
        options = {
            url: uri,
            headers: {
                "Referer": "http://www.pixiv.net/"
            },
            encoding: null // important: prevent from returning 'utf-8' encoded string
        };
        
        request.get(options, (res, err, picture)=>{
            postToDiscord(picture, filename, username);
        });
    });
}

pixiv.login(pixiv_email, pixiv_password).then(()=>{ // Get the latest picture with a given tag
    return pixiv.searchIllust(search).then(json=>{
        
        let image_name = json.illusts[0].title + '.jpg';
        let image_uri = json.illusts[0].image_urls.medium.replace('c/540x540_70/', ''); // Format the url to access the full size picture
        let username = json.illusts[0].user.name;

        downloadPicture(image_uri, image_name, username, ()=>{
            console.log(done);
        });
    });
});