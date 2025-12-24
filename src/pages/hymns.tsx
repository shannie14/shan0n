// src/pages/hymns.tsx
import React, { useMemo, useState } from 'react';
import hymns from '../components/hymns.json';

type Hymn = {
  video: number;
  verse: string;
  title: string;
  hymn: number;
  file: string;
};

const audioBasePath = '/hymns/'; 

export default function HymnsPage() {

  const [query, setQuery] = useState('');
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return hymns as Hymn[];
    return (hymns as Hymn[]).filter((h) => {
      return (
        h.title.toLowerCase().includes(q) ||
        h.verse.toLowerCase().includes(q) ||
        String(h.hymn).includes(q) ||
        String(h.video).includes(q)
      );
    });
  }, [query]);

  // request link functionality
  const [shareLink, setShareLink] = useState('')
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)

  const handleSendLink = async () => {
    if (!shareLink) return
    setSending(true)

    try {
      const res = await fetch('/api/send-link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ link: shareLink }),
      })

      if (res.ok) {
        setSent(true)
        setShareLink('')
      } else {
        alert('Failed to send link.')
      }
    } catch {
      alert('Error sending link.')
    } finally {
      setSending(false)
    }
  }


  return (
    <main className="min-h-screen bg-babypowder text-gray-900">
      <div className="max-w-5xl mx-auto px-4 py-12">

        <header className="mb-2">
          <h1 className="font-semibold text-cadetGray mt-2">Daily Hymns</h1>
        </header>

      {/* search box */}
        <div className="mb-6 p-5 bg-[#6082B6]/50 rounded-md">
          <label className="block text-sm font-medium text-[#ffffff] mb-2" htmlFor="hymn-search">
            <span className="text-lg text-[#FFFDD0]">Search</span> by title, hymn number, or video number
          </label>
          <input
            id="hymn-search"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g., Shepherd or 735"
            className="w-full rounded-md border border-cadetGray/30 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-cadetGray/50"
          />
          <p className="text-xs text-cadetGray/70 mt-1">
            {filtered.length} {filtered.length === 1 ? 'result' : 'results'}
          </p>
        </div>

        {/* request */}
        <div className="mb-6 p-5 bg-[#6082B6]/50 rounded-md">
            <label className=" block text-sm font-medium text-[#ffffff] mb-2" htmlFor="hymn-link"><span className="text-lg text-[#FFFDD0]">Request</span> a hymn to be added
            </label>

            <div className="flex gap-2">
              <input
                id="hymn-link"
                type="url"
                value={shareLink}
                onChange={(e) => setShareLink(e.target.value)}
                placeholder="Paste a YouTube link here"
                className="w-full rounded-md border border-cadetGray/30 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-cadetGray/50"
              />

              <button
                onClick={handleSendLink}
                disabled={sending || !shareLink}
                className="shrink-0 rounded-md bg-cadetGray px-4 py-2 text-sm font-medium text-white shadow
                          hover:bg-cadetGray/90 disabled:opacity-50"
              >
                {sending ? 'Sending…' : 'Send'}
              </button>
            </div>

          {sent && (
            <p className="text-xs text-[#FFFDD0] mt-1">
              Thanks! Your link has been sent and will be added soon!
            </p>
          )}
        </div>


        <div className="space-y-6">
          {filtered.map((item) => {
            const audioUrl = `${audioBasePath}${encodeURIComponent(item.file)}`;
            return (
              <article
                key={`${item.hymn}-${item.title}`}
                className="rounded-xl border border-cadetGray/20 bg-white shadow-sm px-4 sm:px-6 py-5"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-cadetGray">
                      Hymn {item.hymn}
                    </p>
                    <h2 className="text-xl font-semibold text-[#5D8AA8]">{item.title}</h2>
                    <p className="text-cadetGray text-xs mt-1">Video Ref: {item.video}</p>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <a
                      href={audioUrl}
                      download
                      className="inline-flex items-center rounded-md border border-cadetGray/30 bg-white px-3 py-2 text-sm font-medium text-cadetGray hover:bg-cadetGray/10 transition"
                    >
                      Download
                    </a>
                  </div>
                </div>

                <div className="mt-4">
                  <audio controls className="w-full">
                    <source src={audioUrl} type="audio/mpeg" />
                    Your browser does not support the audio element.
                  </audio>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </main>
  );
}
