import { Linkedin, Twitter, Mail, Link2, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { toast } from 'sonner';

interface SocialShareButtonsProps {
  url: string;
  title: string;
  description?: string;
}

const SocialShareButtons = ({ url, title, description }: SocialShareButtonsProps) => {
  const [copied, setCopied] = useState(false);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = encodeURIComponent(description || '');

  const shareLinks = {
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    email: `mailto:?subject=${encodedTitle}&body=${encodedDescription}%0A%0ARead more: ${encodedUrl}`,
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast.success('Link copied to clipboard');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error('Failed to copy link');
    }
  };

  const handleShare = (platform: 'linkedin' | 'twitter' | 'email') => {
    const link = shareLinks[platform];
    if (platform === 'email') {
      window.location.href = link;
    } else {
      window.open(link, '_blank', 'noopener,noreferrer,width=600,height=400');
    }
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-muted-foreground mr-2">Share:</span>
      
      <Button
        variant="outline"
        size="icon"
        onClick={() => handleShare('linkedin')}
        aria-label="Share on LinkedIn"
        className="h-9 w-9 hover:bg-[#0077B5]/10 hover:text-[#0077B5] hover:border-[#0077B5]/30"
      >
        <Linkedin className="h-4 w-4" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        onClick={() => handleShare('twitter')}
        aria-label="Share on Twitter"
        className="h-9 w-9 hover:bg-[#1DA1F2]/10 hover:text-[#1DA1F2] hover:border-[#1DA1F2]/30"
      >
        <Twitter className="h-4 w-4" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        onClick={() => handleShare('email')}
        aria-label="Share via Email"
        className="h-9 w-9 hover:bg-primary/10 hover:text-primary hover:border-primary/30"
      >
        <Mail className="h-4 w-4" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        onClick={handleCopyLink}
        aria-label="Copy link"
        className="h-9 w-9 hover:bg-accent/10 hover:text-accent hover:border-accent/30"
      >
        {copied ? <Check className="h-4 w-4 text-green-500" /> : <Link2 className="h-4 w-4" />}
      </Button>
    </div>
  );
};

export default SocialShareButtons;
