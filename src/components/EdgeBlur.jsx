// src/components/EdgeBlur.jsx
// Fixed top and bottom progressive blur that content scrolls under

export default function EdgeBlur() {
    return (
        <>
            {/* Top progressive blur */}
            <div
                className="fixed top-0 left-0 right-0 h-[60px] z-30 pointer-events-none backdrop-blur-[16px]"
                style={{
                    maskImage: 'linear-gradient(to bottom, black 20%, transparent 100%)',
                    WebkitMaskImage: 'linear-gradient(to bottom, black 20%, transparent 100%)',
                }}
            />
            {/* Bottom progressive blur */}
            <div
                className="fixed bottom-0 left-0 right-0 h-[60px] z-30 pointer-events-none backdrop-blur-[16px]"
                style={{
                    maskImage: 'linear-gradient(to top, black 20%, transparent 100%)',
                    WebkitMaskImage: 'linear-gradient(to top, black 20%, transparent 100%)',
                }}
            />
        </>
    );
}
