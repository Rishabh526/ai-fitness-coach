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

        Create a clear, complete, HIGH-LEVEL fitness plan for the user below.

        Rules:
        - Do NOT calculate calories or macros.
        - Do NOT give medical advice.
        - Do NOT include exercises, sets, or reps.
        - Keep explanations concise but complete.
        - Use headings and bullet points.
        - Finish all sections fully.

        User profile:
        Age: {profile.age}
        Sex: {profile.sex}
        Height: {profile.height_cm} cm
        Weight: {profile.weight_kg} kg
        Goal: {profile.goal}
        Activity level: {profile.activity_level}

        Calories: {macros["calories"]}
        Protein: {macros["protein"]} g
        Carbs: {macros["carbs"]} g
        Fats: {macros["fats"]} g

        Include these sections:
        1. High-Level Workout Plan
        2. Weekly Training Structure
        3. Diet Approach (food categories only)
        4. Why This Plan Works
        """


    response = client.models.generate_content(
        model=MODEL_NAME,
        contents=prompt,
        config=types.GenerateContentConfig(
            temperature=0.4,
            max_output_tokens=1200,
        ),
    )

    text = response.text.strip()

    if len(text) < 120:
        raise ValueError("AI response too short")

    return text
