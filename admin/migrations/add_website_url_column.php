<?php
// Migration: add website_url column to images table
// Usage: run this script once via browser: http://localhost/lisis/admin/migrations/add_website_url_column.php

ini_set('display_errors', 1);
error_reporting(E_ALL);

require_once __DIR__ . '/../config/database.php';

try {
    $db = new Database();
    $conn = $db->getConnection();

    echo '<h2>Migração: adicionar coluna website_url à tabela images</h2>';

    // Check if images table exists
    $stmt = $conn->query("SHOW TABLES LIKE 'images'");
    if ($stmt->rowCount() === 0) {
        echo '<p style="color:red">Tabela images não encontrada.</p>';
        exit;
    }

    // Check if column exists
    $stmt = $conn->query("SHOW COLUMNS FROM images LIKE 'website_url'");
    if ($stmt->rowCount() > 0) {
        echo '<p style="color:green">A coluna website_url já existe. Nada a fazer.</p>';
    } else {
        $sql = "ALTER TABLE images ADD COLUMN website_url VARCHAR(255) NULL AFTER alt_text";
        $conn->exec($sql);
        echo '<p style="color:green">Coluna website_url adicionada com sucesso.</p>';
    }

    echo '<p>Concluído.</p>';
} catch (PDOException $e) {
    echo '<p style="color:red">Erro: ' . htmlspecialchars($e->getMessage()) . '</p>';
}
