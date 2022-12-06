# consams-web-app

## Background

 This project is meant to create a web-app for a VUMC professor working with CONSAMS, an African consortium of medical schools. We aim to create a website with basic classroom features, the ability to paywall content, process payments for the organization, and create a digital presence that CONSAMS can easily update. We are using a MERN stack, since much of our data will be object based, and we all have some familarity with typescript. We plan to integrate industry standard security practices, and to minimize the amount of data we collect on each user. Ultimately we aim to supercharge CONSMAS with a digital presence that allows them to quickly and securely spread their knowledge across Africa. We are also using Github Actions, Docker, and Nginx to ensure a reliable webserver that securely accepts users payments. 

## Reccomended steps to get running locally:
docker pull anirudh2001/nodejs-demo:army && docker run -p 8080:8080 -it anirudh2001/nodejs-demo:army

To run in production, add an Nginx reverse proxy running on port 80, add SSL certificates, and redicrect all http traffic to https in nginx.conf. Then run the above command.

## Development

Make sure you have ``.env`` file in root directory with correct parameters.

```
npm run dev
```
or
```
nodemon
```

## Production
```
npm run build && npm start
```
