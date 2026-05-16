import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useSocket } from "../../contexts/SocketContext";
import notificationService from "../../services/notificationService";

const notificationIconMap = {
  COMMENT_ADDED: "chat_bubble",
  TASK_ASSIGNED: "assignment_ind",
  TASK_CREATED: "add_task",
  PROJECT_INVITATION: "group_add",
};

const formatNotificationTime = (value) => {
  if (!value) return "";
  const diffMs = Date.now() - new Date(value).getTime();
  const minutes = Math.max(Math.floor(diffMs / 60000), 0);
  if (minutes < 1) return "Vừa xong";
  if (minutes < 60) return `${minutes} phút trước`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} giờ trước`;
  return new Date(value).toLocaleDateString("vi-VN", { day: "2-digit", month: "short" });
};

export default function TopBar({ taskCount = 0 }) {
  const { user } = useAuth();
  const socket = useSocket();
  const [notifications, setNotifications] = useState([]);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const notificationRef = useRef(null);

  const initials = user?.fullname
    ? user.fullname.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase()
    : "NT";

  const firstName = user?.fullname?.split(" ")[0] || "Bạn";
  const unreadCount = notifications.filter(notification => !notification.isRead).length;

  useEffect(() => {
    if (!user) return;

    let cancelled = false;

    notificationService.getNotifications()
      .then((data) => {
        if (!cancelled) {
          setNotifications(Array.isArray(data) ? data : []);
        }
      })
      .catch((error) => {
        if (!cancelled) {
          console.error("Fetch notifications error:", error);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [user]);

  useEffect(() => {
    if (!socket) return;

    const handleNewNotification = (notification) => {
      setNotifications(prev => {
        if (prev.some(item => item.id === notification.id)) return prev;
        return [notification, ...prev].slice(0, 20);
      });
    };

    socket.on("notification:new", handleNewNotification);
    return () => socket.off("notification:new", handleNewNotification);
  }, [socket]);

  useEffect(() => {
    if (!isNotificationsOpen) return;

    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setIsNotificationsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isNotificationsOpen]);

  const handleMarkAsRead = async (notification) => {
    setIsNotificationsOpen(false);
    if (notification.isRead) return;

    // Optimistic update - đánh dấu đã đọc ngay lập tức
    setNotifications(prev => prev.map(item =>
      item.id === notification.id ? { ...item, isRead: true } : item
    ));

    try {
      await notificationService.markAsRead(notification.id);
    } catch (error) {
      // Nếu là lỗi mạng (backend offline) thì hoàn tác optimistic update
      if (!error.response) {
        setNotifications(prev => prev.map(item =>
          item.id === notification.id ? { ...item, isRead: false } : item
        ));
        console.warn("Không thể đánh dấu đã đọc: backend không phản hồi");
      } else {
        console.error("Mark notification as read error:", error);
      }
    }
  };

  const handleMarkAllAsRead = async () => {
    if (unreadCount === 0) return;
    setNotifications(prev => prev.map(item => ({ ...item, isRead: true })));

    try {
      await notificationService.markAllAsRead();
    } catch (error) {
      console.error("Mark all notifications as read error:", error);
    }
  };

  return (
    <header className="flex items-center justify-between px-8 py-4 border-b border-[#c7c4d7] bg-[#fcf8ff]">
      <div>
        <h1 className="text-xl font-bold text-[#1b1b23]">Chào buổi sáng, {firstName}!</h1>
        <p className="text-sm text-[#767586] mt-0.5">
          Bạn có <span className="font-semibold text-[#4648d4]">{taskCount} nhiệm vụ</span> cần hoàn thành hôm nay
        </p>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5 bg-[#ffdcc5] text-[#703700] px-3 py-1.5 rounded-full text-sm font-semibold">
          <span className="material-symbols-rounded text-base leading-none">workspace_premium</span>
          Gói Pro
        </div>

        <div className="relative" ref={notificationRef}>
          <button
            type="button"
            aria-label="Thông báo"
            onClick={() => setIsNotificationsOpen(prev => !prev)}
            className="relative w-9 h-9 rounded-xl border border-[#c7c4d7] bg-transparent text-[#464554] flex items-center justify-center hover:bg-[#e9e6f3] transition-colors"
          >
            <span className="material-symbols-rounded text-xl leading-none">notifications</span>
            {unreadCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 min-w-5 h-5 px-1 rounded-full bg-[#ba1a1a] text-white text-[11px] font-black flex items-center justify-center border-2 border-[#fcf8ff]">
                {unreadCount > 9 ? "9+" : unreadCount}
              </span>
            )}
          </button>

          {isNotificationsOpen && (
            <div className="absolute right-0 top-12 w-[380px] max-w-[calc(100vw-2rem)] bg-white border border-[#e4e1ed] rounded-2xl shadow-xl shadow-slate-900/10 overflow-hidden z-[120]">
              <div className="flex items-center justify-between px-4 py-3 border-b border-[#efecf8]">
                <div>
                  <h2 className="text-sm font-black text-[#1b1b23]">Thông báo</h2>
                  <p className="text-xs font-semibold text-[#767586]">{unreadCount} chưa đọc</p>
                </div>
                <button
                  type="button"
                  onClick={handleMarkAllAsRead}
                  disabled={unreadCount === 0}
                  className="text-xs font-bold text-[#4648d4] disabled:text-[#a4a1b2] hover:underline"
                >
                  Đánh dấu đã đọc
                </button>
              </div>

              <div className="max-h-[420px] overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="px-5 py-10 text-center">
                    <span className="material-symbols-rounded text-3xl text-[#a4a1b2]">notifications_off</span>
                    <p className="mt-2 text-sm font-semibold text-[#767586]">Chưa có thông báo</p>
                  </div>
                ) : (
                  notifications.map((notification) => {
                    const content = (
                      <div className={`flex gap-3 px-4 py-3 border-b border-[#f2effb] hover:bg-[#fcf8ff] transition-colors ${notification.isRead ? "bg-white" : "bg-[#f7f4ff]"}`}>
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${notification.isRead ? "bg-[#efecf8] text-[#767586]" : "bg-[#e1e0ff] text-[#4648d4]"}`}>
                          <span className="material-symbols-rounded text-[20px]">
                            {notificationIconMap[notification.type] || "notifications"}
                          </span>
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-3">
                            <p className="text-sm font-black text-[#1b1b23] truncate">{notification.title}</p>
                            {!notification.isRead && <span className="mt-1.5 w-2 h-2 rounded-full bg-[#4648d4] flex-shrink-0" />}
                          </div>
                          <p className="mt-1 text-xs leading-5 text-[#464554] line-clamp-2">{notification.content}</p>
                          <p className="mt-1 text-[11px] font-bold text-[#8b8898]">{formatNotificationTime(notification.createdAt)}</p>
                        </div>
                      </div>
                    );

                    return notification.link ? (
                      <Link
                        key={notification.id}
                        to={notification.link}
                        onClick={() => handleMarkAsRead(notification)}
                        className="block"
                      >
                        {content}
                      </Link>
                    ) : (
                      <button
                        key={notification.id}
                        type="button"
                        onClick={() => handleMarkAsRead(notification)}
                        className="block w-full text-left"
                      >
                        {content}
                      </button>
                    );
                  })
                )}
              </div>
            </div>
          )}
        </div>

        {[
          { icon: "help", label: "Trợ giúp" },
          { icon: "settings", label: "Cài đặt" },
        ].map(({ icon, label }) => (
          <button
            key={icon}
            type="button"
            aria-label={label}
            className="w-9 h-9 rounded-xl border border-[#c7c4d7] bg-transparent text-[#464554] flex items-center justify-center hover:bg-[#e9e6f3] transition-colors"
          >
            <span className="material-symbols-rounded text-xl leading-none">{icon}</span>
          </button>
        ))}

        <Link
          to="/profile"
          title={user?.fullname || "Người dùng"}
          aria-label="Mở trang hồ sơ"
          className="w-9 h-9 rounded-full bg-gradient-to-br from-[#4648d4] to-[#57dffe] flex items-center justify-center text-white text-sm font-bold flex-shrink-0 overflow-hidden ring-2 ring-transparent hover:ring-[#c7c4d7] transition"
        >
          {user?.avatar ? (
            <img src={user.avatar} alt="" className="w-full h-full object-cover" />
          ) : initials}
        </Link>
      </div>
    </header>
  );
}
