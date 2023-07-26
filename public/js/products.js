document.addEventListener("DOMContentLoaded", () => {
    const forms = document.querySelectorAll("#formAddProduct");
  
    forms.forEach(form => {
      form.addEventListener("submit", async event => {
        event.preventDefault();
        
        const cartId = form.dataset.cartid;
        const productId = form.dataset.productid;
  
        try {
          const response = await fetch(`/api/carts/${cartId}/product/${productId}`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({}) 
          });
  
          if (!response.ok) {
            throw new Error("Error en la solicitud.");
          }
  
          const data = await response.json();
          console.log("Respuesta del servidor:", data);
        } catch (error) {
          console.error("Error al enviar la solicitud:", error);
        }
      });
    });
  });

// const form = document.querySelector("#formAddProduct")

// form.addEventListener('submit', event => {
//     event.preventDefault()
//     const cartId = form.dataset.cartid;
//     const productId = form.dataset.productid;
//     console.log(productId)
//     fetch(`/api/carts/${cartId}/product/${productId}`, {
//         method: 'POST',
//         body: JSON.stringify({}),
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     })
//     .then(res => res.json())
//     .then(data => console.log(data))
//     .catch(error => console.log(error))
// })