import os
import requests
from dotenv import load_dotenv

load_dotenv()
API_KEY = os.getenv("YOUTUBE_API_KEY")

YOUTUBERS = [
    {"name": "MKBHD", "id": "UCBJycsmduvYEL83R_U4JriQ"},
    {"name": "Linus Tech Tips", "id": "UCXuqSBlHAE6Xw-yeJA0Tunw"},
    {"name": "Unbox Therapy", "id": "UCsTcErHg8oDvUnTzoqsYeNw"},
    {"name": "Mrwhosetheboss", "id": "UCMiJRAwDNSNzuYeN2uWa0pA"},
    {"name": "Dave2D", "id": "UCVYamHliCI9rw1tHR1xbkfw"},
    {"name": "iJustine", "id": "UCey_c7U86mJGz1VJWH5CYPA"},
    {"name": "JerryRigEverything", "id": "UCWFKCr40YwOZQx8FHU_ZqqQ"},
    {"name": "The Verge", "id": "UCddiUEpeqJcYeBxX1IVBKvQ"},
    {"name": "TechLinked", "id": "UCeeFfhMcJa1kjtfZAGskOCA"},
    {"name": "ColdFusion", "id": "UC4QZ_LsYcvcq7qOsOhpAX4A"},           
    {"name": "Techquickie", "id": "UC0vBXGSyV14uvJ4hECDOl0Q"},
    {"name": "Paul's Hardware", "id": "UCRYOj4DmyxhBVrdvbsUwmAA"},
    {"name": "EEVblog", "id": "UC2DjFE7Xf11URZqWBigcVOQ"},
    {"name": "Gamers Nexus", "id": "UChIs72whgZI9w6d6FhwGGHA"},
    {"name": "Bitwit", "id": "UCrwObTfqv8u1KO7Fgk-FXHQ"}
    
]

def get_channel_stats(channel_id):
    url = "https://www.googleapis.com/youtube/v3/channels"
    params = {
        "part": "snippet,statistics",
        "id": channel_id,
        "key": API_KEY
    }
    res = requests.get(url, params=params)
    res.raise_for_status()
    items = res.json().get("items", [])
    if not items:
        raise ValueError(f"No data found for channel ID: {channel_id}")
    item = items[0]
    return {
        "title": item["snippet"]["title"],
        "subscribers": item["statistics"].get("subscriberCount"),
        "views": item["statistics"].get("viewCount"),
        "videos": item["statistics"].get("videoCount")
    }

def fetch_all_data():
    results = []
    for yt in YOUTUBERS:
        try:
            stats = get_channel_stats(yt["id"])
            results.append({
                "name": yt["name"],
                **stats
            })
        except Exception as err:
            print(f"Error for {yt['name']}: {err}")
    return results
