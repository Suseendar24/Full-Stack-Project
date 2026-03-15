$port = 5000
Write-Host "Checking if Server is running on port $port..." -ForegroundColor Cyan
$process = Get-NetTCPConnection -LocalPort $port -ErrorAction SilentlyContinue | Select-Object -First 1

if (-not $process) {
    Write-Host "WARNING: Server is not running on port $port. Starting it now..." -ForegroundColor Yellow
    cd server
    Start-Process node -ArgumentList "index.js" -NoNewWindow
    Start-Sleep -Seconds 2
}

Write-Host "Starting ngrok tunnel for port $port..." -ForegroundColor Green
ngrok http $port
