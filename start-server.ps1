$port = 5000
$process = Get-NetTCPConnection -LocalPort $port -ErrorAction SilentlyContinue | Select-Object -First 1

if ($process) {
    Write-Host "Server is already running on port $port (Process ID: $($process.OwningProcess))" -ForegroundColor Cyan
} else {
    Write-Host "Starting Server..." -ForegroundColor Green
    cd server
    Start-Process node -ArgumentList "index.js" -NoNewWindow
    Write-Host "Server started! Checking health..." -ForegroundColor Yellow
    Start-Sleep -Seconds 2
    try {
        $response = Invoke-WebRequest -Uri "http://localhost:5000/api/health" -UseBasicParsing
        if ($response.StatusCode -eq 200) {
            Write-Host "SUCCESS: Server is up and healthy!" -ForegroundColor Green
        }
    } catch {
        Write-Host "WARNING: Server started but health check failed. Check server/index.js logs." -ForegroundColor Red
    }
}

Write-Host "`nChecking MongoDB..." -ForegroundColor Magenta
$mongo = Get-Service -Name MongoDB -ErrorAction SilentlyContinue
if ($mongo.Status -eq 'Running') {
    Write-Host "SUCCESS: MongoDB is running." -ForegroundColor Green
} else {
    Write-Host "CRITICAL: MongoDB is NOT running. Please start the MongoDB service." -ForegroundColor Red
}
