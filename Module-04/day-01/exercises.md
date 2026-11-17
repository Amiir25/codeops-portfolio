## 1.

***Write a paragraph explaining what a server is to someone who has never programmed, without***
***using the words "computer" or "machine". Keep it under 120 words.***


A server is a program built to answer your requests every time you look for something on the internet. When you want to get any kind of data (a text, an image or a video), you tell your browser what you want and the browser shouts your request throught the internet. The server listenes its voice and send the data. Then the browser recieves and shows it to you.

---


## 2. 

***Open any website with the browser network tab visible. Pick three requests and record, for***
***each: the method, the full path, the status code, and whether it carried a request body.***

Website observed: https://www.youtube.com/

**Recorded Requests**

1.
- Method:           GET
- Full Path:        https://www.youtube.com/sw.js_data
- Status Code       200
- Requested Body    No
    ___

2.
- Method:           POST
- Full Path:        https://www.youtube.com/youtubei/v1/log_event?alt=json
- Status Code       200
- Requested Body    Yes
    ___

3.
- Method:           GET
- Full Path:        Path:https://rr5---sn-4g5ednd7.googlevideo.com/videoplayback?expire=6314199705&ei=ezbfGAy7XBPQ6LaYvF7eVnE&ip=...
- Status Code       403
- Requested Body    Yes

---


## 3.

***For one of those three requests, list four request headers and four response headers, and write one line on what each is doing.***

**Request Header**
- :authority: www.youtube.com
- :method: POST
- :path: /youtubei/v1/log_event?alt=json
- authorization: SAPISIDHASH 1794922623_31b7acdcdc545299f364ece6cc30d5defcc14acb_u SAPISID1PHASH
- content-type: application/json

**Response Header**
- content-length: 31
- content-type: application/json; charset=UTF-8
- date: Tue, 17 Nov 2026 13:37:11 GMT
- server: scaffolding on HTTPServer2


---

## 4.

***Write out a full HTTP request, by hand, that would create an order for two portions of menu item 7 at restaurant 14 in Bole, paid by*** ***TeleBirr. Include the method line, four headers, and a JSON body.***

POST /api/v1/orders HTTP/1.1
Host: api.addiseats.et
Content-Type: application/json
Authorization: Bearer eyJhbGciOi...
Accept: application/json

{
    "restaurantId": 14,
    "area": "Bole",
    "items": [ { "menuItemId": 7, "qty": 2 } ],
    "paymentMethod": "telebirr"
}


---

## 5.

***Choose the correct status code for each of these eight outcomes and justify each in one line: (a) a list of restaurants is returned;*** ***(b) an order is created; (c) an order is cancelled and nothing is returned; (d) the qty field arrives as "two"; (e) the auth token*** ***has expired; (f) a courier attempts to edit a menu; (g) someone requests order 99999, which does not exist; (h) your code throws an*** ***unhandled exception***

A. a list of restaurants is returned : **200** - Successfully returned the requested data
B. an order is created : **201** - Successfully created a new data
C. an order is cancelled and nothing is returned : **204** - The action succeded but there is nothing to return
D. the qty field arrives as "two" : **400** - Invalid request. It's your fault
E. the auth token has expired : **401** - Unauthorized because there is no credentials
F. a courier attempts to edit a menu : **403** - Not allowed to edit menu
G. someone requests order 99999, which does not exist : **404** - No data found
H. your code throws an unhandled exception : **500** - It's our fault, not yours


---

## 6.

***Find an API you use — any public one — and write down three things its contract promises you. Then name one thing it does not*** ***document that you would want to know before depending on it.***