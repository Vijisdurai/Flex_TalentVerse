import React, { useState } from 'react'

interface NotesPanelProps {
    notes: string
    onSave: (note: string) => void
}

const NotesPanel: React.FC<NotesPanelProps> = ({ notes, onSave }) => {
    const [currentNote, setCurrentNote] = useState(notes)

    const handleSave = () => {
        onSave(currentNote)
        alert('Note saved!')
    }

    return (
        <div style={{ backgroundColor: '#FFFFFF', borderRadius: '12px', padding: '16px', border: '1px solid #F3F4F6' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <h3 style={{
                    fontSize: '15px', fontWeight: 'bold', fontFamily: 'ITC Avant Garde Gothic Pro, sans-serif',
                    color: '#262626', margin: 0
                }}>
                    Notes
                </h3>
                <span style={{ fontSize: '12px', color: '#9CA3AF', fontFamily: 'Century Gothic, sans-serif' }}>Private</span>
            </div>

            <textarea
                value={currentNote}
                onChange={(e) => setCurrentNote(e.target.value)}
                style={{
                    width: '100%', minHeight: '100px', padding: '12px',
                    borderRadius: '8px', border: '1px solid #E5E7EB',
                    fontSize: '13px', fontFamily: 'Century Gothic, sans-serif',
                    marginBottom: '12px', resize: 'vertical'
                }}
                placeholder="Add private notes here..."
            />

            <button
                onClick={handleSave}
                style={{
                    width: '100%', padding: '8px',
                    backgroundColor: '#009ADD', color: '#FFFFFF',
                    border: 'none', borderRadius: '6px',
                    fontSize: '13px', fontWeight: 600, cursor: 'pointer',
                    fontFamily: 'ITC Avant Garde Gothic Pro, sans-serif'
                }}
            >
                Save Note
            </button>
        </div>
    )
}

export default NotesPanel
