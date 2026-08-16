import urllib.request
import json

# 1. Create collection
try:
    url = "https://api.myjson.online/v1/collections"
    payload = json.dumps({"name": "VenkataSaiDev"}).encode('utf-8')
    req = urllib.request.Request(url, data=payload, headers={'Content-Type': 'application/json'}, method='POST')
    with urllib.request.urlopen(req) as res:
        res_text = res.read().decode()
        print("MYJSON_COLLECTION_RES:", res_text)
        col_id = json.loads(res_text).get('id') or json.loads(res_text).get('data', {}).get('id')
        print("COL_ID:", col_id)
except Exception as e:
    print("COL_ERR:", e)
