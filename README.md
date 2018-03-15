+# PixivToDiscordWebhook
+Simple nodejs script to search latest pictures from Pixiv (given a tag) and push them to a discord webhook

WARNING: Pixiv contains NSFW content. Maybe using an account configured to hide that king of content would fix that or optionnal headers can be included in the search request. You can also filter the result to exclude pictures containing the tag 'R-18'.

include a login.json file at the root with this format:
  
{  
    "pixiv_email": "email@gmail.com",  
    "pixiv_password": "myPassword",  
    "discord_webhook": "https://discordapp.com/api/webhooks/S0M3R4ND0M/STR1NG"  
}