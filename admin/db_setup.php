<?php
// Enable all error reporting
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

echo "<h1>LISIS Database Setup</h1>";
echo "<p>PHP Version: " . phpversion() . "</p>";

// Include the database configuration
require_once 'config/database.php';

try {
    // Create database instance
    $database = new Database();
    echo "<p style='color:green'>✓ Database class loaded successfully</p>";
    
    // Get connection
    $conn = $database->getConnection();
    echo "<p style='color:green'>✓ Database connection successful</p>";
    
    // Check if admin_users table exists
    $stmt = $conn->prepare("SHOW TABLES LIKE 'admin_users'");
    $stmt->execute();
    $tableExists = $stmt->rowCount() > 0;
    
    if ($tableExists) {
        echo "<p style='color:green'>✓ admin_users table exists</p>";
        
        // Check if admin user exists
        $stmt = $conn->prepare("SELECT * FROM admin_users WHERE username = 'admin'");
        $stmt->execute();
        $adminExists = $stmt->rowCount() > 0;
        
        if ($adminExists) {
            echo "<p style='color:green'>✓ Admin user exists</p>";
        } else {
            echo "<p style='color:orange'>⚠ Admin user does not exist</p>";
            echo "<p>Would you like to create a default admin user? <a href='?create_admin=1'>Create Admin User</a></p>";
        }
    } else {
        echo "<p style='color:red'>✗ admin_users table does not exist</p>";
        echo "<p>Would you like to create the admin_users table? <a href='?create_table=1'>Create Table</a></p>";
    }
    
    // Create admin_users table if requested
    if (isset($_GET['create_table'])) {
        try {
            $sql = "CREATE TABLE IF NOT EXISTS admin_users (
                id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
                username VARCHAR(50) NOT NULL UNIQUE,
                password VARCHAR(255) NOT NULL,
                email VARCHAR(100),
                full_name VARCHAR(100),
                is_active TINYINT(1) NOT NULL DEFAULT 1,
                last_login TIMESTAMP NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )";
            
            $stmt = $conn->prepare($sql);
            $stmt->execute();
            
            echo "<p style='color:green'>✓ admin_users table created successfully</p>";
            echo "<p>Now you can <a href='?create_admin=1'>create an admin user</a></p>";
        } catch (PDOException $e) {
            echo "<p style='color:red'>✗ Error creating table: " . $e->getMessage() . "</p>";
        }
    }
    
    // Create admin user if requested
    if (isset($_GET['create_admin'])) {
        try {
            $username = 'admin';
            $password = password_hash('admin123', PASSWORD_DEFAULT);
            $email = 'admin@lisis.com';
            $fullName = 'Admin User';
            
            // Check if user already exists
            $stmt = $conn->prepare("SELECT * FROM admin_users WHERE username = 'admin'");
            $stmt->execute();
            $adminExists = $stmt->rowCount() > 0;
            
            if ($adminExists) {
                echo "<p style='color:orange'>⚠ Admin user already exists</p>";
            } else {
                $sql = "INSERT INTO admin_users (username, password, email, full_name, is_active) VALUES (:username, :password, :email, :fullName, 1)";
                $stmt = $conn->prepare($sql);
                $stmt->bindParam(':username', $username);
                $stmt->bindParam(':password', $password);
                $stmt->bindParam(':email', $email);
                $stmt->bindParam(':fullName', $fullName);
                $stmt->execute();
                
                echo "<p style='color:green'>✓ Admin user created successfully</p>";
                echo "<p>Username: admin<br>Password: admin123</p>";
            }
        } catch (PDOException $e) {
            echo "<p style='color:red'>✗ Error creating admin user: " . $e->getMessage() . "</p>";
        }
    }
    
    // Check if database exists
    echo "<h2>Database Check</h2>";
    try {
        $stmt = $conn->query("SELECT DATABASE()");
        $dbname = $stmt->fetchColumn();
        echo "<p style='color:green'>✓ Connected to database: " . $dbname . "</p>";
    } catch (PDOException $e) {
        echo "<p style='color:red'>✗ Error checking database: " . $e->getMessage() . "</p>";
    }
    
    // List all tables in the database
    echo "<h2>Database Tables</h2>";
    try {
        $stmt = $conn->query("SHOW TABLES");
        $tables = $stmt->fetchAll(PDO::FETCH_COLUMN);
        
        if (count($tables) > 0) {
            echo "<ul>";
            foreach ($tables as $table) {
                echo "<li>" . $table . "</li>";
            }
            echo "</ul>";
        } else {
            echo "<p>No tables found in the database.</p>";
        }
    } catch (PDOException $e) {
        echo "<p style='color:red'>✗ Error listing tables: " . $e->getMessage() . "</p>";
    }
    
    // Test Auth class
    echo "<h2>Auth Class Test</h2>";
    try {
        require_once 'classes/Auth.php';
        echo "<p style='color:green'>✓ Auth class loaded successfully</p>";
        
        // Create Auth instance
        $auth = new Auth($conn);
        echo "<p style='color:green'>✓ Auth instance created successfully</p>";
        
        // Test login with default credentials (if admin user exists)
        if (isset($_GET['test_login']) && $adminExists) {
            $loginResult = $auth->login('admin', 'admin123');
            if ($loginResult) {
                echo "<p style='color:green'>✓ Login successful with default credentials</p>";
                echo "<p>You can now access the <a href='index.php' target='_blank'>Admin Panel</a></p>";
            } else {
                echo "<p style='color:red'>✗ Login failed with default credentials</p>";
            }
        } else if ($adminExists) {
            echo "<p><a href='?test_login=1'>Test login with default credentials</a></p>";
        }
    } catch (Exception $e) {
        echo "<p style='color:red'>✗ Error with Auth class: " . $e->getMessage() . "</p>";
    }
    
    // Check session functionality
    echo "<h2>Session Check</h2>";
    try {
        if (session_status() == PHP_SESSION_NONE) {
            session_start();
        }
        echo "<p style='color:green'>✓ Session started successfully</p>";
        echo "<p>Session ID: " . session_id() . "</p>";
    } catch (Exception $e) {
        echo "<p style='color:red'>✗ Error starting session: " . $e->getMessage() . "</p>";
    }
    
    // Check if we can access the admin panel directly
    echo "<h2>Admin Panel Access</h2>";
    echo "<p>Try accessing the admin panel directly: <a href='index.php' target='_blank'>Open Admin Panel</a></p>";
    
} catch (Exception $e) {
    echo "<p style='color:red'>✗ Error: " . $e->getMessage() . "</p>";
}
?>
