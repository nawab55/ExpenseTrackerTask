async function signup(e) {
    try {
        e.preventDefault(); // Prevent the form from submitting the traditional way

        // Get form elements
        var username = document.getElementById('username').value;
        var email = document.getElementById('email').value;
        var password = document.getElementById('password').value;

        // You can perform client-side validation here if needed

        // Prepare data for the server
        var signupDetails = {
            username: username,
            email: email,
            password: password
        };

        // Make an AJAX request using Axios
        const response = await axios.post('https://example.com/api/signup', signupDetails)
            if(response.status === 201){
                window.location.href = "../Login/login.html";  // change the page on succesfull login
            } else{
                throw new Error('Failed to login');
            }
            
    } catch (err) {
        document.body.innerHTML += `<div style="color:red;">${err}</div>`
        console.error('An unexpected error occurred:', err);
        // You can handle unexpected errors here, e.g., show a generic error message to the user
    }
}
