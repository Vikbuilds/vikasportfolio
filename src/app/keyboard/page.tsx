"use client";

import React, { useState, useEffect, useRef } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { KeyboardDemo } from "@/components/ui/keyboard-demo";
import { ProgressiveBlur } from "@/components/ui/progressive-blur";
import {
  Plus,
  Camera,
  Video,
  Link as LinkIcon,
  MoreHorizontal,
  X,
  Check,
  Trash2,
  ExternalLink,
  Send,
  User,
  BookOpen,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

interface ParagraphBlock {
  id: string;
  type: "paragraph" | "image" | "video" | "embed" | "divider";
  content: string;
  url?: string;
  caption?: string;
}

interface PublishedStory {
  id: string;
  title: string;
  blocks: ParagraphBlock[];
  publishedAt: string;
}

export default function KeyboardRealtimePage() {
  const [activeKeys, setActiveKeys] = useState<Set<string>>(new Set());
  const [title, setTitle] = useState<string>("");
  const [blocks, setBlocks] = useState<ParagraphBlock[]>([
    { id: "1", type: "paragraph", content: "" },
  ]);
  const [activeBlockId, setActiveBlockId] = useState<string>("1");
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [modalInput, setModalInput] = useState<{
    id: string;
    type: "image" | "video" | "embed";
    url: string;
  } | null>(null);

  const [publishedStories, setPublishedStories] = useState<PublishedStory[]>([]);
  const [publishSuccess, setPublishSuccess] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load saved published stories on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("medium_published_stories");
      if (saved) {
        setPublishedStories(JSON.parse(saved));
      }
    } catch {
      // Ignore parse errors
    }
  }, []);

  // Save published stories to localStorage
  const saveStories = (updated: PublishedStory[]) => {
    setPublishedStories(updated);
    try {
      localStorage.setItem("medium_published_stories", JSON.stringify(updated));
    } catch {
      // Ignore storage errors
    }
  };

  // Real-time Physical Keyboard Event Listener for Visualizer Sync
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      setActiveKeys((prev) => new Set(prev).add(e.code));
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      setActiveKeys((prev) => {
        const next = new Set(prev);
        next.delete(e.code);
        return next;
      });
    };

    const handleBlur = () => {
      setActiveKeys(new Set());
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    window.addEventListener("blur", handleBlur);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      window.removeEventListener("blur", handleBlur);
    };
  }, []);

  // Update paragraph content
  const updateBlockContent = (id: string, content: string) => {
    setBlocks((prev) =>
      prev.map((b) => (b.id === id ? { ...b, content } : b))
    );
  };

  // Add new paragraph on Enter
  const handleParagraphKeyDown = (
    e: React.KeyboardEvent<HTMLParagraphElement>,
    index: number,
    id: string
  ) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      const newBlock: ParagraphBlock = {
        id: Date.now().toString(),
        type: "paragraph",
        content: "",
      };
      const newBlocks = [...blocks];
      newBlocks.splice(index + 1, 0, newBlock);
      setBlocks(newBlocks);
      setActiveBlockId(newBlock.id);
      setTimeout(() => {
        const el = document.getElementById(`block-${newBlock.id}`);
        el?.focus();
      }, 20);
    } else if (
      e.key === "Backspace" &&
      blocks[index].content === "" &&
      blocks.length > 1
    ) {
      e.preventDefault();
      const prevBlock = blocks[index - 1];
      setBlocks((prev) => prev.filter((b) => b.id !== id));
      if (prevBlock) {
        setActiveBlockId(prevBlock.id);
        setTimeout(() => {
          const el = document.getElementById(`block-${prevBlock.id}`);
          el?.focus();
        }, 20);
      }
    }
  };

  // Clear Canvas Reset Handler
  const handleClearCanvas = () => {
    setTitle("");
    const defaultBlock: ParagraphBlock = { id: Date.now().toString(), type: "paragraph", content: "" };
    setBlocks([defaultBlock]);
    setActiveBlockId(defaultBlock.id);
  };

  // Publish Story Handler
  const handlePublishStory = () => {
    const hasContent = title.trim() || blocks.some((b) => b.content.trim() || b.url);
    if (!hasContent) return;

    const newStory: PublishedStory = {
      id: Date.now().toString(),
      title: title.trim() || "Untitled Story",
      blocks: blocks.filter((b) => b.content.trim() || b.url || b.type === "divider"),
      publishedAt: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
    };

    const updated = [newStory, ...publishedStories];
    saveStories(updated);
    handleClearCanvas();

    setPublishSuccess(true);
    confetti({
      particleCount: 60,
      spread: 50,
      origin: { y: 0.5 },
    });

    setTimeout(() => {
      setPublishSuccess(false);
    }, 4000);
  };

  // Delete Published Story
  const handleDeletePublished = (storyId: string) => {
    const updated = publishedStories.filter((s) => s.id !== storyId);
    saveStories(updated);
  };

  // Delete individual media block in editor
  const deleteBlock = (id: string) => {
    setBlocks((prev) => {
      const filtered = prev.filter((b) => b.id !== id);
      return filtered.length > 0 ? filtered : [{ id: Date.now().toString(), type: "paragraph", content: "" }];
    });
  };

  // Insert media blocks from (+) menu
  const openMediaModal = (type: "image" | "video" | "embed" | "divider") => {
    const currentIndex = blocks.findIndex((b) => b.id === activeBlockId);
    const newId = Date.now().toString();

    if (type === "divider") {
      const dividerBlock: ParagraphBlock = { id: newId, type: "divider", content: "" };
      const nextParagraph: ParagraphBlock = { id: (Date.now() + 1).toString(), type: "paragraph", content: "" };
      const newBlocks = [...blocks];
      newBlocks.splice(currentIndex + 1, 0, dividerBlock, nextParagraph);
      setBlocks(newBlocks);
      setActiveBlockId(nextParagraph.id);
      setMenuOpen(false);
    } else {
      setModalInput({ id: newId, type, url: "" });
      setMenuOpen(false);
    }
  };

  const confirmModalEmbed = () => {
    if (!modalInput) return;
    const currentIndex = blocks.findIndex((b) => b.id === activeBlockId);

    let defaultUrl = modalInput.url;
    if (!defaultUrl) {
      if (modalInput.type === "image") {
        defaultUrl = "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=1200&auto=format&fit=crop";
      } else if (modalInput.type === "video") {
        defaultUrl = "https://www.youtube.com/embed/dQw4w9WgXcQ";
      } else {
        defaultUrl = "https://medium.com";
      }
    }

    const newBlock: ParagraphBlock = {
      id: modalInput.id,
      type: modalInput.type,
      content: "",
      url: defaultUrl,
      caption: modalInput.type === "image" ? "Type caption for image (optional)" : undefined,
    };

    const nextParagraph: ParagraphBlock = { id: (Date.now() + 1).toString(), type: "paragraph", content: "" };
    const newBlocks = [...blocks];
    newBlocks.splice(currentIndex + 1, 0, newBlock, nextParagraph);
    setBlocks(newBlocks);
    setActiveBlockId(nextParagraph.id);
    setModalInput(null);
  };

  // Image Upload File Handler
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      const currentIndex = blocks.findIndex((b) => b.id === activeBlockId);
      const newBlock: ParagraphBlock = {
        id: Date.now().toString(),
        type: "image",
        content: "",
        url: imageUrl,
        caption: file.name,
      };
      const nextParagraph: ParagraphBlock = { id: (Date.now() + 1).toString(), type: "paragraph", content: "" };
      const newBlocks = [...blocks];
      newBlocks.splice(currentIndex + 1, 0, newBlock, nextParagraph);
      setBlocks(newBlocks);
      setActiveBlockId(nextParagraph.id);
      setModalInput(null);
    }
  };

  return (
    <>
      <Navbar />
      <main className="mx-auto w-full max-w-xl px-5 pb-20 pt-6 space-y-6">
        {/* Top Control Bar: Subtitle sentence & Clear/Publish buttons */}
        <div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-border/40 pb-3">
          <p className="font-editorial text-sm italic text-muted-foreground leading-relaxed">
            An interactive writing canvas — type freely and capture your thoughts.
          </p>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleClearCanvas}
              title="Clear editor canvas"
              className="px-3 py-1.5 rounded-xl bg-muted/60 hover:bg-muted text-muted-foreground hover:text-foreground text-xs font-medium transition-colors cursor-pointer"
            >
              Clear
            </button>
            <button
              onClick={handlePublishStory}
              title="Publish story to feed"
              className="px-4 py-1.5 rounded-xl bg-foreground text-background hover:opacity-90 text-xs font-semibold transition-opacity flex items-center gap-1.5 cursor-pointer"
            >
              <Send size={12} />
              <span>Publish</span>
            </button>
          </div>
        </div>
        {/* Publish Success Toast */}
        <AnimatePresence>
          {publishSuccess && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="w-full bg-muted/80 border border-border/60 text-foreground rounded-xl p-3 flex items-center justify-between text-xs font-medium"
            >
              <span>Story published successfully! Check out your feed below.</span>
              <button onClick={() => setPublishSuccess(false)} className="text-muted-foreground hover:text-foreground">
                <X size={14} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Medium Canvas Container */}
        <div ref={containerRef} className="w-full space-y-4 pt-2">
          {/* Title Input */}
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="w-full font-editorial text-3xl sm:text-4xl font-normal text-foreground placeholder:text-muted-foreground/30 bg-transparent border-none outline-none tracking-tight leading-tight"
          />

          {/* Medium Body Paragraphs */}
          <div className="w-full space-y-3 relative">
            {blocks.map((block, index) => {
              const isActive = block.id === activeBlockId;
              const isEmpty = block.type === "paragraph" && block.content === "";

              return (
                <div key={block.id} className="relative w-full flex items-baseline group">
                  {/* Plus (+) Menu Trigger positioned on the left margin */}
                  {isActive && isEmpty && (
                    <div className="absolute -left-9 top-0.5 shrink-0 z-20">
                      <button
                        type="button"
                        onClick={() => setMenuOpen(!menuOpen)}
                        title="Add media"
                        className={`w-6 h-6 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground/60 transition-colors cursor-pointer ${
                          menuOpen ? "rotate-45 bg-muted" : ""
                        }`}
                      >
                        <Plus size={14} strokeWidth={1.5} />
                      </button>

                      {/* Expanding Action Menu */}
                      <AnimatePresence>
                        {menuOpen && (
                          <motion.div
                            initial={{ opacity: 0, x: -8, scale: 0.95 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            exit={{ opacity: 0, x: -8, scale: 0.95 }}
                            transition={{ duration: 0.15 }}
                            className="absolute left-8 top-0 flex items-center gap-1 bg-background border border-border/80 p-1 rounded-full shadow-md z-30"
                          >
                            <button
                              onClick={() => openMediaModal("image")}
                              title="Add an image"
                              className="p-1.5 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                            >
                              <Camera size={14} />
                            </button>
                            <button
                              onClick={() => openMediaModal("video")}
                              title="Add a video"
                              className="p-1.5 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                            >
                              <Video size={14} />
                            </button>
                            <button
                              onClick={() => openMediaModal("embed")}
                              title="Add an embed link"
                              className="p-1.5 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                            >
                              <LinkIcon size={14} />
                            </button>
                            <button
                              onClick={() => openMediaModal("divider")}
                              title="Add a section break"
                              className="p-1.5 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                            >
                              <MoreHorizontal size={14} />
                            </button>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )}

                  {/* Paragraph Content */}
                  {block.type === "paragraph" && (
                    <div className="w-full relative">
                      <p
                        id={`block-${block.id}`}
                        contentEditable
                        suppressContentEditableWarning
                        onFocus={() => setActiveBlockId(block.id)}
                        onInput={(e) => updateBlockContent(block.id, e.currentTarget.innerText)}
                        onKeyDown={(e) => handleParagraphKeyDown(e, index, block.id)}
                        data-placeholder="Tell your story..."
                        className="w-full font-editorial text-lg sm:text-xl text-foreground leading-relaxed outline-none min-h-[28px] empty:before:content-[attr(data-placeholder)] empty:before:text-muted-foreground/35 empty:before:pointer-events-none"
                      />
                    </div>
                  )}

                  {/* Image Block */}
                  {block.type === "image" && (
                    <div className="w-full my-2 flex flex-col items-center gap-2 group/img relative">
                      {/* eslint-disable-next-html-element-suppression */}
                      <img
                        src={block.url}
                        alt="Uploaded media"
                        className="w-full rounded-xl object-cover max-h-[340px] border border-border/40 shadow-xs"
                      />
                      <input
                        type="text"
                        defaultValue={block.caption}
                        placeholder="Type caption for image (optional)"
                        className="text-xs font-editorial italic text-muted-foreground bg-transparent border-none text-center outline-none w-full"
                      />
                      <button
                        onClick={() => deleteBlock(block.id)}
                        title="Delete image"
                        className="absolute top-2 right-2 p-1 rounded-full bg-background/80 hover:bg-background text-muted-foreground hover:text-red-500 opacity-0 group-hover/img:opacity-100 transition-opacity shadow-xs cursor-pointer"
                      >
                        <X size={13} />
                      </button>
                    </div>
                  )}

                  {/* Video Block */}
                  {block.type === "video" && (
                    <div className="w-full my-2 rounded-xl overflow-hidden border border-border bg-black aspect-video shadow-xs relative group/vid">
                      <iframe
                        src={block.url}
                        title="Embedded video"
                        className="w-full h-full border-none"
                        allowFullScreen
                      />
                      <button
                        onClick={() => deleteBlock(block.id)}
                        title="Delete video"
                        className="absolute top-2 right-2 p-1 rounded-full bg-background/80 hover:bg-background text-muted-foreground hover:text-red-500 opacity-0 group-hover/vid:opacity-100 transition-opacity shadow-xs cursor-pointer z-10"
                      >
                        <X size={13} />
                      </button>
                    </div>
                  )}

                  {/* Link Embed Block */}
                  {block.type === "embed" && (
                    <div className="w-full my-2 p-3 rounded-xl border border-border/60 bg-muted/20 flex items-center justify-between gap-3 text-xs relative group/embed">
                      <div className="space-y-0.5 min-w-0 flex-1">
                        <div className="font-semibold text-foreground truncate">Embedded Link Card</div>
                        <a
                          href={block.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-foreground underline flex items-center gap-1 truncate"
                        >
                          <span className="truncate">{block.url}</span>
                          <ExternalLink size={11} className="shrink-0" />
                        </a>
                      </div>
                      <button
                        onClick={() => deleteBlock(block.id)}
                        title="Delete embed"
                        className="p-1 rounded-full hover:bg-muted text-muted-foreground hover:text-red-500 transition-colors cursor-pointer shrink-0"
                      >
                        <X size={13} />
                      </button>
                    </div>
                  )}

                  {/* Section Divider Block */}
                  {block.type === "divider" && (
                    <div className="w-full py-3 flex items-center justify-between text-muted-foreground/40 group/div">
                      <div className="w-full text-center text-lg font-serif tracking-[0.4em] select-none">
                        •••
                      </div>
                      <button
                        onClick={() => deleteBlock(block.id)}
                        title="Delete divider"
                        className="opacity-0 group-hover/div:opacity-100 p-1 rounded-full hover:bg-muted text-muted-foreground hover:text-red-500 transition-opacity cursor-pointer"
                      >
                        <X size={13} />
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Media Upload / URL Embed Modal */}
        <AnimatePresence>
          {modalInput && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              className="w-full bg-background border border-border/80 rounded-xl p-3.5 shadow-lg flex flex-col gap-2.5 z-30"
            >
              <div className="flex items-center justify-between text-xs font-medium text-foreground">
                <span>Add {modalInput.type}</span>
                <button
                  onClick={() => setModalInput(null)}
                  className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                >
                  <X size={14} />
                </button>
              </div>

              {modalInput.type === "image" ? (
                <div className="flex flex-col gap-2.5">
                  <div className="flex items-center gap-2">
                    <input
                      type="url"
                      value={modalInput.url}
                      onChange={(e) => setModalInput({ ...modalInput, url: e.target.value })}
                      placeholder="Paste image URL..."
                      onKeyDown={(e) => e.key === "Enter" && confirmModalEmbed()}
                      autoFocus
                      className="flex-1 bg-muted/40 text-xs px-3 py-1.5 rounded-lg outline-none border border-border/60 text-foreground placeholder:text-muted-foreground/50"
                    />
                    <button
                      onClick={confirmModalEmbed}
                      className="px-3 py-1.5 rounded-lg bg-foreground text-background font-medium text-xs flex items-center gap-1 cursor-pointer"
                    >
                      <Check size={13} />
                      <span>Add</span>
                    </button>
                  </div>

                  <div className="text-center text-[10px] text-muted-foreground/70 uppercase">Or</div>

                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full py-2 rounded-lg border border-dashed border-border/80 hover:border-foreground/50 text-xs font-medium text-muted-foreground hover:text-foreground transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Camera size={14} />
                    <span>Upload image file</span>
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <input
                    type="url"
                    value={modalInput.url}
                    onChange={(e) => setModalInput({ ...modalInput, url: e.target.value })}
                    placeholder={
                      modalInput.type === "video"
                        ? "Paste YouTube or Vimeo URL..."
                        : "Paste URL to embed..."
                    }
                    onKeyDown={(e) => e.key === "Enter" && confirmModalEmbed()}
                    autoFocus
                    className="flex-1 bg-muted/40 text-xs px-3 py-1.5 rounded-lg outline-none border border-border/60 text-foreground placeholder:text-muted-foreground/50"
                  />
                  <button
                    onClick={confirmModalEmbed}
                    className="px-3 py-1.5 rounded-lg bg-foreground text-background font-medium text-xs flex items-center gap-1 cursor-pointer"
                  >
                    <Check size={13} />
                    <span>Embed</span>
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Controlled Aceternity Keyboard Visualizer */}
        <div className="w-full flex justify-center pt-2">
          <KeyboardDemo activeKeys={activeKeys} />
        </div>

        {/* Published Stories Section — Matching Favorites Row UI */}
        {publishedStories.length > 0 && (
          <div className="w-full pt-6 space-y-3 border-t border-border/40">
            <div className="flex items-center justify-between px-1">
              <h2 className="text-sm font-semibold tracking-tight text-foreground font-(family-name:--font-schibsted)">
                Published Stories
              </h2>
              <span className="text-xs font-mono text-muted-foreground/70">
                {publishedStories.length} {publishedStories.length === 1 ? "story" : "stories"}
              </span>
            </div>

            <div className="space-y-1 w-full">
              {publishedStories.map((story) => {
                const firstParagraph = story.blocks.find((b) => b.type === "paragraph" && b.content.trim())?.content || "";
                const coverImage = story.blocks.find((b) => b.type === "image")?.url;

                return (
                  <div
                    key={story.id}
                    className="relative flex items-center justify-between gap-4 py-2.5 px-3 -mx-3 rounded-xl transition-colors duration-150 hover:bg-muted/50 group"
                  >
                    {/* Left: Mini Icon/Cover + Title / Excerpt */}
                    <div className="flex items-center gap-3 min-w-0 flex-1 overflow-hidden">
                      <div className="relative h-6 w-6 rounded-md overflow-hidden shrink-0 border border-border/40 bg-muted/40 flex items-center justify-center shadow-xs">
                        {coverImage ? (
                          /* eslint-disable-next-html-element-suppression */
                          <img src={coverImage} alt={story.title} className="h-full w-full object-cover" />
                        ) : (
                          <BookOpen size={13} className="text-muted-foreground" />
                        )}
                      </div>

                      <div className="flex items-center gap-2 min-w-0 flex-1 truncate text-sm">
                        <span className="font-semibold text-foreground tracking-tight shrink-0 group-hover:underline underline-offset-4 decoration-border/60">
                          {story.title}
                        </span>
                        <span className="text-muted-foreground/40 font-normal text-xs select-none shrink-0">
                          /
                        </span>
                        <span className="text-muted-foreground/70 font-normal text-xs truncate">
                          {firstParagraph || "Published story"}
                        </span>
                      </div>
                    </div>

                    {/* Right: Date & Delete Icon */}
                    <div className="flex items-center gap-2 shrink-0 font-mono text-xs text-muted-foreground/60">
                      <span>{story.publishedAt}</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeletePublished(story.id);
                        }}
                        title="Delete story"
                        className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-md hover:bg-muted text-muted-foreground hover:text-red-500 cursor-pointer"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </main>

      <div className="mx-auto w-full max-w-xl px-5 pb-16">
        <Footer />
      </div>

      <ProgressiveBlur
        className="fixed bottom-0 left-0 right-0 z-30"
        position="bottom"
        height="80px"
      />
    </>
  );
}
