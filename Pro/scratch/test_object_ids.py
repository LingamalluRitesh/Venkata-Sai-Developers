import urllib.request
import json

object_ids = [
    "ff808181932bad3e01932e65c5890001",
    "ff808181932bad3e01932e65c5890002",
    "ff808181932bad3e01932e65c5890003",
    "ff808181932bad3e01932e65c5890004",
    "ff8081819ff5b11001a00b0297de2d5c"
]

for oid in object_ids:
    url = f"https://api.restful-api.dev/objects/{oid}"
    try:
        req = urllib.request.Request(url, headers={'Accept': 'application/json'})
        with urllib.request.urlopen(req) as res:
            text = res.read().decode()
            print(f"OBJECT_ID_WORKING [{oid}]: {text[:100]}")
    except Exception as e:
        print(f"OBJECT_ID_FAIL [{oid}]: {e}")
