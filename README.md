# Scratch-Off
Scratch Off Lottery Card using SPA website with a Serverless Backend

# Repository Contents
Master branch contains previous version using Python for a GUI based Scratch Off game as well as deprecated site using ElasticJS for sending emails
Cloud Branch contains current version of site hosted on the github pages, accessible only to admins, and users with the proper links to scratch off games
Azure branch contains function that needs to be pushed to Azure Functions to allow the website to generate and track
games, but also send the results of games to a dedicated email.

# To run Python Version Locally
Python function can be run directly with a Python installation, or frozen using Pyinstaller with the command
Pyinstaller /path/to/yourscript.py

# To run HTML Version
HTML version requries index.html,script.js and style.css to function properly. Ensure server or hosting site
contains these files in the directory where server files are stored and run from.

# Limitations
Python version does not have a user friendly method to submit information to generate the game
Python version requires users to have access to run python scripts or executables
HTML version uses third party service(ElasticJS) to send emails, leading to the emails for the game results
being detected as spam.
HTML version generates links that can be modified by savvy users, as they are encrypted/decrypted with Base64,
posing a risk for consumers who dont want user to be able to modify the parameters of scratch off games.
