import React from 'react'

const JobFilters: React.FC = () => {
    return (
        <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
            {/* Search Input */}
            <div style={{ flex: 1, position: 'relative' }}>
                <div style={{
                    position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF'
                }}>
                    <SearchIcon />
                </div>
                <input
                    type="text"
                    placeholder="Search by job title..."
                    style={{
                        width: '100%',
                        height: '40px',
                        padding: '0 16px 0 40px',
                        borderRadius: '8px',
                        border: '1px solid #E5E7EB',
                        backgroundColor: '#FFFFFF',
                        fontSize: '14px',
                        fontFamily: 'Century Gothic, sans-serif',
                        color: '#262626',
                        outline: 'none'
                    }}
                />
            </div>

            {/* Status Dropdown */}
            <div style={{ position: 'relative', minWidth: '140px' }}>
                <select style={{
                    width: '100%', height: '40px', padding: '0 12px', borderRadius: '8px',
                    border: '1px solid #E5E7EB', backgroundColor: '#FFFFFF',
                    fontSize: '14px', fontFamily: 'Century Gothic, sans-serif', color: '#262626',
                    cursor: 'pointer', outline: 'none', appearance: 'none'
                }}>
                    <option>Status: All</option>
                    <option>Active</option>
                    <option>Closed</option>
                    <option>Draft</option>
                </select>
                <div style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#6B7280' }}>
                    <ChevronDownIcon />
                </div>
            </div>

            {/* Type Dropdown */}
            <div style={{ position: 'relative', minWidth: '140px' }}>
                <select style={{
                    width: '100%', height: '40px', padding: '0 12px', borderRadius: '8px',
                    border: '1px solid #E5E7EB', backgroundColor: '#FFFFFF',
                    fontSize: '14px', fontFamily: 'Century Gothic, sans-serif', color: '#262626',
                    cursor: 'pointer', outline: 'none', appearance: 'none'
                }}>
                    <option>Type: All</option>
                    <option>Full-time</option>
                    <option>Part-time</option>
                    <option>Contract</option>
                </select>
                <div style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#6B7280' }}>
                    <ChevronDownIcon />
                </div>
            </div>

            {/* Sort Dropdown */}
            <div style={{ position: 'relative', minWidth: '160px' }}>
                <select style={{
                    width: '100%', height: '40px', padding: '0 12px', borderRadius: '8px',
                    border: '1px solid #E5E7EB', backgroundColor: '#FFFFFF',
                    fontSize: '14px', fontFamily: 'Century Gothic, sans-serif', color: '#262626',
                    cursor: 'pointer', outline: 'none', appearance: 'none'
                }}>
                    <option>Sort by: New</option>
                    <option>Sort by: Oldest</option>
                </select>
                <div style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#6B7280' }}>
                    <ChevronDownIcon />
                </div>
            </div>
        </div>
    )
}

const SearchIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </svg>
)

const ChevronDownIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="6 9 12 15 18 9"></polyline>
    </svg>
)

export default JobFilters
