USE modus_mapping;

-- Insert Roles
INSERT INTO roles (role_name) VALUES 
('viewer'), ('editor'), ('admin');

-- Insert Users (Police Officers)
INSERT INTO users (name, email, password, phone_number, role_id) VALUES
('Inspector Rajesh Kumar', 'rajesh.kumar@tnpolice.gov.in', 'password123', '9876543210', 3),
('Sub-Inspector Priya', 'priya@tnpolice.gov.in', 'password123', '8765432109', 2),
('Officer Suresh', 'suresh@tnpolice.gov.in', 'password123', '7654321098', 1);

-- Insert Officers
INSERT INTO officers (user_id, badge_number, department) VALUES
(1, 'TN12345', 'Chennai Crime Branch'),
(2, 'TN56789', 'Madurai Special Task Force'),
(3, 'TN98765', 'Coimbatore Law Enforcement');

-- Insert Criminals
INSERT INTO criminals (name, alias, dob, phone_number, address, criminal_history) VALUES
('Karthik Subramanian', 'Black Tiger', '1985-06-15', '9555544433', 'T. Nagar, Chennai', 'Robbery, Extortion'),
('Ravi Chandran', 'Snake Ravi', '1978-09-22', '9443322110', 'Anna Nagar, Madurai', 'Murder, Kidnapping'),
('Manikandan', 'Tech Mani', '1990-03-11', '9888877665', 'RS Puram, Coimbatore', 'Cyber Fraud, Identity Theft');

-- Insert Cases
INSERT INTO cases (case_number, title, description, status, officer_id, year, month) VALUES
('TN2024001', 'Bank Robbery - Chennai', 'A high-profile bank robbery in T. Nagar.', 'open', 1, 2024, 3),
('TN2024002', 'Kidnapping in Madurai', 'A businessman’s child was kidnapped.', 'closed', 2, 2024, 2),
('TN2024003', 'Cyber Fraud in Coimbatore', 'Massive credit card fraud operation uncovered.', 'open', 3, 2024, 1);

-- Insert Crimes (Linked to Cases)
INSERT INTO crimes (case_id, crime_date, crime_type, location, description) VALUES
(1, '2024-03-05', 'Robbery', 'T. Nagar, Chennai', 'Five masked men robbed the State Bank.'),
(2, '2024-02-15', 'Kidnapping', 'Madurai Central', 'A child was kidnapped near a school.'),
(3, '2024-01-20', 'Cyber Crime', 'Coimbatore IT Hub', 'A large-scale online banking scam.');

-- Link Crimes to Criminals
INSERT INTO crime_criminal (crime_id, criminal_id) VALUES
(1, 1), -- Karthik involved in Chennai bank robbery
(2, 2), -- Ravi Chandran involved in kidnapping
(3, 3); -- Manikandan involved in cyber fraud

-- Insert Evidence (Mapped to Cases)
INSERT INTO evidence (case_id, evidence_type, description, added_by) VALUES
(1, 'CCTV Footage', 'Security footage showing five masked robbers.', 1),
(2, 'Witness Testimony', 'Eyewitness saw a white SUV near the crime scene.', 2),
(3, 'Digital Logs', 'Transaction logs showing fraudulent transfers.', 3);
