import { useState, useEffect } from "react";
import {
  Lightbulb,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Zap,
  Settings,
  RefreshCw,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { analyzeBranding } from "@/utils/brandingAnalyzer";
import type { BrandingTone, BrandingAnalysis } from "@/types/branding";
import type { ElementType } from "@/types/elements";

interface BrandingAssistantProps {
  elements: ElementType[];
  isEditorActive: boolean;
  onApplySuggestion: (elementId: string, newContent: string) => void;
}

const TONE_DESCRIPTIONS: Record<BrandingTone, string> = {
  casual: "Friendly and approachable, perfect for personal projects",
  technical: "Precise and detailed, ideal for developer tools",
  professional: "Polished and confident, great for business solutions",
  "open-source": "Welcoming and inclusive, perfect for community projects",
};

const SEVERITY_COLORS = {
  high: "destructive",
  medium: "default",
  low: "secondary",
} as const;

const SEVERITY_ICONS = {
  high: AlertCircle,
  medium: Lightbulb,
  low: CheckCircle,
};

export function BrandingAssistant({
  elements,
  isEditorActive,
  onApplySuggestion,
}: BrandingAssistantProps) {
  const [selectedTone, setSelectedTone] = useState<BrandingTone>("professional");
  const [analysis, setAnalysis] = useState<BrandingAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  useEffect(() => {
    if (!isEditorActive) return;
    const analyzeContent = async () => {
      setIsAnalyzing(true);
      await new Promise((res) => setTimeout(res, 500));
      const result = analyzeBranding(elements, selectedTone);
      setAnalysis(result);
      setIsAnalyzing(false);
    };
    analyzeContent();
  }, [elements, selectedTone, isEditorActive]);

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="w-full border-l border-border bg-background flex flex-col">
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-2 mb-4">
          <Zap className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold">Branding Assistant</h2>
          <Badge variant="secondary">AI</Badge>
        </div>

        <div className="space-y-3">
          <div>
            <label className="text-sm font-medium mb-2 block">Brand Tone</label>
            <Select
              value={selectedTone}
              onValueChange={(val) => setSelectedTone(val as BrandingTone)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(TONE_DESCRIPTIONS).map((tone) => (
                  <SelectItem key={tone} value={tone}>
                    {tone.charAt(0).toUpperCase() + tone.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground mt-1">
              {TONE_DESCRIPTIONS[selectedTone]}
            </p>

            {analysis?.detectedTone && analysis.detectedTone !== selectedTone && (
              <p className="text-xs text-yellow-600 mt-2">
                Detected tone: <strong>{analysis.detectedTone}</strong>
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-4 space-y-4">
        {isAnalyzing ? (
          <div className="flex items-center justify-center py-8">
            <div className="flex items-center gap-2 text-muted-foreground">
              <RefreshCw className="h-4 w-4 animate-spin" />
              <span className="text-sm">Analyzing content...</span>
            </div>
          </div>
        ) : analysis ? (
          <>
            <div className="grid grid-cols-1 gap-3">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <TrendingUp className="h-4 w-4" />
                    Overall Score
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center gap-2">
                    <Progress value={analysis.overallScore} className="flex-1" />
                    <span className={`text-sm font-medium ${getScoreColor(analysis.overallScore)}`}>
                      {analysis.overallScore}%
                    </span>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <Settings className="h-4 w-4" />
                    Tone Consistency
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center gap-2">
                    <Progress value={analysis.toneConsistency} className="flex-1" />
                    <span className={`text-sm font-medium ${getScoreColor(analysis.toneConsistency)}`}>
                      {analysis.toneConsistency}%
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-3">
                <Lightbulb className="h-4 w-4" />
                <h3 className="font-medium">Suggestions</h3>
                <Badge variant="outline" className="text-xs">
                  {analysis.suggestions.length}
                </Badge>
              </div>

              {analysis.suggestions.length === 0 ? (
                <div className="text-center py-6 text-muted-foreground">
                  <CheckCircle className="h-8 w-8 mx-auto mb-2 text-green-500" />
                  <p className="text-sm">Great job! No suggestions at the moment.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {analysis.suggestions.map((s, index) => {
                    const Icon = SEVERITY_ICONS[s.severity];
                    return (
                      <Card key={index} className="p-3">
                        <div className="flex items-start gap-3">
                          <Icon
                            className={`h-4 w-4 mt-0.5 ${
                              s.severity === "high"
                                ? "text-red-500"
                                : s.severity === "medium"
                                ? "text-yellow-500"
                                : "text-green-500"
                            }`}
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <Badge variant={SEVERITY_COLORS[s.severity]} className="text-xs">
                                {s.section}
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                {s.type}
                              </Badge>
                            </div>

                            <p className="text-sm text-foreground mb-1">{s.suggestion}</p>
                            <p className="text-xs text-muted-foreground">{s.reason}</p>

                            {(s.fixType || s.confidence) && (
                              <p className="text-xs text-muted-foreground mt-1 italic">
                                {s.fixType && `Fix type: ${s.fixType}`}
                                {s.fixType && s.confidence && " • "}
                                {s.confidence && `Confidence: ${(s.confidence * 100).toFixed(0)}%`}
                              </p>
                            )}

                            {s.excerpt && (
                              <blockquote className="text-xs text-muted-foreground italic border-l pl-3 mt-2">
                                “…{s.excerpt.trim()}…”
                              </blockquote>
                            )}

                            {s.elementId && s.fix && (
                              <button
                                onClick={() => onApplySuggestion(s.elementId!, s.fix!)}
                                className="mt-2 text-xs text-primary hover:underline"
                              >
                                Apply fix
                              </button>
                            )}
                          </div>
                        </div>
                      </Card>
                    );
                  })}
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center py-8 text-muted-foreground">
            <Lightbulb className="h-5 w-5 mr-2" />
            <span className="text-sm">No analysis available.</span>
          </div>
        )}
      </div>
    </div>
  );
}
