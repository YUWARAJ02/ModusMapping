from fastapi import FastAPI
from transformers import pipeline
from sklearn.cluster import KMeans
import numpy as np

app = FastAPI()

# Load BERT Summarizer
summarizer = pipeline("summarization", model="facebook/bart-large-cnn")

@app.post("/summarize/")
async def summarize_text(text: str):
    summary = summarizer(text, max_length=100, min_length=30, do_sample=False)
    return {"summary": summary[0]['summary_text']}

@app.post("/cluster/")
async def cluster_crimes(data: list):
    kmeans = KMeans(n_clusters=3, random_state=42).fit(np.array(data))
    return {"labels": kmeans.labels_.tolist()}

