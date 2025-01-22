# Repository: https://github.com/nisyabqanita/studybuddy
# Use an official OpenJDK runtime as a base image
FROM openjdk:17-jdk-slim

# Set the working directory in the container
WORKDIR /app

# Copy the built jar file into the container
COPY target/studybuddy-*.jar app.jar

# Expose the port your app runs on
EXPOSE 8080

# Set environment variables for database connection
ENV DB_HOST=localhost \
    DB_PORT=3306 \
    DB_USER=student \
    DB_PASSWORD=0000000001

# Run the Spring Boot application
ENTRYPOINT ["java", "-jar", "app.jar"]