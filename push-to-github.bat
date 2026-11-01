@echo off
title Push NOVA ESTATES to GitHub
cd /d "%~dp0"
set "PATH=%PATH%;C:\Users\CHIST\AppData\Local\Programs\Git\cmd"

echo ========================================================
echo  NOVA ESTATES - Pushing to GitHub: endlessnax-art/nova-estate-
echo ========================================================
echo.

git push -u origin main

echo.
echo ========================================================
echo  Done! Press any key to exit.
echo ========================================================
pause
