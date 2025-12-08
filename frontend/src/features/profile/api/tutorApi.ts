import { UpcomingRequest, TutorStats, Session } from '../../../types';

const API_URL = 'http://localhost:3001';

/**
 * Lấy dữ liệu cho trang chủ của giảng viên.
 */
export const getTutorDashboardData = async (tutorId: string): Promise<{
  stats: TutorStats;
  upcomingAppointments: Session[];
  bookedRequests: Session[];
}> => {
  // Lấy tất cả appointments của tutor
  const appointmentsRes = await fetch(`${API_URL}/api/booking?tutorId=${tutorId}&_sort=date&_order=asc`);
  const allAppointments: Session[] = await appointmentsRes.json();

  // Lấy tutor info từ admin database API để lấy rating
  const tutorRes = await fetch(`${API_URL}/api/admin/database/users/${tutorId}`);
  const tutor = await tutorRes.json();

  // Tách booked và upcoming appointments
  const bookedAppointments = allAppointments.filter(a => a.status === 'booked');
  const upcomingAppointments = allAppointments.filter(a => a.status === 'upcoming');

  // Tính toán các chỉ số
  // Tổng buổi hẹn = upcoming + ongoing (những buổi đã được xác nhận và đang hoặc sắp diễn ra)
  const totalSessionsCount = allAppointments.filter(a => a.status === 'upcoming' || a.status === 'ongoing').length;

  // Sinh viên unique (chỉ từ upcoming + ongoing appointments)
  const upcomingAndOngoingAppointments = allAppointments.filter(a => a.status === 'upcoming' || a.status === 'ongoing');
  const totalStudents = new Set(
    upcomingAndOngoingAppointments
      .map(a => a.studentId)
      .filter(Boolean)
  ).size;

  // Đánh giá TB - lấy từ tutor profile
  const averageRating = tutor.rating || 0;

  const stats: TutorStats = {
    totalSessions: totalSessionsCount,
    upcomingSessions: upcomingAppointments.length,
    totalStudents,
    totalAppointments: allAppointments.length,
    averageRating
  };

  return { stats, upcomingAppointments, bookedRequests: bookedAppointments };
};