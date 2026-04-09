# Readme

## Setup instructions

### Build docker images 
```bash
docker compose build
```

### Bring containers up
```bash
docker compose up
```

### Visit the frontend
Open your browser and navigate to http://localhost:8080 to access the application.

## Concept

### Motivation

I wanted to build something that had some value. Drawing on previous experiences, I decided
to build something that could provide users with some motivation when they were feeling unmotivated.

Part of the rationale is that this can be done without needing to adhere to any kind of clinical guidelines,
or requiring too much specialist knowledge. Given the nature of LLMs, I felt this was important.

### What it isn't supposed to be

With that in mind, I definitely didn't want to build something intended to replace a doctor or therapist. 

### With more time

I'd get further through the prompting process. The application was intended to follow a process of:

- Introduction: establish the user's name and communication preferences
- Mindset: establish the user's current state of mind so as to provide the best type of support
- Objective: determine what the user wants to achieve
- Obstacles: determine what obstacles the user is facing
- Support: provide a personalised response based on the information provided
