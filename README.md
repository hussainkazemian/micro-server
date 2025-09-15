# API Gateway with Node.js

This project demonstrates how to build an API Gateway using **Node.js**, **Express**, and **http-proxy-middleware**. The gateway forwards requests to three external APIs (GitHub API, JSONPlaceholder, and OpenWeatherMap) and handles API key injection for OpenWeatherMap.

---

## 1. Prerequisites
- Node.js (>=18)
- npm or yarn
- A valid [OpenWeatherMap API key](https://openweathermap.org/api)

---

## 2. Clone the Repository

## 3. Install Dependencies
```bash
npm install
```


## 6. Run the Application
Start in development mode with hot reload:
```bash
npm run dev
```


## 7. Test the API Gateway
You can test with **browser** or **Postman**.

### Example requests:

#### 1. GitHub API via Gateway
```bash
http://localhost:3008/api1/users/octocat
```
![Github](/src/public/images/oct.png)

#### 2. JSONPlaceholder API via Gateway
```bash
http://localhost:3008/api2/posts
```
![posts](/src/public/images/posts.png)

## OpenWeatherMap
```bash
http://localhost:3008/weather?q=Somero
```
![OWM](/src/public/images/OWM.png)


