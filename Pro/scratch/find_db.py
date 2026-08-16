import urllib.request
import json

def test_restful_api():
    url = "https://api.restful-api.dev/objects"
    payload = json.dumps({
        "name": "Venkata Sai Developers DB 2026",
        "data": {
            "projects": [
                {
                    "id": "kondaveedu-ghat-road-plots",
                    "title": "Kondaveedu Ghat Road Villa Plots",
                    "galleryImages": []
                }
            ],
            "siteVisits": [],
            "inquiries": []
        }
    }).encode('utf-8')

    req = urllib.request.Request(url, data=payload, headers={
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0'
    }, method='POST')

    try:
        with urllib.request.urlopen(req) as response:
            res_text = response.read().decode()
            print("RESTFUL_API_SUCCESS:", res_text)
            return json.loads(res_text).get('id')
    except Exception as e:
        print("RESTFUL_API_ERR:", e)

test_restful_api()
