from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.data_fetcher import fetch_all_data

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # for dev; later: ["http://localhost:5173"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "Backend is running ??"}

@app.get("/channels")
def get_channels():
    return fetch_all_data()
