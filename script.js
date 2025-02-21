


let username = localStorage.getItem("username");

if (window.location.pathname !== "/list.html") {
    document.getElementById(`submitName`).onclick = function(){
        let username = document.getElementById(`name`).value;
        let useremail = document.getElementById(`email`).value;
        localStorage.setItem("username", username); // Save username in local storage
        localStorage.setItem("useremail", useremail); // save email/info to local storage
        window.location = `list.html`; // Navigate to list.html
    }
}

if (window.location.pathname == "/list.html"){
    document.getElementById(`logOut`).onclick = function(){
        window.location = `index.html`;
    }
    
}





// Automatically display the username when the page loads
window.onload = function() {
    let username = localStorage.getItem("username"); // Retrieve the stored username
    let useremail = localStorage.getItem("useremail"); // Retrieve the stored username
    if (username) {
        if (window.location.pathname == "/list.html"){
            document.getElementById(`topPageNameDisplay`).textContent = `${username}`;
            document.getElementById(`topPageInfoDisplay`).textContent = ` - ` + `${useremail}`;
            createUser(username, useremail);
            console.log(`Username loaded: ${username}`);
            console.log(`Email loaded: ${useremail}`);
        }

    } else {

        console.log("No username found.");
    }
};






if (window.location.pathname == "/list.html"){
    fetch("api/users")
    .then(response => response.json())
    .then(data => {
        let list = document.getElementById("userList");
        data.forEach(user => {
            let li = document.createElement("li");
            li.textContent = user.name + " - " + user.email;
            
            list.appendChild(li);
        });
    })
    .catch(error => console.error("Error fetching data:", error));
    
    
    function deleteUserByName(username) {
        fetch(`api/users/name/${username}`, {
            method: 'DELETE'
        })
    }

    function createUser(name, email) {
        fetch("api/users")
            .then(response => response.json())
            .then(users => {
                let userExists = users.some(user => user.name === name);
                
                if (userExists) {
                    console.log("User created previously");

                    let username = localStorage.getItem("username");

                    fetch("api/users")
                      .then(response => response.json())
                      .then(users => {
                        // Find the user by name
                        let user = users.find(u => u.name === username);
                        
                        if (user) {
                            let useremail = localStorage.getItem("useremail");
                            if (useremail !== user.email){
                                let useremail = user.email;
                                document.getElementById(`topPageInfoDisplay`).textContent += ` - ` + `This account was created previously so your info is not the true info. The server says its "` + useremail +`"`
                                localStorage.setItem("username", username); // Save username in local storage
                                localStorage.setItem("useremail", useremail); // save email/info to local storage
                            }
                        

                          // Now you can use the user's email
                        } else {
                          console.log("User not found!");
                        }
                      })
                      .catch(error => {
                        console.error("Error fetching user info:", error);
                      });
                
                } else {
                    // If the user doesn't exist, proceed with creation
                    fetch('api/users', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ name, email })
                    })
                    .then(response => response.json())
                    .then(data => console.log("User created:", data))
                    .catch(error => console.error("Error creating user:", error));
                    console.log("User created now");
                }
            })
            .catch(error => console.error("Error fetching users:", error));
    }
    



}

