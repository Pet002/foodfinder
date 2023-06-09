# foodfinder-be
NLP Project Line Chatbot with dialogflow webhook backend

### Setup configuration
1. Install dependecies on 2 directories, converter and backend
``` npm install ```

2. Run converter.js using nodemon

3. Open simple sever using Ngrok by opening http port 4000
```ngrok http 4000```

4. Add route **webhook** to ngrok http url
```https://<some_number>.ap.ngrok.io/webhook ```

5. Copy this url and paste to Line bot Webhook URL

6. Verify a Webhook URL

### Setup backend
1. Change directory to backend
```cd backend```
2. Run app.js using nodemon
```nodemon app.js```
3. Open server using Ngrok by opening HTTP port 3000
```ngrok http 3000```
4. Copy ngrok https url and concat "test" to url
```https://<some_number>.ap.ngrok.io/test```

5. Copy this URL and paste in Dialogflow fulfillment

6. Save fulfillment configuration