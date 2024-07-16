# main.py
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

app = FastAPI()

class LoginRequest(BaseModel):
    username: str
    password: str

@app.post("/api/v1/login/access-token")
def login(request: LoginRequest):
    if request.username == "whit@infersoft.com" and request.password == "password":
        return {"access_token": "your_token", "token_type": "bearer"}
    else:
        raise HTTPException(status_code=400, detail="Invalid credentials")
