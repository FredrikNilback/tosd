<?php
require_once __DIR__ . '/db.php';

if ($argc < 2) {
    echo "Usage: php create-company.php \"ACCESSCODE\"\n";
    exit(1);
}

$password = $argv[1];

$id = createCompany($password);

echo "Created company with ID: $id\n";