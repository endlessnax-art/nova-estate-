<#
.SYNOPSIS
  Robust local HTTP web server for NOVA ESTATES using built-in PowerShell .NET HttpListener.
#>

$port = 8080
$folder = $PSScriptRoot
if (-not $folder -or -not (Test-Path $folder)) {
    $folder = "C:\Users\CHIST\.gemini\antigravity\scratch\nova-estates\NOVA_ESTATES"
}

$listener = New-Object System.Net.HttpListener
$prefix = "http://localhost:$port/"
$listener.Prefixes.Add($prefix)

try {
    $listener.Start()
    Write-Host "==========================================================" -ForegroundColor Cyan
    Write-Host " NOVA ESTATES Local Web Server is Running!" -ForegroundColor Green
    Write-Host " URL: $prefix" -ForegroundColor Yellow
    Write-Host " Folder: $folder" -ForegroundColor White
    Write-Host " Press Ctrl+C to stop the server." -ForegroundColor Gray
    Write-Host "==========================================================" -ForegroundColor Cyan

    while ($listener.IsListening) {
        try {
            $context = $listener.GetContext()
            $request = $context.Request
            $response = $context.Response

            $localPath = $request.Url.LocalPath.TrimStart('/')
            if ([string]::IsNullOrWhiteSpace($localPath) -or $localPath -eq "/") {
                $localPath = "index.html"
            }

            # Strip query string or hash if present
            if ($localPath.Contains("?")) {
                $localPath = $localPath.Substring(0, $localPath.IndexOf("?"))
            }

            $filePath = Join-Path $folder $localPath

            if (Test-Path $filePath -PathType Leaf) {
                $ext = [System.IO.Path]::GetExtension($filePath).ToLower()
                $mime = switch ($ext) {
                    ".html" { "text/html; charset=utf-8" }
                    ".htm"  { "text/html; charset=utf-8" }
                    ".css"  { "text/css; charset=utf-8" }
                    ".js"   { "application/javascript; charset=utf-8" }
                    ".json" { "application/json; charset=utf-8" }
                    ".png"  { "image/png" }
                    ".jpg"  { "image/jpeg" }
                    ".jpeg" { "image/jpeg" }
                    ".svg"  { "image/svg+xml" }
                    ".ico"  { "image/x-icon" }
                    ".txt"  { "text/plain; charset=utf-8" }
                    default { "application/octet-stream" }
                }

                $bytes = [System.IO.File]::ReadAllBytes($filePath)
                $response.ContentType = $mime
                $response.ContentLength64 = $bytes.Length
                $response.StatusCode = 200
                $response.OutputStream.Write($bytes, 0, $bytes.Length)
                $response.OutputStream.Flush()
                $response.OutputStream.Close()
                $response.Close()
            } else {
                $response.StatusCode = 404
                $errBytes = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found: $localPath")
                $response.ContentType = "text/plain; charset=utf-8"
                $response.ContentLength64 = $errBytes.Length
                $response.OutputStream.Write($errBytes, 0, $errBytes.Length)
                $response.OutputStream.Flush()
                $response.OutputStream.Close()
                $response.Close()
            }
        } catch {
            # Catch transient network / client abort errors
        }
    }
} catch {
    Write-Host "Server startup error: $_" -ForegroundColor Red
} finally {
    if ($listener.IsListening) {
        $listener.Stop()
    }
}
