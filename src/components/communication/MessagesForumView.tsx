import React, { useState } from 'react';
import { UserProfile } from '../../types';
import {
  MessageSquare,
  Send,
  Users,
  Search,
  Sparkles,
  CheckCheck,
  PlusCircle,
  HelpCircle,
} from 'lucide-react';

interface MessagesForumViewProps {
  user: UserProfile;
}

export const MessagesForumView: React.FC<MessagesForumViewProps> = ({ user }) => {
  const [activeTab, setActiveTab] = useState<'chat' | 'forum'>('chat');
  const [selectedContact, setSelectedContact] = useState<string>('Ustazah Siti Rahmawati');
  const [chatInput, setChatInput] = useState<string>('');
  const [chatMessages, setChatMessages] = useState<
    Array<{ sender: string; text: string; time: string; isMe: boolean }>
  >([
    {
      sender: 'Ustazah Siti Rahmawati',
      text: 'Assalamu’alaikum, Farhan. Apakah ada kendala pada implementasi token JWT di tugas praktikum 4?',
      time: '08:30 WIB',
      isMe: false,
    },
    {
      sender: 'Muhammad Farhan',
      text: 'Wa’alaikumussalam, Bu. Alhamdulillah sudah lancar, sudah saya deploy dan kumpulkan di menu tugas.',
      time: '08:35 WIB',
      isMe: true,
    },
  ]);

  const [forumPosts, setForumPosts] = useState<
    Array<{ id: string; author: string; role: string; title: string; body: string; replies: number; time: string }>
  >([
    {
      id: 'post-1',
      author: 'Ahmad Rizky Pratama',
      role: 'Siswa XII RPL 1',
      title: 'Tanya error CORS saat menghubungkan Vite React ke Backend Express?',
      body: 'Halo teman-teman, saat fetch API dari port 3000 ke 5000 muncul error CORS header missing. Solusinya pasang cors middleware di server.ts ya?',
      replies: 4,
      time: '2 jam lalu',
    },
    {
      id: 'post-2',
      author: 'Ustazah Siti Rahmawati',
      role: 'Guru Kejuruan RPL',
      title: 'Tips Optimasi Database Indexing untuk Proyek Uji Kompetensi',
      body: 'Untuk seluruh siswa kelas XII yang sedang menyiapkan UKK, pastikan kolom foreign key di relasi tabel sudah diberi indexing agar query cepat.',
      replies: 8,
      time: '1 hari lalu',
    },
  ]);

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    setChatMessages((prev) => [
      ...prev,
      {
        sender: user.name,
        text: chatInput,
        time: 'Baru saja',
        isMe: true,
      },
    ]);
    setChatInput('');
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="inline-flex items-center space-x-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
            <MessageSquare className="w-3.5 h-3.5 mr-1" />
            <span>Menu 17: Komunikasi & Kolaborasi</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
            Pesan Langsung & Forum Diskusi Terbuka
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Komunikasi interaktif antara siswa, guru pengampu, wali kelas, dan orang tua murid.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex overflow-x-auto space-x-2 border-b border-slate-200 dark:border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab('chat')}
          className={`px-3.5 py-1.5 text-xs font-bold rounded-xl whitespace-nowrap transition ${
            activeTab === 'chat'
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          Pesan Masuk Pribadi (Chat 1-on-1)
        </button>
        <button
          onClick={() => setActiveTab('forum')}
          className={`px-3.5 py-1.5 text-xs font-bold rounded-xl whitespace-nowrap transition ${
            activeTab === 'forum'
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          Forum Diskusi & Tanya Jawab Komunitas ({forumPosts.length})
        </button>
      </div>

      {/* Tab 1: Chat 1-on-1 */}
      {activeTab === 'chat' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-white dark:bg-slate-800/90 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xs overflow-hidden h-[600px]">
          
          {/* Contact List */}
          <div className="lg:col-span-4 border-r border-slate-200 dark:border-slate-700 flex flex-col">
            <div className="p-3.5 border-b border-slate-100 dark:border-slate-700">
              <input
                type="text"
                placeholder="Cari kontak guru/wali/siswa..."
                className="w-full px-3 py-1.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs focus:outline-none focus:border-emerald-500 text-slate-900 dark:text-white"
              />
            </div>

            <div className="flex-1 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-700/60">
              {[
                { name: 'Ustazah Siti Rahmawati', role: 'Guru Pemrograman Web', unread: 0, online: true },
                { name: 'Bustamam Arifin, S.Pd.', role: 'Wali Kelas XII RPL 1', unread: 1, online: true },
                { name: 'Pak Syahril Efendi', role: 'Guru BK & Kedisiplinan', unread: 0, online: false },
                { name: 'Ahmad Rizky Pratama', role: 'Ketua Kelas', unread: 0, online: true },
              ].map((contact, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedContact(contact.name)}
                  className={`p-3.5 flex items-center justify-between cursor-pointer transition text-xs ${
                    selectedContact === contact.name
                      ? 'bg-emerald-50/80 dark:bg-emerald-950/40 border-l-4 border-emerald-500'
                      : 'hover:bg-slate-50 dark:hover:bg-slate-700/40'
                  }`}
                >
                  <div className="space-y-0.5">
                    <div className="font-bold text-slate-900 dark:text-white flex items-center">
                      {contact.name}
                      {contact.online && (
                        <span className="w-2 h-2 rounded-full bg-emerald-500 ml-2" />
                      )}
                    </div>
                    <div className="text-slate-500 text-[11px]">{contact.role}</div>
                  </div>

                  {contact.unread > 0 && (
                    <span className="w-5 h-5 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center">
                      {contact.unread}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Active Chat Conversation Area */}
          <div className="lg:col-span-8 flex flex-col justify-between bg-slate-50/50 dark:bg-slate-900/40">
            
            {/* Contact Topbar */}
            <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between bg-white dark:bg-slate-800">
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-sm">
                  {selectedContact}
                </h3>
                <span className="text-[11px] text-emerald-600 font-semibold">
                  Online di Portal LMS
                </span>
              </div>
            </div>

            {/* Chat Messages Feed */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3">
              {chatMessages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col ${msg.isMe ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-md p-3.5 rounded-2xl text-xs space-y-1 ${
                      msg.isMe
                        ? 'bg-emerald-600 text-white rounded-tr-none'
                        : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 rounded-tl-none'
                    }`}
                  >
                    <p className="leading-relaxed">{msg.text}</p>
                    <div
                      className={`text-[10px] text-right ${
                        msg.isMe ? 'text-emerald-100' : 'text-slate-400'
                      }`}
                    >
                      {msg.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Chat Input Bar */}
            <form
              onSubmit={handleSendChat}
              className="p-3.5 border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 flex items-center space-x-2"
            >
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Ketik pesan dengan santun..."
                className="flex-1 px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs focus:outline-none focus:border-emerald-500 text-slate-900 dark:text-white"
              />
              <button
                type="submit"
                className="p-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl transition"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

          </div>

        </div>
      )}

      {/* Tab 2: Forum Diskusi */}
      {activeTab === 'forum' && (
        <div className="space-y-4">
          <div className="p-4 bg-white dark:bg-slate-800/90 rounded-2xl border border-slate-200 dark:border-slate-700 flex justify-between items-center shadow-xs">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
              Punya pertanyaan seputar materi pelajaran atau proyek TEFA?
            </span>
            <button
              onClick={() => alert('Membuka modal Buat Topik Diskusi Baru...')}
              className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs transition flex items-center space-x-1.5"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Buat Topik Baru</span>
            </button>
          </div>

          <div className="space-y-3">
            {forumPosts.map((post) => (
              <div
                key={post.id}
                className="p-5 bg-white dark:bg-slate-800/90 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-3 shadow-xs"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-slate-900 dark:text-white text-xs">
                      {post.author}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                      {post.role}
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-400">{post.time}</span>
                </div>

                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-sm">
                    {post.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                    {post.body}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between text-xs text-emerald-600 font-semibold">
                  <span>{post.replies} Tanggapan / Diskusi</span>
                  <button className="hover:underline">Buka Thread Diskusi →</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
