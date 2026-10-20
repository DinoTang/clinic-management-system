function LoadingPanel({className}){
	return (
		<>
<section className="admin-panel admin-specialty-panel">
	<div className="admin-panel-heading">
		<div>
			<h2>Lượt khám theo chuyên khoa</h2>
			<p>Phân bố lượt khám trong tháng</p>
		</div>
	</div>
	<div className="admin-specialty-bars">
		<div className="admin-specialty-bar-row"><span>Nội khoa</span>
			<div><i className="is-blue" style="width: 78%;"></i></div><b>109</b></div>
		<div className="admin-specialty-bar-row"><span>Tim mạch</span>
			<div><i className="is-violet" style="width: 62%;"></i></div><b>87</b></div>
		<div className="admin-specialty-bar-row"><span>Nhi khoa</span>
			<div><i className="is-green" style="width: 48%;"></i></div><b>67</b></div>
		<div className="admin-specialty-bar-row"><span>Tai Mũi Họng</span>
			<div><i className="is-amber" style="width: 34%;"></i></div><b>48</b></div>
	</div>
	<button className="admin-text-link" type="button">Quản lý chuyên khoa
		<svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
			<path d="M5 12h14m-6-6 6 6-6 6"></path>
		</svg>
	</button>
</section>
		</>
		);
}
export default LoadingPanel;