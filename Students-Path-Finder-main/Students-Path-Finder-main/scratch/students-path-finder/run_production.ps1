Write-Host "==================================================================" -ForegroundColor Cyan
Write-Host "  Students Path Finder - Full-Stack Production Environment" -ForegroundColor Green
Write-Host "==================================================================" -ForegroundColor Cyan

$pyCmd = "python"
try {
    $ver = & python --version 2>&1
    if ($LASTEXITCODE -ne 0 -or $ver -notmatch "Python 3") {
        throw "Need fallback"
    }
} catch {
    $fallbackPy = "$env:LOCALAPPDATA\Programs\Python\Python311\python.exe"
    if (Test-Path $fallbackPy) {
        $pyCmd = $fallbackPy
    } else {
        Write-Host "[ERROR] Python was not found in PATH." -ForegroundColor Red
        Exit 1
    }
}

Write-Host "[1/2] Checking requirements..." -ForegroundColor Yellow
& $pyCmd -m pip install -r backend/requirements.txt --quiet

Write-Host "[2/2] Launching server on http://127.0.0.1:5000 ..." -ForegroundColor Green
Start-Process "http://127.0.0.1:5000"
& $pyCmd backend/app.py
