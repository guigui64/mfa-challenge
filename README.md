# MFA Challenge

## Instructions

Please build a frontend and backend for the following user journeys:

The user should receive an email invitation to setup a password and MFA (mandatory).
At the end of which he should be logged in to a Helloworld type dashboard

Also make the user journey for login to the Helloworld type dashboard

## Tech

Fresh for the Frontend.

Supabase for the Backend.

## Usage

### Backend

Create a project in [supabase](https://supabase.com/dashboard).

Add the project URL and API KEY to a .env file (see .env.example)

### Frontend

Make sure to install [Deno](https://deno.land/manual/getting_started/installation).

Then start the project:

```
deno task start
```

This will watch the project directory and restart as necessary.

## User journeys

### Invitation

The user will receive an invitation email with this URL: http://localhost:8000/sign-up?email=test@example.com.

He will first register his email (already filled for him) with a password and be redirected to a page with a QR code to scan to enroll with his MFA app, enter the code and get redirected to the dashboard.

### Sign in

A user already registered will be able to sign in with his email and password. He will be asked to enter a new code from his MFA app before being redirected to the dashboard.

### State machine

![state machine](https://github.com/guigui64/mfa-challenge/blob/main/sm.png?raw=true)
