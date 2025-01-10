# Payment Gateway

**Payment Gateway** is an advanced application designed to process and analyze Payments, providing detailed insights about payment events. The application is ideal for developers and data analysts who want to gain in-depth insights into payment performance and payment dynamics.

## 🛠️ Technologies Used

- **NestJS**: A robust and scalable framework for Node.js, used to build the API.
- **MongoDB**: A highly scalable NoSQL database used to store game logs and player data.
- **Docker**: Containerization to streamline development and deployment of the application.
- **Yarn**: A package manager for Node.js that ensures fast installation and dependency management.

## 🚀 Usage Instructions

### **1. Running Locally**

To run the application locally, follow these steps:

#### 1.1 Install dependencies:

Ensure that `Yarn` is installed on your system. If not, install it by running:
```bash
npm install --global yarn
```

Then, navigate to the project directory and install the dependencies by running:
```sh
yarn
```

#### 1.2 Start the development server:

With the dependencies installed, start the development server by running:
```sh
yarn dev
```

The server will be running at `http://localhost:3000`.

### **2. Running with Docker**

If you prefer to run the application using Docker, follow the steps below to build and run the necessary containers:

#### 2.1 Build the Docker image and start the containers:

Run the following command to build the Docker images and start the containers:
```sh
docker-compose build && docker-compose up
```

- **MongoDB**: The MongoDB container will be initialized with data persisted through a Docker volume. This ensures that your data is retained even if the container is stopped or removed.
- **NestJS**: The NestJS application will be accessible on port `3000` of your localhost. You can access the API at `http://localhost:3000`.

#### 2.2 Stop the containers:
```sh
docker-compose down
```

### **3. Accessing the API**

Once the application is up and running, you can access the API documentation interactively via Swagger at:
[http://localhost:3000/api](http://localhost:3000/api)

The documentation provides details about the available endpoints, parameters, and request examples.

### **4. Using the Postman Collection**

If you prefer to interact with the API through Postman, you can use the pre-made collection:
[Open on Postman](https://app.getpostman.com/join-team?invite_code=e3805cd5ef0c22532705c2f2a367cb168a5939e4b79749684a1b9a0b81a35ec5&target_code=527ee5e777a866ef1c82ba8ccca804a9)

### **5. Payment Logs File**

The game logs used by the application are available for download from the following repository:
[Payment Logs File](https://github.com/rubcube/hiring-exercises/blob/master/backend/games.log)

This file contains the log data required to perform parsing and generate insights.

## 🧪 Running Tests

To ensure everything is working correctly and that integration tests pass successfully, run the tests with the following command:
```sh
yarn test
```

This will run the automated tests, ensuring that all components of the application are functioning correctly.
![image](https://github.com/user-attachments/assets/ff34b1ca-7b9f-4060-96bb-6d0cf8f6ccfa)


## 📋 Final Considerations

This project provides an efficient way to analyze Quake match data and can be extended to support different log formats, performance metrics, and custom features. Feel free to contribute or expand the project to address new use cases!





