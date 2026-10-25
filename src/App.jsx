import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import UserHome from './pages/UserHome';
import UserReportForm from './pages/UserReportForm';
import UserReportHistory from './pages/UserReportHistory';
import UserProfile from './pages/UserProfile';
import AdminHome from './pages/AdminHome';
import AdminReportDetail from './pages/AdminReportDetail';
import UserReportDetailModal from './components/UserReportDetailModal';
import { INITIAL_USER } from './data/mockData';
import { getReports, createReport, updateReport, deleteReport } from './services/reportApi';
import { CheckCircle2, AlertCircle, Info, LogOut, Menu } from 'lucide-react';
import { Toaster, toast } from 'sonner';
import ReportSkeleton from './components/ReportSkeleton';
import EmptyState from './components/EmptyState';

export default function App() {
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('pengaduan_active_session');
    return saved ? JSON.parse(saved) : null;
  });

  const [authView, setAuthView] = useState('landing'); 
  const [role, setRole] = useState(() => currentUser?.role === 'Admin' ? 'admin' : 'mahasiswa');
  const [currentTab, setCurrentTab] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [reports, setReports] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState('');

  const [selectedReport, setSelectedReport] = useState(null);
  const [userModalReport, setUserModalReport] = useState(null);
  const [toast, setToast] = useState(null);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const loadReports = async () => {
    setIsLoading(true);
    setLoadError('');
    try {
      setReports(await getReports());
    } catch {
      setLoadError('Gagal memuat data. Periksa koneksi lalu coba lagi.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadReports();
  }, []);

  const triggerToast = (message, type = 'success') => {
  if (type === 'error') toast.error(message);
  else if (type === 'info') toast.info(message);
  else toast.success(message);
};

  const handleProtectedAction = (actionCallback) => {
    if (!currentUser) {
      setAuthView('login');
      triggerToast('Silakan masuk/login terlebih dahulu untuk mengakses fitur.', 'info');
    } else if (actionCallback) {
      actionCallback();
    }
  };

  const handleLogin = (credentials) => {
    const { email, name } = credentials;
    let loggedUser;

    if (email.toLowerCase().includes('admin')) {
      loggedUser = {
        name: 'Admin Sarpras Kampus',
        email: email,
        role: 'Admin',
        avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop&crop=faces',
      };
      setRole('admin');
      setCurrentTab('admin-home');
    } else {
      const isDimas = email.toLowerCase().includes('dimasmahardika') || email === INITIAL_USER.email;
      loggedUser = {
        name: name || (isDimas ? INITIAL_USER.name : email.split('@')[0]),
        email: email,
        role: 'Mahasiswa',
        nim: isDimas ? '2311010888' : '2311010' + Math.floor(100 + Math.random() * 900),
        avatar: '/images/avatar.png',
      };
      setRole('mahasiswa');
      setCurrentTab('home');
    }

    setCurrentUser(loggedUser);
    localStorage.setItem('pengaduan_active_session', JSON.stringify(loggedUser));
    triggerToast(`Selamat datang kembali, ${loggedUser.name}!`);
  };

  const handleRegister = (data) => {
    const newUser = {
      name: data.name || 'Mahasiswa Baru',
      email: data.email,
      role: 'Mahasiswa',
      nim: '2311010' + Math.floor(100 + Math.random() * 900),
      avatar: '/images/avatar.png',
    };
    setCurrentUser(newUser);
    setRole('mahasiswa');
    setCurrentTab('home');
    localStorage.setItem('pengaduan_active_session', JSON.stringify(newUser));
    triggerToast('Akun Anda berhasil didaftarkan!');
  };

  const handleConfirmLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('pengaduan_active_session');
    setAuthView('landing');
    setCurrentTab('home');
    setShowLogoutConfirm(false);
    triggerToast('Anda telah keluar dari aplikasi.', 'info');
  };

  const handleAddReport = async (newReport) => {
    const { id, ...payload } = newReport;
    try {
      const saved = await createReport({ ...payload, userEmail: currentUser.email });
      setReports((prev) => [saved, ...prev]);
      triggerToast(`Laporan #${saved.ticketId || 'Baru'} berhasil dikirim!`);
      setCurrentTab('history');
      return true;
    } catch {
      triggerToast('Gagal mengirim laporan. Coba lagi.', 'error');
      return false;
    }
  };

  const handleUpdateStatus = async (reportId, newStatus, newAdminStatus, note) => {
    const target = reports.find((r) => r.id === reportId);
    const patch = {
      ...target,
      status: newStatus,
      adminStatus: newAdminStatus,
      notes: note || target?.notes,
      timeline: [...(target?.timeline || []), { step: `Status diubah ke ${newStatus}`, time: 'Baru saja', done: true }],
    };
    try {
      const saved = await updateReport(reportId, patch);
      setReports((prev) => prev.map((r) => (r.id === reportId ? saved : r)));
      setSelectedReport((prev) => (prev && prev.id === reportId ? saved : prev));
      
      triggerToast(`Status tiket berhasil diubah menjadi: ${newStatus}`);
    } catch {
      triggerToast('Gagal memperbarui status. Coba lagi.', 'error');
    }
  };

  const handleDeleteReport = async (reportId) => {
    try {
      await deleteReport(reportId);
      setReports((prev) => prev.filter((r) => r.id !== reportId));
      setCurrentTab('admin-home');
      triggerToast('Laporan berhasil dihapus.', 'info');
    } catch {
      triggerToast('Gagal menghapus laporan.', 'error');
    }
  };

  const guestUser = {
    name: 'Pengunjung',
    email: 'guest@unjaya.ac.id',
    role: 'Mahasiswa',
    avatar: '/images/avatar.png'
  };

  const getFilteredReportsForUser = () => {
    if (!currentUser) return [];
    if (role === 'admin') return reports;

    return reports.filter((r) => {
      if (currentUser.email === INITIAL_USER.email) {
        return r.userEmail === currentUser.email || !r.userEmail;
      }
      return r.userEmail === currentUser.email;
    });
  };

  const activeUserReports = getFilteredReportsForUser();

  const renderData = (content) =>
    isLoading ? <ReportSkeleton /> :
    loadError ? <ErrorState message={loadError} onRetry={loadReports} /> :
    content;
    

  const homePage = (
    <UserHome
      user={currentUser || guestUser}
      reports={activeUserReports}
      goToForm={() => handleProtectedAction(() => setCurrentTab('form'))}
    />
  );

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col font-sans relative selection:bg-brand-teal selection:text-white">

      {showLogoutConfirm && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 text-center space-y-4 shadow-2xl border border-gray-100 animate-scale-in">
            <div className="w-14 h-14 bg-red-100 text-brand-red rounded-full flex items-center justify-center mx-auto">
              <LogOut className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-black text-gray-900">Keluar dari Akun?</h3>
            <p className="text-xs text-gray-500 font-medium">Anda harus masuk kembali untuk mengakses sistem.</p>
            <div className="flex items-center space-x-3 pt-2">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="flex-1 py-2.5 rounded-xl border border-gray-300 font-bold text-xs text-gray-700 hover:bg-gray-100 cursor-pointer"
              >
                Batal
              </button>
              <button
                onClick={handleConfirmLogout}
                className="flex-1 py-2.5 rounded-xl bg-brand-red hover:bg-red-700 text-white font-bold text-xs shadow-md cursor-pointer"
              >
                Ya, Keluar
              </button>
            </div>
          </div>
        </div>
      )}

      {!currentUser && authView === 'login' && (
        <LoginPage
          onLogin={(user) => handleLogin(user)}
          goToRegister={() => setAuthView('register')}
        />
      )}

      {!currentUser && authView === 'register' && (
        <RegisterPage
          onRegister={handleRegister}
          goToLogin={() => setAuthView('login')}
        />
      )}

      {(currentUser || authView === 'landing') && (
        <div className="flex flex-col md:flex-row flex-1 min-h-screen overflow-hidden">
          
          <header className="md:hidden bg-brand-teal text-white px-4 py-3.5 flex items-center justify-between shadow-md z-30">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="p-1.5 rounded-xl hover:bg-white/20 text-white cursor-pointer"
                title="Buka Menu"
              >
                <Menu className="w-6 h-6" />
              </button>
              <span className="font-extrabold text-base tracking-tight">Unjaya Voice</span>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-xs font-semibold opacity-90 capitalize">
                {currentUser ? (role === 'admin' ? 'Admin' : 'Mahasiswa') : 'Pengunjung'}
              </span>
              <img
                src={currentUser?.avatar || '/images/avatar.png'}
                alt="Avatar"
                className="w-7 h-7 rounded-full object-cover border border-white cursor-pointer"
                onClick={() => handleProtectedAction()}
              />
            </div>
          </header>

          <Sidebar
            currentTab={currentTab}
            setTab={(tab) => handleProtectedAction(() => setCurrentTab(tab))}
            role={currentUser ? role : 'mahasiswa'}
            user={currentUser || guestUser}
            isOpenMobile={mobileMenuOpen}
            onCloseMobile={() => setMobileMenuOpen(false)}
          />

          <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">

            {currentTab === 'home' && (currentUser ? renderData(homePage) : homePage)}

            {currentUser && role === 'mahasiswa' && currentTab === 'form' && (
              <UserReportForm
                onSubmitReport={handleAddReport}
                onCancel={() => setCurrentTab('home')}
              />
            )}

            {currentUser && role === 'mahasiswa' && currentTab === 'history' && renderData(
              <UserReportHistory
                reports={activeUserReports}
                onSelectReport={(rep) => setUserModalReport(rep)}
              />
            )}

            {currentUser && currentTab === 'profile' && (
              <UserProfile
                user={currentUser}
                role={role}
                onUpdateUser={(updated) => {
                  // Sinkronkan nama baru ke data akun terdaftar agar tidak hilang saat login ulang
                  const users = JSON.parse(localStorage.getItem('silapor_users')) || [];
                  const syncedUsers = users.map((u) =>
                    u.email === currentUser.email ? { ...u, name: updated.name } : u
                  );
                  localStorage.setItem('silapor_users', JSON.stringify(syncedUsers));

                  setCurrentUser(updated);
                  localStorage.setItem('pengaduan_active_session', JSON.stringify(updated));
                  triggerToast('Profil berhasil disimpan!');
                }}
                onSignOut={() => setShowLogoutConfirm(true)}
              />
            )}

                        {currentUser && role === 'admin' && currentTab === 'admin-home' && renderData(
              <AdminHome
                reports={reports}
                onSelectReport={(rep) => {
                  setSelectedReport(rep);
                  setCurrentTab('admin-detail');
                }}
              />
            )}

            {currentUser && role === 'admin' && currentTab === 'admin-detail' && selectedReport && (
              <AdminReportDetail
                report={selectedReport}
                onBack={() => setCurrentTab('admin-home')}
                onUpdateStatus={handleUpdateStatus}
              />

            {isLoading ? (
              <div className="flex-1 flex items-center justify-center p-10 text-gray-500 font-bold animate-pulse">
                Memuat data dari MockAPI...
              </div>
            ) : loadError ? (
              <div className="flex-1 flex flex-col items-center justify-center p-10 text-center space-y-3">
                <p className="text-red-600 font-semibold text-sm">{loadError}</p>
                <button
                  onClick={loadReports}
                  className="px-4 py-2 bg-brand-teal text-white rounded-xl text-xs font-bold shadow-sm"
                >
                  Coba Lagi
                </button>
              </div>
            ) : (
              <>
                {currentTab === 'home' && (
                  <UserHome
                    user={currentUser || guestUser}
                    reports={activeUserReports}
                    goToForm={() => handleProtectedAction(() => setCurrentTab('form'))}
                  />
                )}

                {currentUser && role === 'mahasiswa' && currentTab === 'form' && (
                  <UserReportForm
                    onSubmitReport={handleAddReport}
                    onCancel={() => setCurrentTab('home')}
                  />
                )}

                {currentUser && role === 'mahasiswa' && currentTab === 'history' && (
                  <UserReportHistory
                    reports={activeUserReports}
                    onSelectReport={(rep) => setUserModalReport(rep)}
                  />
                )}

                {currentUser && currentTab === 'profile' && (
                  <UserProfile
                    user={currentUser}
                    role={role}
                    onUpdateUser={(updated) => {
                      const users = JSON.parse(localStorage.getItem('silapor_users')) || [];
                      const syncedUsers = users.map((u) =>
                        u.email === currentUser.email ? { ...u, name: updated.name } : u
                      );
                      localStorage.setItem('silapor_users', JSON.stringify(syncedUsers));

                      setCurrentUser(updated);
                      localStorage.setItem('pengaduan_active_session', JSON.stringify(updated));
                      triggerToast('Profil berhasil disimpan!');
                    }}
                    onSignOut={() => setShowLogoutConfirm(true)}
                  />
                )}

                {currentUser && role === 'admin' && currentTab === 'admin-home' && (
                  <AdminHome
                    reports={reports}
                    onSelectReport={(rep) => {
                      setSelectedReport(rep);
                      setCurrentTab('admin-detail');
                    }}
                  />
                )}

                {currentUser && role === 'admin' && currentTab === 'admin-detail' && selectedReport && (
                  <AdminReportDetail
                    report={selectedReport}
                    onBack={() => setCurrentTab('admin-home')}
                    onUpdateStatus={handleUpdateStatus}
                  />
                )}
              </>

            )}
          </main>
        </div>
      )}

      {userModalReport && (
        <UserReportDetailModal
          report={userModalReport}
          onClose={() => setUserModalReport(null)}
        />
            )}
    </div>
  );
