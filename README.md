Sparkling Kidzone - Vercel + Persistent Postgres

1. Create a Vercel Postgres instance in your Vercel Dashboard.
2. Add the DATABASE_URL value to your Project > Settings > Environment Variables.
3. Deploy the project to Vercel (import from GitHub).
4. After deployment, call POST /api/setup once (e.g., curl -X POST https://your-app.vercel.app/api/setup)
   This will create tables and seed products.
5. API endpoints:
   - GET /api/products
   - GET /api/orders
   - POST /api/orders  { items: [], total: number }
   - PUT /api/orders/:id  { status: "shipped" }