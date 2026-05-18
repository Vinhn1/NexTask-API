import { useState, useEffect, useRef, useCallback } from 'react';
import commentService from '../../services/commentService';
import { useAuth } from '../../contexts/AuthContext';
import { useSocket } from '../../contexts/SocketContext';
import taskService from '../../services/taskService';
import { getTaskStatus } from '../../constants/taskStatus';

const sortCommentsByCreatedAt = (commentList) =>
  [...commentList].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

export default function TaskDetailSidebar({ task, onClose, project, onTaskDelete, onTaskUpdate }) {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('comments'); // 'activity', 'subtasks', 'attachments', 'comments'
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loadingComments, setLoadingComments] = useState(false);
  const [postingComment, setPostingComment] = useState(false);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editContent, setEditContent] = useState("");
  const socket = useSocket();
  const commentsEndRef = useRef(null);
  const taskId = task?.id;
  const [showAssigneePicker, setShowAssigneePicker] = useState(false);
  const [isAssigning, setIsAssigning] = useState(false);
  const assigneePickerRef = useRef(null);
  const isOwner = project?.ownerId === user?.id;


  // Đóng dropdown khi click ra ngoài
  useEffect(() => {
    if (!showAssigneePicker) return;
    const handleClickOutside = (e) => {
      if (assigneePickerRef.current && !assigneePickerRef.current.contains(e.target)) {
        setShowAssigneePicker(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showAssigneePicker]);


  const handleAssignMember = async (memberId) => {
    if (isAssigning) return;
    setIsAssigning(true);
    setShowAssigneePicker(false);
    try {
      const res = await taskService.updateTask(task.id, { assigneeId: memberId || null });
      // Backend trả về: { statusCode, message, data: taskObject, success }
      // Thông báo cho parent cập nhật selectedTask với data mới nhất (res.data là task)
      if (onTaskUpdate) {
        onTaskUpdate(res.data || { ...task, assigneeId: memberId, assignee: null });
      }
    } catch (error) {
      console.error('Lỗi khi phân công:', error);
    } finally {
      setIsAssigning(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Bạn có chắc chắn muốn xóa nhiệm vụ này không? Hành động này không thể hoàn tác.")) {
      try {
        await taskService.deleteTask(task.id);
        onTaskDelete(task.id); // Gọi hàm callback ở Tasks.jsx để cập nhật UI
        onClose();             // Đóng sidebar
      } catch (error) {
        console.error("Lỗi khi xóa task:", error);
        alert("Không thể xóa nhiệm vụ. Vui lòng thử lại.");
      }
    }
  };


  const fetchComments = useCallback(async () => {
    if (!taskId) return;

    setLoadingComments(true);
    try {
      const res = await commentService.getTaskComments(taskId);
      setComments(sortCommentsByCreatedAt(res.data || []));
    } catch (error) {
      console.error("Fetch comments error:", error);
    } finally {
      setLoadingComments(false);
    }
  }, [taskId]);

  useEffect(() => {
    if (taskId) {
      const timeoutId = window.setTimeout(fetchComments, 0);
      return () => window.clearTimeout(timeoutId);
    }
  }, [taskId, fetchComments]);

  useEffect(() => {
    if (!loadingComments) {
      commentsEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [comments.length, loadingComments]);

  useEffect(() => {
    if (!socket || !taskId) return;

    const joinTaskRoom = () => {
      socket.emit('join:task', taskId);
    };

    joinTaskRoom();
    socket.on('connect', joinTaskRoom);

    return () => {
      socket.off('connect', joinTaskRoom);
      socket.emit('leave:task', taskId);
    };
  }, [socket, taskId]);

  // Socket listener for comments
  useEffect(() => {
    if (!socket || !task?.id) return;

    const handleNewComment = (data) => {
      if (data.taskId === task.id) {
        const newCommentObj = data.comment;
        setComments(prev => {
          // Check if comment already exists (to avoid duplicates if local state was updated)
          if (prev.find(c => c.id === newCommentObj.id)) return prev;
          return sortCommentsByCreatedAt([...prev, newCommentObj]);
        });
        // Scroll to bottom
        setTimeout(() => commentsEndRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
      }
    };

    const handleUpdatedComment = (data) => {
      if (data.taskId === task.id) {
        const updatedCommentObj = data.comment;
        setComments(prev => prev.map(c => c.id === updatedCommentObj.id ? updatedCommentObj : c));
      }
    };

    const handleDeletedComment = (data) => {
      if (data.taskId === task.id) {
        setComments(prev => prev.filter(c => c.id !== data.commentId));
      }
    };

    socket.on('comment:new', handleNewComment);
    socket.on('comment:updated', handleUpdatedComment);
    socket.on('comment:deleted', handleDeletedComment);

    return () => {
      socket.off('comment:new', handleNewComment);
      socket.off('comment:updated', handleUpdatedComment);
      socket.off('comment:deleted', handleDeletedComment);
    };
  }, [socket, task?.id]);

  const handlePostComment = async (e) => {
    if (e) e.preventDefault();
    if (!newComment.trim() || postingComment) return;

    setPostingComment(true);
    const tempComment = {
      id: `temp-${Date.now()}`,
      content: newComment.trim(),
      taskId: task.id,
      userId: user?.id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      user: {
        id: user?.id,
        fullname: user?.fullname || user?.name,
        avatar: user?.avatar,
      },
      isOptimistic: true,
    };
    setComments(prev => sortCommentsByCreatedAt([...prev, tempComment]));
    setNewComment("");

    try {
      const res = await commentService.createComment(task.id, tempComment.content);
      const createdComment = res.data;
      if (createdComment) {
        setComments(prev => {
          const withoutTemp = prev.filter(c => c.id !== tempComment.id);
          if (withoutTemp.find(c => c.id === createdComment.id)) return sortCommentsByCreatedAt(withoutTemp);
          return sortCommentsByCreatedAt([...withoutTemp, createdComment]);
        });
      }
    } catch (error) {
      console.error("Post comment error:", error);
      setComments(prev => prev.filter(c => c.id !== tempComment.id));
      setNewComment(tempComment.content);
    } finally {
      setPostingComment(false);
    }
  };

  const handleUpdateComment = async (commentId) => {
    if (!editContent.trim()) return;
    try {
      const res = await commentService.updateComment(commentId, editContent);
      const updatedComment = res.data;
      if (updatedComment) {
        setComments(prev => prev.map(c => c.id === updatedComment.id ? updatedComment : c));
      }
      setEditingCommentId(null);
      setEditContent("");
    } catch (error) {
      console.error("Update comment error:", error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa bình luận này?")) {
      try {
        await commentService.deleteComment(commentId);
        setComments(prev => prev.filter(c => c.id !== commentId));
      } catch (error) {
        console.error("Delete comment error:", error);
      }
    }
  };

  if (!task) return null;
  const status = getTaskStatus(task.status);

  const tabs = [
    { id: 'activity', label: 'Hoạt động', icon: 'history' },
    { id: 'subtasks', label: 'Việc phụ', icon: 'checklist' },
    { id: 'attachments', label: 'Tài liệu', icon: 'attach_file' },
    { id: 'comments', label: 'Bình luận', icon: 'chat_bubble' },
  ];

  return (
    <>
      {/* Backdrop for Task Detail */}
      <div
        className="fixed inset-0 bg-[#1b1b23]/20 backdrop-blur-[2px] z-[90] animate-fade-in"
        onClick={onClose}
      />

      <div className="fixed top-0 right-0 h-screen w-[500px] bg-white border-l border-[#e4e1ed] flex flex-col shadow-[-20px_0_60px_rgba(0,0,0,0.1)] z-[100] animate-fade-in-right overflow-hidden rounded-l-[40px]">
        {/* Header */}
        <div className="p-6 border-b border-[#f2effb] flex items-center justify-between bg-white/80 backdrop-blur-md sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <div className="px-3 py-1.5 bg-[#f0efff] text-[#4648d4] text-[11px] font-black rounded-xl uppercase tracking-widest border border-[#e1e0ff]">
              NT-{task.id.substring(0, 4)}
            </div>
            <div className="flex items-center gap-2 text-[13px] font-bold text-[#767586] bg-[#fcf8ff] px-3 py-1.5 rounded-xl border border-[#efecf8]">
              <span className="material-symbols-rounded text-[16px]">folder</span>
              <span className="truncate max-w-[150px]">{project?.title || 'Dự án chung'}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="w-10 h-10 flex items-center justify-center text-[#767586] hover:bg-[#fcf8ff] hover:text-[#4648d4] rounded-2xl transition-all border border-transparent hover:border-[#e4e1ed]">
              <span className="material-symbols-rounded text-[22px]">open_in_full</span>
            </button>
            {/* Chỉ hiển thị nút xóa nếu là Owner của Project hoặc người tạo Task */}
            {(project?.ownerId === user?.id || task.userId === user?.id) && (
              <button
                onClick={handleDelete}
                className="w-10 h-10 flex items-center justify-center text-[#767586] hover:bg-[#ffdad6] hover:text-[#93000a] rounded-2xl transition-all border border-transparent hover:border-[#ffdad6]"
                title="Xóa nhiệm vụ"
              >
                <span className="material-symbols-rounded text-[22px]">delete</span>
              </button>
            )}
            <button onClick={onClose} className="w-10 h-10 flex items-center justify-center text-[#767586] hover:bg-[#ffdad6] hover:text-[#93000a] rounded-2xl transition-all border border-transparent hover:border-[#ffdad6]">
              <span className="material-symbols-rounded text-[22px]">close</span>
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar bg-[#fdfcff] pb-10">
          <div className="p-10">
            <h2 className="text-[32px] font-black text-[#1b1b23] leading-[1.1] mb-10 tracking-tight">
              {task.title}
            </h2>

            <div className="grid grid-cols-2 gap-10 mb-12">
              <div className="space-y-5 relative" ref={assigneePickerRef}>
                <label className="block text-[10px] font-black text-[#a1a0af] uppercase tracking-[0.2em]">Người phụ trách</label>
                {/* Thẻ assignee — click để mở picker */}
                <div
                  onClick={() => isOwner && setShowAssigneePicker(v => !v)}
                  className={`flex items-center gap-4 p-2 -ml-2 rounded-[24px] transition-all border ${
                    !isOwner 
                      ? 'cursor-default opacity-80' 
                      : showAssigneePicker 
                        ? 'bg-white shadow-2xl shadow-indigo-100/50 border-[#e1e0ff] cursor-pointer' 
                        : 'border-transparent hover:bg-white hover:shadow-2xl hover:shadow-indigo-100/50 hover:border-[#f2effb] cursor-pointer'
                  }`}
                >
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#4648d4] to-[#57dffe] flex items-center justify-center text-white font-bold text-2xl shadow-lg shadow-indigo-100 border-2 border-white flex-shrink-0">
                    {isAssigning
                      ? <span className="material-symbols-rounded text-[20px] animate-spin">refresh</span>
                      : (task.assignee?.fullname?.charAt(0) || task.assignee?.name?.charAt(0) || task.assigneeEmail?.charAt(0) || 'U')}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-[#1b1b23] text-[16px] truncate">
                      {task.assignee?.fullname || task.assignee?.name || task.assigneeEmail || 'Chưa phân công'}
                    </div>
                    {isOwner && (
                      <div className="text-[12px] text-[#4648d4] font-semibold mt-0.5">
                        Nhấp để thay đổi ↓
                      </div>
                    )}
                  </div>
                </div>

                {/* Dropdown picker */}
                {showAssigneePicker && (
                  <div className="absolute left-0 top-full mt-2 w-[260px] bg-white border border-[#e4e1ed] rounded-[24px] shadow-2xl shadow-indigo-100/60 z-50 overflow-hidden animate-fade-in">
                    <div className="px-4 pt-4 pb-2 text-[10px] font-black text-[#a1a0af] uppercase tracking-[0.2em]">
                      Chọn người phụ trách
                    </div>
                    {[project?.owner, ...(project?.members || [])].filter(Boolean).map(member => {
                      const isCurrentAssignee = member.id === (task.assigneeId || task.assignee?.id);
                      return (
                        <button
                          key={member.id}
                          onClick={() => handleAssignMember(member.id)}
                          className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-all hover:bg-[#f0efff] ${isCurrentAssignee ? 'bg-[#f0efff]' : ''}`}
                        >
                          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#4648d4] to-[#57dffe] flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                            {member.fullname?.charAt(0) || member.name?.charAt(0) || '?'}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-bold text-[#1b1b23] text-[14px] truncate">{member.fullname || member.name}</div>
                            <div className="text-[11px] text-[#767586] truncate">{member.email}</div>
                          </div>
                          {isCurrentAssignee && (
                            <span className="material-symbols-rounded text-[18px] text-[#4648d4] flex-shrink-0">check_circle</span>
                          )}
                        </button>
                      );
                    })}
                    {(task.assigneeId || task.assignee) && (
                      <>
                        <div className="mx-4 border-t border-[#f2effb]" />
                        <button
                          onClick={() => handleAssignMember(null)}
                          className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-[#fff0f0] transition-all text-[#93000a]"
                        >
                          <span className="material-symbols-rounded text-[20px]">person_remove</span>
                          <span className="text-[14px] font-bold">Bỏ phân công</span>
                        </button>
                      </>
                    )}
                  </div>
                )}
              </div>

              <div className="space-y-5">
                <label className="block text-[10px] font-black text-[#a1a0af] uppercase tracking-[0.2em]">Hạn chót</label>
                <div className="flex items-center gap-4 p-2 -ml-2 rounded-[24px] hover:bg-white hover:shadow-2xl hover:shadow-indigo-100/50 cursor-pointer transition-all border border-transparent hover:border-[#f2effb]">
                  <div className="w-12 h-12 rounded-2xl bg-[#f0efff] flex items-center justify-center text-[#4648d4] shadow-md shadow-indigo-50/20 border border-[#e1e0ff]">
                    <span className="material-symbols-rounded text-[24px]">calendar_today</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-[#1b1b23] text-[16px] truncate">
                      {task.dueDate ? new Date(task.dueDate).toLocaleDateString('vi-VN', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Chưa đặt'}
                    </div>
                    <div className="text-[12px] text-[#767586] font-semibold mt-0.5 opacity-70">
                      {task.dueDate ? '5:00 PM' : 'Nhấp để chọn'}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Time Tracking / Progress */}
            <div className="mb-12 p-8 bg-white rounded-[32px] border border-[#f2effb] shadow-sm relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-40 h-40 bg-[#4648d4]/5 rounded-full -mr-20 -mt-20 transition-transform group-hover:scale-110"></div>
              <div className="flex justify-between items-center mb-5 relative z-10">
                <span className="text-[15px] font-black text-[#1b1b23]">Tiến độ công việc</span>
                <span className="text-[16px] font-black text-[#4648d4]">
                  {status.progress}%
                </span>
              </div>
              <div className="h-4 w-full bg-[#f2effb] rounded-full overflow-hidden relative z-10">
                <div
                  className="h-full bg-gradient-to-r from-[#4648d4] via-[#6063ee] to-[#57dffe] rounded-full transition-all duration-700 ease-out"
                  style={{ width: `${status.progress}%` }}
                >
                  <div className="w-full h-full opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
                </div>
              </div>
              <div className="mt-5 flex justify-between text-[12px] font-bold text-[#767586] uppercase tracking-widest relative z-10">
                <span>Đã hoàn thành</span>
                <span>3h 20m / 8h</span>
              </div>
            </div>

            <div className="space-y-5 mb-12">
              <label className="block text-[10px] font-black text-[#a1a0af] uppercase tracking-[0.2em]">Mô tả chi tiết</label>
              <div className="text-[#464554] text-[16px] leading-relaxed whitespace-pre-wrap bg-white p-8 rounded-[32px] border border-[#f2effb] shadow-sm hover:shadow-xl hover:shadow-indigo-50/30 transition-all">
                {task.description || 'Nhiệm vụ này chưa có mô tả chi tiết. Hãy bổ sung các mục tiêu và yêu cầu cụ thể để đội ngũ dễ dàng thực hiện hơn.'}
              </div>
            </div>

            {/* Tabs Section */}
            <div className="border-b border-[#f2effb] mb-8 flex items-center justify-between">
              <div className="flex gap-8">
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`pb-5 text-[14px] font-black transition-all relative ${activeTab === tab.id
                      ? 'text-[#4648d4]'
                      : 'text-[#a1a0af] hover:text-[#767586]'
                      }`}
                  >
                    {tab.label}
                    {activeTab === tab.id && (
                      <span className="absolute bottom-0 left-0 w-full h-[4px] bg-[#4648d4] rounded-full animate-scale-x"></span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <div className="min-h-[400px]">
              {activeTab === 'comments' && (
                <div className="space-y-8">
                  {loadingComments ? (
                    <div className="flex flex-col items-center justify-center py-16 gap-4">
                      <span className="material-symbols-rounded animate-spin text-[#4648d4] text-[40px]">refresh</span>
                      <p className="text-sm font-bold text-[#a1a0af]">Đang tải bình luận...</p>
                    </div>
                  ) : comments.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-16 gap-6 text-center">
                      <div className="w-20 h-20 bg-[#fcf8ff] rounded-[32px] flex items-center justify-center text-[#e4e1ed]">
                        <span className="material-symbols-rounded text-[40px]">chat_bubble</span>
                      </div>
                      <div>
                        <p className="font-black text-[#1b1b23] text-base">Chưa có thảo luận nào</p>
                        <p className="text-[13px] text-[#767586] font-medium mt-1">Hãy là người đầu tiên đặt câu hỏi hoặc góp ý!</p>
                      </div>
                    </div>
                  ) : (
                    comments.map((comment, idx) => (
                      <div key={comment.id || idx} className="flex gap-5 group animate-fade-in">
                        <div className="w-11 h-11 rounded-2xl bg-indigo-100 flex items-center justify-center text-indigo-700 font-black text-base flex-shrink-0 border-2 border-white shadow-md">
                          {comment.user?.fullname?.charAt(0) || comment.user?.name?.charAt(0) || 'U'}
                        </div>
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <span className="font-black text-[#1b1b23] text-sm">{comment.user?.fullname || comment.user?.name || 'Thành viên'}</span>
                              <span className="text-[10px] font-bold text-[#a1a0af] uppercase tracking-wider">
                                {new Date(comment.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                {comment.updatedAt !== comment.createdAt && " (đã chỉnh sửa)"}
                              </span>
                            </div>
                            
                            {/* Comment Actions (Edit/Delete) */}
                            {comment.userId === user?.id && (
                              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button 
                                  onClick={() => {
                                    setEditingCommentId(comment.id);
                                    setEditContent(comment.content);
                                  }}
                                  className="w-8 h-8 flex items-center justify-center text-[#767586] hover:bg-white hover:text-[#4648d4] rounded-xl transition-all"
                                >
                                  <span className="material-symbols-rounded text-[18px]">edit</span>
                                </button>
                                <button 
                                  onClick={() => handleDeleteComment(comment.id)}
                                  className="w-8 h-8 flex items-center justify-center text-[#767586] hover:bg-[#fff0f0] hover:text-[#93000a] rounded-xl transition-all"
                                >
                                  <span className="material-symbols-rounded text-[18px]">delete</span>
                                </button>
                              </div>
                            )}
                          </div>

                          {editingCommentId === comment.id ? (
                            <div className="space-y-3">
                              <textarea
                                value={editContent}
                                onChange={(e) => setEditContent(e.target.value)}
                                className="w-full bg-white border border-[#e4e1ed] rounded-2xl p-4 text-[15px] font-medium text-[#1b1b23] focus:border-[#4648d4] outline-none min-h-[100px] resize-none"
                                autoFocus
                              />
                              <div className="flex items-center gap-2">
                                <button 
                                  onClick={() => handleUpdateComment(comment.id)}
                                  className="px-4 py-2 bg-[#4648d4] text-white text-[12px] font-black rounded-xl hover:bg-[#3537c0] transition-all uppercase tracking-wider"
                                >
                                  Lưu thay đổi
                                </button>
                                <button 
                                  onClick={() => {
                                    setEditingCommentId(null);
                                    setEditContent("");
                                  }}
                                  className="px-4 py-2 bg-[#f2f3ff] text-[#767586] text-[12px] font-black rounded-xl hover:bg-[#e4e1ed] transition-all uppercase tracking-wider"
                                >
                                  Hủy
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div className="bg-[#f2f3ff] p-5 rounded-3xl rounded-tl-none text-[15px] text-[#1b1b23] font-medium leading-relaxed border border-[#e8eaff] shadow-sm">
                              {comment.content}
                            </div>
                          )}
                          
                          <div className="flex items-center gap-5 pl-1">
                            <button className="text-[11px] font-black text-[#a1a0af] hover:text-[#4648d4] transition-colors uppercase tracking-widest">Thích</button>
                            <button className="text-[11px] font-black text-[#a1a0af] hover:text-[#4648d4] transition-colors uppercase tracking-widest">Trả lời</button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                  <div ref={commentsEndRef} />
                </div>
              )}
              {activeTab !== 'comments' && (
                <div className="flex flex-col items-center justify-center py-24 gap-6 opacity-50 grayscale">
                  <span className="material-symbols-rounded text-[56px] text-[#e4e1ed]">construction</span>
                  <p className="font-bold text-[#767586] text-lg">Tính năng này đang được phát triển</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer / Input Area */}
        <div className="p-8 bg-white border-t border-[#f2effb] sticky bottom-0">
          <form
            onSubmit={handlePostComment}
            className="flex items-center gap-4 bg-[#f8f7ff] border border-[#e4e1ed] rounded-[32px] p-2.5 pl-6 focus-within:border-[#4648d4] focus-within:ring-8 focus-within:ring-[#4648d4]/5 transition-all group shadow-sm"
          >
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Viết bình luận hoặc góp ý của bạn..."
              className="flex-1 bg-transparent border-none outline-none text-[15px] font-semibold text-[#1b1b23] placeholder:text-[#a1a0af] py-3"
            />
            <button
              type="submit"
              disabled={!newComment.trim() || postingComment}
              className="w-12 h-12 bg-[#4648d4] text-white rounded-[24px] flex items-center justify-center hover:bg-[#3537c0] transition-all shadow-xl shadow-indigo-200 disabled:opacity-30 disabled:shadow-none"
            >
              {postingComment ? (
                <span className="material-symbols-rounded text-[24px] animate-spin">refresh</span>
              ) : (
                <span className="material-symbols-rounded text-[24px]">send</span>
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
