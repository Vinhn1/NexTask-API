import { createContext, useState, useEffect, useContext, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import projectService from '../services/projectService';
import { useAuth } from './AuthContext';

const ProjectContext = createContext();

export function ProjectProvider({ children }) {
    const { user } = useAuth();
    const [searchParams, setSearchParams] = useSearchParams();
    
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedProjectId, setSelectedProjectId] = useState(null);

    // Fetch projects list
    const fetchProjects = useCallback(async () => {
        if (!user) return;
        try {
            setLoading(true);
            const response = await projectService.getUserProjects();
            const projectList = response.data?.projects || response.projects || [];
            setProjects(projectList);

            // Xác định dự án mặc định:
            // 1. Từ URL param ?projectId=
            // 2. Từ LocalStorage (lần cuối chọn)
            // 3. Dự án đầu tiên trong list
            const urlProjectId = searchParams.get('projectId');
            const storedId = localStorage.getItem('lastProjectId');
            
            if (urlProjectId && projectList.some(p => p.id === urlProjectId)) {
                setSelectedProjectId(urlProjectId);
            } else if (storedId && projectList.some(p => p.id === storedId)) {
                setSelectedProjectId(storedId);
                // Cập nhật URL luôn nếu chưa có
                if (!urlProjectId) {
                    setSearchParams({ projectId: storedId }, { replace: true });
                }
            } else if (projectList.length > 0) {
                const firstId = projectList[0].id;
                setSelectedProjectId(firstId);
                localStorage.setItem('lastProjectId', firstId);
                setSearchParams({ projectId: firstId }, { replace: true });
            }
        } catch (error) {
            console.error('Error fetching projects:', error);
        } finally {
            setLoading(false);
        }
    }, [user, searchParams, setSearchParams]);

    useEffect(() => {
        fetchProjects();
    }, [fetchProjects]);

    // Hàm chọn dự án
    const selectProject = (id) => {
        setSelectedProjectId(id);
        localStorage.setItem('lastProjectId', id);
        
        // Cập nhật URL param
        const newParams = new URLSearchParams(searchParams);
        newParams.set('projectId', id);
        setSearchParams(newParams, { replace: true });
    };

    const currentProject = projects.find(p => p.id === selectedProjectId) || null;

    const value = {
        projects,
        currentProject,
        selectedProjectId,
        loading,
        selectProject,
        refreshProjects: fetchProjects
    };

    return (
        <ProjectContext.Provider value={value}>
            {children}
        </ProjectContext.Provider>
    );
}

export const useProject = () => {
    const context = useContext(ProjectContext);
    if (!context) {
        throw new Error('useProject must be used within a ProjectProvider');
    }
    return context;
};
