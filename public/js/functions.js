//FUNCIONES CARRITO
//-----------------

//Crear carrito
//-------------
const createCart = async () => {
  try {
    const response = await fetch(`/api/carts/`, {
      method: "POST",
    });
    const data = await response.json();
    if (response.ok) {
      // Recarga la página para actualizar la vista

      // Swal("¡Carrito creado correctamente!", {
      //   icon: "success",
      //   timer: 2000, // La alerta se mostrará por 2 segundos antes de cerrarse automáticamente
      //   buttons: false, // No muestra botones para cerrarla manualmente
      // }).then(() => {
      //   location.reload(); // Recarga la página después de que la alerta desaparezca
      // });

      alert("Carrito creado correctamente");
      location.reload();
    } else {
      alert(`Error: ${data.error}`);
    }
  } catch (error) {
    console.error("Error al crear carrito:", error);
    alert("Error al crear carrito");
  }
};

//Agregar producto al carrito
//----------------------------
const addProductToCart = async (cartId, productId) => {
  console.log("agregar");
  try {
    const response = await fetch(`/api/carts/${cartId}/products/${productId}`, {
      method: "PUT",
    });

    const data = await response.json();

    if (response.ok) {
      alert("Producto agregado al carrito correctamente");
      location.reload(); // Recarga la página para actualizar la vista
    } else {
      alert(`Error: ${data.error}`);
    }
  } catch (error) {
    console.error("Error al agregar producto al carrito:", error);
    alert("Error al agregar producto al carrito");
  }
};

//Eliminar producto de carrito
//----------------------------
const deleteProductFromCart = async (cartId, productId) => {
  try {
    const response = await fetch(`/api/carts/${cartId}/products/${productId}`, {
      method: "DELETE",
    });

    const data = await response.json();

    if (response.ok) {
      alert("Producto eliminado correctamente");
      location.reload(); // Recarga la página para actualizar la vista
    } else {
      alert(`Error: ${data.error}`);
    }
  } catch (error) {
    console.error("Error al eliminar producto:", error);
    alert("Error al eliminar producto");
  }
};

//Eliminar carrito
//----------------
const deleteCart = async (cartId) => {
  try {
    const response = await fetch(`/api/carts/${cartId}`, {
      method: "DELETE",
    });
    const data = await response.json();
    if (response.ok) {
      alert("Carrito eliminado correctamente");
      location.reload(); // Recarga la página para actualizar la vista
    } else {
      alert(`Error: ${data.error}`);
    }
  } catch (error) {
    console.error("Error al eliminar carrito:", error);
    alert("Error al eliminar carrito");
  }
};

//FUNCIONES PRODUCTOS
//-------------------

//Crear producto
//--------------
const createProduct = async (product) => {
  try {
    const response = await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });
    const data = await response.json();

    console.log("response:", response);
    console.log("data:", data);

    if (response.ok) {
      alert("Producto creado correctamente");
      window.location.href = "/api/products";
    } else {
      alert(`Error: ${data.error}`);
    }
  } catch (error) {
    console.error("Error al crear producto:", error);
    alert("Error al crear producto");
  }
};

//Actualizar producto
//-------------------
const updateProduct = async (product) => {
  try {
    const response = await fetch(`/api/products/${product._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });

    const data = await response.json();

    if (response.ok) {
      alert("Producto actualizado correctamente");
      window.location.href = "/api/products";
    } else {
      alert(`Error: ${data.error}`);
    }
  } catch (error) {
    console.error("Error al actualizar producto:", error);
    alert("Error al actualizar producto");
  }
};

//Eliminar producto
//-----------------
const deleteProduct = async (productId) => {
  try {
    const response = await fetch(`/api/products/${productId}`, {
      method: "DELETE",
    });
    const data = await response.json();
    if (response.ok) {
      alert("Producto eliminado correctamente");
      location.reload(); // Recarga la página para actualizar la vista
    } else {
      alert(`Error: ${data.error}`);
    }
  } catch (error) {
    console.error("Error al eliminar producto:", error);
    alert("Error al eliminar producto");
  }
};
