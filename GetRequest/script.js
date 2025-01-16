fetch("http://localhost:3000/menu", {
    method: "GET",
}).then((response) => {
  console.log("API Request successfully sent!");  
})