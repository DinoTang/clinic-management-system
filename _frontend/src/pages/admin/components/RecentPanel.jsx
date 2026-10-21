import { ArrowRightStroke } from "@boxicons/react";

function RecentPanel({className}) {
    return (
        <section className={`${className} min-w-0 rounded-[11px] border border-[#edf0f4] bg-white !p-[1rem] shadow-xl`}>
            <div className="!mb-[0.8rem] flex items-center justify-between gap-3 max-[30rem]:flex-col max-[30rem]:items-start">
                <div>
                    <h2 className="text-sm font-semibold text-[#344054]">
                        Lịch hẹn gần đây
                    </h2>
                    <p className="!mt-[0.4rem] text-xs text-[#98a2b3]">
                        Các lượt khám mới nhất trong hệ thống
                    </p>
                </div>

                <button
                    type="button"
                    className="inline-flex shrink-0 items-center gap-[0.8rem] border-0 bg-transparent text-xs font-semibold text-[#2878d0] transition-colors hover:text-[#175da5]"
                >
                    Tất cả lịch hẹn
                    <ArrowRightStroke className="h-4 w-4" />
                </button>
            </div>

            <div className="w-full overflow-x-auto">
                <table className="w-full min-w-[34rem] border-collapse text-left text-xs text-[#475467]">
                    <thead>
                        <tr className="bg-[#fbfcfd]">
                            <th className="h-10 border-y border-[#eaecf0] !pl-[0.4rem]  !pr-3 text-xs font-semibold text-[#8490a0]">
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
                        <tr className="transition-colors hover:bg-[#fbfdff]">
                            <td className="h-[3rem] border-b border-[#f0f1f4] !py-[0.5rem] !pl-[0.4rem]  !pr-3">
                                <PatientCell
                                    initials="VA"
                                    name="Nguyễn Văn An"
                                    id="LH20261012001"
                                />
                            </td>
                            <td className="h-[3rem] border-b border-[#f0f1f4] !px-3 py-[0.5rem]">
                                Trần Văn Nam
                            </td>
                            <td className="h-[3rem] border-b border-[#f0f1f4] !px-3 py-[0.5rem]">
                                10/12 · 08:00
                            </td>
                            <td className="h-[3rem] border-b border-[#f0f1f4] !px-3 py-[0.5rem]">
                                <StatusBadge type="positive">
                                    Đã xác nhận
                                </StatusBadge>
                            </td>
                        </tr>

                        <tr className="transition-colors hover:bg-[#fbfdff]">
                            <td className="h-[3rem] border-b border-[#f0f1f4] !py-[0.5rem] !pl-[0.4rem] !pr-3">
                                <PatientCell
                                    initials="TB"
                                    name="Trần Thị Bình"
                                    id="LH20261012002"
                                />
                            </td>
                            <td className="h-[3rem] border-b border-[#f0f1f4] !px-3 !py-[0.5rem]">
                                Lê Thị Lan
                            </td>
                            <td className="h-[3rem] border-b border-[#f0f1f4] !px-3 !py-[0.5rem]">
                                10/12 · 08:30
                            </td>
                            <td className="h-[3rem] border-b border-[#f0f1f4] !px-3 !py-[0.5rem]">
                                <StatusBadge type="warning">
                                    Chờ xác nhận
                                </StatusBadge>
                            </td>
                        </tr>

                        <tr className="transition-colors hover:bg-[#fbfdff]">
                            <td className="h-[3rem] border-b border-[#f0f1f4] !py-[0.5rem] !pl-[0.4rem] !pr-3">
                                <PatientCell
                                    initials="HC"
                                    name="Lê Hùng Cường"
                                    id="LH20261012003"
                                />
                            </td>
                            <td className="h-[3rem] border-b border-[#f0f1f4] !px-3 !py-[0.5rem]">
                                Phạm Minh Đức
                            </td>
                            <td className="h-[3rem] border-b border-[#f0f1f4] !px-3 !py-[0.5rem]">
                                10/12 · 09:00
                            </td>
                            <td className="h-[3rem] border-b border-[#f0f1f4] !px-3 !py-[0.5rem]">
                                <StatusBadge type="positive">
                                    Đã xác nhận
                                </StatusBadge>
                            </td>
                        </tr>

                        <tr className="transition-colors hover:bg-[#fbfdff]">
                            <td className="h-[3rem] !py-[0.5rem] !pl-[0.4rem] !pr-3">
                                <PatientCell
                                    initials="TH"
                                    name="Phạm Thu Hà"
                                    id="LH20261011001"
                                />
                            </td>
                            <td className="h-[3rem] !px-3 !py-[0.5rem]">
                                Lê Thị Lan
                            </td>
                            <td className="h-[3rem] !px-3 !py-[0.5rem]">
                                10/11 · 08:30
                            </td>
                            <td className="h-[3rem] !px-3 !py-[0.5rem]">
                                <StatusBadge type="positive">
                                    Hoàn tất
                                </StatusBadge>
                            </td>
                        </tr>
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
    };

    const style = styles[type] ?? styles.positive;

    return (
        <span
            className={`inline-flex items-center gap-[0.4rem] rounded-full !px-2 !py-[0.4rem] text-xs font-semibold ${style.badge}`}
        >
            <i className={`h-[0.4rem] w-[0.4rem] shrink-0 rounded-full ${style.dot}`} />
            {children}
        </span>
    );
}

export default RecentPanel;