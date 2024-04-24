<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $name = trim($_POST["name"]);
  $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
  $message = trim($_POST["message"]);
  $captcha = $_POST["g-recaptcha-response"];
  
  // Check that all required fields are filled out
  if (empty($name) || empty($email) || empty($message)) {
    http_response_code(400);
    echo "Please fill out all required fields.";
    exit;
  }
  
  // Check that the email address is valid
  if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo "Please enter a valid email address.";
    exit;
  }
  
  // Verify the reCAPTCHA response
  $url = 'https://www.google.com/recaptcha/api/siteverify';
  $data = array(
    'secret' => '6LcZ2pckAAAAALYjZYw60vsismCd3xzOq4edJhGP',
    'response' => $captcha
  );
  $options = array(
    'http' => array (
      'method' => 'POST',
      'content' => http_build_query($data),
      'header' => "Content-Type: application/x-www-form-urlencoded\r\n"
    )
  );
  $context = stream_context_create($options);
  $result = file_get_contents($url, false, $context);
  $json = json_decode($result);
  
  if ($json->success == false) {
    http_response_code(400);
    echo "Please complete the reCAPTCHA.";
    exit;
  }
  
  // Format the email message
  $to = "info@cthulhudivers.com";
  $subject = "New message from Cthulhu Divers website";
  $body = "Name: $name\nEmail: $email\nMessage:\n$message";
  
  // Send the email
  if (mail($to, $subject, $body)) {
    http_response_code(200);
    echo "Thank you for your message! We will be in touch soon.";
  } else {
    http_response_code(500);
    echo "Oops! Something went wrong and we couldn't send your message.";
  }
} else {
  http_response_code(403);
  echo "There was a problem with your submission. Please try again.";
}
?>