import React, { useCallback, useState, useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import { Toggle } from '@/components/ui/toggle';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Bold,
  Italic,
  Strikethrough,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Code,
  Link as LinkIcon,
  Image as ImageIcon,
  Undo,
  Redo,
  Unlink,
  Upload,
  FolderOpen,
  Ruler,
} from 'lucide-react';
import BlogImageUpload from './BlogImageUpload';
import MediaLibrary from './MediaLibrary';

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
  userId: string;
  placeholder?: string;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  content,
  onChange,
  userId,
  placeholder = "Write your blog post content here..."
}) => {
  const [linkUrl, setLinkUrl] = useState('');
  const [linkDialogOpen, setLinkDialogOpen] = useState(false);
  const [imageDialogOpen, setImageDialogOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [imageAlt, setImageAlt] = useState('');
  const [selectedLibraryImage, setSelectedLibraryImage] = useState('');
  const [imageDimensions, setImageDimensions] = useState<{ width: number; height: number } | null>(null);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: 'rounded-lg max-w-full h-auto',
        },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-primary underline',
        },
      }),
      Placeholder.configure({
        placeholder,
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  const addLink = useCallback(() => {
    if (linkUrl && editor) {
      editor
        .chain()
        .focus()
        .extendMarkRange('link')
        .setLink({ href: linkUrl })
        .run();
      setLinkUrl('');
      setLinkDialogOpen(false);
    }
  }, [editor, linkUrl]);

  const removeLink = useCallback(() => {
    if (editor) {
      editor.chain().focus().unsetLink().run();
    }
  }, [editor]);

  const addImage = useCallback((url: string, alt: string = '') => {
    if (url && editor) {
      editor.chain().focus().setImage({ src: url, alt: alt || undefined }).run();
      setImageUrl('');
      setImageAlt('');
      setSelectedLibraryImage('');
      setImageDialogOpen(false);
    }
  }, [editor]);

  const handleLibrarySelect = useCallback((url: string) => {
    setSelectedLibraryImage(url);
  }, []);

  const clearImageState = useCallback(() => {
    setImageUrl('');
    setImageAlt('');
    setSelectedLibraryImage('');
    setImageDimensions(null);
  }, []);

  // Load image dimensions when URL changes
  useEffect(() => {
    const urlToLoad = imageUrl || selectedLibraryImage;
    if (!urlToLoad) {
      setImageDimensions(null);
      return;
    }

    const img = new window.Image();
    img.onload = () => {
      setImageDimensions({ width: img.naturalWidth, height: img.naturalHeight });
    };
    img.onerror = () => {
      setImageDimensions(null);
    };
    img.src = urlToLoad;
  }, [imageUrl, selectedLibraryImage]);

  if (!editor) {
    return null;
  }

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-1 p-2 border border-border rounded-t-lg bg-muted/30">
        {/* Text Formatting */}
        <Toggle
          size="sm"
          pressed={editor.isActive('bold')}
          onPressedChange={() => editor.chain().focus().toggleBold().run()}
          aria-label="Bold"
        >
          <Bold className="h-4 w-4" />
        </Toggle>
        <Toggle
          size="sm"
          pressed={editor.isActive('italic')}
          onPressedChange={() => editor.chain().focus().toggleItalic().run()}
          aria-label="Italic"
        >
          <Italic className="h-4 w-4" />
        </Toggle>
        <Toggle
          size="sm"
          pressed={editor.isActive('strike')}
          onPressedChange={() => editor.chain().focus().toggleStrike().run()}
          aria-label="Strikethrough"
        >
          <Strikethrough className="h-4 w-4" />
        </Toggle>

        <div className="w-px h-6 bg-border mx-1 self-center" />

        {/* Headings */}
        <Toggle
          size="sm"
          pressed={editor.isActive('heading', { level: 1 })}
          onPressedChange={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          aria-label="Heading 1"
        >
          <Heading1 className="h-4 w-4" />
        </Toggle>
        <Toggle
          size="sm"
          pressed={editor.isActive('heading', { level: 2 })}
          onPressedChange={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          aria-label="Heading 2"
        >
          <Heading2 className="h-4 w-4" />
        </Toggle>
        <Toggle
          size="sm"
          pressed={editor.isActive('heading', { level: 3 })}
          onPressedChange={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          aria-label="Heading 3"
        >
          <Heading3 className="h-4 w-4" />
        </Toggle>

        <div className="w-px h-6 bg-border mx-1 self-center" />

        {/* Lists */}
        <Toggle
          size="sm"
          pressed={editor.isActive('bulletList')}
          onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
          aria-label="Bullet List"
        >
          <List className="h-4 w-4" />
        </Toggle>
        <Toggle
          size="sm"
          pressed={editor.isActive('orderedList')}
          onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
          aria-label="Ordered List"
        >
          <ListOrdered className="h-4 w-4" />
        </Toggle>

        <div className="w-px h-6 bg-border mx-1 self-center" />

        {/* Quote & Code */}
        <Toggle
          size="sm"
          pressed={editor.isActive('blockquote')}
          onPressedChange={() => editor.chain().focus().toggleBlockquote().run()}
          aria-label="Blockquote"
        >
          <Quote className="h-4 w-4" />
        </Toggle>
        <Toggle
          size="sm"
          pressed={editor.isActive('codeBlock')}
          onPressedChange={() => editor.chain().focus().toggleCodeBlock().run()}
          aria-label="Code Block"
        >
          <Code className="h-4 w-4" />
        </Toggle>

        <div className="w-px h-6 bg-border mx-1 self-center" />

        {/* Link */}
        <Dialog open={linkDialogOpen} onOpenChange={setLinkDialogOpen}>
          <DialogTrigger asChild>
            <Toggle
              size="sm"
              pressed={editor.isActive('link')}
              aria-label="Add Link"
            >
              <LinkIcon className="h-4 w-4" />
            </Toggle>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Link</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Input
                placeholder="https://example.com"
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
              />
              <div className="flex gap-2">
                <Button onClick={addLink}>Add Link</Button>
                {editor.isActive('link') && (
                  <Button variant="outline" onClick={removeLink}>
                    <Unlink className="h-4 w-4 mr-2" />
                    Remove Link
                  </Button>
                )}
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Image */}
        <Dialog 
          open={imageDialogOpen} 
          onOpenChange={(open) => {
            setImageDialogOpen(open);
            if (!open) clearImageState();
          }}
        >
          <DialogTrigger asChild>
            <Toggle size="sm" aria-label="Add Image">
              <ImageIcon className="h-4 w-4" />
            </Toggle>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Insert Image</DialogTitle>
            </DialogHeader>
            <Tabs defaultValue="upload" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="upload" className="flex items-center gap-2">
                  <Upload className="h-4 w-4" />
                  Upload New
                </TabsTrigger>
                <TabsTrigger value="library" className="flex items-center gap-2">
                  <FolderOpen className="h-4 w-4" />
                  Media Library
                </TabsTrigger>
              </TabsList>
              <TabsContent value="upload" className="mt-4">
                <div className="space-y-4">
                  <BlogImageUpload
                    value={imageUrl}
                    onChange={setImageUrl}
                    userId={userId}
                    label="Upload or enter URL"
                    aspectRatio="auto"
                  />
                  {imageUrl && (
                    <>
                      {imageDimensions && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Ruler className="h-4 w-4" />
                          <span>{imageDimensions.width} × {imageDimensions.height} px</span>
                        </div>
                      )}
                      <div className="space-y-2">
                        <label className="text-sm font-medium">
                          Alt Text <span className="text-muted-foreground font-normal">(for accessibility & SEO)</span>
                        </label>
                        <Input
                          placeholder="Describe the image content..."
                          value={imageAlt}
                          onChange={(e) => setImageAlt(e.target.value)}
                        />
                        <p className="text-xs text-muted-foreground">
                          Helps screen readers and search engines understand your image
                        </p>
                      </div>
                      <Button onClick={() => addImage(imageUrl, imageAlt)} className="w-full">
                        Insert Image
                      </Button>
                    </>
                  )}
                </div>
              </TabsContent>
              <TabsContent value="library" className="mt-4">
                <p className="text-sm text-muted-foreground mb-3">
                  Click an image to select it
                </p>
                <MediaLibrary userId={userId} onSelect={handleLibrarySelect} />
                {selectedLibraryImage && (
                  <div className="mt-4 space-y-4 pt-4 border-t border-border">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <ImageIcon className="h-4 w-4 text-primary" />
                        <span className="text-muted-foreground">Image selected</span>
                      </div>
                      {imageDimensions && (
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Ruler className="h-4 w-4" />
                          <span>{imageDimensions.width} × {imageDimensions.height} px</span>
                        </div>
                      )}
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        Alt Text <span className="text-muted-foreground font-normal">(for accessibility & SEO)</span>
                      </label>
                      <Input
                        placeholder="Describe the image content..."
                        value={imageAlt}
                        onChange={(e) => setImageAlt(e.target.value)}
                      />
                      <p className="text-xs text-muted-foreground">
                        Helps screen readers and search engines understand your image
                      </p>
                    </div>
                    <Button onClick={() => addImage(selectedLibraryImage, imageAlt)} className="w-full">
                      Insert Image
                    </Button>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </DialogContent>
        </Dialog>

        <div className="w-px h-6 bg-border mx-1 self-center" />

        {/* Undo/Redo */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
        >
          <Undo className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
        >
          <Redo className="h-4 w-4" />
        </Button>
      </div>

      <EditorContent
        editor={editor}
        className="min-h-[400px] border border-t-0 border-border rounded-b-lg p-4 prose prose-sm max-w-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 [&_.ProseMirror]:outline-none [&_.ProseMirror]:min-h-[380px] [&_.ProseMirror_p.is-editor-empty:first-child::before]:text-muted-foreground [&_.ProseMirror_p.is-editor-empty:first-child::before]:content-[attr(data-placeholder)] [&_.ProseMirror_p.is-editor-empty:first-child::before]:float-left [&_.ProseMirror_p.is-editor-empty:first-child::before]:pointer-events-none [&_.ProseMirror_p.is-editor-empty:first-child::before]:h-0"
      />
    </div>
  );
};

export default RichTextEditor;