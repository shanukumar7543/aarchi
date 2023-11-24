import React from "react";
import { ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
export default function index() {
  const data = [
    {
      //   label: '111%',
      value: 400,
      //   text: 'Segment 1 Text',
      image:
        "https://w7.pngwing.com/pngs/915/345/png-transparent-multicolored-balloons-illustration-balloon-balloon-free-balloons-easter-egg-desktop-wallpaper-party-thumbnail.png",
    },
    {
      //   label: '111%',
      value: 400,
      //   text: 'Segment 1 Text',
      image:
        "https://i.pinimg.com/originals/1e/2f/28/1e2f28c0537debcf003afc48375d2775.jpg",
    },
    {
      label: "111%",
      value: 400,
      //   text: 'Segment 1 Text',
      //   image: 'img1',
    },
    {
      label: "111%",
      value: 300,
      //   text: 'Segment 2 Text',
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTI1j9WlyV3bRgtRi6-1L5nRqCx1GgXIogQjsDcjiBPsQF1zlsf3F3MpjFhTauf6DzB4zw&usqp=CAU",
    },
    {
      label: "111%",
      value: 300,
      //   text: '111%',
      //   image: 'segment3.png',
    },
    {
      label: "111%",
      //   value: 300,
      //   text: '',
      //   image: 'segment3.png',
    },
    {
      label: "111%",
      value: 300,
      //   text: '111%',
      //   image: 'segment3.png',
    },
  ];

  const textCenter = {
    id: "textCenter",
    beforeDatasetDraw(chart, args, pluginOptions) {
      const { ctx, data } = chart;
      ctx.save();
      ctx.font = "border 30px sans-serif";
      ctx.fillStyle = "red";
      ctx.textAlign = "center";
      ctx.filltext(
        "text",
        chart.getDatasetMeta(0).data[0].x,
        chart.getDatasetMeta(0).data[0].y
      );
    },
  };

  return (
    <>
      <ResponsiveContainer width="100%" height={500}>
        <PieChart>
          <Pie
            data={data}
            // dataKey="value"
            cx="50%"
            cy="50%"
            outerRadius={120}
            innerRadius={60}
            labelLine={false}
            colors={["rgba(250,174,50,0.5)"]}
            fill="rgba(250,174,50,0.5)"
            isAnimationActive={false}
            // paddingAngle={5}
            startAngle={90}
            endAngle={-270}
            label={({
              cx,
              cy,
              midAngle,
              innerRadius,
              outerRadius,
              value,
              index,
            }) => {
              const RADIAN = Math.PI / 180;
              const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
              const x = cx + radius * Math.cos(-midAngle * RADIAN);
              const y = cy + radius * Math.sin(-midAngle * RADIAN);

              return (
                <g>
                  <image
                    xlinkHref={data[index].image}
                    x={x - 15}
                    y={y - 15}
                    height="30px"
                    width="30px"
                  />
                  {/* <text
                    x={x}
                    y={y + 10}
                    fill="#8884d8"
                    textAnchor={x > cx ? 'start' : 'end'}
                    dominantBaseline="central"
                  >
                    {data[index].label}
                  </text> */}
                  <text
                    x={x}
                    y={y + 10}
                    fill="#8884d8"
                    textAnchor={x > cx ? "start" : "end"}
                    dominantBaseline="central"
                  >
                    {/* {data[index].text} */}
                  </text>
                  <text
                    x={x}
                    y={y - 10}
                    fill="red"
                    textAnchor={x > cx ? "start" : "end"}
                    dominantBaseline="central"
                  >
                    {value}
                  </text>
                </g>
              );
            }}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                plugins={[textCenter]}
                fill={`#${Math.floor(Math.random() * 16777215).toString(16)}`}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </>
  );
}

// import React from "react";
// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
// import { Doughnut } from "react-chartjs-2";
// ChartJS.register(ArcElement, Tooltip, Legend);

// function DoughnutChart() {
//   const data = {
//     labels: ["Year", "Amount", "price"],
//     datasets: [
//       {
//         label: "Details",
//         data: [3, 6, 6],
//         backgroundColor: ["blue", "red", "green"],
//         borderColor: ["blue", "yellow", "green"],
//       },
//     ],
//   };
//   const options = {};

//   return (
//     <div>
//       <Doughnut
//         chartType="PieChart"
//         data={data}
//         options={options}
//         cutout="500"
//         //    width={"100%"}
//         //    height={"300px"}
//       />
//     </div>
//   );
// }

// export default DoughnutChart;
