@echo off
SETLOCAL ENABLEDELAYEDEXPANSION

set REPO=https://github.com/AbrahamSantiago/Backend-XinapX.git
set BRANCH=AddDocker
set FOLDER=Backend-XinapX
set IMAGE_NAME=backend-xinapx
set CONTAINER_NAME=backend-xinapx-container
set PORT=8080
set MODULE=supabase

echo === 📁 Verificando si ya existe la carpeta del proyecto ===
IF NOT EXIST "%FOLDER%" (
    echo === ⬇️ Clonando rama %BRANCH% desde %REPO% ===
    git clone -b %BRANCH% %REPO%
) ELSE (
    echo === 📁 La carpeta %FOLDER% ya existe, no se clona nuevamente ===
)

cd %FOLDER%

echo === 🔍 Verificando si '%MODULE%' está en requirements.txt...
findstr /I /C:"%MODULE%" requirements.txt >nul
IF %ERRORLEVEL% NEQ 0 (
    echo ➕ Agregando '%MODULE%' a requirements.txt
    echo %MODULE%>>requirements.txt
) ELSE (
    echo ✅ '%MODULE%' ya está en requirements.txt
)

echo === 🧼 Eliminando contenedor anterior si existe ===
docker rm -f %CONTAINER_NAME% 2>NUL

echo === 🔨 Construyendo imagen Docker: %IMAGE_NAME% ===
docker build -t %IMAGE_NAME% .

echo === 🚀 Ejecutando contenedor en el puerto %PORT% ===
docker run -d --name %CONTAINER_NAME% -p %PORT%:80 %IMAGE_NAME%

echo === ✅ Tu backend está corriendo en: http://localhost:%PORT% ===
echo === 🌐 Documentación Swagger en: http://localhost:%PORT%/docs ===

ENDLOCAL
pause
