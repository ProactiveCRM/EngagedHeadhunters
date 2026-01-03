import { useState, useCallback, useRef, useEffect } from 'react';

interface UseMegaMenuOptions {
  closeDelay?: number;
  onMenuOpen?: (menuId: string, menuLabel: string) => void;
  onMenuClose?: () => void;
}

export const useMegaMenu = (options: UseMegaMenuOptions = {}) => {
  const { closeDelay = 150, onMenuOpen, onMenuClose } = options;
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const menuLabelsRef = useRef<Map<string, string>>(new Map());
  const [isKeyboardNav, setIsKeyboardNav] = useState(false);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const menuRefs = useRef<Map<string, HTMLElement>>(new Map());
  const triggerRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
  const typeaheadRef = useRef<string>('');
  const typeaheadTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const clearCloseTimeout = useCallback(() => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  }, []);

  const openMenu = useCallback((menuId: string) => {
    clearCloseTimeout();
    setActiveMenu(menuId);
    const label = menuLabelsRef.current.get(menuId) || menuId;
    onMenuOpen?.(menuId, label);
  }, [clearCloseTimeout, onMenuOpen]);

  const closeMenu = useCallback(() => {
    clearCloseTimeout();
    setActiveMenu(null);
    setIsKeyboardNav(false);
    onMenuClose?.();
  }, [clearCloseTimeout, onMenuClose]);

  const closeMenuWithDelay = useCallback(() => {
    clearCloseTimeout();
    closeTimeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
      setIsKeyboardNav(false);
    }, closeDelay);
  }, [closeDelay, clearCloseTimeout]);

  const handleTriggerMouseEnter = useCallback((menuId: string) => {
    setIsKeyboardNav(false);
    openMenu(menuId);
  }, [openMenu]);

  const handleTriggerMouseLeave = useCallback(() => {
    closeMenuWithDelay();
  }, [closeMenuWithDelay]);

  const handleMenuMouseEnter = useCallback(() => {
    clearCloseTimeout();
  }, [clearCloseTimeout]);

  const handleMenuMouseLeave = useCallback(() => {
    closeMenuWithDelay();
  }, [closeMenuWithDelay]);

  // Get all focusable elements in the menu
  const getFocusableElements = useCallback((menuId: string): HTMLElement[] => {
    const menu = menuRefs.current.get(menuId);
    if (!menu) return [];
    
    return Array.from(
      menu.querySelectorAll<HTMLElement>('a[href], button:not([disabled])')
    ).filter(el => el.offsetParent !== null);
  }, []);

  // Typeahead search within menu
  const handleTypeahead = useCallback((char: string, menuId: string) => {
    // Clear previous timeout
    if (typeaheadTimeoutRef.current) {
      clearTimeout(typeaheadTimeoutRef.current);
    }

    // Add character to search string
    typeaheadRef.current += char.toLowerCase();

    // Clear search string after 500ms of inactivity
    typeaheadTimeoutRef.current = setTimeout(() => {
      typeaheadRef.current = '';
    }, 500);

    // Find matching element
    const focusableElements = getFocusableElements(menuId);
    const matchingElement = focusableElements.find(el => {
      const text = el.textContent?.toLowerCase() || '';
      return text.startsWith(typeaheadRef.current);
    });

    if (matchingElement) {
      matchingElement.focus();
    }
  }, [getFocusableElements]);

  const handleTriggerKeyDown = useCallback((e: React.KeyboardEvent, menuId: string) => {
    const triggers = Array.from(triggerRefs.current.keys());
    const currentIndex = triggers.indexOf(menuId);

    switch (e.key) {
      case 'Enter':
      case ' ':
      case 'ArrowDown':
        e.preventDefault();
        setIsKeyboardNav(true);
        openMenu(menuId);
        // Focus first item in menu
        setTimeout(() => {
          const focusableElements = getFocusableElements(menuId);
          focusableElements[0]?.focus();
        }, 0);
        break;

      case 'Escape':
        closeMenu();
        triggerRefs.current.get(menuId)?.focus();
        break;

      case 'ArrowRight':
        e.preventDefault();
        // Move to next trigger
        const nextIndex = (currentIndex + 1) % triggers.length;
        const nextTrigger = triggerRefs.current.get(triggers[nextIndex]);
        nextTrigger?.focus();
        if (activeMenu) {
          openMenu(triggers[nextIndex]);
        }
        break;

      case 'ArrowLeft':
        e.preventDefault();
        // Move to previous trigger
        const prevIndex = currentIndex === 0 ? triggers.length - 1 : currentIndex - 1;
        const prevTrigger = triggerRefs.current.get(triggers[prevIndex]);
        prevTrigger?.focus();
        if (activeMenu) {
          openMenu(triggers[prevIndex]);
        }
        break;

      case 'Home':
        e.preventDefault();
        // Move to first trigger
        const firstTrigger = triggerRefs.current.get(triggers[0]);
        firstTrigger?.focus();
        if (activeMenu) {
          openMenu(triggers[0]);
        }
        break;

      case 'End':
        e.preventDefault();
        // Move to last trigger
        const lastTrigger = triggerRefs.current.get(triggers[triggers.length - 1]);
        lastTrigger?.focus();
        if (activeMenu) {
          openMenu(triggers[triggers.length - 1]);
        }
        break;
    }
  }, [activeMenu, openMenu, closeMenu, getFocusableElements]);

  const handleMenuKeyDown = useCallback((e: React.KeyboardEvent, menuId: string) => {
    const focusableElements = getFocusableElements(menuId);
    const currentIndex = focusableElements.indexOf(document.activeElement as HTMLElement);

    switch (e.key) {
      case 'Escape':
        e.preventDefault();
        closeMenu();
        triggerRefs.current.get(menuId)?.focus();
        break;

      case 'ArrowDown':
        e.preventDefault();
        // Move to next item
        const nextIndex = (currentIndex + 1) % focusableElements.length;
        focusableElements[nextIndex]?.focus();
        break;

      case 'ArrowUp':
        e.preventDefault();
        // Move to previous item
        const prevIndex = currentIndex === 0 ? focusableElements.length - 1 : currentIndex - 1;
        focusableElements[prevIndex]?.focus();
        break;

      case 'Home':
        e.preventDefault();
        // Move to first item
        focusableElements[0]?.focus();
        break;

      case 'End':
        e.preventDefault();
        // Move to last item
        focusableElements[focusableElements.length - 1]?.focus();
        break;

      case 'Tab':
        // Allow natural tab behavior but close menu when tabbing out
        if (e.shiftKey && currentIndex === 0) {
          closeMenu();
        } else if (!e.shiftKey && currentIndex === focusableElements.length - 1) {
          closeMenu();
        }
        break;

      default:
        // Handle typeahead for single printable characters
        if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
          handleTypeahead(e.key, menuId);
        }
        break;
    }
  }, [closeMenu, getFocusableElements, handleTypeahead]);

  const registerTrigger = useCallback((menuId: string, element: HTMLButtonElement | null, label?: string) => {
    if (element) {
      triggerRefs.current.set(menuId, element);
      if (label) {
        menuLabelsRef.current.set(menuId, label);
      }
    } else {
      triggerRefs.current.delete(menuId);
      menuLabelsRef.current.delete(menuId);
    }
  }, []);

  const registerMenu = useCallback((menuId: string, element: HTMLElement | null) => {
    if (element) {
      menuRefs.current.set(menuId, element);
    } else {
      menuRefs.current.delete(menuId);
    }
  }, []);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!activeMenu) return;

      const menu = menuRefs.current.get(activeMenu);
      const trigger = triggerRefs.current.get(activeMenu);
      
      if (
        menu && !menu.contains(e.target as Node) &&
        trigger && !trigger.contains(e.target as Node)
      ) {
        closeMenu();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [activeMenu, closeMenu]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
      if (typeaheadTimeoutRef.current) {
        clearTimeout(typeaheadTimeoutRef.current);
      }
    };
  }, []);

  return {
    activeMenu,
    isKeyboardNav,
    openMenu,
    closeMenu,
    handleTriggerMouseEnter,
    handleTriggerMouseLeave,
    handleMenuMouseEnter,
    handleMenuMouseLeave,
    handleTriggerKeyDown,
    handleMenuKeyDown,
    registerTrigger,
    registerMenu,
  };
};
