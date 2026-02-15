<?php
/**
 * LISIS - User Management Class
 * Classe para gestão de utilizadores (admin_users)
 */

require_once __DIR__ . '/../config/database.php';

class User {
    private $conn;
    private $table_name = 'admin_users';

    public $id;
    public $username;
    public $email;
    public $full_name;
    public $password; // plain (for create/update), will be hashed before save
    public $is_active;
    public $last_login;

    public function __construct() {
        $database = new Database();
        $this->conn = $database->getConnection();
    }

    // Listar utilizadores (sem password)
    public function getAll() {
        $query = "SELECT id, username, email, full_name, is_active, last_login
                  FROM {$this->table_name}
                  ORDER BY full_name ASC, username ASC";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt->fetchAll();
    }

    // Obter utilizador por ID (sem password)
    public function getById($id) {
        $query = "SELECT id, username, email, full_name, is_active, last_login
                  FROM {$this->table_name}
                  WHERE id = :id";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        $stmt->execute();
        return $stmt->fetch();
    }

    // Verificar se username existe (opcionalmente excluindo um ID)
    public function usernameExists($username, $exclude_id = null) {
        $query = "SELECT id FROM {$this->table_name} WHERE username = :username";
        if ($exclude_id) {
            $query .= " AND id != :exclude_id";
        }
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':username', $username);
        if ($exclude_id) {
            $stmt->bindParam(':exclude_id', $exclude_id, PDO::PARAM_INT);
        }
        $stmt->execute();
        return $stmt->rowCount() > 0;
    }

    // Verificar se email existe (opcionalmente excluindo um ID)
    public function emailExists($email, $exclude_id = null) {
        $query = "SELECT id FROM {$this->table_name} WHERE email = :email";
        if ($exclude_id) {
            $query .= " AND id != :exclude_id";
        }
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':email', $email);
        if ($exclude_id) {
            $stmt->bindParam(':exclude_id', $exclude_id, PDO::PARAM_INT);
        }
        $stmt->execute();
        return $stmt->rowCount() > 0;
    }

    // Criar utilizador
    public function create() {
        $query = "INSERT INTO {$this->table_name}
                 (username, email, full_name, password, is_active)
                 VALUES (:username, :email, :full_name, :password, :is_active)";
        $stmt = $this->conn->prepare($query);

        $hashed = password_hash($this->password, PASSWORD_DEFAULT);

        $stmt->bindParam(':username', $this->username);
        $stmt->bindParam(':email', $this->email);
        $stmt->bindParam(':full_name', $this->full_name);
        $stmt->bindParam(':password', $hashed);
        $stmt->bindParam(':is_active', $this->is_active, PDO::PARAM_INT);

        if ($stmt->execute()) {
            return $this->conn->lastInsertId();
        }
        return false;
    }

    // Atualizar utilizador (opcionalmente alterar password)
    public function update() {
        $set_password = !empty($this->password);
        $query = "UPDATE {$this->table_name}
                  SET username = :username,
                      email = :email,
                      full_name = :full_name,
                      is_active = :is_active";
        if ($set_password) {
            $query .= ", password = :password";
        }
        $query .= " WHERE id = :id";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':username', $this->username);
        $stmt->bindParam(':email', $this->email);
        $stmt->bindParam(':full_name', $this->full_name);
        $stmt->bindParam(':is_active', $this->is_active, PDO::PARAM_INT);
        $stmt->bindParam(':id', $this->id, PDO::PARAM_INT);

        if ($set_password) {
            $hashed = password_hash($this->password, PASSWORD_DEFAULT);
            $stmt->bindParam(':password', $hashed);
        }

        return $stmt->execute();
    }

    // Eliminar utilizador
    public function delete() {
        $query = "DELETE FROM {$this->table_name} WHERE id = :id";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id', $this->id, PDO::PARAM_INT);
        return $stmt->execute();
    }
}
?>
