interface NotesDisplayProps {
    notes?: string;
    specialConditions?: string;
}

export default function NotesDisplay({ notes, specialConditions }: NotesDisplayProps) {
    if (!notes && !specialConditions) return null;

    return (
        <div className="bg-gradient-to-r from-indigo-900/50 to-purple-900/50 rounded-xl p-3 mb-4 border border-indigo-500/30">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {notes && (
                    <div>
                        <div className="text-lg font-bold text-indigo-300 mb-1">📝 Notes</div>
                        <div className="text-sm text-white">{notes}</div>
                    </div>
                )}
                {specialConditions && (
                    <div>
                        <div className="text-lg font-bold text-yellow-300 mb-1">⚠️ Special Conditions</div>
                        <div className="text-sm text-white">{specialConditions}</div>
                    </div>
                )}
            </div>
        </div>
    );
}
