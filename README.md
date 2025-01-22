# **Study Buddy**

Study Buddy is a comprehensive web application designed to help students effectively manage their study resources, subjects, and progress. The application is built with a Spring Boot backend and a modularized frontend for ease of navigation and extensibility.

## **Features**

### **1. Subject Management**
- Add, view, edit, and delete subjects.
- Search for subjects by name.

### **2. Resource Management**
- Add, view, edit, and delete resources related to each subject.
- Categorize resources by type (e.g., books, videos, notes).
- Search for resources by keyword.

### **3. Study Progress Tracker**
- Add, view, edit, and delete study progress logs for specific subjects.
- Filter progress logs by subject.
- Track study milestones with detailed descriptions and dates.

---

## **Tech Stack**

### **Backend**
- **Framework**: Spring Boot
- **Database**: MySQL
- **Build Tool**: Maven
- **ORM**: Hibernate (JPA)

### **Frontend**
- **HTML/CSS/JavaScript**: Modularized for scalability.
- **Styling**: Custom CSS for clean and responsive design.

---

## **How to Run the Application**

### **Prerequisites**
- Java Development Kit (JDK) 17 or higher.
- MySQL database.
- Maven build tool.

### **Setup**

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/study-buddy.git
   ```

2. Navigate to the project directory:
   ```bash
   cd study-buddy
   ```

3. Set up the MySQL database:
   - Create a database named `studybuddy`.
   - Update the database credentials in `application.properties`:
     ```properties
     spring.datasource.url=jdbc:mysql://localhost:3306/studybuddy
     spring.datasource.username=your_username
     spring.datasource.password=your_password
     ```

4. Build the project:
   ```bash
   mvn clean install
   ```

5. Run the application:
   ```bash
   mvn spring-boot:run
   ```

6. Open the frontend:
   - Navigate to `static/pages/` and open the appropriate HTML files (e.g., `dashboard.html`) in your browser.

---

