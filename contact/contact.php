<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Sanitize inputs
    $name = htmlspecialchars($_POST["name"]);
    $lastname  = htmlspecialchars($_POST["lastname"]);
    $email     = filter_var($_POST["email"], FILTER_SANITIZE_EMAIL);
    $business  = htmlspecialchars($_POST["business"]);
    $phone     = htmlspecialchars($_POST["phone"]);
    $country   = htmlspecialchars($_POST["country"]);
    $role   = htmlspecialchars($_POST["role"]);
    $message   = htmlspecialchars($_POST["message"]);

    // Email settings
    $to = "webdevtag@email.com"; // <-- change to your email
    $subject = "New Contact Form Submission";
    $body = "You have received a new message:\n\n"
          . "First Name: $name\n"
          . "Last Name: $lastname\n"
          . "Email: $email\n"
           . "Business Name: $business\n"
          . "Phone: $phone\n"
          . "Country: $country\n"
          . "Job Role: $role\n"
          . "Message:\n$message";

    $headers = "From: no-reply@cannaleaf.org\r\n";
    $headers .= "Reply-To: $email\r\n";

    // Send email
    if (mail($to, $subject, $body, $headers)) {
        header("Location: index.html");
        exit;
    } else {
        echo "Sorry, something went wrong. Please try again.";
    }
}
?>
  