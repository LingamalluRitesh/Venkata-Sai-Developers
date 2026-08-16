import urllib.request
import json

endpoints = [
    "https://venkatasai-realestate-default-rtdb.firebaseio.com/data.json",
    "https://vsd-realestate-default-rtdb.firebaseio.com/data.json",
    "https://venkata-sai-dev-default-rtdb.firebaseio.com/data.json",
    "https://realestate-venkata-default-rtdb.firebaseio.com/data.json",
    "https://kondaveedu-gallery-default-rtdb.firebaseio.com/data.json",
    "https://sree-venture-default-rtdb.firebaseio.com/data.json",
    "https://venkata-sai-developers-default-rtdb.firebaseio.com/data.json"
]

data = json.dumps({
    "test": "hello"
}).encode('utf-8')

for ep in endpoints:
    try:
        req = urllib.request.Request(ep, data=data, headers={'Content-Type': 'application/json'}, method='PUT')
        with urllib.request.urlopen(req) as res:
            text = res.read().decode()
            print(f"SUCCESS [{ep}]: {text}")
            break
    except Exception as e:
        print(f"FAIL [{ep}]: {e}")
