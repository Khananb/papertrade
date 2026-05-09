'use client';
import React, { useState } from 'react';
import { ChevronUp, ChevronDown, MoreHorizontal, ShieldOff, Eye, Ban, CheckCircle2, Clock, XCircle, Search } from 'lucide-react';
import { toast } from 'sonner';

// Backend: replace with GET /api/admin/users?page=1&limit=10
const users = [
  { id: 'usr-001', name: 'Rohan Kumar', email: 'rohan.kumar@papertrade.in', phone: '98765 43210', joined: '12 Apr 2026', status: 'active', experience: 'Intermediate', virtualCash: 218450, portfolioValue: 1482341, pnl: 82341, tradesTotal: 247, tradeToday: 12, segment: 'Equity+F&O', riskProfile: 'Medium', streak: 14 },
  { id: 'usr-002', name: 'Priya Sharma', email: 'priya.sharma@gmail.com', phone: '91234 56789', joined: '15 Apr 2026', status: 'active', experience: 'Beginner', virtualCash: 780200, portfolioValue: 1219800, pnl: -219800, tradesTotal: 42, tradeToday: 3, segment: 'Equity', riskProfile: 'Low', streak: 3 },
  { id: 'usr-003', name: 'Arjun Mehta', email: 'arjun.mehta@outlook.com', phone: '87654 32109', joined: '2 Apr 2026', status: 'active', experience: 'Advanced', virtualCash: 45800, portfolioValue: 1954200, pnl: 954200, tradesTotal: 891, tradeToday: 38, segment: 'F&O', riskProfile: 'High', streak: 21 },
  { id: 'usr-004', name: 'Sneha Patel', email: 'sneha.patel@yahoo.co.in', phone: '99887 76655', joined: '20 Apr 2026', status: 'suspended', experience: 'Some', virtualCash: 1000000, portfolioValue: 1000000, pnl: 0, tradesTotal: 0, tradeToday: 0, segment: '—', riskProfile: 'Unknown', streak: 0 },
  { id: 'usr-005', name: 'Vikram Nair', email: 'vikram.nair@papertrade.in', phone: '70123 45678', joined: '8 Apr 2026', status: 'active', experience: 'Advanced', virtualCash: 124300, portfolioValue: 1875700, pnl: 875700, tradesTotal: 634, tradeToday: 22, segment: 'Equity+FD', riskProfile: 'Medium', streak: 9 },
  { id: 'usr-006', name: 'Kavya Reddy', email: 'kavya.reddy@gmail.com', phone: '81122 33445', joined: '25 Apr 2026', status: 'active', experience: 'Beginner', virtualCash: 892400, portfolioValue: 1107600, pnl: 107600, tradesTotal: 18, tradeToday: 1, segment: 'Equity', riskProfile: 'Low', streak: 5 },
  { id: 'usr-007', name: 'Rahul Joshi', email: 'rahul.joshi@hotmail.com', phone: '93344 55667', joined: '1 May 2026', status: 'flagged', experience: 'Some', virtualCash: 34200, portfolioValue: 1965800, pnl: 965800, tradesTotal: 1240, tradeToday: 87, segment: 'F&O', riskProfile: 'High', streak: 8 },
  { id: 'usr-008', name: 'Ananya Singh', email: 'ananya.singh@papertrade.in', phone: '96655 44332', joined: '5 May 2026', status: 'active', experience: 'Beginner', virtualCash: 950000, portfolioValue: 1050000, pnl: 50000, tradesTotal: 7, tradeToday: 2, segment: 'Equity', riskProfile: 'Low', streak: 2 },
  { id: 'usr-009', name: 'Dev Kapoor', email: 'dev.kapoor@gmail.com', phone: '78899 00112', joined: '3 May 2026', status: 'active', experience: 'Intermediate', virtualCash: 312000, portfolioValue: 1688000, pnl: 688000, tradesTotal: 189, tradeToday: 9, segment: 'Equity+F&O', riskProfile: 'Medium', streak: 6 },
  { id: 'usr-010', name: 'Meera Iyer', email: 'meera.iyer@yahoo.co.in', phone: '88776 55443', joined: '7 May 2026', status: 'pending', experience: 'Beginner', virtualCash: 1000000, portfolioValue: 1000000, pnl: 0, tradesTotal: 0, tradeToday: 0, segment: '—', riskProfile: 'Unknown', streak: 0 },
];

const statusConfig: Record<string, { label: string; className: string; icon: React.ReactNode }> = {
  active: { label: 'Active', className: 'bg-positive-subtle text-positive', icon: <CheckCircle2 size={10} /> },
  suspended: { label: 'Suspended', className: 'bg-muted text-muted-foreground', icon: <XCircle size={10} /> },
  flagged: { label: 'Flagged', className: 'bg-negative-subtle text-negative', icon: <ShieldOff size={10} /> },
  pending: { label: 'Pending', className: 'bg-warning-subtle text-warning', icon: <Clock size={10} /> },
};

