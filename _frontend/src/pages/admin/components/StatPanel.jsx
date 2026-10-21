import { 
  CalendarAlt,
  User,
  ChartLine,
  HeartPlus

} from '@boxicons/react';

function StatPanel({className}) {

	const groupCards = [
		{
			title: "Lịch hẹn hôm nay", 
			icon: <CalendarAlt/>,
			color: "text-blue-400",
			bgColor: "bg-blue-400/20"
		},
		{
			title: "Lượt khám trong ngày", 
			icon: <User/>,
			color: "text-green-700",
			bgColor: "bg-green-400/20"
		},
		{
			title: "Doanh thu đã thu", 
			icon: <ChartLine/>,
			color: "text-purple-700",
			bgColor: "bg-purple-400/20"
		},
		{
			title: "Bác sĩ hoạt động", 
			icon: <HeartPlus/>,
			color: "text-orange-400",
			bgColor: "bg-orange-400/20"
		},

	];
	return (
		<>
		<div className="grid grid-cols-4 gap-[1rem]">
			{groupCards.map((card, idx) => (
			<article key={idx} className="flex flex-col border border-gray-200 shadow-xl rounded-[0.6rem] gap-3 !p-[1rem]">
				<div>
					<div className={`w-[2rem] h-[2rem] flex items-center justify-center rounded-[0.3rem] ${card.color} ${card.bgColor}`}>
						{card.icon}
					</div>
					<span className="text-[0.8rem]">{card.title}</span>
				</div>
				<p className="font-bold text-[1.3rem]">
					d;fa;dj
				</p>
				<span className={`text-[0.7rem] ${card.color}`}>adf;j;ad</span>
			</article>
			))}
		</div>
		</>
		);
}

export default StatPanel;