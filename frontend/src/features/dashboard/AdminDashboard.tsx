import React, { useState } from 'react';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { LogOut, BarChart, Database, RefreshCw } from 'lucide-react';
import { AnalyticsDashboard } from '../admin/AnalyticsDashboard';
import { DatabaseManagement } from '../admin/DatabaseManagement';
import { DataSync } from '../admin/DataSync';

type Props = {
    onNavigate: (page: string) => void;
    onLogout: () => void;
};


type AdminTab = 'analytics' | 'databaseManagement' | 'dataSync';

export const AdminDashboard: React.FC<Props> = ({ onNavigate, onLogout }) => {
    const [activeTab, setActiveTab] = useState<AdminTab>('analytics');

    const renderContent = () => {
        switch (activeTab) {
            case 'analytics':
                return <AnalyticsDashboard />;
            case 'databaseManagement':
                return <DatabaseManagement />;
            case 'dataSync':
                return <DataSync />;
            default:
                return null;
        }
    };

    const getTabTitle = (tab: AdminTab) => {
        const titles: Record<AdminTab, string> = {
            analytics: 'Số liệu hệ thống',
            databaseManagement: 'Quản lý cơ sở dữ liệu',
            dataSync: 'Đồng bộ dữ liệu'
        };
        return titles[tab];
    };

    return (
        <div className="flex h-screen bg-gray-50">
            {/* Sidebar-like Navigation */}
            <nav className="w-64 bg-white border-r border-gray-200 p-4 flex flex-col justify-between shadow-sm">
                <div>
                    <div className="px-4 py-3 mb-6">
                        <h1 className="text-2xl font-bold text-[#003366]">Chào mừng, Quản trị viên</h1>
                        <p className="text-xs text-gray-500 mt-1">Bảng điều khiển & quản lí hệ thống</p>
                    </div>
                    <ul className="space-y-2">
                        <li>
                            <Button
                                variant={activeTab === 'analytics' ? 'secondary' : 'ghost'}
                                className="w-full justify-start gap-3"
                                onClick={() => setActiveTab('analytics')}
                            >
                                <BarChart className="h-4 w-4" />
                                <span>Số liệu hệ thống</span>
                            </Button>
                        </li>
                        <li>
                            <Button
                                variant={activeTab === 'databaseManagement' ? 'secondary' : 'ghost'}
                                className="w-full justify-start gap-3"
                                onClick={() => setActiveTab('databaseManagement')}
                            >
                                <Database className="h-4 w-4" />
                                <span>Quản lý cơ sở dữ liệu</span>
                            </Button>
                        </li>
                        <li>
                            <Button
                                variant={activeTab === 'dataSync' ? 'secondary' : 'ghost'}
                                className="w-full justify-start gap-3"
                                onClick={() => setActiveTab('dataSync')}
                            >
                                <RefreshCw className="h-4 w-4" />
                                <span>Đồng bộ dữ liệu</span>
                            </Button>
                        </li>
                    </ul>
                </div>
                    <div className="p-4 border-t border-gray/10">
                    <Button 
                        variant="ghost" 
                        className="w-full justify-start text-gray-600" 
                        onClick={onLogout}
                    >
                        <LogOut className="w-5 h-5 mr-3" />
                        Đăng xuất
                    </Button>
                </div>
            </nav>

            {/* Main Content */}
            <main className="flex-1 overflow-auto min-h-screen">
                <div className="p-8">
                    <div className="mb-6">
                        <h2 className="bold text-3xl font-bold text-[#003366] ">{getTabTitle(activeTab)}</h2>
                        {/* <p className="text-gray-600 text-sm mt-1">Manage your system and view analytics</p> */}
                    </div>
                    {renderContent()}
                    
                    {/* <Card>
                        <CardHeader>
                            <CardTitle className="text-[#003366]">
                                {getTabTitle(activeTab)}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {renderContent()}
                        </CardContent>
                    </Card> */}
                </div>
            </main>
        </div>
    );
};

export default AdminDashboard;