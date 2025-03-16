-- Create Roles Table
CREATE TABLE roles (
    id INT PRIMARY KEY AUTO_INCREMENT,
    role_name ENUM('viewer', 'editor', 'admin') NOT NULL
);

-- Create Users Table (Officers are also users)
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    phone_number VARCHAR(20),
    role_id INT,
    FOREIGN KEY (role_id) REFERENCES roles(id)
);

-- Create Officers Table
CREATE TABLE officers (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    badge_number VARCHAR(50) UNIQUE NOT NULL,
    department VARCHAR(255),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Create Criminals Table
CREATE TABLE criminals (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    alias VARCHAR(255),
    dob DATE,
    phone_number VARCHAR(20),
    address TEXT,
    criminal_history TEXT
);

-- Create Cases Table
CREATE TABLE cases (
    id INT PRIMARY KEY AUTO_INCREMENT,
    case_number VARCHAR(50) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status ENUM('open', 'closed') DEFAULT 'open',
    officer_id INT,
    year INT,
    month INT,
    FOREIGN KEY (officer_id) REFERENCES officers(id)
);

-- Create Crime Table (Linked to Cases)
CREATE TABLE crimes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    case_id INT,
    crime_date DATE NOT NULL,
    crime_type VARCHAR(255) NOT NULL,
    location TEXT,
    description TEXT,
    FOREIGN KEY (case_id) REFERENCES cases(id)
);

-- Create Crime-Criminal Mapping Table (Many-to-Many)
CREATE TABLE crime_criminal (
    id INT PRIMARY KEY AUTO_INCREMENT,
    crime_id INT,
    criminal_id INT,
    FOREIGN KEY (crime_id) REFERENCES crimes(id),
    FOREIGN KEY (criminal_id) REFERENCES criminals(id)
);

-- Create Evidence Table (Linked to Cases)
CREATE TABLE evidence (
    id INT PRIMARY KEY AUTO_INCREMENT,
    case_id INT,
    evidence_type VARCHAR(255) NOT NULL,
    description TEXT,
    added_by INT,
    FOREIGN KEY (case_id) REFERENCES cases(id),
    FOREIGN KEY (added_by) REFERENCES users(id)
);
