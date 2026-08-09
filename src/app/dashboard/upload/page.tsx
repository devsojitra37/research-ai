"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatFileSize, SUPPORTED_FILE_TYPES, FILE_EXTENSIONS, MAX_FILE_SIZE } from "@/lib/utils";
import { toast } from "sonner";
import {
  Upload,
  FileText,
  X,
  CheckCircle2,
  AlertCircle,
  Cloud,
  Sparkles,
  Brain,
  ArrowRight,
  File,
  Loader2,
} from "lucide-react";

interface UploadedFile {
  file: File;
  id: string;
  status: "pending" | "uploading" | "processing" | "completed" | "error";
  progress: number;
  error?: string;
  documentId?: string;
}

export default function UploadPage() {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const router = useRouter();

  const onDrop = useCallback((acceptedFiles: File[], rejectedFiles: any[]) => {
    // Handle rejected files
    rejectedFiles.forEach((rejected) => {
      const reason = rejected.errors[0]?.message || "File not supported";
      toast.error(`${rejected.file.name}: ${reason}`);
    });

    // Add accepted files
    const newFiles: UploadedFile[] = acceptedFiles.map((file) => ({
      file,
      id: crypto.randomUUID(),
      status: "pending" as const,
      progress: 0,
    }));

    setFiles((prev) => [...prev, ...newFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
      "text/plain": [".txt"],
      "application/vnd.openxmlformats-officedocument.presentationml.presentation": [".pptx"],
    },
    maxSize: MAX_FILE_SIZE,
    multiple: true,
  });

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const getFileIcon = (type: string) => {
    return FILE_EXTENSIONS[type] || "FILE";
  };

  const uploadFiles = async () => {
    if (files.length === 0) return;
    setUploading(true);

    for (const uploadFile of files) {
      if (uploadFile.status !== "pending") continue;

      // Update to uploading
      setFiles((prev) =>
        prev.map((f) => (f.id === uploadFile.id ? { ...f, status: "uploading", progress: 30 } : f))
      );

      try {
        const formData = new FormData();
        formData.append("file", uploadFile.file);

        const res = await fetch("/api/documents/upload", {
          method: "POST",
          body: formData,
        });

        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.error || "Upload failed");
        }

        const data = await res.json();

        setFiles((prev) =>
          prev.map((f) =>
            f.id === uploadFile.id
              ? { ...f, status: "completed", progress: 100, documentId: data.document?.id }
              : f
          )
        );

        toast.success(`${uploadFile.file.name} uploaded successfully!`);
      } catch (error: any) {
        setFiles((prev) =>
          prev.map((f) =>
            f.id === uploadFile.id
              ? { ...f, status: "error", error: error.message || "Upload failed" }
              : f
          )
        );
        toast.error(`Failed to upload ${uploadFile.file.name}`);
      }
    }

    setUploading(false);
  };

  const completedCount = files.filter((f) => f.status === "completed").length;
  const pendingCount = files.filter((f) => f.status === "pending").length;

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Upload Document</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Upload your research papers, project reports, or dissertations for AI analysis.
        </p>
      </div>

      {/* Upload Zone */}
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <div
            {...getRootProps()}
            className={`relative border-2 border-dashed rounded-xl m-4 p-12 text-center cursor-pointer transition-all duration-300 ${
              isDragActive
                ? "border-primary bg-primary/5 scale-[1.01]"
                : "border-border hover:border-primary/50 hover:bg-muted/30"
            }`}
          >
            <input {...getInputProps()} id="file-upload" />

            <div className="flex flex-col items-center gap-4">
              <div className={`p-4 rounded-2xl transition-all duration-300 ${
                isDragActive ? "bg-primary/10 scale-110" : "bg-muted/50"
              }`}>
                <Cloud className={`w-10 h-10 transition-colors ${
                  isDragActive ? "text-primary" : "text-muted-foreground"
                }`} />
              </div>

              <div>
                <p className="text-lg font-semibold mb-1">
                  {isDragActive ? "Drop your files here" : "Drag & drop your research files"}
                </p>
                <p className="text-sm text-muted-foreground">
                  or{" "}
                  <span className="text-primary font-medium">click to browse</span>
                </p>
              </div>

              <div className="flex flex-wrap gap-2 justify-center">
                {["PDF", "DOCX", "TXT", "PPTX"].map((ext) => (
                  <Badge key={ext} variant="secondary" className="text-xs">
                    .{ext.toLowerCase()}
                  </Badge>
                ))}
                <Badge variant="outline" className="text-xs">
                  Max {formatFileSize(MAX_FILE_SIZE)}
                </Badge>
              </div>

              <div className="pt-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    toast.success("Loaded sample paper: 'HeartNet_Arrhythmia_Detection_2026.pdf'");
                    router.push("/dashboard/analysis?sample=true");
                  }}
                  className="gap-2 shadow-sm text-xs"
                >
                  <Sparkles className="w-3.5 h-3.5 text-primary" />
                  Try Sample Paper: "HeartNet_Arrhythmia_Detection_2026.pdf"
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* File List */}
      {files.length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">
                Files ({files.length})
              </CardTitle>
              <div className="flex items-center gap-2">
                {completedCount > 0 && (
                  <Badge variant="success">{completedCount} uploaded</Badge>
                )}
                {pendingCount > 0 && (
                  <Badge variant="info">{pendingCount} pending</Badge>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {files.map((uploadFile) => (
                <div
                  key={uploadFile.id}
                  className="flex items-center gap-4 p-3 rounded-xl border border-border hover:bg-muted/20 transition-colors"
                >
                  {/* File Icon */}
                  <div className="p-2.5 rounded-lg bg-muted/50 flex-shrink-0">
                    <File className="w-5 h-5 text-muted-foreground" />
                  </div>

                  {/* File Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{uploadFile.file.name}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs text-muted-foreground">
                        {formatFileSize(uploadFile.file.size)}
                      </span>
                      <span className="text-xs text-muted-foreground">•</span>
                      <span className="text-xs text-muted-foreground">
                        {getFileIcon(uploadFile.file.type)}
                      </span>
                    </div>

                    {/* Progress Bar */}
                    {uploadFile.status === "uploading" && (
                      <div className="mt-2 h-1.5 rounded-full bg-muted overflow-hidden">
                        <div
                          className="h-full rounded-full bg-primary transition-all duration-500"
                          style={{ width: `${uploadFile.progress}%` }}
                        />
                      </div>
                    )}

                    {uploadFile.error && (
                      <p className="text-xs text-destructive mt-1">{uploadFile.error}</p>
                    )}
                  </div>

                  {/* Status */}
                  <div className="flex-shrink-0">
                    {uploadFile.status === "pending" && (
                      <Badge variant="secondary" className="text-xs">Pending</Badge>
                    )}
                    {uploadFile.status === "uploading" && (
                      <Loader2 className="w-4 h-4 text-primary animate-spin" />
                    )}
                    {uploadFile.status === "completed" && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    )}
                    {uploadFile.status === "error" && (
                      <AlertCircle className="w-5 h-5 text-destructive" />
                    )}
                  </div>

                  {/* Remove */}
                  {(uploadFile.status === "pending" || uploadFile.status === "error") && (
                    <button
                      onClick={() => removeFile(uploadFile.id)}
                      className="p-1 rounded-md hover:bg-muted transition-colors cursor-pointer"
                      aria-label="Remove file"
                    >
                      <X className="w-4 h-4 text-muted-foreground" />
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between mt-6 pt-4 border-t border-border">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setFiles([])}
                disabled={uploading}
              >
                Clear All
              </Button>

              <div className="flex items-center gap-3">
                {completedCount > 0 && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => router.push("/dashboard/analysis")}
                  >
                    <Brain className="w-4 h-4 mr-1" />
                    View Analysis
                  </Button>
                )}
                {pendingCount > 0 && (
                  <Button
                    variant="gradient"
                    onClick={uploadFiles}
                    disabled={uploading}
                  >
                    {uploading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Uploading...
                      </>
                    ) : (
                      <>
                        <Upload className="w-4 h-4" />
                        Upload {pendingCount} File{pendingCount > 1 ? "s" : ""}
                      </>
                    )}
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* AI Analysis Info */}
      <Card className="bg-gradient-to-br from-primary/5 to-violet-500/5 border-primary/20">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-primary/10 flex-shrink-0">
              <Sparkles className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold mb-1">What happens after upload?</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                Our AI will automatically extract and analyze your document. You&apos;ll get:
              </p>
              <div className="grid sm:grid-cols-2 gap-2">
                {[
                  "AI Summary (short + detailed)",
                  "Research Quality Score",
                  "Key Findings & Insights",
                  "Simple Language Explanation",
                  "Citation Suggestions",
                  "Structure Analysis",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                    <span className="text-xs">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
