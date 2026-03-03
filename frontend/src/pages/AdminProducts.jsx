import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/Button";
import { Plus } from "lucide-react";
import { productsApi } from "@/services/api";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  const fileInputRef = useRef(null);

  const [form, setForm] = useState({
    title: "",
    category: "",
    price: "",
    rating: "",
    stock: "",
    image: null,
  });

  /* ================= FETCH PRODUCTS ================= */
  const fetchProducts = async () => {
    try {
      const data = await productsApi.getAll();
      // Handle both old format (array) and new format (object with products)
      setProducts(data.products || data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  /* ================= INPUT CHANGE ================= */
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /* ================= RESET FORM ================= */
  const resetForm = () => {
    setForm({
      title: "",
      category: "",
      price: "",
      rating: "",
      stock: "",
      image: null,
    });

    setPreview(null);
    setEditId(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.keys(form).forEach((key) => {
      if (form[key]) formData.append(key, form[key]);
    });

    try {
      if (editId) {
        await productsApi.update(editId, formData);
      } else {
        await productsApi.create(formData);
      }

      resetForm();
      setShowForm(false);
      fetchProducts();
    } catch (error) {
      console.error("Failed to save product:", error);
      alert(error.message || "Failed to save product");
    }
  };

  /* ================= EDIT ================= */
  const handleEdit = (product) => {
    setForm({
      title: product.title,
      category: product.category,
      price: product.price,
      rating: product.rating,
      stock: product.stock,
      image: null,
    });

    setPreview(product.image || null);
    setEditId(product._id);
    setShowForm(true);
  };

  /* ================= DELETE ================= */
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    setDeletingId(id);
    try {
      await productsApi.delete(id);
      fetchProducts();
    } catch (error) {
      console.error("Failed to delete product:", error);
      alert(error.message || "Failed to delete product");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-background px-10 py-12">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-3xl font-bold">Admin Products</h1>

        <div className="flex gap-4">
          {!showForm && (
            <Button onClick={() => setShowForm(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Product
            </Button>
          )}
        </div>
      </div>

      {/* ================= FORM ================= */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-card border border-theme rounded-2xl p-8 mb-14"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {["title", "category", "price", "rating", "stock"].map(
              (field) => (
                <input
                  key={field}
                  name={field}
                  type={
                    field === "price" ||
                    field === "rating" ||
                    field === "stock"
                      ? "number"
                      : "text"
                  }
                  placeholder={
                    field.charAt(0).toUpperCase() + field.slice(1)
                  }
                  value={form[field]}
                  onChange={handleChange}
                  required
                  className="input"
                />
              )
            )}

            {/* IMAGE INPUT */}
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={(e) => {
                const file = e.target.files[0];
                setForm({ ...form, image: file });

                if (file) {
                  setPreview(URL.createObjectURL(file));
                }
              }}
              className="input"
            />
          </div>

          {/* IMAGE PREVIEW */}
          {preview && (
            <div className="flex items-center gap-4 mt-6">
              <img
                src={preview}
                alt="Preview"
                className="w-24 h-24 object-cover rounded-xl border"
              />
              <Button
                type="button"
                variant="outline"
                onClick={resetForm}
              >
                Remove
              </Button>
            </div>
          )}

          <div className="flex gap-4 mt-8">
            <Button type="submit" className="flex-1">
              {editId ? "Update Product" : "Save Product"}
            </Button>

            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => {
                resetForm();
                setShowForm(false);
              }}
            >
              Cancel
            </Button>
          </div>
        </form>
      )}

      {/* ================= TABLE ================= */}
      {!showForm && (
        <div className="bg-card border border-theme rounded-xl overflow-hidden">
          {loading ? (
            <div className="p-8 text-center">Loading products...</div>
          ) : products.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-muted-foreground mb-4">No products found</p>
              <Button onClick={() => setShowForm(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Add Your First Product
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-muted">
                  <tr>
                    <th className="px-6 py-4">Image</th>
                    <th className="px-6 py-4">Title</th>
                    <th className="px-6 py-4">Category</th>
                    <th className="px-6 py-4">Price</th>
                    <th className="px-6 py-4">Stock</th>
                    <th className="px-6 py-4 text-center">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {products.map((p) => (
                    <tr key={p._id} className="border-t border-theme">
                      <td className="px-6 py-4">
                        {p.image ? (
                          <img
                            src={p.image}
                            alt={p.title}
                            className="w-14 h-14 object-cover rounded-lg"
                          />
                        ) : (
                          <div className="w-14 h-14 bg-muted rounded-lg flex items-center justify-center text-muted-foreground text-xs">
                            No IMG
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 font-medium">{p.title}</td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 bg-secondary rounded-full text-xs">
                          {p.category}
                        </span>
                      </td>
                      <td className="px-6 py-4">₹{p.price}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          p.stock < 10 
                            ? "bg-red-100 text-red-800" 
                            : "bg-green-100 text-green-800"
                        }`}>
                          {p.stock} in stock
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-center gap-2">
                          <Button 
                            size="sm" 
                            onClick={() => handleEdit(p)}
                            disabled={deletingId === p._id}
                          >
                            Edit
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDelete(p._id)}
                            disabled={deletingId === p._id}
                          >
                            {deletingId === p._id ? "Deleting..." : "Delete"}
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminProducts;
