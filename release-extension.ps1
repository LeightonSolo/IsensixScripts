param(
    [string]$Version,
    [switch]$NoVersionBump
)

$ErrorActionPreference = 'Stop'

$root = $PSScriptRoot
$extension = Join-Path $root 'chrome-extension'
$manifestPath = Join-Path $extension 'manifest.json'
$buildScript = Join-Path $extension 'build.ps1'

if (-not (Test-Path $manifestPath)) {
    throw "Extension manifest not found: $manifestPath"
}

& $buildScript

$manifestText = [System.IO.File]::ReadAllText($manifestPath)
$versionMatch = [regex]::Match($manifestText, '"version"\s*:\s*"(?<version>[^"\r\n]+)"')
if (-not $versionMatch.Success) {
    throw 'Could not find the extension version in manifest.json.'
}

$currentVersion = $versionMatch.Groups['version'].Value
if ($Version) {
    $newVersion = $Version
} elseif ($NoVersionBump) {
    $newVersion = $currentVersion
} else {
    $parts = $currentVersion.Split('.')
    $invalidParts = @($parts | Where-Object { $_ -notmatch '^\d+$' })
    if ($parts.Count -ne 3 -or $invalidParts.Count -gt 0) {
        throw "Automatic patch bumps require a three-part numeric version. Current version: $currentVersion"
    }

    $newVersion = "{0}.{1}.{2}" -f $parts[0], $parts[1], ([int]$parts[2] + 1)
}

if ($newVersion -notmatch '^\d+(\.\d+){1,3}$') {
    throw "Invalid Chrome extension version: $newVersion"
}

$updatedManifest = $manifestText.Remove($versionMatch.Index, $versionMatch.Length).Insert($versionMatch.Index, ('"version": "{0}"' -f $newVersion))
[System.IO.File]::WriteAllText($manifestPath, $updatedManifest, (New-Object System.Text.UTF8Encoding($false)))

$manifest = $updatedManifest | ConvertFrom-Json
if ($manifest.version -ne $newVersion) {
    throw 'The updated manifest version could not be validated.'
}

$zipPath = Join-Path $root ("isensix-tools-{0}.zip" -f $newVersion)
if (Test-Path $zipPath) {
    Remove-Item $zipPath -Force
}

Compress-Archive -Path (Join-Path $extension '*') -DestinationPath $zipPath -CompressionLevel Optimal

$archive = [System.IO.Compression.ZipFile]::OpenRead($zipPath)
try {
    if (-not ($archive.Entries | Where-Object FullName -eq 'manifest.json')) {
        throw 'The ZIP does not contain manifest.json at its root.'
    }
} finally {
    $archive.Dispose()
}

Write-Host "Created $zipPath"
Write-Host "Extension version: $newVersion"