const riskColors: Record<string, string> = {
  Low: 'text-positive',
  Medium: 'text-warning',
  High: 'text-negative',
  Unknown: 'text-muted-foreground',
};

export default function UserManagementTable() {
  const [search, setSearch] = useState('');
  const [sortCol, setSortCol] = useState('portfolioValue');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const perPage = 8;

  const handleSort = (col: string) => {
    if (sortCol === col) setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    else { setSortCol(col); setSortDir('desc'); }
  };

  const filtered = users.filter((u) => {
    const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'all' || u.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const sorted = [...filtered].sort((a, b) => {
    const aVal = (a as Record<string, unknown>)[sortCol];
    const bVal = (b as Record<string, unknown>)[sortCol];
    if (typeof aVal === 'number' && typeof bVal === 'number') {
      return sortDir === 'asc' ? aVal - bVal : bVal - aVal;
    }
    return 0;
  });

  const paginated = sorted.slice((page - 1) * perPage, page * perPage);
  const totalPages = Math.ceil(sorted.length / perPage);

  const toggleRow = (id: string) => {
    setSelectedRows((prev) => prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]);
  };

  const toggleAll = () => {
    setSelectedRows(selectedRows.length === paginated.length ? [] : paginated.map((u) => u.id));
  };

  const SortIcon = ({ col }: { col: string }) => (
    <span className="inline-flex flex-col ml-1 align-middle">
      <ChevronUp size={8} className={sortCol === col && sortDir === 'asc' ? 'text-primary' : 'text-muted-foreground/40'} />
      <ChevronDown size={8} className={sortCol === col && sortDir === 'desc' ? 'text-primary' : 'text-muted-foreground/40'} />
    </span>
  );

  return (
    <div className="bg-card border border-border rounded-2xl card-shadow overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-border gap-3 flex-wrap">
        <div>
          <h2 className="text-[15px] font-700 text-foreground">User Management</h2>
          <p className="text-[12px] text-muted-foreground">{filtered.length} traders registered</p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {/* Search */}
          <div className="flex items-center gap-2 px-3 py-2 bg-muted rounded-xl border border-transparent focus-within:border-primary/40 transition-colors">
            <Search size={13} className="text-muted-foreground" />
            <input
              type="text"
              placeholder="Search users…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent text-[13px] text-foreground placeholder:text-muted-foreground/60 outline-none w-40"
            />
          </div>
          {/* Status filter */}
          {(['all', 'active', 'flagged', 'suspended', 'pending'] as const).map((f) => (
            <button
              key={`uf-${f}`}
              onClick={() => setStatusFilter(f)}
              className={`px-3 py-1.5 rounded-xl text-[12px] font-600 transition-all capitalize ${
                statusFilter === f ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-border'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Bulk action bar */}
      {selectedRows.length > 0 && (
        <div className="flex items-center gap-3 px-5 py-2.5 bg-accent/5 border-b border-accent/20 slide-up">
          <span className="text-[13px] font-600 text-accent">{selectedRows.length} selected</span>
          <button
            onClick={() => { toast.success(`${selectedRows.length} users suspended`); setSelectedRows([]); }}
            className="px-3 py-1 bg-negative-subtle text-negative text-[12px] font-600 rounded-lg hover:bg-negative/20 transition-colors"
          >
            Suspend Selected
          </button>
          <button
            onClick={() => { toast.success(`${selectedRows.length} users activated`); setSelectedRows([]); }}
            className="px-3 py-1 bg-positive-subtle text-positive text-[12px] font-600 rounded-lg hover:bg-positive/20 transition-colors"
          >
            Activate Selected
          </button>
          <button
            onClick={() => setSelectedRows([])}
            className="ml-auto px-3 py-1 bg-muted text-muted-foreground text-[12px] font-600 rounded-lg hover:bg-border transition-colors"
          >
            Clear
          </button>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto scrollbar-thin">
        <table className="w-full min-w-[1100px]">
          <thead>
            <tr className="bg-muted/50">
              <th className="px-4 py-2.5 text-left w-10">
                <input
                  type="checkbox"
                  checked={selectedRows.length === paginated.length && paginated.length > 0}
                  onChange={toggleAll}
                  className="w-3.5 h-3.5 rounded accent-primary"
                />
              </th>
              {[
                { key: 'name', label: 'Trader' },
                { key: 'joined', label: 'Joined' },
                { key: 'status', label: 'Status' },
                { key: 'segment', label: 'Segments' },
                { key: 'virtualCash', label: 'Cash' },
                { key: 'portfolioValue', label: 'Portfolio' },
                { key: 'pnl', label: 'Total P&L' },
                { key: 'tradeToday', label: 'Trades Today' },
                { key: 'riskProfile', label: 'Risk' },
                { key: 'streak', label: 'Streak' },
                { key: 'actions', label: '' },
              ].map((col) => (
                <th
                  key={`ath-${col.key}`}
                  onClick={() => !['name', 'status', 'segment', 'riskProfile', 'actions', 'joined'].includes(col.key) && handleSort(col.key)}
                  className={`px-3 py-2.5 text-left text-[11px] font-600 uppercase tracking-wider text-muted-foreground whitespace-nowrap ${
                    !['name', 'status', 'segment', 'riskProfile', 'actions', 'joined'].includes(col.key) ? 'cursor-pointer hover:text-foreground' : ''
                  }`}
                >
                  {col.label}
                  {!['name', 'status', 'segment', 'riskProfile', 'actions', 'joined'].includes(col.key) && col.key !== 'actions' && (
                    <SortIcon col={col.key} />
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {paginated.map((user) => {
              const sc = statusConfig[user.status];
              return (
                <tr key={user.id} className={`hover:bg-muted/40 transition-colors group ${selectedRows.includes(user.id) ? 'bg-accent/5' : ''}`}>
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(user.id)}
                      onChange={() => toggleRow(user.id)}
                      className="w-3.5 h-3.5 rounded accent-primary"
                    />
                  </td>
                  <td className="px-3 py-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center text-white text-[11px] font-700 flex-shrink-0">
                        {user.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                      </div>
                      <div>
                        <p className="text-[13px] font-600 text-foreground whitespace-nowrap">{user.name}</p>
                        <p className="text-[11px] text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-3 text-[12px] text-muted-foreground whitespace-nowrap">{user.joined}</td>
                  <td className="px-3 py-3">
                    <span className={`inline-flex items-center gap-1 text-[11px] font-600 px-2 py-0.5 rounded-full ${sc.className}`}>
                      {sc.icon} {sc.label}
                    </span>
                  </td>
                  <td className="px-3 py-3 text-[12px] font-600 text-foreground">{user.segment}</td>
                  <td className="px-3 py-3 text-[12px] font-tabular text-foreground">
                    ₹{(user.virtualCash / 100000).toFixed(1)}L
                  </td>
                  <td className="px-3 py-3 text-[12px] font-700 font-tabular text-foreground">
                    ₹{(user.portfolioValue / 100000).toFixed(2)}L
                  </td>
                  <td className="px-3 py-3">
                    <span className={`text-[12px] font-700 font-tabular ${user.pnl >= 0 ? 'text-positive' : 'text-negative'}`}>
                      {user.pnl >= 0 ? '+' : ''}₹{Math.abs(user.pnl).toLocaleString('en-IN')}
                    </span>
                  </td>
                  <td className="px-3 py-3 text-[12px] font-tabular text-foreground text-center">{user.tradeToday}</td>
                  <td className="px-3 py-3">
                    <span className={`text-[12px] font-600 ${riskColors[user.riskProfile]}`}>{user.riskProfile}</span>
                  </td>
                  <td className="px-3 py-3 text-[12px] font-tabular text-foreground">{user.streak > 0 ? `🔥 ${user.streak}d` : '—'}</td>
                  <td className="px-3 py-3">
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => toast.info(`Viewing profile for ${user.name}`)}
                        className="p-1.5 rounded-lg bg-info-subtle text-info hover:bg-info/20 transition-colors"
                        title="View profile"
                      >
                        <Eye size={12} />
                      </button>
                      <button
                        onClick={() => toast.warning(`${user.name} has been suspended`)}
                        className="p-1.5 rounded-lg bg-negative-subtle text-negative hover:bg-negative/20 transition-colors"
                        title="Suspend account"
                      >
                        <Ban size={12} />
                      </button>
                      <button
                        className="p-1.5 rounded-lg bg-muted text-muted-foreground hover:bg-border transition-colors"
                        title="More actions"
                      >
                        <MoreHorizontal size={12} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="px-5 py-3 border-t border-border flex items-center justify-between bg-muted/20">
        <p className="text-[12px] text-muted-foreground">
          Showing {(page - 1) * perPage + 1}–{Math.min(page * perPage, sorted.length)} of {sorted.length} users
        </p>
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setPage(Math.max(1, page - 1))}
            disabled={page === 1}
            className="px-3 py-1.5 rounded-lg text-[12px] font-600 bg-muted text-muted-foreground hover:bg-border disabled:opacity-40 transition-colors"
          >
            Prev
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={`page-${p}`}
              onClick={() => setPage(p)}
              className={`w-8 h-8 rounded-lg text-[12px] font-600 transition-colors ${
                page === p ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-border'
              }`}
            >
              {p}
            </button>
          ))}
          <button
            onClick={() => setPage(Math.min(totalPages, page + 1))}
            disabled={page === totalPages}
            className="px-3 py-1.5 rounded-lg text-[12px] font-600 bg-muted text-muted-foreground hover:bg-border disabled:opacity-40 transition-colors"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}