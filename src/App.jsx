
import { BrowserRouter, Routes, Route, NavLink, Navigate, Outlet, Link } from 'react-router-dom'

const orders = {
  current: [
    { id: 'ORD-1048', customer: 'Aarav Sharma', item: 'Wireless Headphones', amount: 2499, status: 'Processing', date: '25 Oct 2026' },
    { id: 'ORD-1049', customer: 'Priya Patel', item: 'Smart Watch Pro', amount: 5499, status: 'Shipped', date: '25 Oct 2026' },
    { id: 'ORD-1050', customer: 'Rohan Mehta', item: 'Mechanical Keyboard', amount: 3299, status: 'Processing', date: '24 Oct 2026' },
    { id: 'ORD-1051', customer: 'Anaya Shah', item: 'USB-C Hub', amount: 1499, status: 'Shipped', date: '24 Oct 2026' },
  ],
  history: [
    { id: 'ORD-1038', customer: 'Meera Joshi', item: 'Laptop Stand', amount: 1899, status: 'Delivered', date: '20 Oct 2026' },
    { id: 'ORD-1039', customer: 'Kabir Desai', item: 'Bluetooth Speaker', amount: 2799, status: 'Delivered', date: '18 Oct 2026' },
    { id: 'ORD-1040', customer: 'Isha Verma', item: 'Wireless Mouse', amount: 999, status: 'Delivered', date: '16 Oct 2026' },
  ],
  cancelled: [
    { id: 'ORD-1028', customer: 'Dev Malhotra', item: 'Gaming Controller', amount: 3599, status: 'Cancelled', date: '17 Oct 2026' },
    { id: 'ORD-1032', customer: 'Riya Kapoor', item: 'Phone Case', amount: 699, status: 'Cancelled', date: '14 Oct 2026' },
  ],
}

const menu = [
  { label: 'Current Orders', path: 'current', icon: '◷', count: 4 },
  { label: 'Order History', path: 'history', icon: '↗', count: 3 },
  { label: 'Cancelled Orders', path: 'cancelled', icon: '×', count: 2 },
]

function Sidebar() {
  return (
    <aside className="w-full shrink-0 border-b border-white/10 bg-slate-900 p-5 md:min-h-screen md:w-64 md:border-b-0 md:border-r">
      <Link to="/orders" className="flex items-center gap-3 text-xl font-black tracking-tight">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500 text-xl">N</span>
        Nova<span className="text-violet-400">Commerce</span>
      </Link>

      <p className="mb-3 mt-9 text-xs font-bold uppercase tracking-[0.2em] text-slate-500">Workspace</p>
      <div className="space-y-2">
        {menu.map((item) => (
          <NavLink
            key={item.path}
            to={`/orders/${item.path}`}
            className={({ isActive }) =>
              `flex items-center justify-between rounded-xl px-4 py-3 transition ${
                isActive ? 'bg-violet-500/15 text-violet-300 ring-1 ring-violet-400/20' : 'text-slate-400 hover:bg-white/5 hover:text-white'
              }`
            }
          >
            <span className="flex items-center gap-3">
              <span className="text-xl">{item.icon}</span>
              <span className="text-sm font-semibold">{item.label}</span>
            </span>
            <span className="rounded-lg bg-white/5 px-2 py-1 text-xs">{item.count}</span>
          </NavLink>
        ))}
      </div>

      <div className="mt-8 rounded-2xl border border-violet-400/20 bg-violet-500/10 p-4">
        <p className="text-sm font-bold text-violet-200">Order insights</p>
        <p className="mt-2 text-xs leading-5 text-slate-400">Keep track of active orders, delivery progress, and cancellations in one place.</p>
      </div>
      <p className="mt-8 text-xs text-slate-600">PRACTICAL 12 · REACT ROUTER</p>
    </aside>
  )
}

function SummaryCard({ label, value, note, icon }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900 p-5">
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-400">{label}</p>
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/15 text-xl text-violet-300">{icon}</span>
      </div>
      <p className="mt-4 text-3xl font-black">{value}</p>
      <p className="mt-2 text-xs text-slate-500">{note}</p>
    </div>
  )
}

