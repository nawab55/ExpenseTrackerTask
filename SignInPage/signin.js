async function submitForm() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    var signinDetails = {
        email: email,
        password: password
    };

    const apiUrl = 'http://localhost:3000/user/login';
    
    try {
        // Make a request to the backend API using Axios with async/await
        const response = await axios.post(apiUrl, signinDetails);

        if(response.status === 201){
            console.log(response.data);
                 // Successful login
            alert('User logged in successfully!');
        } else{
            throw new Error('Failed to login');
        }
        

        // const data = response.data;

        // if (data.success) {
        //     // Successful login
        //     alert('User logged in successfully!');
        // } else {
        //     // Handle incorrect email or password
        //     if (data.error === 'email') {
        //         alert('Email is incorrect');
        //     } else if (data.error === 'password') {
        //         alert('Password is incorrect');
        //     } else {
        //         alert('Login failed. Please try again.');
        //     }
        // }
    } catch (err) {
        document.body.innerHTML += `<div style="color:red;">${err}</div>`
        console.error('An unexpected error occurred:', err);
    }

}