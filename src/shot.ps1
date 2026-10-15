# Служебный скрипт: растровый снимок SVG для быстрой проверки (build/<имя>.png)
param([string]$name, [int]$w = 1280, [int]$h = 800)
$root = Split-Path $PSScriptRoot -Parent
Start-Process 'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe' -Wait -ArgumentList `
  '--headless=new', '--disable-gpu', '--hide-scrollbars', "--user-data-dir=$env:TEMP\byrolaba10-edge",
  "--screenshot=$root\build\$name.png", "--window-size=$w,$h", "file:///$root/svg/$name.svg".Replace('\', '/')
