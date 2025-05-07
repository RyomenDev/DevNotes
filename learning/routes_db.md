# Db connection

In a Next.js App Router project (which you're using), the best practice is to connect to your MongoDB database inside your API route handlers—not globally—so that:

- You avoid reconnecting on every request.
- You only connect when a request that actually needs the DB is made.
- You stay aligned with how serverless functions work on platforms like Vercel.

✅ Here's where and how to use connectDB
You should call connectDB() at the start of each API route file that interacts with MongoDB. For example:

✅ Summary

- Don't call connectDB() globally or in \_app.js/layout.js.
- Do call it inside your server functions (route.js files).
- This keeps connections efficient and clean in a serverless environment.

---

## Routes

Next.js API routes, you do not need to import route.js (or the server-side functions) into your page components (page.jsx). The API routes are automatically handled by Next.js when you send a request to them. They are separate from the front-end components like your page.jsx.

#### How It Works

- **Frontend (page.jsx):** The frontend sends HTTP requests (like GET, POST, etc.) to the API routes for things like authentication, CRUD operations, etc.

- **API Routes (route.js):** The API route files (route.js) handle the requests from the frontend and communicate with your database (MongoDB in this case).

- **No Import Needed:** The route.js file acts as an endpoint that Next.js exposes, and you don't import it into the frontend. Instead, you use fetch() or axios on the frontend to make HTTP requests to those API routes.

#### Key Points:

- **No imports of route.js:** In your React component (page.jsx), you don't import route.js. You just make HTTP requests to it (using fetch or axios).
- **API Routes are the Backend:** route.js files are server-side endpoints that handle the requests.
- **Frontend communicates via HTTP requests:** The frontend (in page.jsx) communicates with the backend using fetch() or axios.

---

page.jsx does not need to “know” the internal logic of the API — it only needs the URL to send the request to. The API route's path (as defined by the file structure in app/api/) automatically maps to a URL endpoint in your Next.js app.

### ✅ How the Connection Works

Suppose you have this API route in your file structure:

```
app/
└── api/
    └── auth/
        └── register/
            └── route.js
```

This corresponds to the API endpoint:

```
/api/auth/register
```

So in your page.jsx, you just write:

```js
"use client";

const handleRegister = async () => {
  const res = await fetch("/api/auth/register", {
    method: "POST",
    body: JSON.stringify({ username, email, password }),
    headers: { "Content-Type": "application/json" },
  });

  const data = await res.json();
  console.log(data); // { success: true }
};
```

### 🔁 What Happens Internally

- You make a fetch('/api/auth/register') request.
- Next.js looks in app/api/auth/register/route.js.
- If you exported a POST function in that file, it runs that function when your request is a POST.

---

if you're making the same API calls (e.g., fetch products) in multiple pages like Products/page.jsx and Home/page.jsx, the best practice is to abstract the logic into a reusable utility function or hook. This improves code reusability, readability, and testability.

### ✅ Step-by-step solution:

1. Create a utility function (e.g., getProducts.js)
   Create this inside a lib/ or utils/ folder:

```js
// lib/getProducts.js
export const getProducts = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/products`,
      {
        cache: "no-store", // or "force-cache" / "revalidate" depending on need
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch products");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};
```

2. Use it in Products/page.jsx & other page

```js
import { getProducts } from "@/lib/getProducts";

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div>
      <h1>Products</h1>
      {products.map((product) => (
        <div key={product._id}>{product.name}</div>
      ))}
    </div>
  );
}
```

### 🔁 Benefits

- Centralized logic for data fetching
- Easy to update fetching logic across all pages
- Keeps your page components clean and focused on rendering

### 🧩 Structure Clarification

| Folder             | Purpose                                        | Example                                           |
| ------------------ | ---------------------------------------------- | ------------------------------------------------- |
| `app/api/...`      | 🔧 **Backend logic** (API routes)              | `/app/api/products/route.js` → GET products       |
| `lib/` or `utils/` | 📦 **Frontend utility functions** to call APIs | `/lib/getProducts.js` → `fetch('/api/products')`  |
| `app/page.jsx`     | 🎨 **Frontend UI component/page**              | `/app/products/page.jsx` → displays products list |

#### 💡 Why This Separation?

- routes = what the server does
- lib = how the frontend asks for it
- page.jsx = how you show it

#### ✅ Best Practice Workflow

- Define API in /app/api/products/route.js
- Create a fetch wrapper in /lib/getProducts.js
- Call it in /app/products/page.jsx and reuse wherever needed

#### Example Summary

- route.js → Connects to MongoDB and returns data
- getProducts.js → fetch('/api/products')
- page.jsx → Uses getProducts() to get data and render it

#### So:

➡️ Yes, define your backend logic in routes.
➡️ Yes, write reusable fetch logic in utils or lib.
❌ No, don't put actual fetch calls inside route.js.

---

You cannot define export async function GET() twice in a single route file — that would cause a conflict, and only one of them will be recognized (usually the last one). In JavaScript/TypeScript, function names in the same scope must be unique.

### ✅ What You Should Do Instead

- If you need to handle multiple data sources (e.g., fetchProducts() and fetchCategories()) within the same API route, combine them inside a single GET function:

```js
import {
  fetchProducts,
  fetchCategories,
} from "@/lib/controllers/productController";