function OrdersLayout() {
  return (
    <div className="min-h-screen bg-slate-950 text-white md:flex">
      <Sidebar />
      <main className="min-w-0 flex-1 p-5 sm:p-8 lg:p-10">
        <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-violet-400">Commerce dashboard</p>
            <h1 className="mt-2 text-3xl font-black sm:text-4xl">Order Management</h1>
            <p className="mt-2 text-sm text-slate-400">Welcome back! Here's what's happening with your orders.</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-slate-300">
            ◉ System operational
          </div>
        </header>

        <section className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <SummaryCard label="Total Orders" value="09" note="Across all categories" icon="▤" />
          <SummaryCard label="In Progress" value="04" note="Currently being processed" icon="◷" />
          <SummaryCard label="Delivered" value="03" note="Successfully completed" icon="✓" />
          <SummaryCard label="Cancelled" value="02" note="Cancelled orders" icon="×" />
        </section>

        <Outlet />
        <footer className="mt-10 border-t border-white/10 pt-5 text-xs text-slate-600">
          NovaCommerce · Educational demo · Nested routes with React Router
        </footer>
      </main>
    </div>
  )
}

function OrderTable({ records }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-slate-900">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[680px] text-left text-sm">
          <thead className="bg-white/[0.03] text-xs uppercase tracking-wider text-slate-500">
            <tr>
              <th className="px-5 py-4">Order ID</th>
              <th className="px-5 py-4">Customer</th>
              <th className="px-5 py-4">Product</th>
              <th className="px-5 py-4">Amount</th>
              <th className="px-5 py-4">Status</th>
              <th className="px-5 py-4">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {records.map((order) => (
              <tr key={order.id} className="transition hover:bg-white/[0.03]">
                <td className="px-5 py-4 font-bold text-violet-300">{order.id}</td>
                <td className="px-5 py-4 text-slate-200">{order.customer}</td>
                <td className="px-5 py-4 text-slate-400">{order.item}</td>
                <td className="px-5 py-4 font-semibold">₹{order.amount.toLocaleString('en-IN')}</td>
                <td className="px-5 py-4">
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    order.status === 'Delivered' ? 'bg-emerald-400/10 text-emerald-300' :
                    order.status === 'Cancelled' ? 'bg-rose-400/10 text-rose-300' :
                    order.status === 'Shipped' ? 'bg-sky-400/10 text-sky-300' :
                    'bg-amber-400/10 text-amber-300'
                  }`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-5 py-4 text-slate-500">{order.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="border-t border-white/5 px-5 py-4 text-xs text-slate-500">
        Showing {records.length} sample orders
      </div>
    </div>
  )
}

function OrdersPage({ type, title, subtitle, records }) {
  return (
    <section>
      <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold">{title}</h2>
          <p className="mt-1 text-sm text-slate-400">{subtitle}</p>
        </div>
        <span className="rounded-full border border-white/10 px-3 py-2 text-xs text-slate-400">
          {records.length} orders
        </span>
      </div>
      <OrderTable records={records} />
    </section>
  )
}

function CurrentOrders() {
  return <OrdersPage title="Current Orders" subtitle="Monitor orders that are being processed or shipped." records={orders.current} />
}

function OrderHistory() {
  return <OrdersPage title="Order History" subtitle="Review successfully completed deliveries." records={orders.history} />
}

function CancelledOrders() {
  return <OrdersPage title="Cancelled Orders" subtitle="Review orders that were cancelled." records={orders.cancelled} />
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/orders" element={<OrdersLayout />}>
          <Route index element={<Navigate to="current" replace />} />
          <Route path="current" element={<CurrentOrders />} />
          <Route path="history" element={<OrderHistory />} />
          <Route path="cancelled" element={<CancelledOrders />} />
        </Route>
        <Route path="*" element={<Navigate to="/orders/current" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
