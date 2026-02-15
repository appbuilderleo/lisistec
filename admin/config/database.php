<?php
/**
 * LISIS - Database Configuration
 * Configuração da base de dados para desenvolvimento e produção
 */

class Database {
    private $host;
    private $db_name;
    private $username;
    private $password;
    private $conn;
    
    public function __construct() {
        // Detectar ambiente (desenvolvimento vs produção)
        $this->setEnvironment();
    }
    
    private function setEnvironment() {
        // Verificar se está em ambiente de desenvolvimento (XAMPP)
        if ($_SERVER['SERVER_NAME'] === 'localhost' || $_SERVER['SERVER_NAME'] === '127.0.0.1') {
            // Configuração de desenvolvimento (XAMPP)
            $this->host = 'localhost';
            $this->db_name = 'lisiseeh_lisis';
            $this->username = 'root';
            $this->password = '';
        } else {
            // Configuração de produção
            $this->host = 'localhost';
            $this->db_name = 'lisiseeh_lisis';
            $this->username = 'lisiseeh_lisis';
            $this->password = '844647599leo';
        }
    }
    
    public function getConnection() {
        $this->conn = null;
        
        try {
            $this->conn = new PDO(
                "mysql:host=" . $this->host . ";dbname=" . $this->db_name . ";charset=utf8mb4",
                $this->username,
                $this->password,
                array(
                    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                    PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8mb4"
                )
            );
        } catch(PDOException $exception) {
            // Log errors to file in production
            if ($_SERVER['SERVER_NAME'] !== 'localhost' && $_SERVER['SERVER_NAME'] !== '127.0.0.1') {
                error_log("Database connection error: " . $exception->getMessage(), 3, "../logs/db_errors.log");
                throw new Exception("Erro na conexão com a base de dados");
            } else {
                // Show detailed error in development
                throw new Exception("Database connection error: " . $exception->getMessage());
            }
        }
        
        return $this->conn;
    }
    
    public function closeConnection() {
        $this->conn = null;
    }
}
?>
