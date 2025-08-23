import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import "../styles/theme.css";

/**
 * Generic, reusable modal component
 * Props:
 *  - open: boolean — whether the modal is visible
 *  - onClose: () => void — called when user requests close (backdrop, ESC, buttons)
 *  - title?: ReactNode — header title
 *  - closeText?: string — label for bottom-right close button (default "Close")
 *  - closeOnBackdrop?: boolean — click outside closes (default true)
 *  - closeOnEsc?: boolean — ESC closes (default true)
 *  - showCloseIcon?: boolean — show top-right × (default true)
 *  - widthClass?: string — optional CSS class to override width (e.g., "modal-w-md")
 *  - keepMounted?: boolean — whether to keep the modal mounted in the DOM when closed
 *  - children: ReactNode — modal content
 */
export default function GenericModal({
    open,
    onClose,
    title,
    children,
    closeText = "Close",
    closeOnBackdrop = true,
    closeOnEsc = true,
    showCloseIcon = true,
    widthClass = "",
    keepMounted = false,
    ...props
}) {
    const [portalRoot, setPortalRoot] = useState(null);
    const overlayRef = useRef(null);
    const dialogRef = useRef(null);
    const previouslyFocused = useRef(null);
    const titleId = useRef(`modal-${Math.random().toString(36).slice(2)}-title`).current;

    const stopPropagation = (e) => e.stopPropagation();

    // Create/get the portal root in the **browser only**
    useEffect(() => {
        if (typeof document === "undefined") return; // SSR guard
        let el = document.getElementById("modal-root");
        if (!el) {
            el = document.createElement("div");
            el.id = "modal-root";
            document.body.appendChild(el);
        }
        setPortalRoot(el);
    }, []);

    useEffect(() => {
        if (!open) return;

        // Save focus & lock background scroll
        previouslyFocused.current = document.activeElement;
        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        // Focus first focusable element inside the dialog
        requestAnimationFrame(() => {
            const node = dialogRef.current;
            const focusable = node?.querySelector(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );
            (focusable ?? node)?.focus?.();
        });

        function onKeyDown(e) {
            if (e.key === "Escape" && closeOnEsc) {
                e.stopPropagation();
                onClose?.();
            }
            // Minimal focus trap
            if (e.key === "Tab") {
                const list = dialogRef.current?.querySelectorAll(
                    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
                );
                if (!list || list.length === 0) {
                    e.preventDefault();
                    return;
                }
                const focusables = Array.from(list).filter(
                    (el) => !el.hasAttribute("disabled") && el.getAttribute("tabindex") !== "-1"
                );
                const first = focusables[0];
                const last = focusables[focusables.length - 1];
                if (e.shiftKey && document.activeElement === first) {
                    e.preventDefault();
                    last.focus();
                } else if (!e.shiftKey && document.activeElement === last) {
                    e.preventDefault();
                    first.focus();
                }
            }
        }

        document.addEventListener("keydown", onKeyDown, true);

        return () => {
            document.removeEventListener("keydown", onKeyDown, true);
            document.body.style.overflow = prevOverflow;
            previouslyFocused.current && previouslyFocused.current.focus?.();
        };
    }, [open, closeOnEsc, onClose]);

    if (!portalRoot) return null;
    if (!keepMounted && !open) return null;

    function handleOverlayClick(e) {
        e.stopPropagation();
        if (e.target === e.currentTarget && closeOnBackdrop)
            onClose?.();
    }

    {/* portal is good for modals to avoid a lot of problems
        related to z-index, clipping when inside overflow: hidden,
        positioning, etc. */}
    return createPortal(
        <div
            ref={overlayRef}
            className={`modalOverlay transition-opacity duration-150
                ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
            onClick={handleOverlayClick}
            aria-hidden={open ? "false" : "true"}
            {...(!open ? { inert: '' } : {})}
        >
            <div
                role="dialog"
                aria-modal="true"
                aria-labelledby={title ? titleId : undefined}
                ref={dialogRef}
                className={`modalDialog ${widthClass} transition-transform duration-150
                ${open ? 'scale-100' : 'scale-95'}`}
                tabIndex={-1}
                onPointerDown={stopPropagation}
                onClick={stopPropagation}
                {...props}
            >
                <div className="modalHeader">
                    <div id={titleId} className="modalTitle">
                        {title}
                    </div>
                    {showCloseIcon && (
                        <button aria-label="Close" className="modalCloseIcon"
                        onClick={(e) => { e.stopPropagation(); onClose?.(); }}>
                            ✕
                        </button>
                    )}
                </div>

                <div className="modalBody">{children}</div>

                <div className="modalFooter">
                    <button className="modalCloseBtn"
                        onClick={(e) => { e.stopPropagation(); onClose?.(); }}>
                        {closeText}
                    </button>
                </div>
            </div>
        </div>,
        portalRoot
    );
}
