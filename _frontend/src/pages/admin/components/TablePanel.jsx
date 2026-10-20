function TablePanel({className}) {
	return (
		<>
<section className="admin-panel admin-recent-panel">
	<div className="admin-panel-heading">
		<div>
			<h2>Lịch hẹn gần đây</h2>
			<p>Các lượt khám mới nhất trong hệ thống</p>
		</div>
		<button className="admin-text-link" type="button">Tất cả lịch hẹn
			<svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
				<path d="M5 12h14m-6-6 6 6-6 6"></path>
			</svg>
		</button>
	</div>
	<div className="admin-table-wrap">
		<table className="admin-table admin-compact-table">
			<thead>
				<tr>
					<th>Bệnh nhân</th>
					<th>Bác sĩ</th>
					<th>Thời gian</th>
					<th>Trạng thái</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>
						<div className="admin-person-cell"><span className="admin-avatar">VA</span><span>Nguyễn Văn An<small>LH20261012001</small></span></div>
					</td>
					<td>Trần Văn Nam</td>
					<td>10/12 · 08:00</td>
					<td><span className="admin-status is-positive"><i></i>Đã xác nhận</span></td>
				</tr>
				<tr>
					<td>
						<div className="admin-person-cell"><span className="admin-avatar">TB</span><span>Trần Thị Bình<small>LH20261012002</small></span></div>
					</td>
					<td>Lê Thị Lan</td>
					<td>10/12 · 08:30</td>
					<td><span className="admin-status is-warning"><i></i>Chờ xác nhận</span></td>
				</tr>
				<tr>
					<td>
						<div className="admin-person-cell"><span className="admin-avatar">HC</span><span>Lê Hùng Cường<small>LH20261012003</small></span></div>
					</td>
					<td>Phạm Minh Đức</td>
					<td>10/12 · 09:00</td>
					<td><span className="admin-status is-positive"><i></i>Đã xác nhận</span></td>
				</tr>
				<tr>
					<td>
						<div className="admin-person-cell"><span className="admin-avatar">TH</span><span>Phạm Thu Hà<small>LH20261011001</small></span></div>
					</td>
					<td>Lê Thị Lan</td>
					<td>10/11 · 08:30</td>
					<td><span className="admin-status is-positive"><i></i>Hoàn tất</span></td>
				</tr>
			</tbody>
		</table>
	</div>
</section>
		</>
		);
}

export default TablePanel;