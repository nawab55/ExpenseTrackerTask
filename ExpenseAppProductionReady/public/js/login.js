async function login(e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    var loginDetails = {
        email: email,
        password: password
    };

    const apiUrl = 'http://localhost:3000/user/login';
    
    try {
        // Make a request to the backend API using Axios with async/await
        const response = await axios.post(apiUrl, loginDetails);

        if(response.status === 200){
            console.log(response.data);
            // Successful login
            alert(response.data.message);
            localStorage.setItem('token', response.data.token);

            window.location.href ="../views/index.html";  // change the page on succesfull login
        } else{
            throw new Error('Failed to login');
        }
        
    } catch (err) {
        console.log(JSON.stringify(err));
        document.body.innerHTML += `<div style="color:red;">${err.message}</div>`
        
    }

}