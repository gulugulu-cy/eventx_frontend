import { CartesianGrid, Line, LineChart, XAxis } from "recharts"
import { type ChartConfig, ChartContainer, ChartTooltip } from "@/components/ui/chart"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function TradingChart() {

    const chartData = [
        { name: "1hour ago", quantity: 186, },
        { name: "1day ago", quantity: 305, },
        { name: "1month ago", quantity: 237, },
    ]

    const chartConfig = {
        quantity: {
            label: "name",
            color: "var(--chart-1)",
        },
    } satisfies ChartConfig


    return (
        <Card>
            <CardHeader>
                <CardTitle>trading volume</CardTitle>
                <CardDescription />
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <LineChart
                        accessibilityLayer
                        data={chartData}
                        margin={{
                            left: 12,
                            right: 12,
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="name"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            interval='preserveStartEnd'
                            tickFormatter={(value) => value}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={({ payload }) => (
                                <div className="bg-background p-2 rounded border">
                                    {payload?.[0] && (
                                        <>
                                            <p className="text-sm font-medium">
                                                {payload[0].payload.name}
                                            </p>
                                            <p className="text-sm">
                                                {payload[0].payload.quantity}
                                            </p>
                                        </>
                                    )}
                                </div>
                            )}
                        />
                        <Line
                            dataKey="quantity"
                            type="natural"
                            stroke="var(--color-quantity)"
                            strokeWidth={2}
                            dot={{
                                fill: "var(--color-quantity)",
                            }}
                            activeDot={{
                                r: 6,
                            }}
                        />
                    </LineChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}