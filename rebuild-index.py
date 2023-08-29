#! /usr/bin/python3
import os
import base64
import http.client

def check(key: str):
    value = os.environ.get(key, None)
    if value is not None:
        print(f"Get {key}: **len {len(value)}**")
    else:
        raise RuntimeError(f'env "{key}" not defines')
    return value

user_id = check("CRAWLER_USER_ID")
api_key = check("CRAWLER_API_KEY")
crawler_id = check("CRAWLER_ID")

auth = base64.b64encode(f"{user_id}:{api_key}".encode("utf-8")).decode("utf-8")

conn = http.client.HTTPSConnection("crawler.algolia.com")
payload = ''
headers = {
  'Authorization': f'Basic {auth}'
}
conn.request("POST", f"/api/1/crawlers/{crawler_id}/reindex/", payload, headers)
res = conn.getresponse()
data = res.read()
print(data.decode("utf-8"))