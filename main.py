import httpx
from fastapi import FastAPI, HTTPException, File, UploadFile
from tensorflow import keras
from keras._tf_keras.keras.models import load_model
from keras._tf_keras.keras.utils import img_to_array
from PIL import Image
import numpy as np
import json
import io

app = FastAPI()

# Paths to the model and labels
model_path = "model/fish2eat_model.h5"
labels_path = "model/labels.json"

# Load the model and labels
model = load_model(model_path)

with open(labels_path, "r") as file:
    class_labels = json.load(file)

# Data API endpoints
fish_api = "https://fish2eat-api2-512565326395.asia-southeast2.run.app/api/fish/"
recipes_api = "https://fish2eat-api2-512565326395.asia-southeast2.run.app/api/recipes/"

@app.get("/fish-info/{fish_name}")
async def get_fish_info(fish_name: str):
    try:
        async with httpx.AsyncClient() as client:
            # Fetch fish data
            fish_response = await client.get(fish_api)
            fish_data = fish_response.json()  # Assume this is a list of fish objects

            # Find the fish by name
            fish = next((f for f in fish_data if f.get("name", "").lower() == fish_name.lower()), None)
            if not fish:
                raise HTTPException(status_code=404, detail=f"Fish '{fish_name}' not found.")
            
            # Fetch recipes data
            recipes_response = await client.get(recipes_api)
            recipes_data = recipes_response.json()  # Assume this is a list of recipe objects

            # Filter recipes that match the fish's ID
            related_recipes = [recipe for recipe in recipes_data if recipe.get("fishId") == fish["id"]]

            # Return combined data
            return {
                "fish": fish,
                "recipes": related_recipes
            }

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")


@app.post("/predict-fish-info/")
async def predict_fish_info(file: UploadFile = File(...)):
    try:
        # Load and preprocess the image
        image_bytes = await file.read()
        img = Image.open(io.BytesIO(image_bytes)).convert('RGB')
        img = img.resize((128, 128))
        img_array = img_to_array(img) / 255.0
        img_array = np.expand_dims(img_array, axis=0)

        # Get the prediction from the ML model
        predictions = model.predict(img_array)
        predicted_class_index = np.argmax(predictions[0])
        predicted_class_label = class_labels[str(predicted_class_index)].strip().lower()
        confidence = predictions[0][predicted_class_index]

        # Fetch fish data
        async with httpx.AsyncClient() as client:
            fish_response = await client.get(fish_api)
            fish_data = fish_response.json()

            # Find the fish by the predicted label (case-insensitive match)
            fish = next(
                (f for f in fish_data if f.get("name", "").strip().lower() == predicted_class_label),
                None
            )

            if not fish:
                raise HTTPException(status_code=404, detail=f"Fish '{predicted_class_label}' not found.")

            # Fetch recipes data
            recipes_response = await client.get(recipes_api)
            recipes_data = recipes_response.json()

            # Filter recipes for the predicted fish ID
            related_recipes = [recipe for recipe in recipes_data if recipe.get("fishId") == fish["id"]]

            return {
                "prediction": {
                    "class": predicted_class_label.capitalize(),
                    "confidence": f"{confidence * 100:.2f}%"
                },
                "fish": fish,
                "recipes": related_recipes
            }

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")
