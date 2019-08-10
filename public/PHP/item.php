<?php
$servername = "localhost";
$username = "root";
// your password:
$password = "";
//your database name:
$db = "screensite_database";
$type = $_POST['type'];
$frame = $_POST['frame'];
$color = $_POST['color'];
$installation = $_POST['installation'];
$quantity = intval($_POST['quantity']);
$price = floatval(str_replace('$','', $_POST['price']));
$discount_price = floatval(str_replace('$', '', $_POST['discount_price']));
$conn = new mysqli($servername, $username, $password, $db);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
$sql = "SELECT MAX(id) from orders";
$result = mysqli_query($conn, $sql) OR die(mysqli_error($conn));
$order_id = intval(mysqli_fetch_assoc($result)["MAX(id)"]);
$sql = "INSERT INTO items (order_id, type, frame, color, installation, quantity, price, discount_price)
        VALUES ('$order_id', '$type', '$frame', '$color', '$installation', '$quantity', '$price', '$discount_price')";
mysqli_query($conn, $sql) OR die(mysqli_error($conn));
mysqli_close($conn);