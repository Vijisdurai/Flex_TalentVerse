import React from 'react'

interface ResumeCardProps {
    fileName: string
    onDownload: () => void
}

const ResumeCard: React.FC<ResumeCardProps> = ({ fileName, onDownload }) => {
    return (
        <div style={{ marginBottom: '24px' }}>
            <h3 style={{
                fontSize: '16px', fontWeight: 'bold', fontFamily: 'ITC Avant Garde Gothic Pro, sans-serif',
                color: '#262626', marginBottom: '12px'
            }}>
                Resume
            </h3>

            <div style={{
                border: '1px solid #F3F4F6', borderRadius: '12px', padding: '24px',
                textAlign: 'center', backgroundColor: '#F9FAFB'
            }}>
                <div style={{
                    margin: '0 auto 12px', width: '40px', height: '50px', border: '2px solid #E5E7EB', borderRadius: '4px',
                    position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9CA3AF'
                }}>
                    <FileIcon size={24} />
                    <div style={{
                        position: 'absolute', top: '-2px', right: '-2px',
                        borderTop: '10px solid #F9FAFB', borderLeft: '10px solid transparent'
                    }}></div>
                </div>

                <div style={{ fontSize: '13px', color: '#4B5563', marginBottom: '16px', fontFamily: 'Century Gothic, sans-serif' }}>
                    {fileName}
                </div>

                <button
                    onClick={onDownload}
                    style={{
                        padding: '6px 16px',
                        backgroundColor: '#FFFFFF',
                        border: '1px solid #E5E7EB',
                        borderRadius: '6px',
                        fontSize: '12px',
                        fontWeight: 600,
                        color: '#374151',
                        cursor: 'pointer',
                        display: 'inline-flex', alignItems: 'center', gap: '6px',
                        fontFamily: 'Century Gothic, sans-serif'
                    }}
                >
                    <DownloadIcon size={14} /> Download
                </button>
            </div>
        </div>
    )
}

// Icons
const FileIcon = ({ size }: { size: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
        <polyline points="13 2 13 9 20 9"></polyline>
    </svg>
)

const DownloadIcon = ({ size }: { size: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
        <polyline points="7 10 12 15 17 10"></polyline>
        <line x1="12" y1="15" x2="12" y2="3"></line>
    </svg>
)

export default ResumeCard
