-- Drop the database if it exists and then create it
DROP DATABASE IF EXISTS HealthDiary;
CREATE DATABASE HealthDiary;

USE HealthDiary;

CREATE TABLE Roles (
    role_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE Users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    user_level INT NOT NULL DEFAULT 1,
    FOREIGN KEY (user_level) REFERENCES Roles(role_id)
);

CREATE TABLE DiaryEntries (
    entry_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    sleep_duration DECIMAL(4,2),
    sleep_quality VARCHAR(50) NOT NULL,
    dream_description TEXT,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

CREATE TABLE Exercises (
    exercise_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    type VARCHAR(100) NOT NULL,
    duration INT NOT NULL,
    intensity VARCHAR(50),
    notes TEXT,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

CREATE TABLE Mood (
    mood_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    mood VARCHAR(50),
    notes TEXT,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

-- Insert sample data for Roles
INSERT INTO Roles (name) VALUES ('regular'), ('admin');

-- Insert sample data for Users
INSERT INTO Users (username, password, email, user_level) VALUES
('user1', 'password123', 'user1@example.com', 1),
('user2', 'password456', 'user2@example.com', 1),
('admin', 'adminpass', 'admin@example.com', 2);

-- Insert sample data for DiaryEntries
INSERT INTO DiaryEntries (user_id, sleep_duration, sleep_quality, dream_description) VALUES
(1, 7.5, 'Good', 'Dreamt about flying'),
(2, 6.0, 'Fair', 'No dreams recalled'),
(1, 8.0, 'Excellent', 'Dreamt of a peaceful garden');

-- Insert sample data for Exercises
INSERT INTO Exercises (user_id, type, duration, intensity, notes) VALUES
(1, 'Running', 30, 'High', 'Felt great during run'),
(2, 'Yoga', 45, 'Low', 'Relaxing session'),
(1, 'Weight Training', 60, 'Moderate', 'Focused on legs');

-- Insert sample data for Mood
INSERT INTO Mood (user_id, mood, notes) VALUES
(1, 'Happy', 'Had a productive day'),
(2, 'Tired', 'Did not sleep well'),
(1, 'Excited', 'Looking forward to the weekend');
