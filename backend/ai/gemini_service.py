from django.conf import settings
from google import genai
from google.genai import types


MODEL_NAME = "gemini-2.5-flash"


def generate_fitness_plan(profile, macros):
    """
    Returns a plain-text AI-generated fitness plan.
    """

    client = genai.Client(api_key=settings.GEMINI_API_KEY)

    prompt = f"""
You are an AI fitness coach.

Based on the user profile below, generate:
1. A high-level workout plan (no exercises, no sets, no reps)
2. A high-level diet approach
3. A short explanation of why this plan fits the user

Rules:
- Do NOT calculate calories or macros
- Do NOT mention numbers unless necessary
- Keep the response concise and readable
- Use clear section headings
- Do NOT include medical advice or disclaimers

User Profile:
Age: {profile.age}
Sex: {profile.sex}
Height: {profile.height_cm} cm
Weight: {profile.weight_kg} kg
Goal: {profile.goal}
Activity Level: {profile.activity_level}

Calories: {macros["calories"]}
Protein: {macros["protein"]} g
Carbs: {macros["carbs"]} g
Fats: {macros["fats"]} g
"""

    response = client.models.generate_content(
        model=MODEL_NAME,
        contents=prompt,
        config=types.GenerateContentConfig(
            temperature=0.4,
            max_output_tokens=500,
        ),
    )

    return response.text.strip()
