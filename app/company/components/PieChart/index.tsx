"use client";
import { DefaultRawDatum, ResponsivePie } from "@nivo/pie";

type Props = {
  title: string;
  data: Map<string, number>;
};

export default function PieChart({ title, data }: Props) {
  const preparedData = Array.from(data.entries())
    .sort(([, a], [, b]) => b - a)
    .reduce((acc, [name, value], index) => {
      if (index < 5) {
        return acc.set(name, value);
      }

      acc.set("Other", acc.get("Other") || 0 + (data.get(name) || 0));

      return acc;
    }, new Map<string, number>());

  const chartData = Array.from(preparedData.entries()).map(([name, value]) => ({
    id: name,
    color: name === "Other" ? "#ccc" : undefined,
    label: name,
    value,
  }));

  return (
    <div>
      <p>{title}</p>
      <div style={{ width: "100%", height: 500 }}>
        <ResponsivePie
          data={chartData}
          defs={chartData.map((item) => ({
            id: item.id,
            type: "patternDots",
            background: item.color || "inherit",
            color: "rgba(255, 255, 255, 0.3)",
            size: 4,
            padding: 1,
            stagger: true,
          }))}
          fill={chartData.map((item) => ({
            id: item.id,
            match: { id: item.id },
          }))}
          margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
          innerRadius={0.5}
          padAngle={0.7}
          cornerRadius={3}
          activeOuterRadiusOffset={8}
          borderWidth={1}
          borderColor={{
            from: "color",
            modifiers: [["darker", 0.2]],
          }}
          arcLinkLabelsSkipAngle={10}
          arcLinkLabelsTextColor="#333333"
          arcLinkLabelsThickness={2}
          arcLinkLabelsColor={{ from: "color" }}
          arcLabelsSkipAngle={10}
          arcLabelsTextColor={{
            from: "color",
            modifiers: [["darker", 2]],
          }}
          legends={[
            {
              anchor: "bottom",
              direction: "row",
              justify: false,
              translateX: 0,
              translateY: 56,
              itemsSpacing: 0,
              itemWidth: 100,
              itemHeight: 18,
              itemTextColor: "#999",
              itemDirection: "left-to-right",
              itemOpacity: 1,
              symbolSize: 18,
              symbolShape: "circle",
              effects: [
                {
                  on: "hover",
                  style: {
                    itemTextColor: "#000",
                  },
                },
              ],
            },
          ]}
        />
      </div>
    </div>
  );
}
