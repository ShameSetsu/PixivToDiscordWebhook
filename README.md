+# PixivToDiscordWebhook
+Simple nodejs script to search latest pictures from Pixiv (given a tag) and push them to a discord webhook

include a login.json file at the root with this format:

{
    "pixiv_email": "email@gmail.com",
    "pixiv_password": "myPassword",
    "discord_webhook": "https://discordapp.com/api/webhooks/S0M3R4ND0M/STR1NG"
}