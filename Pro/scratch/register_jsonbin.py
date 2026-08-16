import urllib.request
import json

# Test creating a free bin on Jsonbin.io with signup payload
url = "https://api.jsonbin.io/v3/b"
payload = json.dumps({
    "projects": [
        {
            "id": "kondaveedu-ghat-road-plots",
            "title": "Kondaveedu Ghat Road Villa Plots",
            "galleryImages": []
        }
    ],
    "siteVisits": [],
    "inquiries": []
}).encode('utf-8')

# Try with public header
req = urllib.request.Request(url, data=payload, headers={
    'Content-Type': 'application/json',
    'X-Bin-Name': 'VenkataSaiDevDB',
    'X-Bin-Private': 'false'
}, method='POST')

try:
    with urllib.request.urlopen(req) as res:
        print("RES:", res.read().decode())
except Exception as e:
    print("ERR:", e)
