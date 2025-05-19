
# 🏠 Smart 3D Home Controller with Three.js & ESP32

A dynamic web interface that integrates a 3D model of a home built with **Three.js**, connected in real-time to a **physical smart home prototype** powered by an **ESP32 microcontroller**. This project enables users to control the lighting, garage, and windows of a real-world model wirelessly via **WebSockets**.

## 🔗 Live Demo

👉 [View the Live Website](https://ali-h17.github.io/sHome/) 

## 🚀 Features

* 🌐 Real-time WebSocket communication with ESP32
* 🏠 Interactive 3D home model rendered using Three.js
* 🔦 Control lights with dynamic color changes
* 🚪 Open/close garage and windows remotely
* 📊 Live temperature and humidity display
* 🌓 Auto-detection of day/night mode
* 🔐 Control lock status and automation toggles

## 🔧 Technologies Used

* **Three.js** – for 3D rendering of the smart home
* **ESP32** – for physical device control and sensor data
* **WebSockets** – for real-time two-way communication
* **React/Typescript** – for front-end development

## 🧠 How It Works

1. The web app sends commands (light, window, garage) through a WebSocket connection.
2. The ESP32 receives and processes commands to control actuators and LEDs in the physical model.
3. The ESP32 also reads sensor data (temperature, humidity) and sends it back to update the interface.
4. Three.js provides real-time visual feedback of the current state of the smart home.

## 🔌 Hardware Setup (ESP32)

* ESP32 Dev Module
* Servo motors (garage, window)
* RGB LED for lighting
* DHT11/DHT22 for temperature/humidity
* WebSocket server running on ESP32
