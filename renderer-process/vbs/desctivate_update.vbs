Set objShell = CreateObject("Shell.Application")
objShell.ShellExecute "cmd.exe", "/c reg ADD HKLM\SYSTEM\CurrentControlSet\Services\WaaSMedicSvc /v Start /t REG_DWORD /d 4 /f", "", "runas", 1
