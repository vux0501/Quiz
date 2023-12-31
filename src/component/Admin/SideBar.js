import 'react-pro-sidebar/dist/css/styles.css';
import { ProSidebar, Menu, MenuItem, SubMenu, SidebarHeader, SidebarFooter, SidebarContent } from 'react-pro-sidebar';
import './SideBar.scss';
import { FaGem, FaGithub } from 'react-icons/fa';
import sidebarBg from '../../assets/bg2.jpg';
import { DiReact } from 'react-icons/di';
import { MdDashboard } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';

const SideBar = (props) => {
    const { collapsed, toggled, handleToggleSidebar } = props;
    const navigate = useNavigate();
    return (
        <>
            <ProSidebar
                image={sidebarBg}
                collapsed={collapsed}
                toggled={toggled}
                breakPoint="md"
                onToggle={handleToggleSidebar}
            >
                <SidebarHeader>
                    <div
                        style={{
                            padding: '24px',
                            textTransform: 'uppercase',
                            fontWeight: 'bold',
                            fontSize: 14,
                            letterSpacing: '1px',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                        }}
                    >
                        <div onClick={() => navigate('/')} className="logo-container">
                            <DiReact size={'3em'} color="00bfff" />
                            <span>VUX Quiz</span>
                        </div>
                    </div>
                </SidebarHeader>

                <SidebarContent>
                    <Menu iconShape="circle">
                        <MenuItem icon={<MdDashboard />} suffix={<span className="badge red">New</span>}>
                            Dashboard
                            <Link to="/admin" />
                        </MenuItem>
                    </Menu>
                    <Menu iconShape="circle">
                        <SubMenu
                            // suffix={<span className="badge yellow">3</span>} icon={<FaRegLaughWink />}
                            icon={<FaGem />}
                            title={'Chức năng'}
                        >
                            <MenuItem>
                                Quản lý người dùng
                                <Link to="/admin/manage-user" />
                            </MenuItem>
                            <MenuItem>
                                Quản lý bài thi
                                <Link to="/admin/manage-quiz" />
                            </MenuItem>
                            <MenuItem>Quản lý câu hỏi</MenuItem>
                        </SubMenu>
                    </Menu>
                </SidebarContent>

                <SidebarFooter style={{ textAlign: 'center' }}>
                    <div
                        className="sidebar-btn-wrapper"
                        style={{
                            padding: '20px 24px',
                        }}
                    >
                        <a
                            href="https://github.com/vux0501/Quiz"
                            target="_blank"
                            className="sidebar-btn"
                            rel="noopener noreferrer"
                        >
                            <FaGithub />
                            <span
                                style={{
                                    whiteSpace: 'nowrap',
                                    textOverflow: 'ellipsis',
                                    overflow: 'hidden',
                                    marginLeft: '0.5em',
                                }}
                            >
                                My GitHub
                            </span>
                        </a>
                    </div>
                </SidebarFooter>
            </ProSidebar>
        </>
    );
};

export default SideBar;
