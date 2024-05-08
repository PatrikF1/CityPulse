<template>
    <footer class="footer">
      <div class="container">
        <div class="footer-content">
          <div class="footer-column about-us">
            <h3 class="prvi">About Us</h3>
            <p class="prvi">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          </div>
          <div class="footer-column contact-us">
            <h3 class="prvi">Contact Us</h3>
            <p class="prvi">Email: info@example.com</p>
            <p class="prvi">Phone: +123456789</p>
            <p class="prvi">Address: 123 Street, City, Country</p>
          </div>
        </div>
      </div>
    </footer>
  </template>
  
  <script>
  export default {
    
  }
  </script>
  
  <style>

  .prvi{
    color: #BBE1FA;
  }

  .footer {
    background-color: #1B262C;
    color: #BBE1FA;
    padding: 15px 0; 
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
  }
  
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  }
  
  .footer-content {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
  
  .footer-column {
    flex: 1;
    margin-bottom: 20px;
  }
  
  .footer-column h3 {
    font-size: 20px;
    margin-bottom: 10px;
  }
  
  .footer-column p {
    margin: 5px 0;
  }
  
  .footer-column ul {
    list-style: none;
    padding: 0;
  }
  
  .footer-column ul li {
    margin-bottom: 10px;
  }
  
  .footer-column ul li a {
    color: #BBE1FA;
    text-decoration: none;
  }
  
  .footer-column ul li a:hover {
    color: #3282B8;
  }
  
  .about-us {
    text-align: left; 
  }
  
  .contact-us {
    text-align: right; 
  }
  
  @media (max-width: 768px) {
    .footer-column {
      flex: 100%;
      text-align: center;
    }
  }


  </style>
  