import * as React from "react";
import {
  CircularGaugeComponent,
  AxesDirective,
  AxisDirective,
  Inject,
  PointersDirective,
  PointerDirective,
  RangesDirective,
  RangeDirective,
  GaugeTooltip,
} from "@syncfusion/ej2-react-circulargauge";
const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
    }
    #templateWrap img {
        border-radius: 30px;
        width: 30px;
        height: 30px;
        margin: 0 auto;
    }
	 #templateWrap {
        background: #fff;
        padding: 3px;
        border-radius: 2px;
    }
    #templateWrap .des {
        float: right;
        padding-left: 10px;
        line-height: 30px;
    }`;
function Index({ setChartVal }) {
  let gauge;
  function onChartLoad(args) {
    document.getElementById("tooltip-container").setAttribute("title", "");
  }
  function load(args) {}

  function dragEnd(args) {
    console.log("aaa", args.currentValue);
    if (args.currentValue >= 0 && args.currentValue <= 50) {
      args.pointer.color = "#3A5DC8";
      args.pointer.cap.border.color = "#3A5DC8";
    } else {
      args.pointer.color = "#33BCBD";
      args.pointer.cap.border.color = "#33BCBD";
    }
    args.pointer.value = args.currentValue;
    setChartVal(args.currentValue);
    args.pointer.animation.enable = false;
    gauge.refresh();
  }
  return (
    <div className="control-pane">
      <style>{SAMPLE_CSS}</style>
      <div className="control-section row">
        <div className="col-lg-12">
          <CircularGaugeComponent
            style={{ height: "300px ", width: "300px" }}
            background="transparent"
            loaded={onChartLoad.bind(this)}
            dragEnd={dragEnd.bind(this)}
            id="tooltip-container"
            ref={(g) => (gauge = g)}
            enablePointerDrag={true}
            load={load.bind(this)}
            tooltip={{
              enable: true,
              type: ["Range", "Pointer"],
              showAtMousePosition: true,
              format: "Current Value:  {value}",
              enableAnimation: false,
              textStyle: {
                size: "13px",
                fontFamily: "inherit",
              },
              rangeSettings: {
                showAtMousePosition: true,
                format: "Start Value: {start} <br/> End Value: {end}",
                textStyle: {
                  size: "13px",
                  fontFamily: "inherit",
                },
              },
            }}
          >
            <Inject services={[GaugeTooltip]} />
            <AxesDirective>
              <AxisDirective
                startAngle={240}
                endAngle={120}
                radius="90%"
                minimum={33}
                maximum={99}
                majorTicks={{
                  color: "white",
                  offset: -5,
                  height: 12,
                }}
                lineStyle={{ width: 0 }}
                minorTicks={{
                  width: 0,
                }}
                labelStyle={{
                  useRangeColor: true,
                  font: { fontFamily: "inherit" },
                }}
              >
                <PointersDirective>
                  <PointerDirective
                    value={33}
                    radius="60%"
                    cap={{
                      radius: 10,
                      border: { color: "#33BCBD", width: 5 },
                    }}
                    animation={{
                      enable: true,
                      duration: 1500,
                    }}
                    color="#33BCBD"
                  />
                </PointersDirective>
                <RangesDirective>
                  <RangeDirective
                    start={0}
                    end={50}
                    radius="102%"
                    color="#3A5DC8"
                    startWidth={10}
                    endWidth={10}
                  />
                  <RangeDirective
                    start={50}
                    end={120}
                    radius="102%"
                    color="#33BCBD"
                    startWidth={10}
                    endWidth={10}
                  />
                </RangesDirective>
              </AxisDirective>
            </AxesDirective>
          </CircularGaugeComponent>
        </div>
      </div>
    </div>
  );
}
export default Index;

// import React, { useState, useEffect } from "react";
// import GaugeChart from "react-gauge-chart";

// function GaugeCharts() {
//   const [percentage, setPercentage] = useState(0.37);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setPercentage(Math.random().toFixed(2));
//     }, 5000);
//     // return () => clearInterval(interval);
//   }, []);

//   return (
//     <div>
//       <GaugeChart
//         maxValue={200}
//         minValue={-100}
//         id="gauge-chart3"
//         nrOfLevels={1}
//         colors={["#38b6ff"]}
//         arcWidth={0.3}
//         percent={percentage}
//         textColor={"skyblue"}
//       />
//     </div>
//   );
// }

// export default GaugeCharts;
