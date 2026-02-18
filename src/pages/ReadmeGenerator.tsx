"use client";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import {
  Github,
  Upload,
  Download,
  History,
  GitBranch,
  GitPullRequest,
  FileText,
  Check,
  X,
  Loader2,
  Eye,
  Clock,
  ArrowRight,
  ChevronDown,
  RefreshCw,
  Lock,
  Unlock,
  BookOpen,
  FolderOpen,
  Sparkles,
  Wand2,
} from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ScrollToTop from "@/components/ScrollToTop";
import ReadmeGeneratorWizard from "@/components/generator/Readme-generator";

// ─── Types ───────────────────────────────────────────────────────────────────

interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  private: boolean;
  description: string | null;
  html_url: string;
  default_branch: string;
}

interface GitHubBranch {
  name: string;
  commit: { sha: string };
}

interface FileVersion {
  sha: string;
  message: string;
  date: string;
  author: string;
  url: string;
}

interface GistFile {
  filename: string;
  type: string;
  language: string | null;
  size: number;
}

interface GitHubGist {
  id: string;
  description: string;
  public: boolean;
  created_at: string;
  files: Record<string, GistFile>;
  html_url: string;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function buildHeaders(token: string) {
  return {
    Authorization: `token ${token}`,
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
}

async function fetchJSON<T>(url: string, token: string): Promise<T> {
  const res = await fetch(url, { headers: buildHeaders(token) });
  if (!res.ok) throw new Error(`GitHub API ${res.status}: ${res.statusText}`);
  return res.json() as Promise<T>;
}

// ─── Corner Decoration ──────────────────────────────────────────────────────

function CornerDecorations() {
  return (
    <>
      <span className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-primary rounded-tl-sm" />
      <span className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-primary rounded-tr-sm" />
      <span className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-primary rounded-bl-sm" />
      <span className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-primary rounded-br-sm" />
    </>
  );
}

// ─── Main Page ───────────────────────────────────────────────────────────────

export default function ReadmeGenerator() {
  // View mode: "generator" = wizard, "github" = GitHub integration
  const [viewMode, setViewMode] = useState<"generator" | "github">("generator");

  // Auth
  const [token, setToken] = useState(() => localStorage.getItem("gh_pat") ?? "");
  const [tokenInput, setTokenInput] = useState("");
  const [showToken, setShowToken] = useState(false);
  const [isAuthed, setIsAuthed] = useState(false);
  const [authUser, setAuthUser] = useState<{ login: string; avatar_url: string } | null>(null);
  const [authLoading, setAuthLoading] = useState(false);

  // Repos
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [selectedRepo, setSelectedRepo] = useState<GitHubRepo | null>(null);
  const [reposLoading, setReposLoading] = useState(false);

  // Branches
  const [branches, setBranches] = useState<GitHubBranch[]>([]);
  const [selectedBranch, setSelectedBranch] = useState("");
  const [branchesLoading, setBranchesLoading] = useState(false);

  // README content
  const [readmeContent, setReadmeContent] = useState("");
  const [readmeSha, setReadmeSha] = useState("");
  const [readmeLoading, setReadmeLoading] = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false);

  // PR
  const [prBranch, setPrBranch] = useState("");
  const [prTitle, setPrTitle] = useState("docs: update README via README Design Kit");
  const [prBody, setPrBody] = useState("This PR was generated using [README Design Kit](https://github.com/Mayur-Pagote/README_Design_Kit).");
  const [prLoading, setPrLoading] = useState(false);
  const [showPrDialog, setShowPrDialog] = useState(false);

  // Version history
  const [versions, setVersions] = useState<FileVersion[]>([]);
  const [versionsLoading, setVersionsLoading] = useState(false);
  const [restoreLoading, setRestoreLoading] = useState<string | null>(null);

  // Gists
  const [gists, setGists] = useState<GitHubGist[]>([]);
  const [gistsLoading, setGistsLoading] = useState(false);
  const [gistDesc, setGistDesc] = useState("README via README Design Kit");
  const [gistLoading, setGistLoading] = useState(false);

  // Multi-file
  const [extraFile, setExtraFile] = useState<"CONTRIBUTING.md" | "SECURITY.md" | "">("");
  const [extraContent, setExtraContent] = useState("");

  // Active GitHub tab
  const [activeTab, setActiveTab] = useState<"sync" | "history" | "gist" | "multifile">("sync");

  // ── Auth ──────────────────────────────────────────────────────────────────

  const login = useCallback(async (t: string) => {
    setAuthLoading(true);
    try {
      const user = await fetchJSON<{ login: string; avatar_url: string }>(
        "https://api.github.com/user",
        t
      );
      localStorage.setItem("gh_pat", t);
      setToken(t);
      setIsAuthed(true);
      setAuthUser(user);
      toast.success(`Logged in as @${user.login}`);
    } catch {
      toast.error("Invalid token. Please check and try again.");
    } finally {
      setAuthLoading(false);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("gh_pat");
    setToken("");
    setTokenInput("");
    setIsAuthed(false);
    setAuthUser(null);
    setRepos([]);
    setSelectedRepo(null);
    setBranches([]);
    setReadmeContent("");
    setVersions([]);
    setGists([]);
    toast("Logged out from GitHub");
  };

  // Auto-login if token stored
  useEffect(() => {
    if (token && !isAuthed) login(token);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Repos & Branches ─────────────────────────────────────────────────────

  useEffect(() => {
    if (!isAuthed) return;
    setReposLoading(true);
    fetchJSON<GitHubRepo[]>("https://api.github.com/user/repos?per_page=100&sort=updated", token)
      .then(setRepos)
      .catch(() => toast.error("Failed to load repositories"))
      .finally(() => setReposLoading(false));
  }, [isAuthed, token]);

  const handleSelectRepo = async (repo: GitHubRepo) => {
    setSelectedRepo(repo);
    setReadmeContent("");
    setReadmeSha("");
    setVersions([]);
    setBranchesLoading(true);
    try {
      const data = await fetchJSON<GitHubBranch[]>(
        `https://api.github.com/repos/${repo.full_name}/branches?per_page=100`,
        token
      );
      setBranches(data);
      setSelectedBranch(repo.default_branch);
    } catch {
      toast.error("Failed to load branches");
    } finally {
      setBranchesLoading(false);
    }
  };

  // ── README sync ──────────────────────────────────────────────────────────

  const loadReadme = async () => {
    if (!selectedRepo || !selectedBranch) return;
    setReadmeLoading(true);
    try {
      const data = await fetchJSON<{ content: string; sha: string }>(
        `https://api.github.com/repos/${selectedRepo.full_name}/contents/README.md?ref=${selectedBranch}`,
        token
      );
      setReadmeContent(atob(data.content.replace(/\n/g, "")));
      setReadmeSha(data.sha);
      toast.success("README loaded from GitHub");
    } catch {
      toast.error("No README.md found on this branch");
    } finally {
      setReadmeLoading(false);
    }
  };

  const uploadReadme = async (openPr = false) => {
    if (!selectedRepo || !selectedBranch || !readmeContent) return;
    if (openPr) {
      setShowPrDialog(true);
      return;
    }
    setUploadLoading(true);
    try {
      const body: Record<string, unknown> = {
        message: "docs: update README via README Design Kit",
        content: btoa(unescape(encodeURIComponent(readmeContent))),
        branch: selectedBranch,
      };
      if (readmeSha) body.sha = readmeSha;
      const res = await fetch(
        `https://api.github.com/repos/${selectedRepo.full_name}/contents/README.md`,
        {
          method: "PUT",
          headers: { ...buildHeaders(token), "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );
      if (!res.ok) throw new Error();
      const data = await res.json();
      setReadmeSha(data.content.sha);
      toast.success("README uploaded to GitHub!");
    } catch {
      toast.error("Failed to upload README");
    } finally {
      setUploadLoading(false);
    }
  };

  // ── Pull Request ─────────────────────────────────────────────────────────

  const createPR = async () => {
    if (!selectedRepo || !selectedBranch || !prBranch) return;
    setPrLoading(true);
    try {
      const base = await fetchJSON<{ object: { sha: string } }>(
        `https://api.github.com/repos/${selectedRepo.full_name}/git/ref/heads/${selectedBranch}`,
        token
      );
      await fetch(
        `https://api.github.com/repos/${selectedRepo.full_name}/git/refs`,
        {
          method: "POST",
          headers: { ...buildHeaders(token), "Content-Type": "application/json" },
          body: JSON.stringify({ ref: `refs/heads/${prBranch}`, sha: base.object.sha }),
        }
      );
      const fileBody: Record<string, unknown> = {
        message: prTitle,
        content: btoa(unescape(encodeURIComponent(readmeContent))),
        branch: prBranch,
      };
      if (readmeSha) fileBody.sha = readmeSha;
      await fetch(
        `https://api.github.com/repos/${selectedRepo.full_name}/contents/README.md`,
        {
          method: "PUT",
          headers: { ...buildHeaders(token), "Content-Type": "application/json" },
          body: JSON.stringify(fileBody),
        }
      );
      const prRes = await fetch(
        `https://api.github.com/repos/${selectedRepo.full_name}/pulls`,
        {
          method: "POST",
          headers: { ...buildHeaders(token), "Content-Type": "application/json" },
          body: JSON.stringify({ title: prTitle, body: prBody, head: prBranch, base: selectedBranch }),
        }
      );
      const pr = await prRes.json();
      toast.success(
        <span>
          PR created!{" "}
          <a href={pr.html_url} target="_blank" rel="noreferrer" className="underline text-primary">
            View on GitHub
          </a>
        </span>
      );
      setShowPrDialog(false);
    } catch {
      toast.error("Failed to create Pull Request");
    } finally {
      setPrLoading(false);
    }
  };

  // ── Version History ───────────────────────────────────────────────────────

  const loadVersions = async () => {
    if (!selectedRepo || !selectedBranch) return;
    setVersionsLoading(true);
    try {
      const data = await fetchJSON<
        { sha: string; commit: { message: string; author: { date: string; name: string } }; html_url: string }[]
      >(
        `https://api.github.com/repos/${selectedRepo.full_name}/commits?path=README.md&sha=${selectedBranch}&per_page=20`,
        token
      );
      setVersions(
        data.map((c) => ({
          sha: c.sha,
          message: c.commit.message,
          date: c.commit.author.date,
          author: c.commit.author.name,
          url: c.html_url,
        }))
      );
    } catch {
      toast.error("Failed to load version history");
    } finally {
      setVersionsLoading(false);
    }
  };

  const restoreVersion = async (sha: string) => {
    if (!selectedRepo) return;
    setRestoreLoading(sha);
    try {
      const data = await fetchJSON<{ content: string; sha: string }>(
        `https://api.github.com/repos/${selectedRepo.full_name}/contents/README.md?ref=${sha}`,
        token
      );
      setReadmeContent(atob(data.content.replace(/\n/g, "")));
      toast.success("Version restored to editor — switch to Sync tab to push changes");
    } catch {
      toast.error("Failed to restore this version");
    } finally {
      setRestoreLoading(null);
    }
  };

  // ── Gists ─────────────────────────────────────────────────────────────────

  const loadGists = async () => {
    setGistsLoading(true);
    try {
      const data = await fetchJSON<GitHubGist[]>(
        "https://api.github.com/gists?per_page=30",
        token
      );
      setGists(data);
    } catch {
      toast.error("Failed to load Gists");
    } finally {
      setGistsLoading(false);
    }
  };

  const createGist = async () => {
    if (!readmeContent) {
      toast.error("README content is empty");
      return;
    }
    setGistLoading(true);
    try {
      const res = await fetch("https://api.github.com/gists", {
        method: "POST",
        headers: { ...buildHeaders(token), "Content-Type": "application/json" },
        body: JSON.stringify({
          description: gistDesc,
          public: false,
          files: { "README.md": { content: readmeContent } },
        }),
      });
      const gist = await res.json();
      toast.success(
        <span>
          Gist created!{" "}
          <a href={gist.html_url} target="_blank" rel="noreferrer" className="underline text-primary">
            View Gist
          </a>
        </span>
      );
      await loadGists();
    } catch {
      toast.error("Failed to create Gist");
    } finally {
      setGistLoading(false);
    }
  };

  // ── Multi-file upload ─────────────────────────────────────────────────────

  const uploadExtraFile = async () => {
    if (!selectedRepo || !selectedBranch || !extraFile || !extraContent) return;
    setUploadLoading(true);
    try {
      let existingSha = "";
      try {
        const existing = await fetchJSON<{ sha: string }>(
          `https://api.github.com/repos/${selectedRepo.full_name}/contents/${extraFile}?ref=${selectedBranch}`,
          token
        );
        existingSha = existing.sha;
      } catch { /* new file */ }

      const body: Record<string, unknown> = {
        message: `docs: update ${extraFile} via README Design Kit`,
        content: btoa(unescape(encodeURIComponent(extraContent))),
        branch: selectedBranch,
      };
      if (existingSha) body.sha = existingSha;

      const res = await fetch(
        `https://api.github.com/repos/${selectedRepo.full_name}/contents/${extraFile}`,
        {
          method: "PUT",
          headers: { ...buildHeaders(token), "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );
      if (!res.ok) throw new Error();
      toast.success(`${extraFile} uploaded to GitHub!`);
    } catch {
      toast.error(`Failed to upload ${extraFile}`);
    } finally {
      setUploadLoading(false);
    }
  };

  // ── UI ────────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-background text-foreground">
      <ScrollToTop />

      {/* ── Page Header ── */}
      <section className="relative pt-16 pb-8 px-6 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/5 via-background to-background" />
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center text-center gap-3"
          >
            <div className="flex items-center gap-2">
              <Sparkles className="h-8 w-8 text-primary" />
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-foreground via-primary to-primary bg-clip-text text-transparent">
                README Generator
              </h1>
            </div>
            <p className="text-muted-foreground text-lg max-w-2xl">
              Create stunning GitHub profile READMEs with our step-by-step wizard,
              then sync directly with GitHub — load, push, open PRs, and manage versions.
            </p>
            <div className="flex flex-wrap gap-2 mt-1">
              {["Profile Builder", "Direct Sync", "PR Workflow", "Version History", "Gist Support"].map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Mode Switcher ── */}
      <div className="container mx-auto max-w-5xl px-6 mb-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="flex justify-center gap-3"
        >
          <button
            onClick={() => setViewMode("generator")}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-200 border ${
              viewMode === "generator"
                ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20"
                : "bg-card border-border text-muted-foreground hover:text-foreground hover:border-primary/40"
            }`}
          >
            <Wand2 className="h-4 w-4" />
            Profile Builder
          </button>
          <button
            onClick={() => setViewMode("github")}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-200 border ${
              viewMode === "github"
                ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20"
                : "bg-card border-border text-muted-foreground hover:text-foreground hover:border-primary/40"
            }`}
          >
            <Github className="h-4 w-4" />
            GitHub Sync
          </button>
        </motion.div>
      </div>

      {/* ── Content Area ── */}
      <AnimatePresence mode="wait">
        {/* ════════════════════════════════════════════════════════════════════
            VIEW 1: Profile Builder Wizard
            ════════════════════════════════════════════════════════════════════ */}
        {viewMode === "generator" && (
          <motion.div
            key="generator-view"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 40 }}
            transition={{ duration: 0.35 }}
          >
            <ReadmeGeneratorWizard />
          </motion.div>
        )}

        {/* ════════════════════════════════════════════════════════════════════
            VIEW 2: GitHub Sync
            ════════════════════════════════════════════════════════════════════ */}
        {viewMode === "github" && (
          <motion.div
            key="github-view"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.35 }}
            className="container mx-auto max-w-5xl px-6 pb-20 space-y-8"
          >

            {/* ── Auth Card ── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="relative rounded-xl border border-border bg-card p-6 shadow-sm"
            >
              <CornerDecorations />

              <div className="flex items-center gap-2 mb-4">
                <Lock className="h-5 w-5 text-primary" />
                <h2 className="text-lg font-semibold">Authentication</h2>
                {isAuthed && (
                  <Badge className="ml-auto bg-green-500/15 text-green-400 border-green-500/30">
                    <Check className="h-3 w-3 mr-1" /> Connected
                  </Badge>
                )}
              </div>

              {!isAuthed ? (
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    Enter a GitHub{" "}
                    <a
                      href="https://github.com/settings/tokens/new?scopes=repo,gist"
                      target="_blank"
                      rel="noreferrer"
                      className="text-primary underline"
                    >
                      Personal Access Token
                    </a>{" "}
                    with <code className="bg-muted px-1 rounded text-xs">repo</code> and{" "}
                    <code className="bg-muted px-1 rounded text-xs">gist</code> scopes.
                  </p>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Input
                        type={showToken ? "text" : "password"}
                        placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
                        value={tokenInput}
                        onChange={(e) => setTokenInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && login(tokenInput)}
                        className="pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowToken((v) => !v)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showToken ? <Unlock className="h-4 w-4" /> : <Lock className="h-4 w-4" />}
                      </button>
                    </div>
                    <Button onClick={() => login(tokenInput)} disabled={authLoading || !tokenInput}>
                      {authLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Connect"}
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Your token is stored only in <code className="bg-muted px-1 rounded">localStorage</code> on your browser.
                  </p>
                </div>
              ) : (
                <div className="flex items-center gap-4">
                  {authUser && (
                    <>
                      <img src={authUser.avatar_url} alt={authUser.login} className="h-9 w-9 rounded-full ring-2 ring-primary" />
                      <div>
                        <p className="font-medium">@{authUser.login}</p>
                        <p className="text-xs text-muted-foreground">GitHub account connected</p>
                      </div>
                    </>
                  )}
                  <Button variant="outline" size="sm" className="ml-auto" onClick={logout}>
                    <X className="h-4 w-4 mr-1" /> Disconnect
                  </Button>
                </div>
              )}
            </motion.div>

            {/* ── Repo & Branch Selector ── */}
            <AnimatePresence>
              {isAuthed && (
                <motion.div
                  key="repo-panel"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ delay: 0.15, duration: 0.5 }}
                  className="relative rounded-xl border border-border bg-card p-6 shadow-sm"
                >
                  <CornerDecorations />

                  <div className="flex items-center gap-2 mb-4">
                    <FolderOpen className="h-5 w-5 text-primary" />
                    <h2 className="text-lg font-semibold">Select Repository & Branch</h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Repo dropdown */}
                    <div>
                      <Label className="mb-1.5 block text-sm">Repository</Label>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" className="w-full justify-between" disabled={reposLoading}>
                            {reposLoading ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <span className="truncate">{selectedRepo?.name ?? "Choose a repo..."}</span>
                            )}
                            <ChevronDown className="h-4 w-4 ml-2 shrink-0" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-72 max-h-72 overflow-y-auto">
                          {repos.map((r) => (
                            <DropdownMenuItem key={r.id} onSelect={() => handleSelectRepo(r)}>
                              <div className="flex items-center gap-2 w-full">
                                {r.private ? <Lock className="h-3 w-3 text-muted-foreground" /> : <Github className="h-3 w-3 text-muted-foreground" />}
                                <span className="truncate">{r.name}</span>
                                {r.private && <Badge variant="outline" className="ml-auto text-[10px]">Private</Badge>}
                              </div>
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    {/* Branch dropdown */}
                    <div>
                      <Label className="mb-1.5 block text-sm">Branch</Label>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" className="w-full justify-between" disabled={branchesLoading || !selectedRepo}>
                            {branchesLoading ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <span className="flex items-center gap-2 truncate">
                                <GitBranch className="h-3.5 w-3.5 text-muted-foreground" />
                                {selectedBranch || "Choose a branch..."}
                              </span>
                            )}
                            <ChevronDown className="h-4 w-4 ml-2 shrink-0" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-64 max-h-60 overflow-y-auto">
                          {branches.map((b) => (
                            <DropdownMenuItem key={b.name} onSelect={() => setSelectedBranch(b.name)}>
                              <GitBranch className="h-3.5 w-3.5 mr-2 text-muted-foreground" />
                              {b.name}
                              {b.name === selectedRepo?.default_branch && (
                                <Badge variant="secondary" className="ml-auto text-[10px]">default</Badge>
                              )}
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ── Tab Navigation ── */}
            <AnimatePresence>
              {isAuthed && selectedRepo && (
                <motion.div
                  key="tabs"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <div className="flex flex-wrap gap-2">
                    {([
                      { key: "sync", label: "README Sync", icon: RefreshCw },
                      { key: "history", label: "Version History", icon: History },
                      { key: "gist", label: "Gist", icon: BookOpen },
                      { key: "multifile", label: "Multi-file", icon: FileText },
                    ] as const).map(({ key, label, icon: Icon }) => (
                      <button
                        key={key}
                        onClick={() => setActiveTab(key)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border ${
                          activeTab === key
                            ? "bg-primary text-primary-foreground border-primary shadow"
                            : "bg-card border-border text-muted-foreground hover:text-foreground hover:border-primary/40"
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                        {label}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ── Tab Panels ── */}
            <AnimatePresence mode="wait">

              {/* ── Sync Tab ── */}
              {isAuthed && selectedRepo && activeTab === "sync" && (
                <motion.div
                  key="sync-panel"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.3 }}
                  className="relative rounded-xl border border-border bg-card p-6 shadow-sm space-y-5"
                >
                  <CornerDecorations />

                  <div className="flex items-center gap-2">
                    <RefreshCw className="h-5 w-5 text-primary" />
                    <h2 className="text-lg font-semibold">README Sync</h2>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">
                      Load the existing <code className="bg-muted px-1 rounded text-xs">README.md</code> from{" "}
                      <span className="text-primary font-medium">{selectedRepo.full_name}</span> /{" "}
                      <span className="text-primary font-medium">{selectedBranch}</span> into the editor below.
                    </p>
                    <Button variant="outline" onClick={loadReadme} disabled={readmeLoading}>
                      {readmeLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Download className="h-4 w-4 mr-2" />}
                      Load README from GitHub
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <Label>README Content</Label>
                    <textarea
                      className="w-full h-72 rounded-lg border border-border bg-background p-3 text-sm font-mono resize-y focus:outline-none focus:ring-2 focus:ring-primary/40"
                      placeholder="Load a README from GitHub or paste / type Markdown here…"
                      value={readmeContent}
                      onChange={(e) => setReadmeContent(e.target.value)}
                    />
                  </div>

                  {readmeContent && (
                    <div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-muted-foreground"
                        onClick={() =>
                          window.open(
                            `https://github.com/${selectedRepo.full_name}/blob/${selectedBranch}/README.md`,
                            "_blank"
                          )
                        }
                      >
                        <Eye className="h-4 w-4 mr-1" /> View on GitHub
                      </Button>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-2">
                    <Button
                      onClick={() => uploadReadme(false)}
                      disabled={uploadLoading || !readmeContent}
                    >
                      {uploadLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Upload className="h-4 w-4 mr-2" />}
                      Push to {selectedBranch}
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => uploadReadme(true)}
                      disabled={!readmeContent}
                    >
                      <GitPullRequest className="h-4 w-4 mr-2" />
                      Open Pull Request
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* ── Version History Tab ── */}
              {isAuthed && selectedRepo && activeTab === "history" && (
                <motion.div
                  key="history-panel"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.3 }}
                  className="relative rounded-xl border border-border bg-card p-6 shadow-sm space-y-5"
                >
                  <CornerDecorations />

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <History className="h-5 w-5 text-primary" />
                      <h2 className="text-lg font-semibold">Version History</h2>
                    </div>
                    <Button variant="outline" size="sm" onClick={loadVersions} disabled={versionsLoading}>
                      {versionsLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4 mr-1" />}
                      Load History
                    </Button>
                  </div>

                  {versions.length === 0 && !versionsLoading && (
                    <p className="text-sm text-muted-foreground">
                      Click "Load History" to see README.md commit history for this repo.
                    </p>
                  )}

                  <div className="space-y-3">
                    {versions.map((v) => (
                      <motion.div
                        key={v.sha}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-start gap-3 p-3 rounded-lg border border-border hover:border-primary/40 transition-colors group"
                      >
                        <div className="w-2 h-2 rounded-full bg-primary mt-1.5 shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{v.message}</p>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
                            <Clock className="h-3 w-3" />
                            {new Date(v.date).toLocaleDateString(undefined, { dateStyle: "medium" })}
                            <span className="font-mono opacity-60">{v.sha.slice(0, 7)}</span>
                            <span>by {v.author}</span>
                          </div>
                        </div>
                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                          <Button variant="ghost" size="icon" className="h-7 w-7" title="View on GitHub" onClick={() => window.open(v.url, "_blank")}>
                            <Eye className="h-3.5 w-3.5" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 text-primary"
                            title="Restore this version"
                            onClick={() => restoreVersion(v.sha)}
                            disabled={restoreLoading === v.sha}
                          >
                            {restoreLoading === v.sha ? (
                              <Loader2 className="h-3.5 w-3.5 animate-spin" />
                            ) : (
                              <RefreshCw className="h-3.5 w-3.5" />
                            )}
                          </Button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* ── Gist Tab ── */}
              {isAuthed && selectedRepo && activeTab === "gist" && (
                <motion.div
                  key="gist-panel"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.3 }}
                  className="relative rounded-xl border border-border bg-card p-6 shadow-sm space-y-5"
                >
                  <CornerDecorations />

                  <div className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-primary" />
                    <h2 className="text-lg font-semibold">Save to GitHub Gist</h2>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <Label className="mb-1.5 block text-sm">Gist Description</Label>
                      <Input value={gistDesc} onChange={(e) => setGistDesc(e.target.value)} placeholder="My README..." />
                    </div>
                    <div>
                      <Label className="mb-1.5 block text-sm">README Content (from Sync tab)</Label>
                      <textarea
                        className="w-full h-40 rounded-lg border border-border bg-background p-3 text-sm font-mono resize-y focus:outline-none focus:ring-2 focus:ring-primary/40"
                        placeholder="Load content from the Sync tab first, or paste here…"
                        value={readmeContent}
                        onChange={(e) => setReadmeContent(e.target.value)}
                      />
                    </div>
                    <Button onClick={createGist} disabled={gistLoading || !readmeContent}>
                      {gistLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Upload className="h-4 w-4 mr-2" />}
                      Create Private Gist
                    </Button>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-sm font-medium">Your Gists</p>
                      <Button variant="ghost" size="sm" onClick={loadGists} disabled={gistsLoading}>
                        {gistsLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4 mr-1" />}
                        Refresh
                      </Button>
                    </div>
                    {gists.length === 0 ? (
                      <p className="text-xs text-muted-foreground">No gists loaded. Click Refresh to load.</p>
                    ) : (
                      <div className="space-y-2">
                        {gists.map((g) => (
                          <div
                            key={g.id}
                            className="flex items-center gap-3 p-3 rounded-lg border border-border hover:border-primary/40 transition-colors"
                          >
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium truncate">{g.description || "Untitled Gist"}</p>
                              <p className="text-xs text-muted-foreground mt-0.5">
                                {Object.keys(g.files).join(", ")} · {new Date(g.created_at).toLocaleDateString()}
                              </p>
                            </div>
                            <Button variant="ghost" size="icon" className="h-7 w-7 shrink-0" onClick={() => window.open(g.html_url, "_blank")}>
                              <Eye className="h-3.5 w-3.5" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {/* ── Multi-file Tab ── */}
              {isAuthed && selectedRepo && activeTab === "multifile" && (
                <motion.div
                  key="multifile-panel"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.3 }}
                  className="relative rounded-xl border border-border bg-card p-6 shadow-sm space-y-5"
                >
                  <CornerDecorations />

                  <div className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    <h2 className="text-lg font-semibold">Multi-file Upload</h2>
                  </div>

                  <p className="text-sm text-muted-foreground">
                    Upload other documentation files (e.g.{" "}
                    <code className="bg-muted px-1 rounded text-xs">CONTRIBUTING.md</code>,{" "}
                    <code className="bg-muted px-1 rounded text-xs">SECURITY.md</code>) to the same repo and branch.
                  </p>

                  <div className="space-y-4">
                    <div>
                      <Label className="mb-1.5 block text-sm">Target File</Label>
                      <div className="flex gap-2">
                        {(["CONTRIBUTING.md", "SECURITY.md"] as const).map((f) => (
                          <button
                            key={f}
                            onClick={() => setExtraFile(f)}
                            className={`px-3 py-1.5 rounded-lg text-sm border transition-all ${
                              extraFile === f
                                ? "bg-primary text-primary-foreground border-primary"
                                : "bg-card border-border text-muted-foreground hover:border-primary/40"
                            }`}
                          >
                            {f}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <Label className="mb-1.5 block text-sm">File Content</Label>
                      <textarea
                        className="w-full h-56 rounded-lg border border-border bg-background p-3 text-sm font-mono resize-y focus:outline-none focus:ring-2 focus:ring-primary/40"
                        placeholder={`Paste or type ${extraFile || "file"} content here…`}
                        value={extraContent}
                        onChange={(e) => setExtraContent(e.target.value)}
                      />
                    </div>
                    <Button onClick={uploadExtraFile} disabled={uploadLoading || !extraFile || !extraContent}>
                      {uploadLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Upload className="h-4 w-4 mr-2" />}
                      Upload {extraFile || "File"} to GitHub
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ── Empty state ── */}
            {!isAuthed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-center py-24 text-muted-foreground"
              >
                <Github className="h-14 w-14 mx-auto mb-4 opacity-20" />
                <p className="text-lg font-medium">Connect your GitHub account to get started</p>
                <p className="text-sm mt-1">Use the Authentication panel above to enter your Personal Access Token.</p>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── PR Dialog ── */}
      <Dialog open={showPrDialog} onOpenChange={setShowPrDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <GitPullRequest className="h-5 w-5 text-primary" />
              Open Pull Request
            </DialogTitle>
            <DialogDescription>
              Create a new branch with your README changes and open a PR into{" "}
              <strong>{selectedBranch}</strong>.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div>
              <Label className="mb-1.5 block text-sm">New Branch Name</Label>
              <Input
                placeholder="docs/update-readme"
                value={prBranch}
                onChange={(e) => setPrBranch(e.target.value)}
              />
            </div>
            <div>
              <Label className="mb-1.5 block text-sm">PR Title</Label>
              <Input value={prTitle} onChange={(e) => setPrTitle(e.target.value)} />
            </div>
            <div>
              <Label className="mb-1.5 block text-sm">PR Description</Label>
              <textarea
                className="w-full h-24 rounded-lg border border-border bg-background p-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/40"
                value={prBody}
                onChange={(e) => setPrBody(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowPrDialog(false)}>Cancel</Button>
            <Button onClick={createPR} disabled={prLoading || !prBranch}>
              {prLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <ArrowRight className="h-4 w-4 mr-2" />}
              Create PR
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
