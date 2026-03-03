import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/Button";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";

const AdminProducts = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [preview, setPreview] = useState(null);

  const fileInputRef = useRef(null);

  const [form, setForm] = useState({
    title: "",
    category: "",
    price: "",
    rating: "",
    stock: "",
    image: null,
  });

  const token = localStorage.getItem("adminToken");

  /* ================= FETCH PRODUCTS ================= */
  const fetchProducts = async () => {
    const res = await fetch("http://localhost:5000/api/products");
    const data = await res.json();
    setProducts(data);
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

    const url = editId
      ? `http://localhost:5000/api/products/${editId}`
      : "http://localhost:5000/api/products";

    const method = editId ? "PUT" : "POST";

    await fetch(url, {
      method,
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });

    resetForm();
    setShowForm(false);
    fetchProducts();
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
    if (!window.confirm("Delete this product?")) return;

    await fetch(`http://localhost:5000/api/products/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    fetchProducts();
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
                    {p.image && (
                      <img
                        src={p.image}
                        alt={p.title}
                        className="w-14 h-14 object-cover rounded-lg"
                      />
                    )}
                  </td>
                  <td className="px-6 py-4">{p.title}</td>
                  <td className="px-6 py-4">{p.category}</td>
                  <td className="px-6 py-4">${p.price}</td>
                  <td className="px-6 py-4">{p.stock}</td>
                  <td className="px-6 py-4 flex justify-center gap-3">
                    <Button size="sm" onClick={() => handleEdit(p)}>
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDelete(p._id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;