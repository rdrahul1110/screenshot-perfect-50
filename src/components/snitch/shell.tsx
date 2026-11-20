import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  LayoutDashboard,
  ScanLine,
  FileText,
  ShieldCheck,
  Search,
  Plus,
  ChevronsLeft,
  ChevronsRight,
  ChevronDown,
  ArrowUpRight,
  Activity,
  X,
  FlaskConical,
} from "lucide-react";
import { toast, Toaster } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { gaps, sync } from "@/data/mockData";
import { useSnitchData } from "@/hooks/useSnitchData";
const nav = [
  { to: "/", name: "Command Center", icon: LayoutDashboard },
  { to: "/gaps", name: "Gap Explorer", icon: ScanLine },
  { to: "/briefs/$id", name: "Action Plan", icon: FileText },
  { to: "/strengths", name: "Strength Defense", icon: ShieldCheck },
] as const;
export function AppShell({ children }: { children: React.ReactNode }) {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const [collapsed, setCollapsed] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [newOpen, setNewOpen] = useState(false);
  const [hypothesis, setHypothesis] = useState("");
  const [saved, setSaved] = useState<string[]>([]);
  const { isLive, refresh, endpoint } = useSnitchData();
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);
  return (
    <div className={`app-shell ${collapsed ? "nav-collapsed" : ""}`}>
      <header className="global-header">
        <Link to="/" className="brand">
          SNITCH<span className="brand-mark">®</span>
        </Link>
        <span className="product-label">Creative Command Center</span>
        <div 
          className="header-sync" 
          title={`Data Source: ${isLive ? "Live Oracle n8n API" : "Verified Pipeline Snapshot"}\nEndpoint: ${endpoint}`}
          onClick={() => {
            refresh();
            toast.info(isLive ? "Refreshed from live n8n webhook" : "Querying n8n webhook endpoint...");
          }}
          style={{ cursor: "pointer" }}
        >
          <span className="live-dot" style={{ backgroundColor: isLive ? "var(--success)" : undefined }} />
          <span>{isLive ? "Live n8n Synced" : "Ad Library Synced"}</span>
          <span className="header-sync-count">{sync.ads} ads</span>
        </div>
        <div className="header-actions">
          <Button variant="outline" className="search-trigger" onClick={() => setSearchOpen(true)}>
            <Search />
            <span>Search anything...</span>
            <kbd>⌘ K</kbd>
          </Button>
          <Button size="sm" onClick={() => setNewOpen(true)}>
            <Plus />
            <span>New Test Hypothesis</span>
          </Button>
          <span className="avatar" title="Rahul Das">
            RD
          </span>
        </div>
      </header>
      <aside className="app-sidebar">
        <div className="workspace">
          <span className="workspace-logo">S</span>
          <div>
            <strong>Snitch Workspace</strong>
            <span>Performance intelligence</span>
          </div>
          <ChevronDown size={14} />
        </div>
        <div className="nav-label">WORKSPACE</div>
        <nav>
          {nav.map((item) => (
            <Button
              key={item.to}
              variant="ghost"
              asChild
              className={`nav-item ${path === item.to || (item.to === "/briefs/$id" && path.startsWith("/briefs")) ? "active" : ""}`}
              title={item.name}
            >
              <Link to={item.to} {...(item.to === "/briefs/$id" ? { params: { id: "1" } } : {})}>
                <item.icon />
                <span>{item.name}</span>
                {item.to === "/gaps" && <span className="nav-count">5</span>}
              </Link>
            </Button>
          ))}
        </nav>
        <div className="sidebar-insight">
          <span className="eyebrow">YOUR COMPETITIVE SET</span>
          <div>
            <span className="competitor-logo bewakoof">B</span>Bewakoof
            <span className="live-dot" />
          </div>
          <div>
            <span className="competitor-logo souled">S</span>The Souled Store
            <span className="live-dot" />
          </div>
          <div>
            <span className="competitor-logo beyoung">B</span>Beyoung
            <span className="live-dot" />
          </div>
          <p>{sync.concepts} unique concepts tracked</p>
        </div>
        <div className="sidebar-bottom">
          <div className="pipeline">
            <Activity size={16} />
            <span>
              Pipeline healthy<small>Last sync: 4 minutes ago · Mock data</small>
            </span>
            <span className="live-dot" />
          </div>
          <Button
            variant="ghost"
            className="collapse-button"
            onClick={() => setCollapsed(!collapsed)}
            title={collapsed ? "Expand navigation" : "Collapse navigation"}
          >
            {collapsed ? <ChevronsRight /> : <ChevronsLeft />}
            <span>Collapse sidebar</span>
          </Button>
        </div>
      </aside>
      <main className="main-content">
        <div className="breadcrumb">
          Workspace<span>/</span>
          {path === "/"
            ? "Command Center"
            : path === "/gaps"
              ? "Gap Explorer"
              : path === "/strengths"
                ? "Strength Defense"
                : "Brief Inspector"}
          <span className="breadcrumb-right">
            <span className="live-dot" /> Intelligence snapshot · 20 Nov 2026
          </span>
        </div>
        {children}
        <footer className="page-footer">
          <span>
            <span className="brand-footer">SNITCH</span> Creative intelligence, ready for action.
          </span>
          <span>
            872 ads · 556 concepts · 4 brands
            <ArrowUpRight size={13} />
          </span>
        </footer>
      </main>
      <Dialog open={searchOpen} onOpenChange={setSearchOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Search your workspace</DialogTitle>
            <DialogDescription>Opportunities, production briefs, and views</DialogDescription>
          </DialogHeader>
          <div className="input-wrap">
            <Search size={17} />
            <input
              autoFocus
              aria-label="Search workspace"
              placeholder="Search opportunities..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="search-results">
            {gaps
              .filter((g) =>
                `${g.name} ${g.dimension}`.toLowerCase().includes(search.toLowerCase()),
              )
              .map((g) => (
                <Link
                  key={g.id}
                  to="/briefs/$id"
                  params={{ id: g.id }}
                  onClick={() => setSearchOpen(false)}
                >
                  <FileText size={17} />
                  <div>
                    <strong>{g.name}</strong>
                    <small>{g.dimension} · Production brief</small>
                  </div>
                  <ArrowUpRight size={16} />
                </Link>
              ))}
            {gaps.filter((g) => g.name.toLowerCase().includes(search.toLowerCase())).length ===
              0 && <p className="text-muted-foreground">No matching opportunities.</p>}
          </div>
        </DialogContent>
      </Dialog>
      <Dialog open={newOpen} onOpenChange={setNewOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>New test hypothesis</DialogTitle>
            <DialogDescription>Snitch Workspace · Creative testing</DialogDescription>
          </DialogHeader>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!hypothesis.trim()) return;
              setSaved([...saved, hypothesis]);
              setHypothesis("");
              setNewOpen(false);
              toast.success("Hypothesis added to this session");
            }}
          >
            <label className="field-label" htmlFor="hypothesis">
              Hypothesis
            </label>
            <textarea
              id="hypothesis"
              required
              value={hypothesis}
              onChange={(e) => setHypothesis(e.target.value)}
              placeholder="A bundle-led carousel will improve 30-day creative survival..."
              rows={4}
            />
            <div className="form-footer">
              <ChipLike />
              <Button type="submit">
                <FlaskConical />
                Create hypothesis
              </Button>
            </div>
          </form>
          {saved.length > 0 && (
            <div className="saved-hypotheses">
              <h4>Session hypotheses ({saved.length})</h4>
              {saved.map((s, i) => (
                <p key={i}>
                  {s}
                  <Button
                    variant="ghost"
                    size="icon"
                    title="Remove hypothesis"
                    onClick={() => setSaved(saved.filter((_, j) => i !== j))}
                  >
                    <X />
                  </Button>
                </p>
              ))}
            </div>
          )}
        </DialogContent>
      </Dialog>
      <Toaster position="bottom-right" richColors />
    </div>
  );
}
function ChipLike() {
  return <span className="text-xs text-muted-foreground">Session only</span>;
}
