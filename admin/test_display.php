<?php
require_once 'config/session.php';
session_start();
require_once 'classes/Auth.php';

$auth = new Auth();

// Force login for testing
$user = $auth->login('admin', 'admin123');
if ($user) {
    $_SESSION['admin_user'] = $user;
}

$isLoggedIn = $auth->isAuthenticated();
?>
<!DOCTYPE html>
<html>
<head>
    <title>Test Display</title>
    <style>
        .hidden { display: none !important; }
        .modal.active { display: block; background: rgba(0,0,0,0.5); }
        .dashboard { background: #f0f0f0; padding: 20px; }
    </style>
</head>
<body>
    <h1>Test Display</h1>
    <p>isLoggedIn: <?php echo $isLoggedIn ? 'TRUE' : 'FALSE'; ?></p>
    
    <div id="loginModal" class="modal <?php echo !$isLoggedIn ? 'active' : ''; ?>" style="padding: 20px;">
        <h2>LOGIN MODAL</h2>
        <p>This should be visible when NOT logged in</p>
        <p>Classes: <?php echo !$isLoggedIn ? 'active' : 'none'; ?></p>
    </div>
    
    <div id="adminDashboard" class="dashboard <?php echo !$isLoggedIn ? 'hidden' : ''; ?>" style="min-height: 200px;">
        <h2>ADMIN DASHBOARD</h2>
        <p>This should be visible when logged in</p>
        <p>Classes: <?php echo !$isLoggedIn ? 'hidden' : 'none'; ?></p>
        <p>User: <?php echo $auth->getCurrentUser()['username'] ?? 'N/A'; ?></p>
    </div>
    
    <hr>
    <h3>Debug Info</h3>
    <pre>
Session ID: <?php echo session_id(); ?>

Session Content:
<?php print_r($_SESSION); ?>

isAuthenticated(): <?php echo $auth->isAuthenticated() ? 'YES' : 'NO'; ?>

Current User:
<?php print_r($auth->getCurrentUser()); ?>
    </pre>
    
    <script>
        console.log('=== TEST DISPLAY ===');
        console.log('isLoggedIn (PHP):', <?php echo $isLoggedIn ? 'true' : 'false'; ?>);
        
        const loginModal = document.getElementById('loginModal');
        const adminDashboard = document.getElementById('adminDashboard');
        
        console.log('loginModal:', loginModal);
        console.log('loginModal.className:', loginModal.className);
        console.log('loginModal computed display:', window.getComputedStyle(loginModal).display);
        
        console.log('adminDashboard:', adminDashboard);
        console.log('adminDashboard.className:', adminDashboard.className);
        console.log('adminDashboard computed display:', window.getComputedStyle(adminDashboard).display);
        console.log('adminDashboard has hidden class:', adminDashboard.classList.contains('hidden'));
    </script>
</body>
</html>
