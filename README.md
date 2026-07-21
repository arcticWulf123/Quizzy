# Quizzy
 
A simple web-based quiz app — play ready-made quizzes or build your own from scratch.
 
## Features
 
- **Default Quizzes** — jump straight into pre-made quizzes across different categories
- **Create Your Own** — add custom questions, options, and correct answers, then play them instantly
- **Score & Review** — get your final score plus a full breakdown of what you got right and wrong
## How It Works
 
1. **Home** — pick a default quiz or start building your own
2. **Take Quiz** — answer one question at a time
3. **Results** — see your score and review each answer against the correct one
## Tech Stack
 
- HTML
- SCSS (compiled to CSS)
- JavaScript
## Getting Started
 
```bash
git clone https://github.com/arcticWulf123/quizzy.git
cd quizzy
```
 
If using the SCSS source, compile it first:
```bash
sass styles/main.scss:styles/main.css --watch
```
 
Then open `index.html` in your browser.
 
## Notes
 
- No login or persistent storage — quizzes and scores exist for the current session only
- Custom quizzes are not saved after the session ends