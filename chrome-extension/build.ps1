$ErrorActionPreference = 'Stop'

$root = Split-Path -Parent $PSScriptRoot
$sourceFiles = Get-ChildItem -Path $root -Filter '*.js' -File
$destination = Join-Path $PSScriptRoot 'scripts'

New-Item -ItemType Directory -Path $destination -Force | Out-Null

foreach ($sourceFile in $sourceFiles) {
    $content = [System.IO.File]::ReadAllText($sourceFile.FullName, [System.Text.Encoding]::UTF8)
    $wrapped = "(async function () {`r`n$content`r`n})();`r`n"
    [System.IO.File]::WriteAllText((Join-Path $destination $sourceFile.Name), $wrapped, (New-Object System.Text.UTF8Encoding($false)))
}

Write-Host "Built $($sourceFiles.Count) extension scripts in $destination"