export async function GET() {
  try {
    const products = await fetchProducts();
    const categories = await fetchCategories();

    return Response.json({ products, categories });
  } catch (err) {
    return new Response("Error fetching data", { status: 500 });
  }
}
```

### 🔄 Client Usage Example

Then from your frontend (e.g., in ProductsPage.jsx), you can call:

```js
const res = await fetch("/api/products"); // assuming that's your route
const { products, categories } = await res.json();
```

---

# Alternatives

## 🔁 Alternative 1: Use a Query Param in One Route

If you really want to handle multiple fetch types in one file, you can distinguish them with a query param:

```js
// /api/data/route.js

import {
  fetchProducts,
  fetchCategories,
} from "@/lib/controllers/productController";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type");

  try {
    if (type === "products") {
      const products = await fetchProducts();
      return Response.json(products);
    } else if (type === "categories") {
      const categories = await fetchCategories();
      return Response.json(categories);
    } else {
      return new Response("Invalid type", { status: 400 });
    }
  } catch (err) {
    return new Response("Error fetching data", { status: 500 });
  }
}
```

Frontend usage:

```js
await fetch("/api/data?type=products");
await fetch("/api/data?type=categories");
```

✅ Pro: Fewer route files
❌ Con: Logic gets messy if you add more types, and response caching is trickier.

## 🧩 Alternative 2: Use Dynamic Route Segments

```js
// /api/data/[type]/route.js

import {
  fetchProducts,
  fetchCategories,
} from "@/lib/controllers/productController";

export async function GET(request, { params }) {
  const { type } = params;

  try {
    if (type === "products") return Response.json(await fetchProducts());
    if (type === "categories") return Response.json(await fetchCategories());
    return new Response("Invalid type", { status: 400 });
  } catch (err) {
    return new Response("Error fetching data", { status: 500 });
  }
}
```

Frontend usage:

```js
await fetch("/api/data/products");
await fetch("/api/data/categories");
```

✅ Pro: Clean separation via URL
❌ Con: Slightly more setup, and less RESTful for complex APIs

## 👀 Summary

| Method                    | Clean | Performant | Scalable | Good For            |
| ------------------------- | ----- | ---------- | -------- | ------------------- |
| Separate routes           | ✅    | ✅         | ✅       | Most use cases      |
| Query params in one route | ❌    | ⚠️         | ❌       | Simple dev APIs     |
| Dynamic route segments    | ✅    | ✅         | ✅       | REST-style grouping |
