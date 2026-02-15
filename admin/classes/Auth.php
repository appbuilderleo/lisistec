<?php
/**
 * LISIS - Authentication Class
 * Classe para autenticação de utilizadores
 */

require_once __DIR__ . '/../config/database.php';

class Auth {
    private $conn;
    private $table_name = "admin_users";
    
    public function __construct() {
        $database = new Database();
        $this->conn = $database->getConnection();
    }
    
    // Autenticar utilizador
    public function login($username, $password) {
        $query = "SELECT id, username, password, email, full_name, is_active 
                  FROM " . $this->table_name . " 
                  WHERE username = :username AND is_active = 1";
        
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':username', $username);
        $stmt->execute();
        
        $user = $stmt->fetch();
        
        if ($user && password_verify($password, $user['password'])) {
            // Atualizar último login
            $this->updateLastLogin($user['id']);
            
            // Remover password dos dados retornados
            unset($user['password']);
            
            return $user;
        }
        
        return false;
    }
    
    // Atualizar último login
    private function updateLastLogin($user_id) {
        $query = "UPDATE " . $this->table_name . " SET last_login = NOW() WHERE id = :id";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id', $user_id);
        $stmt->execute();
    }
    
    // Verificar se utilizador está autenticado
    public function isAuthenticated() {
        return isset($_SESSION['admin_user']) && !empty($_SESSION['admin_user']);
    }
    
    // Obter utilizador da sessão
    public function getCurrentUser() {
        return $_SESSION['admin_user'] ?? null;
    }
    
    // Fazer logout
    public function logout() {
        unset($_SESSION['admin_user']);
        session_destroy();
    }
    
    // Criar hash da password
    public function hashPassword($password) {
        return password_hash($password, PASSWORD_DEFAULT);
    }
}
?>
