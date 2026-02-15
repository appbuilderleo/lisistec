<?php
// Reset admin password script
ini_set('display_errors', 1);
error_reporting(E_ALL);

echo "<h1>Reset Admin Password</h1>";

require_once 'config/database.php';
require_once 'classes/Auth.php';

try {
    $database = new Database();
    $conn = $database->getConnection();
    
    $auth = new Auth();
    $username = 'admin';
    $password = 'admin123';
    
    echo "<p>Resetting password for user: $username</p>";
    
    // Hash the password
    $hashedPassword = $auth->hashPassword($password);
    echo "<p>New password hash: $hashedPassword</p>";
    
    // Update the password in database and ensure user is active
    $sql = "UPDATE admin_users SET password = :password, is_active = 1 WHERE username = :username";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':password', $hashedPassword);
    $stmt->bindParam(':username', $username);
    $stmt->execute();
    
    if ($stmt->rowCount() > 0) {
        echo "<p style='color:green'>✓ Password updated successfully</p>";
        
        // Test the login
        $user = $auth->login($username, $password);
        if ($user) {
            echo "<p style='color:green'>✓ Login test successful</p>";
            echo "<pre>" . print_r($user, true) . "</pre>";
        } else {
            echo "<p style='color:red'>✗ Login test failed</p>";
        }
    } else {
        echo "<p style='color:orange'>⚠ No rows updated. User might not exist.</p>";
        
        // Create user if not exists
        $sql = "INSERT INTO admin_users (username, password, email, full_name, is_active) 
                VALUES (:username, :password, :email, :fullName, 1)";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':username', $username);
        $stmt->bindParam(':password', $hashedPassword);
        $stmt->bindValue(':email', 'admin@lisis.com');
        $stmt->bindValue(':fullName', 'Admin User');
        $stmt->execute();
        
        if ($stmt->rowCount() > 0) {
            echo "<p style='color:green'>✓ User created successfully</p>";
        } else {
            echo "<p style='color:red'>✗ Failed to create user</p>";
        }
    }
    
} catch (Exception $e) {
    echo "<p style='color:red'>✗ Error: " . $e->getMessage() . "</p>";
}

echo "<hr>";
echo "<p><a href='login_test.php'>Test Login</a></p>";
echo "<p><a href='index.php'>Go to Admin Panel</a></p>";
?>
