import { Layout, Typography } from "antd";
import { useCrypto } from "../../context/cryptoContext";
import PortfolioChart from "../PortfolioChart";
import AssetsTable from "../AssetsTable";

const contentStyle = {
  textAlign: "center",
  minHeight: "calc(100vh - 60px)",
  color: "#fff",
  backgroundColor: "#001529",
  padding: "1rem",
};

export default function AppContent() {
  const { assets, crypto } = useCrypto();
  //list(map:name->price) of all coins and their prices
  const cryptoPriceMap = crypto.reduce((acc, c) => {
    acc[c.id] = c.price;
    return acc;
  }, {});

  const moneyCount = assets
    .map((asset) => asset.amount * cryptoPriceMap[asset.id])
    //summarize all count*price
    .reduce((acc, v) => (acc += v), 0)
    .toFixed(2);

  return (
    <Layout.Content style={contentStyle}>
      <Typography.Title level={3} style={{ textAlign: "left", color: "#fff" }}>
        Portfolio: {moneyCount}$
      </Typography.Title>
      <PortfolioChart />
      <AssetsTable />
    </Layout.Content>
  );
}
