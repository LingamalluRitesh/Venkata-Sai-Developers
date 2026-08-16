import urllib.request
import json

# Test 1: myjson.online
try:
    url = "https://api.myjson.online/v1/records"
    payload = json.dumps({
        "collectionId": "c_default",
        "jsonData": json.dumps({"projects": []})
    }).encode('utf-8')
    req = urllib.request.Request(url, data=payload, headers={'Content-Type': 'application/json'}, method='POST')
    with urllib.request.urlopen(req) as res:
        print("MYJSON_SUCCESS:", res.read().decode())
except Exception as e:
    print("MYJSON_ERR:", e)

# Test 2: jsonsilo.com
try:
    url = "https://api.jsonsilo.com/public"
    payload = json.dumps({"projects": []}).encode('utf-8')
    req = urllib.request.Request(url, data=payload, headers={'Content-Type': 'application/json'}, method='POST')
    with urllib.request.urlopen(req) as res:
        print("JSONSILO_SUCCESS:", res.read().decode())
except Exception as e:
    print("JSONSILO_ERR:", e)
