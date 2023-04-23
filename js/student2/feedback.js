function validateForm() {                           //this is validation part of this webpage. 
    var name = document.forms["feedbackForm"]["name"].value;
    var email = document.forms["feedbackForm"]["email"].value;
    var rating = document.forms["feedbackForm"]["rating"].value;
    
    if (name == "") {                      // this one for name section.
      alert("Name must be filled out");            
      return false;
    }
    if (email == "") {          // this one for email section.
      alert("Email must be filled out");
      return false;
    }
    if (rating == "") {       //this one for rating.
      alert("Please rate your experience");
      return false;
    }
    
    alert("Thank you for your feedback!");            // this one last thank you massege.
    return true;
  }