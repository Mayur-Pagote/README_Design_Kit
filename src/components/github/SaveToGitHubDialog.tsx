import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, GitCommit, Github } from 'lucide-react';
import { toast } from 'sonner';
import { getUserRepos, getRepoBranches, commitFilesToGitHub } from '@/services/githubService';
import { GitHubTokenDialog } from './GitHubTokenDialog';

interface SaveToGitHubDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    files: { path: string; content: string }[];
    defaultMessage?: string;
}

export const SaveToGitHubDialog: React.FC<SaveToGitHubDialogProps> = ({
    open,
    onOpenChange,
    files,
    defaultMessage = 'Update README.md via Readme Design Kit'
}) => {
    // State
    const [tokenDialogOpen, setTokenDialogOpen] = useState(false);
    const [isLoadingRepos, setIsLoadingRepos] = useState(false);
    const [isLoadingBranches, setIsLoadingBranches] = useState(false);
    const [isCommitting, setIsCommitting] = useState(false);
    const [repos, setRepos] = useState<any[]>([]);
    const [branches, setBranches] = useState<any[]>([]);

    // Selection State
    const [selectedRepo, setSelectedRepo] = useState<string>('');
    const [selectedBranch, setSelectedBranch] = useState<string>('');
    const [commitMessage, setCommitMessage] = useState(defaultMessage);

    // Checks
    const [hasToken, setHasToken] = useState(false);

    useEffect(() => {
        if (open) {
            checkToken();
        }
    }, [open]);

    useEffect(() => {
        if (hasToken && open) {
            fetchRepos();
        }
    }, [hasToken, open]);

    useEffect(() => {
        if (selectedRepo && hasToken) {
            fetchBranches(selectedRepo);
        }
    }, [selectedRepo]);

    const checkToken = () => {
        const token = sessionStorage.getItem('github-token'); // Use sessionStorage instead of localStorage
        if (!token) {
            setHasToken(false);
            // Automatically open token dialog if no token
            setTokenDialogOpen(true);
        } else {
            setHasToken(true);
        }
    };

    const fetchRepos = async () => {
        setIsLoadingRepos(true);
        try {
            const token = sessionStorage.getItem('github-token'); // Use sessionStorage here
            if (!token) return;
            const data = await getUserRepos(token);
            setRepos(data);
        } catch (error) {
            console.error('Failed to fetch repos:', error);
            toast.error('Failed to load repositories. Your token might be expired.');
            setHasToken(false);
            setTokenDialogOpen(true);
        } finally {
            setIsLoadingRepos(false);
        }
    };

    const fetchBranches = async (repoFullName: string) => {
        if (!repoFullName) return;
        setIsLoadingBranches(true);
        const [owner, repo] = repoFullName.split('/');
        try {
            const token = sessionStorage.getItem('github-token'); // Use sessionStorage here
            if (!token) return;
            const data = await getRepoBranches(owner, repo, token);
            setBranches(data);

            // Auto-select 'main' or 'master' if available
            const defaultBranch = data.find((b: any) => b.name === 'main' || b.name === 'master');
            if (defaultBranch) {
                setSelectedBranch(defaultBranch.name);
            } else if (data.length > 0) {
                setSelectedBranch(data[0].name);
            }
        } catch (error) {
            console.error('Failed to fetch branches:', error);
            toast.error('Failed to load branches.');
        } finally {
            setIsLoadingBranches(false);
        }
    };

    const handleCommit = async () => {
        if (!selectedRepo || !selectedBranch || !commitMessage) {
            toast.error('Please fill in all fields.');
            return;
        }

        setIsCommitting(true);
        const [owner, repo] = selectedRepo.split('/');
        const token = sessionStorage.getItem('github-token'); // Use sessionStorage here

        if (!token) {
            toast.error('Authentication token missing.');
            return;
        }

        try {
            await commitFilesToGitHub(
                token,
                owner,
                repo,
                selectedBranch,
                commitMessage,
                files
            );

            toast.success(`Successfully saved to ${selectedRepo}!`);
            onOpenChange(false);
            setCommitMessage(defaultMessage); // Reset message
        } catch (error: any) {
            console.error('Commit failed:', error);
            toast.error(`Commit failed: ${error.message}`);
        } finally {
            setIsCommitting(false);
        }
    };

    return (
        <>
            <Dialog open={open} onOpenChange={onOpenChange}>
                <DialogContent className="sm:max-w-lg">
                    <DialogHeader>
                        <DialogTitle className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Github className="h-5 w-5" />
                                Save to GitHub
                            </div>
                            {hasToken && (
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-8 text-xs text-muted-foreground hover:text-destructive"
                                    onClick={() => {
                                        sessionStorage.removeItem('github-token'); // Use sessionStorage here
                                        setHasToken(false);
                                        setRepos([]);
                                        setBranches([]);
                                        setSelectedRepo('');
                                        setSelectedBranch('');
                                        toast.success('GitHub token removed');
                                        setTokenDialogOpen(true);
                                    }}
                                >
                                    Disconnect
                                </Button>
                            )}
                        </DialogTitle>
                        <DialogDescription>
                            Commit your changes directly to a GitHub repository.
                        </DialogDescription>
                    </DialogHeader>

                    {/* Content... */}
                    <DialogFooter>
                        <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
                        <Button onClick={handleCommit} disabled={isCommitting || !selectedRepo || !selectedBranch}>
                            {isCommitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Commit Changes
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <GitHubTokenDialog
                open={tokenDialogOpen}
                onOpenChange={(open) => {
                    setTokenDialogOpen(open);
                }}
                onTokenSaved={() => {
                    setHasToken(true);
                    fetchRepos();
                }}
            />
        </>
    );
};