-- Ceremony RSVP Database Setup Script
-- Run this in your MySQL client before starting the application

CREATE DATABASE IF NOT EXISTS ceremony_rsvp
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE ceremony_rsvp;

CREATE TABLE IF NOT EXISTS attendees (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  first_name    VARCHAR(100) NOT NULL,
  last_name     VARCHAR(100) NOT NULL,
  child_name    VARCHAR(100) DEFAULT NULL,
  phone_number  VARCHAR(20)  NOT NULL,
  submitted_at  DATETIME     DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_submitted_at (submitted_at),
  INDEX idx_last_name (last_name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Verify table created
DESCRIBE attendees;

-- Optional: Insert test data
-- INSERT INTO attendees (first_name, last_name, child_name, phone_number)
-- VALUES ('John', 'Doe', 'Jane Doe', '+1 555-0101'),
--        ('Mary', 'Smith', NULL, '+1 555-0202');
