import { router } from '@inertiajs/react';

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface PaginationProps {
    currentPage: number;
    lastPage: number;
    from: number;
    to: number;
    total: number;
    links: PaginationLink[];
}

export default function Pagination({ currentPage, lastPage, from, to, total, links }: PaginationProps) {
    if (lastPage <= 1) {
        return null;
    }

    return (
        <div className="mt-6 space-y-4">
            {/* Results Summary */}
            <div className="text-gray-400 text-sm text-center">
                Showing <span className="text-white font-semibold">{from || 0}</span> to{' '}
                <span className="text-white font-semibold">{to || 0}</span> of{' '}
                <span className="text-white font-semibold">{total}</span> results
            </div>

            {/* Pagination Links */}
            <div className="flex items-center justify-center gap-2">
                {links.map((link, index) => (
                    <button
                        key={index}
                        onClick={() => link.url && router.visit(link.url)}
                        disabled={!link.url || link.active}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                            link.active
                                ? 'bg-blue-600 text-white'
                                : link.url
                                ? 'bg-gray-700 hover:bg-gray-600 text-white'
                                : 'bg-gray-800 text-gray-500 cursor-not-allowed'
                        }`}
                        dangerouslySetInnerHTML={{ __html: link.label }}
                    />
                ))}
            </div>

            {/* Page Counter */}
            <div className="text-gray-400 text-sm text-center">
                Page {currentPage} of {lastPage}
            </div>
        </div>
    );
}
