# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

article:
https://blog.optis.be/getting-started-with-grpc-web-9674e68cd201

for run app:

- frontend: y start
- backend: node src/server.js
- docker: docker run -d -p 8080:8080 -p 9901:9901 todo/envoy

for build docker:

- docker build -t todo/envoy -f ./envoy.Dockerfile .
