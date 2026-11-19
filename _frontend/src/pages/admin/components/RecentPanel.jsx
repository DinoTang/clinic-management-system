import { useEffect, useState } from "react";
import { ArrowRightStroke } from "@boxicons/react";
import { Link } from "react-router-dom";
import dashboardService from "../../../services/dashboard/dashboardService";

function RecentPanel({ className = "" }) {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRecentAppointments = async () => {
            try {
                setLoading(true);
                const data = await dashboardService.getRecentAppointments();
                setAppointments(data || []);
            } catch (error) {
                console.error("Lỗi tải lịch hẹn gần đây:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchRecentAppointments();
    }, []);

    // Lấy 2 chữ cái đầu của tên (VD: "Nguyễn Văn An" -> "VA")
    const getInitials = (fullName) => {
        if (!fullName) return "--";
        const parts = fullName.trim().split(/\s+/);
        if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
        const secondLast = parts[parts.length - 2][0];
        const last = parts[parts.length - 1][0];
        return `${secondLast}${last}`.toUpperCase();
    };

    // Format "2026-10-12" và "08:00:00" -> "12/10 · 08:00"
    const formatDateTime = (dateStr, timeStr) => {
        if (!dateStr) return "";
        const [, month, day] = dateStr.split("-");
        const timePart = timeStr ? timeStr.slice(0, 5) : "";
        return timePart ? `${day}/${month} · ${timePart}` : `${day}/${month}`;
    };

    // Map trạng thái từ DB sang label & màu sắc hiển thị
    const getStatusConfig = (status) => {
        switch (status) {
            case "BOOKED":
            case "Đã đặt":
                return { label: "Chờ xác nhận", type: "warning" };
            case "ARRIVED":
            case "Đã đến":
                return { label: "Đã đến", type: "positive" };
            case "EXAMINED":
            case "Đã khám":
                return { label: "Đã khám", type: "positive" };
            case "COMPLETED":
            case "Hoàn tất":
                return { label: "Hoàn tất", type: "positive" };
            case "CANCELLED":
            case "Đã hủy":
                return { label: "Đã hủy", type: "danger" };
            default:
                return { label: status || "Không xác định", type: "warning" };
        }
    };

    return (
        <section
            className={`${className} min-w-0 rounded-[11px] border border-[#edf0f4] bg-white !p-[1rem] shadow-xl`}
        >
            <div className="!mb-[0.8rem] flex items-center justify-between gap-3 max-[30rem]:flex-col max-[30rem]:items-start">
                <div>
                    <h2 className="text-sm font-semibold text-[#344054]">
                        Lịch hẹn gần đây
                    </h2>
                    <p className="!mt-[0.4rem] text-xs text-[#98a2b3]">
                        Các lượt khám mới nhất trong hệ thống
                    </p>
                </div>

                <Link
                    to="/admin/appointments"
                    className="inline-flex shrink-0 items-center gap-[0.8rem] border-0 bg-transparent text-xs font-semibold text-[#2878d0] transition-colors hover:text-[#175da5]"
                >
                    Tất cả lịch hẹn
                    <ArrowRightStroke className="h-4 w-4" />
                </Link>
            </div>

            <div className="w-full overflow-x-auto">
                <table className="w-full min-w-[34rem] border-collapse text-left text-xs text-[#475467]">
                    <thead>
                        <tr className="bg-[#fbfcfd]">
                            <th className="h-10 border-y border-[#eaecf0] !pl-[0.4rem] !pr-3 text-xs font-semibold text-[#8490a0]">
                                Bệnh nhân
                            </th>
                            <th className="h-10 border-y border-[#eaecf0] !px-3 text-xs font-semibold text-[#8490a0]">
                                Bác sĩ
                            </th>
                            <th className="h-10 border-y border-[#eaecf0] !px-3 text-xs font-semibold text-[#8490a0]">
                                Thời gian
                            </th>
                            <th className="h-10 border-y border-[#eaecf0] !px-3 text-xs font-semibold text-[#8490a0]">
                                Trạng thái
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {loading ? (
                            <tr>
                                <td
                                    colSpan={4}
                                    className="h-[3rem] !py-4 text-center text-xs text-[#98a2b3]"
                                >
                                    Đang tải dữ liệu...
                                </td>
                            </tr>
                        ) : appointments.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={4}
                                    className="h-[3rem] !py-4 text-center text-xs text-[#98a2b3]"
                                >
                                    Chưa có lịch hẹn nào
                                </td>
                            </tr>
                        ) : (
                            appointments.map((item, index) => {
                                const isLast = index === appointments.length - 1;
                                const borderClass = isLast
                                    ? ""
                                    : "border-b border-[#f0f1f4]";
                                const statusConfig = getStatusConfig(item.status);

                                return (
                                    <tr
                                        key={item.appointmentId}
                                        className="transition-colors hover:bg-[#fbfdff]"
                                    >
                                        <td
                                            className={`h-[3rem] ${borderClass} !py-[0.5rem] !pl-[0.4rem] !pr-3`}
                                        >
                                            <PatientCell
                                                initials={getInitials(
                                                    item.patientName
                                                )}
                                                name={item.patientName}
                                                id={item.appointmentId}
                                            />
                                        </td>
                                        <td
                                            className={`h-[3rem] ${borderClass} !px-3 !py-[0.5rem]`}
                                        >
                                            {item.doctorName}
                                        </td>
                                        <td
                                            className={`h-[3rem] ${borderClass} !px-3 !py-[0.5rem]`}
                                        >
                                            {formatDateTime(
                                                item.appointmentDate,
                                                item.appointmentTime
                                            )}
                                        </td>
                                        <td
                                            className={`h-[3rem] ${borderClass} !px-3 !py-[0.5rem]`}
                                        >
                                            <StatusBadge type={statusConfig.type}>
                                                {statusConfig.label}
                                            </StatusBadge>
                                        </td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>
        </section>
    );
}

function PatientCell({ initials, name, id }) {
    return (
        <div className="flex items-center gap-[0.6rem] font-semibold text-[#344054]">
            <span className="grid h-[2rem] w-[2rem] shrink-0 place-items-center rounded-full bg-[#edf5fd] text-xs font-bold text-[#2878d0]">
                {initials}
            </span>

            <span className="grid gap-1">
                <span>{name}</span>
                <small className="text-xs font-normal text-[#98a2b3]">
                    {id}
                </small>
            </span>
        </div>
    );
}

function StatusBadge({ type, children }) {
    const styles = {
        positive: {
            badge: "bg-[#eaf7f1] text-[#16805d]",
            dot: "bg-[#25a575]",
        },
        warning: {
            badge: "bg-[#fff6e7] text-[#a76a0b]",
            dot: "bg-[#dda23b]",
        },
        danger: {
            badge: "bg-[#fef3f2] text-[#b42318]",
            dot: "bg-[#f04438]",
        },
    };

    const style = styles[type] ?? styles.positive;

    return (
        <span
            className={`inline-flex items-center gap-[0.4rem] rounded-full !px-2 !py-[0.4rem] text-xs font-semibold ${style.badge}`}
        >
            <i
                className={`h-[0.4rem] w-[0.4rem] shrink-0 rounded-full ${style.dot}`}
            />
            {children}
        </span>
    );
}

export default RecentPanel;
