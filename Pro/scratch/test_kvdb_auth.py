import urllib.request
import json

url = "https://kvdb.io/T179XwrW4AYcwwSFRT3w1W/site_data"
payload = json.dumps({"test": 123}).encode('utf-8')

req = urllib.request.Request(url, data=payload, headers={
    'Content-Type': 'application/json'
}, method='POST')

try:
    with urllib.request.urlopen(req) as res:
        print("POST_RES:", res.read().decode())
except Exception as e:
    print("POST_ERR:", e)
