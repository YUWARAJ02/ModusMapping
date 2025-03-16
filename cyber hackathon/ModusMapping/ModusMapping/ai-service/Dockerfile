# Use Python base image
FROM python:3.10

# Set working directory
WORKDIR /app

# Copy files
COPY requirements.txt .
COPY ai_service.py .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Expose FastAPI port
EXPOSE 8000

# Run FastAPI
CMD ["uvicorn", "ai_service:app", "--host", "0.0.0.0", "--port", "8000"]
