const uploadAllProducts = async (products, images) => {
    const formData = new FormData();

    // Append product details as JSON
    formData.append("products", JSON.stringify(products));

    // Append each image file to formData
    images.forEach((file, index) => {
        if (file) formData.append(`images`, file);
    });

    try {
        const response = await fetch("http://localhost:4000/addall", {
            method: "POST",
            body: formData,
        });

        const result = await response.json();

        if (response.ok) {
            console.log(result.message);
            return { success: true, data: result };
        } else {
            console.error("Error:", result.error);
            return { success: false, error: result.error };
        }
    } catch (error) {
        console.error("Error uploading products:", error);
        return { success: false, error: error.message };
    }
};

export default uploadAllProducts;
