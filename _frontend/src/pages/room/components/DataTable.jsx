import { Edit, Hashtag, Shield } from "@boxicons/react";
import EditModal from "./EditModal";
import LockedModal from "./LockedModal";
import { useState } from "react";
import {ROOM_STATUS} from "../../../enums/index.js";

function DataTable({rooms, fetchRooms, specialties }) {
	const [showEditModal, setShowEditModal] = useState(null);
	const [showLockedModal, setShowLockedModal] = useState(null);

  return (
  	<>
    <div className="min-w-0 overflow-x-auto rounded-[0.5rem]">
      <table className="w-full border-collapse text-left text-[0.75rem] text-[#475467]">
        <thead className="bg-[#fbfcfd]">
          <tr>
            {[
              <Hashtag />,
              "Chuyên khoa",
              "Tên phòng",
              "Số phòng",
              "Tầng",
              "Trạng thái",
              "Thao tác",
            ].map((heading) => (
              <th
                key={heading}
                className={`h-[2.75rem] border-b border-[#eaecf0] !px-[0.875rem] !py-[0.75rem] text-[0.6875rem] font-semibold whitespace-nowrap text-[#8490a0]`}
              >
                {heading}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {rooms && rooms.map((room, i) => (
            <tr
              key={room.id}
              className="border-b border-[#f0f1f4] transition-colors last:border-b-0 hover:bg-[#fbfdff]"
            >
              <td className="!px-[0.875rem] !py-[0.75rem]">
                <div className="flex items-center gap-[0.625rem] whitespace-nowrap">
                  <span className="flex h-[2rem] w-[2rem] shrink-0 items-center justify-center rounded-full bg-[#edf5fd] text-[0.6875rem] font-bold text-[#2878d0]">
                    {i+1}
                  </span>
                  <span className="font-semibold text-[#344054]">
                    {room.id}
                  </span>
                </div>
              </td>
              <td className="whitespace-nowrap !px-[0.875rem] !py-[0.75rem]">
                {room.specialty.name}
              </td>

              <td className="whitespace-nowrap !px-[0.875rem] !py-[0.75rem]">
                {room.roomName}
              </td>

              <td className="whitespace-nowrap !px-[0.875rem] !py-[0.75rem]">
                {room.roomNumber}
              </td>
              <td className="whitespace-nowrap !px-[0.875rem] !py-[0.75rem]">
                {room.floor}
              </td>
              <td className="whitespace-nowrap !px-[0.875rem] !py-[0.75rem]">
                {room.status}
              </td>
				<td className="whitespace-nowrap !px-[0.875rem] !py-[0.75rem]">
                <span
                  className={`inline-flex items-center gap-[0.375rem] rounded-full !px-[0.625rem] !py-[0.3125rem] text-[0.6875rem] font-medium ${
                    room.status == ROOM_STATUS.ACTIVE
                      ? "bg-[#eaf7f1] text-[#16805d]"
                      : "bg-[#f2f4f7] text-[#667085]"
                  }`}
                >
                  <span
                    className={`h-[0.375rem] w-[0.375rem] rounded-full ${
                      room.status == ROOM_STATUS.ACTIVE ? "bg-[#25a575]" : "bg-[#98a2b3]"
                    }`}
                  />
                  {room.status}
                </span>
              </td>

              {/* Actions */}
              <td className="px-[0.875rem] !py-[0.75rem]">
                <div className="flex items-center justify-start gap-[0.625rem] whitespace-nowrap">
                  <button
                    type="button"
                    title="Chỉnh sửa"
                    onClick={() => setShowEditModal(room)}
                    className="flex cursor-pointer h-[2rem] w-[2rem] items-center justify-center rounded-[0.375rem] text-[#667085] transition-colors hover:bg-[#edf5fd] hover:text-[#2878d0]"
                  >
                    <Edit className="h-[1.0625rem] w-[1.0625rem]" />
                  </button>

                  <button
                    type="button"
                    title={room.status == ROOM_STATUS.ACTIVE ? "Khóa phòng" : "Mở phòng"}
                    onClick={() => setShowLockedModal(room)}
                    className={`text-[0.75rem] cursor-pointer font-semibold transition-colors ${
                      room.status == ROOM_STATUS.ACTIVE
                        ? "text-[#d04444] hover:text-[#a52c2c]"
                        : "text-[#16805d] hover:text-[#116747]"
                    }`}
                  >
                    {room.status == ROOM_STATUS.ACTIVE ? "Khóa" : "Kích hoạt"}
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    {showEditModal && (
    	<EditModal
    		room={showEditModal}
        specialties={specialties}
    		onClose={()=>setShowEditModal(null)}
        	fetchRooms={fetchRooms}
    	/>
    )}
    {showLockedModal && (
    	<LockedModal
    		room={showLockedModal}
    		onClose={()=>setShowLockedModal(null)}
        	fetchRooms={fetchRooms}
    	/>
    )}
    </>
  );
}

export default DataTable;